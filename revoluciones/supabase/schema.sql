-- ===========================================================================
--  REVOLUCIONES — ESQUEMA DE BASE DE DATOS (Supabase / PostgreSQL)
--
--  Cómo usarlo:
--    Supabase -> tu proyecto -> SQL Editor -> New query -> pegar todo -> Run.
--
--  Principio de privacidad: se guarda lo mínimo indispensable para que el
--  docente pueda ver cómo le fue al grupo. NO hay columnas para correo,
--  teléfono, dirección, documento ni fecha de nacimiento, y no deben
--  agregarse: si no existe la columna, el dato no se puede guardar por error.
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- 1. TABLAS
-- ---------------------------------------------------------------------------

create table if not exists public.sesiones_estudiante (
  id              uuid primary key default gen_random_uuid(),

  -- Nombre, apodo o identificador escolar. Lo define el docente.
  nombre          text not null check (char_length(nombre) between 1 and 60),
  curso           text check (char_length(curso) <= 40),

  puntaje         integer not null default 0 check (puntaje >= 0),
  puntaje_maximo  integer not null default 0 check (puntaje_maximo >= 0),
  correctas       integer not null default 0 check (correctas >= 0),
  incorrectas     integer not null default 0 check (incorrectas >= 0),
  total           integer not null default 0 check (total >= 0),
  porcentaje      integer not null default 0 check (porcentaje between 0 and 100),

  -- Resultados por tema: {"concepto": {"correctas": 4, "total": 5}, ...}
  por_tema        jsonb not null default '{}'::jsonb,

  -- true cuando el estudiante llegó al final de la evaluación.
  completado      boolean not null default false,

  creado_en       timestamptz not null default now()
);

comment on table public.sesiones_estudiante is
  'Un registro por recorrido de estudiante. Solo nombre/apodo y curso: ningún otro dato personal.';

create table if not exists public.respuestas (
  id            uuid primary key default gen_random_uuid(),
  sesion_id     uuid not null
                  references public.sesiones_estudiante(id) on delete cascade,

  -- Identificador interno de la actividad (por ejemplo "ev-05" o "juego1:j1-moda").
  actividad_id  text not null check (char_length(actividad_id) <= 120),
  tema          text not null check (tema in ('concepto','eeuu','francia','industrial')),

  correcta      boolean not null,
  intentos      integer not null default 1 check (intentos >= 0),
  puntos        integer not null default 0 check (puntos >= 0),

  respondido_en timestamptz not null default now()
);

comment on table public.respuestas is
  'Detalle por actividad. Permite calcular qué preguntas fallaron más en el grupo.';

-- ---------------------------------------------------------------------------
-- 2. ÍNDICES
-- ---------------------------------------------------------------------------

create index if not exists idx_sesiones_creado_en
  on public.sesiones_estudiante (creado_en desc);

create index if not exists idx_sesiones_curso
  on public.sesiones_estudiante (curso);

create index if not exists idx_respuestas_sesion
  on public.respuestas (sesion_id);

create index if not exists idx_respuestas_actividad
  on public.respuestas (actividad_id);

-- ---------------------------------------------------------------------------
-- 3. SEGURIDAD (Row Level Security)
--
--    La aplicación NUNCA se conecta a la base desde el navegador: todo pasa
--    por los Route Handlers de Next.js (/api/resultados y /api/docente), que
--    usan la service role key del lado del servidor.
--
--    La service role key omite RLS por diseño. Por eso acá activamos RLS y NO
--    creamos ninguna política: el resultado es que las claves públicas (anon)
--    no pueden leer ni escribir absolutamente nada, ni siquiera si alguien
--    consigue la URL del proyecto.
-- ---------------------------------------------------------------------------

alter table public.sesiones_estudiante enable row level security;
alter table public.respuestas          enable row level security;

-- Se revocan además los permisos directos de los roles públicos, por si en el
-- futuro alguien crea una política sin querer.
revoke all on public.sesiones_estudiante from anon, authenticated;
revoke all on public.respuestas          from anon, authenticated;

-- ---------------------------------------------------------------------------
-- 4. VISTAS ÚTILES PARA EL DOCENTE (opcionales)
--    Se pueden consultar desde el SQL Editor de Supabase.
-- ---------------------------------------------------------------------------

create or replace view public.resumen_por_tema as
select
  tema,
  count(*)                                        as respuestas_totales,
  count(*) filter (where correcta)                as respuestas_correctas,
  round(100.0 * count(*) filter (where correcta) / nullif(count(*), 0)) as porcentaje_acierto
from public.respuestas
group by tema
order by porcentaje_acierto asc;

comment on view public.resumen_por_tema is
  'Porcentaje de acierto del grupo en cada uno de los cuatro temas.';

create or replace view public.actividades_con_mas_errores as
select
  actividad_id,
  tema,
  count(*)                                        as veces_respondida,
  count(*) filter (where correcta)                as veces_correcta,
  round(100.0 * count(*) filter (where correcta) / nullif(count(*), 0)) as porcentaje_acierto
from public.respuestas
group by actividad_id, tema
having count(*) >= 2
order by porcentaje_acierto asc
limit 25;

comment on view public.actividades_con_mas_errores is
  'Actividades que más se fallaron. Sirve para decidir qué retomar en clase.';

-- ---------------------------------------------------------------------------
-- 5. LIMPIEZA PERIÓDICA (recomendado)
--
--    Buena práctica de privacidad: no conservar los datos más tiempo del
--    necesario. Esta función borra las sesiones de más de un año. Se puede
--    ejecutar a mano, o programar con la extensión pg_cron.
-- ---------------------------------------------------------------------------

create or replace function public.borrar_sesiones_antiguas()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.sesiones_estudiante
  where creado_en < now() - interval '1 year';
$$;

comment on function public.borrar_sesiones_antiguas is
  'Borra las sesiones de más de un año. Las respuestas asociadas caen por cascada.';

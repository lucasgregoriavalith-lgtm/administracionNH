"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { EstadoProgreso, Estudiante, RegistroRespuesta, Tema } from "./tipos";
import { calcularPuntos, resumir, type Resumen } from "./puntaje";

const CLAVE_ALMACEN = "revoluciones:progreso:v1";

const ESTADO_INICIAL: EstadoProgreso = {
  estudiante: null,
  respuestas: {},
  seccionesVisitadas: [],
  evaluacionCompletada: false,
  iniciadoEn: null,
};

interface ContextoProgreso {
  estado: EstadoProgreso;
  resumen: Resumen;
  listo: boolean;
  identificar: (estudiante: Estudiante) => void;
  registrar: (args: {
    actividadId: string;
    tema: Tema;
    correcta: boolean;
    intentos: number;
  }) => void;
  respuestaDe: (actividadId: string) => RegistroRespuesta | undefined;
  marcarVisitada: (ruta: string) => void;
  completarEvaluacion: () => void;
  reiniciar: () => void;
  reiniciarActividades: (ids: string[]) => void;
}

const Contexto = createContext<ContextoProgreso | null>(null);

function leerAlmacen(): EstadoProgreso {
  if (typeof window === "undefined") return ESTADO_INICIAL;
  try {
    const bruto = window.localStorage.getItem(CLAVE_ALMACEN);
    if (!bruto) return ESTADO_INICIAL;
    const guardado = JSON.parse(bruto) as Partial<EstadoProgreso>;
    return { ...ESTADO_INICIAL, ...guardado };
  } catch {
    // Un almacenamiento bloqueado o corrupto no debe romper la aplicación.
    return ESTADO_INICIAL;
  }
}

export function ProveedorProgreso({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<EstadoProgreso>(ESTADO_INICIAL);
  const [listo, setListo] = useState(false);

  // La lectura se hace después del montaje para que el HTML del servidor y el
  // del cliente coincidan (evita errores de hidratación).
  useEffect(() => {
    setEstado(leerAlmacen());
    setListo(true);
  }, []);

  useEffect(() => {
    if (!listo) return;
    try {
      window.localStorage.setItem(CLAVE_ALMACEN, JSON.stringify(estado));
    } catch {
      // Si el navegador no permite guardar, la sesión sigue funcionando en memoria.
    }
  }, [estado, listo]);

  const identificar = useCallback((estudiante: Estudiante) => {
    setEstado((previo) => ({
      ...previo,
      estudiante,
      iniciadoEn: previo.iniciadoEn ?? new Date().toISOString(),
    }));
  }, []);

  const registrar = useCallback<ContextoProgreso["registrar"]>(
    ({ actividadId, tema, correcta, intentos }) => {
      setEstado((previo) => {
        const anterior = previo.respuestas[actividadId];
        // Una actividad ya resuelta correctamente no pierde sus puntos si se
        // vuelve a jugar y esta vez se falla.
        if (anterior?.correcta && !correcta) return previo;

        const registro: RegistroRespuesta = {
          actividadId,
          tema,
          correcta,
          intentos,
          puntos: calcularPuntos(intentos, correcta),
          momento: new Date().toISOString(),
        };
        return {
          ...previo,
          respuestas: { ...previo.respuestas, [actividadId]: registro },
        };
      });
    },
    [],
  );

  const respuestaDe = useCallback(
    (actividadId: string) => estado.respuestas[actividadId],
    [estado.respuestas],
  );

  const marcarVisitada = useCallback((ruta: string) => {
    setEstado((previo) =>
      previo.seccionesVisitadas.includes(ruta)
        ? previo
        : { ...previo, seccionesVisitadas: [...previo.seccionesVisitadas, ruta] },
    );
  }, []);

  const completarEvaluacion = useCallback(() => {
    setEstado((previo) => ({ ...previo, evaluacionCompletada: true }));
  }, []);

  const reiniciar = useCallback(() => {
    setEstado(ESTADO_INICIAL);
    try {
      window.localStorage.removeItem(CLAVE_ALMACEN);
    } catch {
      /* sin efecto */
    }
  }, []);

  const reiniciarActividades = useCallback((ids: string[]) => {
    setEstado((previo) => {
      const respuestas = { ...previo.respuestas };
      for (const id of ids) delete respuestas[id];
      return { ...previo, respuestas };
    });
  }, []);

  const resumen = useMemo(() => resumir(estado), [estado]);

  const valor = useMemo<ContextoProgreso>(
    () => ({
      estado,
      resumen,
      listo,
      identificar,
      registrar,
      respuestaDe,
      marcarVisitada,
      completarEvaluacion,
      reiniciar,
      reiniciarActividades,
    }),
    [
      estado,
      resumen,
      listo,
      identificar,
      registrar,
      respuestaDe,
      marcarVisitada,
      completarEvaluacion,
      reiniciar,
      reiniciarActividades,
    ],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useProgreso(): ContextoProgreso {
  const contexto = useContext(Contexto);
  if (!contexto) {
    throw new Error("useProgreso debe usarse dentro de <ProveedorProgreso>");
  }
  return contexto;
}

// ============================================================
// SCRIPT.JS
// Lee TODOS los textos y valores desde valores.js (datosColegio)
// y arma el contenido de la página. No hace falta tocar este
// archivo para actualizar precios — eso se hace en valores.js.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Íconos (SVG en línea, sin dependencias externas) ----------
  const iconos = {
    matricula: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8 9h8M8 13h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    cuotas: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M3 10h18M7 15h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    seguro: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 3.2v5.4c0 5-3.4 8.4-8 9.4-4.6-1-8-4.4-8-9.4V6.2L12 3z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 12l2.2 2.2L15.5 9.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    natacion: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="18" cy="6" r="1.6" fill="currentColor"/><path d="M13 13l3.2-3.2a2 2 0 0 1 2.6-.2l3.4 2.6M13 13L8 16M13 13l-3-4-4 3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 19c1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0 1.4 1.2 2.8 1.2 4.2 0 1.4-1.2 2.8-1.2 4.2 0 1.4 1.2 2.8 1.2 4.2 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    expresividad: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="currentColor" stroke-width="1.7"/><path d="M5 20c1-3.6 3.8-5.6 7-5.6s6 2 7 5.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    granja: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 20V10l5-3.5V20" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 20V8l6 3v9" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M15 20v-6l5-2v8" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M2 20h20" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    tareas: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 3h9l4 4v14H6z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 12h6M9 16h6M9 8h3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`,
    equis: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>`,
    check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  };

  // valores.js declara `datosColegio` con const, que no queda colgada de
  // window, así que se la referencia directamente.
  const d = typeof datosColegio !== 'undefined' ? datosColegio : null;
  if (!d) {
    console.error('No se encontró datosColegio. Revisá que valores.js esté cargado antes que script.js.');
    return;
  }

  // ---------- 1. Valores generales ----------
  const valoresGenerales = document.getElementById('valoresGenerales');
  valoresGenerales.innerHTML = `
    <div class="recibo reveal">
      <div class="recibo__icono">${iconos.matricula}</div>
      <div class="recibo__nombre">Matrícula</div>
      <div class="recibo__valor">${d.matricula.valor}</div>
      <div class="recibo__detalle">${d.matricula.detalle}</div>
    </div>
    <div class="recibo reveal">
      <div class="recibo__icono">${iconos.cuotas}</div>
      <div class="recibo__nombre">Cuotas</div>
      <div class="recibo__valor">${d.cuotas.cantidad} cuotas de ${d.cuotas.valor}</div>
      <div class="recibo__detalle">${d.cuotas.detalle}</div>
    </div>
    <div class="recibo reveal">
      <div class="recibo__icono">${iconos.seguro}</div>
      <div class="recibo__nombre">Seguro médico</div>
      <div class="recibo__valor">${d.seguroMedico.cantidad} cuotas de ${d.seguroMedico.valor}</div>
      <div class="recibo__detalle">${d.seguroMedico.detalle}</div>
    </div>
  `;

  // ---------- 2. Cuota extraordinaria ----------
  const extraordinaria = document.getElementById('cuotaExtraordinaria');
  extraordinaria.innerHTML = `
    <div class="extraordinaria__texto">
      <p class="extraordinaria__etiqueta">Cuota extraordinaria</p>
      <h3 class="extraordinaria__titulo">Cuota extraordinaria de mantenimiento educativo</h3>
      <p class="extraordinaria__nota">Se abona en los meses de ${d.cuotaExtraordinaria.meses}. Durante ${d.cuotaExtraordinaria.vigencia}, el valor de cada una fue de ${d.cuotaExtraordinaria.valor}.</p>
    </div>
    <div class="extraordinaria__valor-wrap">
      <div class="extraordinaria__valor">${d.cuotaExtraordinaria.valor}</div>
      <div class="extraordinaria__valor-detalle">cada una &middot; ${d.cuotaExtraordinaria.vigencia}</div>
    </div>
  `;
  extraordinaria.classList.add('reveal');

  // ---------- 3. Qué incluye ----------
  const incluyeGrid = document.getElementById('incluyeGrid');
  incluyeGrid.innerHTML = d.incluye.map(item => `
    <div class="incluye-card reveal">
      <div class="incluye-card__icono">${iconos[item.icono] || ''}</div>
      <div class="incluye-card__titulo">${item.titulo}</div>
      <div class="incluye-card__detalle">${item.detalle}</div>
    </div>
  `).join('');

  // ---------- 4. Qué no incluye ----------
  const noIncluyeGrid = document.getElementById('noIncluyeGrid');
  noIncluyeGrid.innerHTML = d.noIncluye.map(item => `
    <div class="no-incluye-item reveal">
      <div class="no-incluye-item__icono">${iconos.equis}</div>
      <div class="no-incluye-item__titulo">${item.titulo}</div>
    </div>
  `).join('');

  // ---------- 5. Extensión horaria hasta las 14:00 ----------
  document.getElementById('extension14Subtitulo').textContent = d.extension14.subtitulo;
  const extension14Grid = document.getElementById('extension14Grid');
  extension14Grid.innerHTML = d.extension14.opciones.map((op, i) => `
    <button type="button" class="opcion-card reveal" data-grupo="extension14" data-idx="${i}">
      <span class="opcion-card__check">${iconos.check}</span>
      <span class="opcion-card__num">${op.etiqueta}</span>
      <span class="opcion-card__valor">${op.valor}</span>
      <span class="opcion-card__frecuencia">${op.frecuencia}</span>
    </button>
  `).join('');

  // ---------- 6. Talleres hasta las 15:30 ----------
  document.getElementById('talleresSubtitulo').textContent = d.talleres1530.subtitulo;
  document.getElementById('talleresValorUnitario').textContent = `Valor por cada taller: ${d.talleres1530.valorPorTaller}`;
  const talleresGrid = document.getElementById('talleresGrid');
  talleresGrid.innerHTML = d.talleres1530.opciones.map((op, i) => `
    <button type="button" class="opcion-card reveal" data-grupo="talleres" data-idx="${i}">
      <span class="opcion-card__check">${iconos.check}</span>
      <span class="opcion-card__num">${op.etiqueta}</span>
      <span class="opcion-card__valor">${op.valor}</span>
    </button>
  `).join('');

  // ---------- 7. Taller de tareas ----------
  const tallerDeTareas = document.getElementById('tallerDeTareas');
  tallerDeTareas.innerHTML = `
    <div class="tareas-card__icono">${iconos.tareas}</div>
    <div class="tareas-card__titulo">Taller de tareas</div>
    <div class="tareas-card__texto">${d.tallerDeTareas.texto}</div>
  `;
  tallerDeTareas.classList.add('reveal');

  // ---------- 8. Footer ----------
  document.getElementById('footerActualizacion').textContent = `Valores vigentes ${d.ultimaActualizacion}`;

  // ============================================================
  // INTERACTIVIDAD
  // ============================================================

  // --- Selección visual de tarjetas (no simula una compra) ---
  document.body.addEventListener('click', (e) => {
    const card = e.target.closest('.opcion-card');
    if (!card) return;
    const grupo = card.dataset.grupo;
    document.querySelectorAll(`.opcion-card[data-grupo="${grupo}"]`).forEach(c => {
      if (c !== card) c.classList.remove('is-selected');
    });
    card.classList.toggle('is-selected');
  });

  // --- Header: sombra al scrollear ---
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 8) {
      header.style.boxShadow = '0 8px 24px -12px rgba(0,0,0,0.4)';
    } else {
      header.style.boxShadow = 'none';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Animaciones de aparición al hacer scroll ---
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('is-visible'), i * 40);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

});

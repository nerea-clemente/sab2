import { useEffect, useMemo, useState } from 'preact/hooks';
import type { GradoIndice } from '@/lib/grados';

interface Props {
  grados: GradoIndice[];
}

interface Filtros {
  q: string;
  area: string;
  nivel: string;
  ciudad: string;
  idioma: string;
  cuota: string;
}

const VACIO: Filtros = { q: '', area: '', nivel: '', ciudad: '', idioma: '', cuota: '' };

// Color por familia académica. Texto charcoal encima (todas pasan AA).
const AREA_BG: Record<string, string> = {
  negocios: 'bg-mantequilla',
  'ciencias-ingenieria': 'bg-cielo',
  'sociales-humanidades': 'bg-menta',
  'diseno-creativo': 'bg-melocoton',
};
const bgArea = (area: string) => AREA_BG[area] ?? 'bg-lavanda';

// Lee los filtros de la URL (para que cada combinación sea compartible).
function desdeUrl(): Filtros {
  if (typeof window === 'undefined') return { ...VACIO };
  const p = new URLSearchParams(window.location.search);
  return {
    q: p.get('q') ?? '',
    area: p.get('area') ?? '',
    nivel: p.get('nivel') ?? '',
    ciudad: p.get('ciudad') ?? '',
    idioma: p.get('idioma') ?? '',
    cuota: p.get('cuota') ?? '',
  };
}

function normaliza(s: string): string {
  return s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

function opciones(grados: GradoIndice[], clave: 'area' | 'nivel' | 'ciudad' | 'idioma') {
  const mapa = new Map<string, string>();
  for (const g of grados) {
    const valor = g[clave];
    if (!valor) continue;
    const etiqueta =
      clave === 'area' ? g.areaEtiqueta : clave === 'nivel' ? g.nivelEtiqueta : valor;
    mapa.set(valor, etiqueta);
  }
  return [...mapa.entries()].sort((a, b) => a[1].localeCompare(b[1], 'es'));
}

export default function BuscadorGrados({ grados }: Props) {
  const [filtros, setFiltros] = useState<Filtros>(() => desdeUrl());

  // Sincroniza la URL sin recargar.
  useEffect(() => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(filtros)) if (v) p.set(k, v);
    const qs = p.toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    window.history.replaceState(null, '', url);
  }, [filtros]);

  // Soporta atrás/adelante del navegador.
  useEffect(() => {
    const onPop = () => setFiltros(desdeUrl());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const areas = useMemo(() => opciones(grados, 'area'), [grados]);
  const niveles = useMemo(() => opciones(grados, 'nivel'), [grados]);
  const ciudades = useMemo(() => opciones(grados, 'ciudad'), [grados]);
  const idiomas = useMemo(() => opciones(grados, 'idioma'), [grados]);
  const cuotas = useMemo(
    () => [...new Set(grados.map((g) => g.cuota).filter((c): c is number => c != null))].sort(),
    [grados],
  );

  const resultados = useMemo(() => {
    const q = normaliza(filtros.q.trim());
    return grados.filter((g) => {
      if (filtros.area && g.area !== filtros.area) return false;
      if (filtros.nivel && g.nivel !== filtros.nivel) return false;
      if (filtros.ciudad && g.ciudad !== filtros.ciudad) return false;
      if (filtros.idioma && g.idioma !== filtros.idioma) return false;
      if (filtros.cuota && String(g.cuota ?? '') !== filtros.cuota) return false;
      if (q) {
        const heno = normaliza(`${g.nombre} ${g.descripcion} ${g.areaEtiqueta}`);
        if (!heno.includes(q)) return false;
      }
      return true;
    });
  }, [grados, filtros]);

  const set = (clave: keyof Filtros) => (e: Event) =>
    setFiltros((f) => ({ ...f, [clave]: (e.target as HTMLInputElement | HTMLSelectElement).value }));

  const hayFiltros = Object.values(filtros).some(Boolean);

  const selectClase =
    'min-h-[44px] rounded-full border border-navy/15 bg-papel px-5 py-2.5 text-sm font-bold text-navy focus-visible:outline-none';

  // Chip de área. Activo: azul de acción; inactivo: contorno.
  const pill = (activo: boolean) => (activo ? 'chip chip-activo' : 'chip');

  return (
    <div>
      {/* Búsqueda + pills de área (filtro principal, visual y redondeado) */}
      <div class="rounded-tarjeta border border-hairline bg-papel p-5 sm:p-7">
        <label class="block">
          <span class="etiqueta-suelta mb-2 block text-slate">Buscar</span>
          <input
            type="search"
            value={filtros.q}
            onInput={set('q')}
            placeholder="Nombre del grado, palabra clave…"
            class="w-full rounded-full border border-hairline bg-crema px-6 py-3.5 text-navy placeholder:text-slate-400 focus-visible:border-azul focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul/25"
            aria-label="Buscar grados"
          />
        </label>

        <div class="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por área">
          <button
            type="button"
            onClick={() => setFiltros((f) => ({ ...f, area: '' }))}
            aria-pressed={!filtros.area}
            class={!filtros.area ? 'chip chip-activo' : 'chip'}
          >
            Todas
          </button>
          {areas.map(([v, t]) => (
            <button
              type="button"
              onClick={() => setFiltros((f) => ({ ...f, area: f.area === v ? '' : v }))}
              aria-pressed={filtros.area === v}
              class={pill(filtros.area === v)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Refinar: filtros secundarios, discretos */}
        {(niveles.length > 1 || ciudades.length > 0 || idiomas.length > 1 || cuotas.length > 0) && (
          <div class="mt-5 flex flex-wrap items-center gap-2 border-t border-hairline pt-5">
            <span class="etiqueta-suelta mr-1 text-slate">Refinar</span>
            {niveles.length > 1 && (
              <select value={filtros.nivel} onChange={set('nivel')} class={selectClase} aria-label="Nivel">
                <option value="">Cualquier nivel</option>
                {niveles.map(([v, t]) => (<option value={v}>{t}</option>))}
              </select>
            )}
            {ciudades.length > 0 && (
              <select value={filtros.ciudad} onChange={set('ciudad')} class={selectClase} aria-label="Ciudad">
                <option value="">Cualquier ciudad</option>
                {ciudades.map(([v, t]) => (<option value={v}>{t}</option>))}
              </select>
            )}
            {idiomas.length > 1 && (
              <select value={filtros.idioma} onChange={set('idioma')} class={selectClase} aria-label="Idioma">
                <option value="">Cualquier idioma</option>
                {idiomas.map(([v, t]) => (<option value={v}>{t}</option>))}
              </select>
            )}
            {cuotas.length > 0 && (
              <select value={filtros.cuota} onChange={set('cuota')} class={selectClase} aria-label="Cuota">
                <option value="">Cualquier cuota</option>
                {cuotas.map((c) => (<option value={String(c)}>Cuota {c}</option>))}
              </select>
            )}
          </div>
        )}

        <div class="mt-5 flex items-center justify-between border-t border-hairline pt-5">
          <p class="tabular text-sm font-extrabold text-navy" aria-live="polite">
            {resultados.length} {resultados.length === 1 ? 'grado' : 'grados'}
          </p>
          {hayFiltros && (
            <button
              type="button"
              onClick={() => setFiltros({ ...VACIO })}
              class="text-sm font-bold text-azul underline underline-offset-2 hover:text-azul-700"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <h2 class="sr-only">Resultados</h2>
      <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resultados.map((g) => (
          <li>
            <a href={g.url} class={`tarjeta-color group ${bgArea(g.area)}`}>
              <span class="pastilla">{g.areaEtiqueta}</span>
              <h3 class="mt-3 font-display text-lg font-extrabold leading-tight tracking-[-0.015em] text-navy">{g.nombre}</h3>
              <p class="dato mt-auto pt-6 text-sm text-navy/65">
                {g.nivelEtiqueta} · {g.duracion} · {g.ects} ECTS
              </p>
              <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-azul">
                Ver grado
                <span class="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      {resultados.length === 0 && (
        <p class="mt-8 rounded-tarjeta border border-hairline bg-papel p-10 text-center text-slate">
          No hay grados con esos filtros. Prueba a quitar alguno.
        </p>
      )}
    </div>
  );
}

import { useState } from 'react';
import { imageUrl, sides, type Side } from '../lib/diferencias';
import s from './Compare.module.css';

type Env = 'web' | 'dev';

function Stage({ side, label }: { side: Side; label: string }) {
  const url = side.kind === 'capture' ? imageUrl(side.image) : undefined;
  return (
    <div className={s.stage}>
      {side.kind === 'capture' && url && (
        <div className={s.frame}>
          <img src={url} alt={side.caption} className={s.img} />
          {side.highlights.map((h, i) => (
            <span
              key={i}
              className={s.mark}
              style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
              aria-hidden="true"
            />
          ))}
        </div>
      )}
      {side.kind === 'capture' && !url && <p className={s.empty}>No se encontró la imagen {side.image}.</p>}
      {side.kind === 'pending' && (
        <div className={`${s.placeholder} ${s.pending}`}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
          <strong>Captura pendiente</strong>
        </div>
      )}
      {side.kind === 'missing' && (
        <div className={`${s.placeholder} ${s.missing}`}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="3" strokeDasharray="3 3" />
            <path d="m9 9 6 6M15 9l-6 6" />
          </svg>
          <strong>No existe en {label}</strong>
        </div>
      )}
      {side.kind === 'na' && (
        <div className={`${s.placeholder} ${s.na}`}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="8" />
            <path d="m6.5 17.5 11-11" />
          </svg>
          <strong>No aplica</strong>
        </div>
      )}
      {side.kind === 'code' && <pre className={s.code}>{side.code}</pre>}
    </div>
  );
}

const hasMarks = (x?: Side) => x?.kind === 'capture' && x.highlights.length > 0;

export default function Compare({ figma, web, dev }: { figma: Side; web: Side; dev?: Side }) {
  // Si producción no tiene captura y dev sí, se abre en dev.
  const [env, setEnv] = useState<Env>(dev && web.kind !== 'capture' && dev.kind === 'capture' ? 'dev' : 'web');
  const right = env === 'dev' && dev ? dev : web;
  const meta = env === 'dev' && sides.dev ? sides.dev : sides.web;

  return (
    <section aria-label="Comparación Figma y web">
      <div className={s.grid}>
        <figure className={`${s.panel} ${s.figma}`}>
          <header className={s.panelHead}>
            <span className={s.label}>{sides.figma.label}</span>
            {(figma.sublabel ?? sides.figma.sublabel) && <span className={s.sublabel}>{figma.sublabel ?? sides.figma.sublabel}</span>}
          </header>
          <Stage side={figma} label={sides.figma.label} />
          <figcaption className={s.caption}>{figma.caption}</figcaption>
        </figure>

        <figure className={`${s.panel} ${s.web}`}>
          <header className={s.panelHead}>
            <span className={s.label}>{meta.label}</span>
            {(right.sublabel ?? meta.sublabel) && <span className={s.sublabel}>{right.sublabel ?? meta.sublabel}</span>}
            {dev && sides.dev && (
              <span className={s.switch} role="group" aria-label="Fuente web">
                {(['web', 'dev'] as Env[]).map((e) => (
                  <button
                    key={e}
                    type="button"
                    className={`${s.switchBtn} ${env === e ? s.switchOn : ''}`}
                    aria-pressed={env === e}
                    onClick={() => setEnv(e)}
                  >
                    {e === 'web' ? sides.web.sublabel || 'Producción' : 'Dev'}
                  </button>
                ))}
              </span>
            )}
          </header>
          <Stage side={right} label={meta.label} />
          <figcaption className={s.caption}>{right.caption}</figcaption>
        </figure>
      </div>
      {(hasMarks(figma) || hasMarks(right)) && (
        <p className={s.legend}>
          <span className={s.legendMark} aria-hidden="true" /> Zona de la diferencia
        </p>
      )}
    </section>
  );
}

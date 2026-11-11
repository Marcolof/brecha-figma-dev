import { Link, useParams } from 'react-router-dom';
import Compare from '../components/Compare';
import { docRoute, docTitle, texts } from '../lib/content';
import {
  categoryById,
  diffRoute,
  itemById,
  itemsOf,
  severityLabel,
  sides,
  statusLabel,
} from '../lib/diferencias';
import NotFound from './NotFound';
import s from './Diff.module.css';

const COLOR = /#[0-9a-f]{6}\b|rgba?\([^)]*\)/i;

function Value({ v }: { v: string }) {
  const c = v.match(COLOR)?.[0];
  return (
    <span className={s.value}>
      {c && <span className={s.swatch} style={{ background: c }} aria-hidden="true" />}
      {v}
    </span>
  );
}

export default function DiffDetail() {
  const { tab = '', id = '' } = useParams();
  const cat = categoryById(tab);
  const it = itemById(tab, id);
  if (!cat || !it) return <NotFound />;

  const hasDev = it.values.some((v) => v.dev);
  const list = itemsOf(cat.id);
  const idx = list.findIndex((x) => x.id === it.id);
  const prev = list[idx - 1];
  const next = list[idx + 1];

  return (
    <>
      <nav className={s.crumbs} aria-label="Ruta">
        <Link to={diffRoute(cat.id)}>Diferencias</Link>
        <span aria-hidden="true">/</span>
        <Link to={diffRoute(cat.id)}>{cat.title}</Link>
        <span aria-hidden="true">/</span>
        <span>{it.group}</span>
      </nav>

      <header className={s.detailHead}>
        {it.code && <p className={s.codeLine}>{it.code}</p>}
        <h1 className={s.title}>{it.title}</h1>
        <p className={s.lead}>{it.summary}</p>
        <span className={s.tags}>
          {it.severity && <span className={`${s.tag} ${s['sev_' + it.severity]}`}>Impacto {severityLabel[it.severity].toLowerCase()}</span>}
          <span className={`${s.tag} ${s['st_' + it.status]}`}>{statusLabel[it.status]}</span>
        </span>
      </header>

      <Compare key={it.id} figma={it.figma} web={it.web} dev={it.dev} />

      <section className={s.detailBody}>
        <h2 className={s.h2}>Detalle</h2>
        {it.details.map((p, i) => (
          <p key={i} className={s.p}>
            {p}
          </p>
        ))}

        {it.devNote && (
          <p className={`${s.p} ${s.devNote}`}>
            <strong>En {sides.dev?.label ?? 'dev'}:</strong> {it.devNote}
          </p>
        )}

        {it.values.length > 0 && (
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th scope="col">Propiedad</th>
                  <th scope="col">{sides.figma.label}</th>
                  <th scope="col">
                    {sides.web.label} {sides.web.sublabel && <span className={s.thSub}>{sides.web.sublabel}</span>}
                  </th>
                  {hasDev && (
                    <th scope="col">
                      {sides.dev?.label} <span className={s.thSub}>{sides.dev?.sublabel}</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {it.values.map((v) => (
                  <tr key={v.prop}>
                    <th scope="row">{v.prop}</th>
                    <td>
                      <Value v={v.figma} />
                    </td>
                    <td>
                      <Value v={v.web} />
                    </td>
                    {hasDev && <td>{v.dev ? <Value v={v.dev} /> : <span className={s.na}>—</span>}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {it.decision && (
          <div className={s.decision}>
            <strong>Decisión y estado</strong>
            <p>{it.decision}</p>
          </div>
        )}

        {it.sourceNote && <p className={s.sources}>Fuente: {it.sourceNote}</p>}

        {it.sources.length > 0 && (
          <p className={s.sources}>
            Fuente:{' '}
            {it.sources.map((p, i) => (
              <span key={p}>
                {i > 0 && ' · '}
                {p in texts ? <Link to={docRoute(p)}>{docTitle(p)}</Link> : p}
              </span>
            ))}
          </p>
        )}
      </section>

      <nav className={s.pager} aria-label="Otras diferencias">
        {prev ? (
          <Link to={diffRoute(cat.id, prev.id)} className={s.pagerLink}>
            <span className={s.pagerHint}>← Anterior</span>
            <span>{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={diffRoute(cat.id, next.id)} className={`${s.pagerLink} ${s.pagerNext}`}>
            <span className={s.pagerHint}>Siguiente →</span>
            <span>{next.title}</span>
          </Link>
        )}
      </nav>
    </>
  );
}

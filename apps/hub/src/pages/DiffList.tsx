import { Link, NavLink, Navigate, useParams } from 'react-router-dom';
import {
  categories,
  categoryById,
  diffRoute,
  groupItems,
  itemsOf,
  severityLabel,
  statusLabel,
} from '../lib/diferencias';
import { formatDate, syncedAt } from '../lib/content';
import BackTitle from '../components/BackTitle';
import s from './Diff.module.css';

export default function DiffList() {
  const { tab = '' } = useParams();
  const cat = categoryById(tab);
  if (!cat) return categories[0] ? <Navigate to={diffRoute(categories[0].id)} replace /> : null;

  const items = itemsOf(cat.id);
  const open = items.filter((i) => i.status === 'abierta').length;
  const toConfirm = items.filter((i) => i.status === 'a-confirmar').length;
  const solved = items.filter((i) => i.status === 'resuelta').length;
  const figma = items.filter((i) => i.status === 'cambio-figma').length;
  const watch = items.filter((i) => i.status === 'en-observacion').length;
  const devs = items.filter((i) => i.status === 'cambio-dev').length;
  const define = items.filter((i) => i.status === 'a-definir').length;

  return (
    <>
      <header className={s.intro}>
        <BackTitle title="Diferencias Figma ↔ Web" className={s.title} />
        <p className={s.lead}>
          Qué se ve o funciona distinto entre Figma (Design System y Mi Correo 2.0) y la web de MiCorreo (producción y entorno dev). Contenido al{' '}
          {formatDate(syncedAt)}.
        </p>
      </header>

      <nav className={s.tabs} aria-label="Tipos de diferencia">
        {categories.map((c) => {
          const n = itemsOf(c.id).length;
          return (
            <NavLink key={c.id} to={diffRoute(c.id)} className={({ isActive }) => `${s.tab} ${isActive ? s.tabActive : ''}`}>
              {c.title}
              {c.status === 'pendiente' ? (
                <span className={`${s.count} ${s.countPending}`}>Pendiente</span>
              ) : (
                <span className={s.count}>{n}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <section className={s.tabPanel}>
        <p className={s.catDesc}>{cat.description}</p>

        {cat.status === 'pendiente' || items.length === 0 ? (
          <div className={s.emptyState}>
            <strong>Todavía no hay diferencias relevadas</strong>
            <p>{cat.note}</p>
          </div>
        ) : (
          <>
            <p className={s.summaryLine}>
              {items.length} {items.length === 1 ? 'elemento' : 'elementos'} · <strong>{open} {open === 1 ? 'abierto' : 'abiertos'}</strong>
              {toConfirm > 0 && <> · {toConfirm} a confirmar</>}
              {figma > 0 && <> · {figma} con cambio pendiente en Figma</>}
              {devs > 0 && <> · {devs} con cambio pendiente en DEV</>}
              {define > 0 && <> · {define} pendientes de definición</>}
              {watch > 0 && <> · {watch} en observación</>}
              {solved > 0 && <> · {solved} {solved === 1 ? 'resuelto' : 'resueltos'} en Figma</>}.{' '}
              <span className={s.muted}>{cat.note}</span>
            </p>
            {groupItems(items).map((g) => (
              <section key={g.group} className={s.group}>
                <h2 className={s.groupTitle}>{g.group}</h2>
                <ul className={s.list}>
                  {g.items.map((it) => (
                    <li key={it.id}>
                      <Link to={diffRoute(cat.id, it.id)} className={s.row}>
                        <span className={s.rowBody}>
                          <span className={s.rowTitle}>
                            {it.num && <span className={s.num}>{it.num}</span>}
                            {it.code && <span className={s.code}>{it.code}</span>}
                            {it.title}
                          </span>
                          <span className={s.rowDesc}>{it.summary}</span>
                          <span className={s.tags}>
                            {it.severity && <span className={`${s.tag} ${s['sev_' + it.severity]}`}>Impacto {severityLabel[it.severity].toLowerCase()}</span>}
                            <span className={`${s.tag} ${s['st_' + it.status]}`}>{statusLabel[it.status]}</span>
                            {it.owners?.map((o) => (
                              <span key={o} className={`${s.tag} ${s.owner}`}>{o}</span>
                            ))}
                          </span>
                        </span>
                        <svg className={s.chevron} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m9 6 6 6-6 6" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </>
        )}
      </section>
    </>
  );
}

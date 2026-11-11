import { Link, useParams } from 'react-router-dom';
import StatusTag from '../components/StatusTag';
import { docRoute, docStatus, docTitle, downloadText, moduleById } from '../lib/content';
import NotFound from './NotFound';
import s from './Page.module.css';

export default function ModulePage() {
  const { moduleId = '' } = useParams();
  const mod = moduleById(moduleId);
  if (!mod) return <NotFound />;

  return (
    <>
      <nav className={s.back}>
        <Link to="/">← Volver al Hub</Link>
      </nav>

      <header className={s.head}>
        <h1 className={s.title}>{mod.title}</h1>
        <p className={s.lead}>{mod.description}</p>
        <StatusTag status={mod.status} />
      </header>

      <ul className={s.list}>
        {mod.docs.map((p) => {
          const st = docStatus(p);
          return (
            <li key={p}>
              <Link to={docRoute(p)} className={s.row}>
                <span className={s.rowTitle}>{docTitle(p)}</span>
                {st && <StatusTag status={st} />}
                <span className={s.rowPath}>{p}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {mod.downloads && mod.downloads.length > 0 && (
        <section className={s.downloads}>
          <h2 className={s.h2}>Archivos para desarrollo</h2>
          <div className={s.dlRow}>
            {mod.downloads.map((d) => (
              <button key={d.path} type="button" className={s.dl} onClick={() => downloadText(d.path)}>
                ↓ {d.label}
              </button>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

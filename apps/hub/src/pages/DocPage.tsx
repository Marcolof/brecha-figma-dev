import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Markdown from '../components/Markdown';
import { docRoute, docTitle, moduleOfDoc, pathFromRoute, texts } from '../lib/content';
import NotFound from './NotFound';
import s from './Page.module.css';

export default function DocPage() {
  const { '*': splat = '' } = useParams();
  const { hash } = useLocation();
  const path = pathFromRoute(splat);
  const mod = moduleOfDoc(path);

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    el?.scrollIntoView();
  }, [path, hash]);

  if (!(path in texts)) return <NotFound />;

  const i = mod ? mod.docs.indexOf(path) : -1;
  const prev = mod && i > 0 ? mod.docs[i - 1] : null;
  const next = mod && i >= 0 && i < mod.docs.length - 1 ? mod.docs[i + 1] : null;

  return (
    <>
      <nav className={s.crumbs} aria-label="Ruta">
        <Link to="/">Hub</Link>
        {mod && (
          <>
            <span aria-hidden="true">/</span>
            <Link to={`/m/${mod.id}`}>{mod.title}</Link>
          </>
        )}
        <span aria-hidden="true">/</span>
        <span className={s.current}>{docTitle(path)}</span>
      </nav>

      <article className={s.doc}>
        <Markdown path={path} />
      </article>

      <nav className={s.pager} aria-label="Documentos del módulo">
        {prev ? (
          <Link to={docRoute(prev)} className={s.pagerLink}>
            <span className={s.pagerLabel}>← Anterior</span>
            {docTitle(prev)}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={docRoute(next)} className={`${s.pagerLink} ${s.pagerNext}`}>
            <span className={s.pagerLabel}>Siguiente →</span>
            {docTitle(next)}
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <p className={s.backBottom}>
        <Link to={mod ? `/m/${mod.id}` : '/'}>← Volver a {mod ? mod.title : 'el Hub'}</Link>
      </p>
    </>
  );
}

import type { ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { project } from '../hub.config';
import s from './Layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const inDocs = /^\/(documentacion|m|doc)(\/|$)/.test(pathname);
  return (
    <div className={s.shell}>
      <header className={s.header}>
        <div className={s.headerInner}>
          <Link to="/" className={s.brand} aria-label="Ir a las diferencias">
            <span className={s.mark} aria-hidden="true" />
            <span>
              <span className={s.name}>{project.name}</span>
              <span className={s.client}>{project.client}</span>
            </span>
          </Link>
          <nav className={s.nav} aria-label="Secciones">
            <NavLink to="/diferencias/componentes" className={() => `${s.navLink} ${!inDocs ? s.navActive : ''}`} aria-current={!inDocs ? 'page' : undefined}>
              Diferencias
            </NavLink>
            <NavLink to="/documentacion" className={() => `${s.navLink} ${inDocs ? s.navActive : ''}`} aria-current={inDocs ? 'page' : undefined}>
              Documentación
            </NavLink>
          </nav>
        </div>
      </header>
      <main className={s.main}>{children}</main>
    </div>
  );
}

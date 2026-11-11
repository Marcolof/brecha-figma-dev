import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { project } from '../hub.config';
import s from './Layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={s.shell}>
      <header className={s.header}>
        <div className={s.headerInner}>
          <Link to="/" className={s.brand} aria-label="Ir al Hub">
            <span className={s.mark} aria-hidden="true" />
            <span>
              <span className={s.name}>{project.name}</span>
              <span className={s.client}>{project.client}</span>
            </span>
          </Link>
        </div>
      </header>
      <main className={s.main}>{children}</main>
    </div>
  );
}

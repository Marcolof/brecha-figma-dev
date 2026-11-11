import { Link } from 'react-router-dom';
import s from './BackTitle.module.css';

// Título de sección con la flecha para volver al Hub.
export default function BackTitle({ title, className }: { title: string; className?: string }) {
  return (
    <h1 className={`${s.wrap} ${className ?? ''}`}>
      <Link to="/" className={s.back} aria-label="Volver al Hub" title="Volver al Hub">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
      </Link>
      <span>{title}</span>
    </h1>
  );
}

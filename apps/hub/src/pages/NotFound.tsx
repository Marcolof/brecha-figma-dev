import { Link } from 'react-router-dom';
import s from './Page.module.css';

export default function NotFound() {
  return (
    <div className={s.head}>
      <h1 className={s.title}>No encontramos esta página</h1>
      <p className={s.lead}>Puede que el documento se haya movido o todavía no esté sincronizado.</p>
      <Link to="/">← Volver al Hub</Link>
    </div>
  );
}

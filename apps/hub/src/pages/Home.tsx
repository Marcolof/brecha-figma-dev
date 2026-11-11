import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import StatusTag from '../components/StatusTag';
import { hubModules, project } from '../hub.config';
import { formatDate, syncedAt } from '../lib/content';
import BackTitle from '../components/BackTitle';
import s from './Home.module.css';

export default function Home() {
  return (
    <>
      <section className={s.intro}>
        <BackTitle title="Documentación" className={s.title} />
        <p className={s.version}>
          Informes completos de la auditoría, planes y handoff · versión <strong>{project.version}</strong> · contenido al {formatDate(syncedAt)}
        </p>
      </section>

      <ul className={s.grid}>
        {hubModules.map((m) => (
          <li key={m.id}>
            <Link to={`/m/${m.id}`} className={s.card}>
              <span className={s.icon}>
                <Icon name={m.icon} />
              </span>
              <span className={s.cardTitle}>{m.title}</span>
              <span className={s.cardDesc}>{m.description}</span>
              <StatusTag status={m.status} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import StatusTag from '../components/StatusTag';
import { hubModules, project, type IconName } from '../hub.config';
import { formatDate, syncedAt } from '../lib/content';
import { categories, diffRoute, itemsOf } from '../lib/diferencias';
import s from './Home.module.css';

interface HubCard {
  to: string;
  icon: IconName;
  title: string;
  description: string;
  status: string;
}

export default function Hub() {
  const total = categories.reduce((n, c) => n + itemsOf(c.id).length, 0);
  const docs = hubModules.reduce((n, m) => n + m.docs.length, 0);

  const cards: HubCard[] = [
    {
      to: diffRoute(categories[0]?.id ?? 'componentes'),
      icon: 'diff',
      title: 'Diferencias',
      description: `${total} diferencias entre Figma y la web (producción y dev), con capturas lado a lado.`,
      status: 'En revisión',
    },
    {
      to: '/documentacion',
      icon: 'docs',
      title: 'Documentación',
      description: `${docs} documentos: auditoría, planes, tareas de Figma y handoff para desarrollo.`,
      status: 'En revisión',
    },
  ];

  return (
    <>
      <section className={s.intro}>
        <h1 className={s.title}>{project.name}</h1>
        <p className={s.version}>
          {project.client} · versión <strong>{project.version}</strong> · contenido al {formatDate(syncedAt)}
        </p>
      </section>

      <ul className={s.grid}>
        {cards.map((c) => (
          <li key={c.to}>
            <Link to={c.to} className={s.card}>
              <span className={s.icon}>
                <Icon name={c.icon} />
              </span>
              <span className={s.cardTitle}>{c.title}</span>
              <span className={s.cardDesc}>{c.description}</span>
              <StatusTag status={c.status} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

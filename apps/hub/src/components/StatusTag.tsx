import { statusTone } from '../lib/content';
import s from './StatusTag.module.css';

export default function StatusTag({ status }: { status: string }) {
  return <span className={`${s.tag} ${s[statusTone(status)]}`}>{status}</span>;
}

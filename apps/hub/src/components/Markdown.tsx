import { Children, isValidElement, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { docRoute, downloadText, images, resolveRelative, texts } from '../lib/content';
import s from './Markdown.module.css';

const textOf = (node: ReactNode): string =>
  Children.toArray(node)
    .map((c) => (typeof c === 'string' || typeof c === 'number' ? String(c) : isValidElement(c) ? textOf(c.props.children) : ''))
    .join('');

const slug = (node: ReactNode) =>
  textOf(node)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);

/** Renderiza un documento del contenido resolviendo enlaces e imágenes relativos a su ruta. */
export default function Markdown({ path }: { path: string }) {
  const source = texts[path] ?? '';

  return (
    <div className={s.md}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => <h2 id={slug(children)}>{children}</h2>,
          h3: ({ children }) => <h3 id={slug(children)}>{children}</h3>,
          table: ({ children }) => (
            <div className={s.tableWrap} tabIndex={0}>
              <table>{children}</table>
            </div>
          ),
          img: ({ src = '', alt = '' }) => {
            const url = isExternal(src) ? src : images[resolveRelative(path, src)];
            return url ? <img src={url} alt={alt} loading="lazy" /> : <span className={s.missing}>[imagen no disponible: {alt || src}]</span>;
          },
          a: ({ href = '', children }) => {
            if (isExternal(href)) return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
            if (href.startsWith('#')) return <a href={href}>{children}</a>;
            const target = resolveRelative(path, href);
            const hash = href.includes('#') ? '#' + href.split('#')[1] : '';
            if (target.endsWith('.md') && target in texts) return <Link to={docRoute(target) + hash}>{children}</Link>;
            if (target in texts)
              return (
                <button type="button" className={s.linkButton} onClick={() => downloadText(target)} title={`Descargar ${target.split('/').pop()}`}>
                  {children}
                </button>
              );
            if (target in images) return <a href={images[target]} target="_blank" rel="noreferrer">{children}</a>;
            return <span className={s.offline} title="Este archivo no está publicado en el Hub">{children}</span>;
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}

import { useEffect, useRef, useMemo } from 'preact/hooks';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import 'katex/dist/katex.min.css';
import { writings, writingContent } from '../data/writings';

marked.use(markedKatex({ throwOnError: false }));

interface TocItem {
  level: number;
  text: string;
  id: string;
}

function toId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function extractToc(markdown: string): TocItem[] {
  return markdown
    .split('\n')
    .filter(line => /^#{2,3} /.test(line))
    .map(line => {
      const level = (line.match(/^#+/)?.[0].length ?? 2);
      const text = line.replace(/^#+\s+/, '');
      return { level, text, id: toId(text) };
    });
}

interface WritingPostProps {
  slug: string;
  onBack: () => void;
}

export function WritingPost({ slug, onBack }: WritingPostProps) {
  const writing = writings.find(w => w.slug === slug);
  const rawContent = writingContent[slug];
  const articleRef = useRef<HTMLElement>(null);

  const htmlContent = useMemo(() => {
    if (!rawContent) return '';
    return marked.parse(rawContent) as string;
  }, [rawContent]);

  const toc = useMemo(() => {
    if (!rawContent) return [];
    return extractToc(rawContent);
  }, [rawContent]);

  // Add IDs to headings after render
  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;
    el.querySelectorAll('h2, h3').forEach(heading => {
      const text = heading.textContent ?? '';
      heading.id = toId(text);
    });
  }, [htmlContent]);

  // Render any Mermaid diagrams. Script tags inside dangerouslySetInnerHTML
  // content never execute, so Mermaid is loaded and run here instead.
  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;
    const diagrams = el.querySelectorAll('pre.mermaid');
    if (diagrams.length === 0) return;

    const w = window as typeof window & { mermaid?: { initialize: (opts: object) => void; run: (opts: { nodes: NodeListOf<Element> }) => void } };

    const renderDiagrams = () => {
      w.mermaid?.initialize({ startOnLoad: false, theme: 'neutral' });
      w.mermaid?.run({ nodes: diagrams });
    };

    if (w.mermaid) {
      renderDiagrams();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    script.onload = renderDiagrams;
    document.head.appendChild(script);
  }, [htmlContent]);

  if (!writing || !rawContent) {
    return (
      <main className="layout-root">
        <div className="projects-collection-header">
          <button className="back-button" onClick={onBack} aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
          <h1>Writing not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="layout-root">
      <div className="writing-post-header">
        <button className="back-button" onClick={onBack} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>All Writings</span>
        </button>
        <div className="writing-post-meta">
          <span className="writing-post-date">{writing.date}</span>
        </div>
      </div>

      <div className="writing-post-layout">
        {toc.length > 0 && (
          <aside className="writing-toc">
            <p className="writing-toc-label">Contents</p>
            <nav>
              {toc.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`writing-toc-link writing-toc-link--h${item.level}`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </aside>
        )}

        <article
          ref={articleRef}
          className="writing-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </main>
  );
}

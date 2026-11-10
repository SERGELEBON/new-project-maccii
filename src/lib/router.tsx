'use client';

/* Routeur à base de hash + gestion de la langue (FR par défaut, /en pour l'anglais) */
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Lang = 'en' | 'fr';

interface RouterCtx {
  path: string;          // ex: "/services/agriculture"
  lang: Lang;
  setLang: (l: Lang) => void;
  navigate: (to: string) => void;
}

const Ctx = createContext<RouterCtx>({
  path: '/', lang: 'fr', setLang: () => {}, navigate: () => {},
});

function readHash(): { path: string; lang: Lang } {
  const h = window.location.hash.replace(/^#/, '') || '/';
  if (h.startsWith('/en')) {
    return { path: h.slice(3) || '/', lang: 'en' };
  }
  return { path: h, lang: 'fr' };
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ path: string; lang: Lang }>(() =>
    typeof window === 'undefined' ? { path: '/', lang: 'fr' as Lang } : readHash()
  );

  useEffect(() => {
    const onHash = () => setState(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((to: string) => {
    const { lang } = readHash();
    const prefix = lang === 'en' ? '/en' : '';
    window.location.hash = prefix + (to.startsWith('/') ? to : '/' + to);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const setLang = useCallback((l: Lang) => {
    const { path } = readHash();
    window.location.hash = l === 'en' ? '/en' + (path === '/' ? '/' : path) : path;
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Ctx.Provider value={{ path: state.path, lang: state.lang, setLang, navigate }}>
      {children}
    </Ctx.Provider>
  );
}

export const useRouter = () => useContext(Ctx);

/* Lien interne MAC.CII */
export function A({
  href,
  children,
  className,
  onClick,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const { navigate } = useRouter();
  const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  if (external) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      href={`#${href === '/' ? '/' : href}`}
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}

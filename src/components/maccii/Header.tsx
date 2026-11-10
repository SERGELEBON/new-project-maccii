'use client';

/* Icônes SVG inline (style Font Awesome) */
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, A } from '@/lib/router';
import { NAV_FR, NAV_EN, UI } from '@/data/maccii';

export const Icon = ({ name, className = 'w-4 h-4' }: { name: string; className?: string }) => {
  const paths: Record<string, React.ReactNode> = {
    facebook: <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />,
    x: <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />,
    instagram: <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />,
    linkedin: <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />,
    youtube: <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />,
    arrowRight: <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L354.7 240H64c-17.7 0-32 14.3-32 32s14.3 32 32 32h290.7L265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />,
    arrowLeft: <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L93.3 272H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H93.3l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />,
    chevronDown: <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />,
    heart: <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268.5 84.9L256 96.4l-12.5-11.5C211.4 51.4 165 36.5 119.4 44.1 50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />,
    phone: <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />,
    mapPin: <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />,
    envelope: <path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />,
  };
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
      {paths[name] || null}
    </svg>
  );
};

/* Icônes en trait (style lucide) pour services, valeurs et avantages */
export const StrokeIcon = ({ name, className = 'w-6 h-6' }: { name: string; className?: string }) => {
  const shapes: Record<string, React.ReactNode> = {
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
    health: <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" /></>,
    leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    home: <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></>,
    briefcase: <><rect width="20" height="14" x="2" y="7" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
    handshake: <path d="m11 17 2 2a1 1 0 1 0 3-3M14 14l2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4M21 3l1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8" />,
    award: <><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></>,
    target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
    heartStroke: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
    heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
    clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
    envelope: <><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
    mapPin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    star: <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />,
    quote: <><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" /><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" /></>,
    play: <path d="M6 4l14 8-14 8V4z" />,
    calendar: <><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    check: <path d="M20 6 9 17l-5-5" />,
  };
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {shapes[name] || null}
    </svg>
  );
};

/* ================= HEADER ================= */
export function Header() {
  const { path, lang, setLang } = useRouter();
  const nav = lang === 'fr' ? NAV_FR : NAV_EN;
  const t = UI[lang];
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const isActive = (item: { href: string }) =>
    path === item.href || (item.href !== '/' && item.href.length > 1 && path.startsWith(item.href));

  return (
    <header
      ref={ref}
      className={`sticky top-0 z-50 w-full bg-white transition-shadow ${scrolled ? 'shadow-[0_2px_16px_rgba(0,0,0,0.08)]' : ''}`}
      role="banner"
    >
      <div className="mx-auto max-w-[1400px] flex items-center justify-between px-5 lg:px-10 h-[72px]">
        {/* Logo */}
        <A href="/" ariaLabel="MAC.CII — Accueil" className="flex items-center shrink-0 gap-2">
          <img src="/images/logo-maccii.png" alt="MAC.CII — Organisation d'aide et de développement en Côte d'Ivoire" className="h-[46px] w-auto" />
        </A>

        {/* Nav desktop */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          {nav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.children ? item.label : null)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <A
                href={item.href}
                className={`flex items-center gap-1.5 px-3.5 py-3 text-[15px] font-semibold transition-colors ${
                  isActive(item) ? 'text-primary' : 'text-ink hover:text-primary'
                }`}
              >
                {item.label}
                {item.children && (
                  <Icon name="chevronDown" className="w-2.5 h-2.5 opacity-70" />
                )}
              </A>

              {/* Mega menu */}
              {item.children && openMenu === item.label && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[560px]">
                  <div className="bg-white rounded-2xl shadow-[0_16px_48px_rgba(124,58,237,0.16)] border border-[#eee] p-3 max-h-[75vh] overflow-y-auto no-scrollbar">
                    {item.children.map((child) => (
                      <A
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenMenu(null)}
                        className="group block px-4 py-3 rounded-xl hover:bg-[#f6f6f6] transition-colors"
                      >
                        <span className="block font-bold text-[15px] text-ink group-hover:text-primary">
                          {child.label}
                        </span>
                        {child.desc && (
                          <span className="mt-1 block text-[13px] leading-snug text-mgray">
                            {child.desc}
                          </span>
                        )}
                      </A>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Langue */}
          <div className="relative" onMouseEnter={() => setOpenMenu('__lang')} onMouseLeave={() => setOpenMenu(null)}>
            <button
              className="flex items-center gap-1.5 px-3 py-3 text-[15px] font-semibold text-ink hover:text-primary"
              aria-label="Language"
            >
              <svg className="w-4 h-4" viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="26"><circle cx="256" cy="256" r="230" /><path d="M256 26c-60 65-90 145-90 230s30 165 90 230c60-65 90-145 90-230s-30-165-90-230zM26 256h460" /></svg>
              {lang.toUpperCase()}
              <Icon name="chevronDown" className="w-2.5 h-2.5 opacity-70" />
            </button>
            {openMenu === '__lang' && (
              <div className="absolute right-0 top-full pt-1 w-[100px]">
                <div className="bg-white rounded-xl shadow-[0_16px_48px_rgba(124,58,237,0.16)] border border-[#eee] p-2">
                  <button
                    onClick={() => { setLang('fr'); setOpenMenu(null); }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-[14px] font-semibold hover:bg-[#f6f6f6] ${lang === 'fr' ? 'text-primary' : ''}`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => { setLang('en'); setOpenMenu(null); }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-[14px] font-semibold hover:bg-[#f6f6f6] ${lang === 'en' ? 'text-primary' : ''}`}
                  >
                    EN
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* CTA + burger */}
        <div className="flex items-center gap-3">
          <A href="/volunteer" className="btn-maccii hidden md:inline-flex !py-2.5 !px-6 !text-[15px]">
            {t.howToSupport}
          </A>
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-[3px] bg-primary rounded transition-transform ${mobileOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <span className={`block w-6 h-[3px] bg-primary rounded transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[3px] bg-primary rounded transition-transform ${mobileOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>
          <button
            className="hidden lg:flex flex-col gap-[5px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu étendu"
          >
            <span className="block w-7 h-[3px] bg-primary rounded" />
            <span className="block w-7 h-[3px] bg-primary rounded" />
            <span className="block w-7 h-[3px] bg-primary rounded" />
          </button>
        </div>
      </div>

      {/* Menu mobile / overlay */}
      {mobileOpen && (
        <div className="border-t border-[#eee] bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-6 py-4">
            {nav.map((item) => (
              <div key={item.label} className="border-b border-[#f0f0f0]">
                <button
                  className="w-full flex items-center justify-between py-4 font-bold text-[17px] text-primary"
                  onClick={() => {
                    if (item.children) setMobileSub(mobileSub === item.label ? null : item.label);
                    else { setMobileOpen(false); window.location.hash = item.href; }
                  }}
                >
                  {item.label}
                  {item.children && <Icon name="chevronDown" className={`w-3 h-3 transition-transform ${mobileSub === item.label ? 'rotate-180' : ''}`} />}
                </button>
                {item.children && mobileSub === item.label && (
                  <div className="pb-4 pl-3">
                    {item.children.map((c) => (
                      <A key={c.href} href={c.href} onClick={() => setMobileOpen(false)} className="block py-2 font-semibold text-[15px] text-ink">
                        {c.label}
                      </A>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-4 py-4">
              <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="font-bold text-primary">
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>
              <A href="/volunteer" onClick={() => setMobileOpen(false)} className="btn-maccii !py-2 !px-5">
                {t.howToSupport}
              </A>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* Onglet flottant « Faire un don » à droite */
export function DonateTab() {
  const t = UI[useRouter().lang];
  return (
    <A href="/contact" className="donate-tab" ariaLabel={t.donate}>
      <Icon name="heart" className="w-3.5 h-3.5 rotate-90 mb-2" />
      {t.donate}
    </A>
  );
}

'use client';

/* Sections réutilisables — même design, contenu MAC.CII */
import React from 'react';
import { useRouter, A } from '@/lib/router';
import { UI, getServices } from '@/data/maccii';
import { Icon, StrokeIcon } from './Header';

/* Image avec repli élégant si elle n'a pas pu être chargée */
export function Img({
  src,
  alt,
  className,
  style,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={src || '/images/placeholder.svg'}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      onError={(e) => {
        const el = e.currentTarget;
        if (!el.src.endsWith('/images/placeholder.svg')) {
          el.src = '/images/placeholder.svg';
        }
      }}
    />
  );
}

/* ================= HERO DE PAGE INTERNE ================= */
export function PageHero({
  title,
  subtitle,
  image,
  breadcrumb,
  children,
}: {
  title: string;
  subtitle?: string;
  image?: string | null;
  breadcrumb?: string[];
  children?: React.ReactNode;
}) {
  const [imgOk, setImgOk] = React.useState(true);
  React.useEffect(() => setImgOk(true), [image]);
  return (
    <section className="relative bg-primary-deep text-white overflow-hidden">
      {image && imgOk && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-40"
            onError={() => setImgOk(false)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/90 via-primary-deep/70 to-primary/40" />
        </div>
      )}
      {/* bande décorative */}
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-primary via-rose to-gold" />
      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10 pt-16 pb-14">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-2 text-[13px] text-white/70 mb-5" aria-label="Breadcrumb">
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="opacity-50">›</span>}
                <span>{b}</span>
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-[38px] md:text-[52px] leading-[1.08] font-bold max-w-3xl t-fade-up">{title}</h1>
        {subtitle && <p className="mt-5 text-[19px] leading-relaxed text-white/90 max-w-2xl">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}

/* ================= CTA BANDEAU PHOTO ================= */
export function CtaBanner({
  title,
  button,
  image,
  href,
}: {
  title: string;
  button: string;
  image?: string | null;
  href?: string;
}) {
  const { lang } = useRouter();
  const t = UI[lang];
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="relative rounded-3xl overflow-hidden min-h-[260px] flex items-center">
          <Img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary-deep/75" />
          <div className="relative z-10 px-8 md:px-14 py-12 flex flex-col md:flex-row md:items-center gap-8 w-full justify-between">
            <h2 className="text-[26px] md:text-[34px] font-bold text-white leading-tight max-w-2xl">{title}</h2>
            <A href={href || '/volunteer'} className="btn-maccii shrink-0">
              {button || t.readMore}
              <Icon name="arrowRight" className="w-4 h-4" />
            </A>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= GRILLE DE STATS ================= */
export function StatsGrid({ stats }: { stats: { n: string; label: string }[] }) {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-mlight rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <p className="text-[44px] font-extrabold text-primary leading-none">{s.n}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= ARTICLE / PROGRAMME CARD ================= */
export function ArticleCard({
  title,
  image,
  href,
  showButton = true,
}: {
  title: string;
  image?: string | null;
  href: string;
  showButton?: boolean;
}) {
  const { lang } = useRouter();
  const t = UI[lang];
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col hover:shadow-[0_10px_36px_rgba(0,0,0,0.12)] transition-shadow">
      <A href={href} className="block">
        <Img src={image} alt={title} className="w-full h-[210px] object-cover" />
      </A>
      <div className="p-6 flex flex-col grow">
        <h3 className="text-[18px] font-bold text-ink leading-snug">
          <A href={href} className="hover:text-primary">{title}</A>
        </h3>
        {showButton && (
          <div className="mt-auto pt-5">
            <A href={href} className="btn-maccii !text-[14px] !py-2.5 !px-5">
              {t.readMore}
              <span className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center">
                <Icon name="arrowRight" className="w-3 h-3" />
              </span>
            </A>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= BOUTON PILULE ================= */
export function PillButton({
  label,
  href,
  variant = 'violet',
  withArrow = true,
}: {
  label: string;
  href: string;
  variant?: 'violet' | 'deep' | 'outline';
  withArrow?: boolean;
}) {
  const styles =
    variant === 'deep'
      ? 'bg-primary-deep text-white hover:bg-primary-dark'
      : variant === 'outline'
      ? 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white'
      : 'bg-primary text-white hover:bg-primary-dark';
  return (
    <A href={href} className={`inline-flex items-center gap-2 font-bold text-[15px] px-6 py-3 rounded-full transition-all ${styles}`}>
      {label}
      {withArrow && (
        <span className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center">
          <Icon name="arrowRight" className="w-3 h-3" />
        </span>
      )}
    </A>
  );
}

/* ================= ACCORDÉON FAQ ================= */
export function FaqAccordion({ title, items }: { title: string; items: { q: string; a: string }[] }) {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section className="py-14 bg-mlight">
      <div className="mx-auto max-w-[900px] px-5 lg:px-10">
        <h2 className="text-[28px] font-bold text-primary mb-8">{title}</h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-[15.5px] text-primary"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.q}
                <Icon name="chevronDown" className={`w-3.5 h-3.5 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-[14.5px] text-mgray leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= CARTE AVEC ICÔNE (valeurs, avantages) ================= */
export function IconCards({ items }: { items: { icon: string; title: string; text: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((v, i) => (
        <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-line/60">
          <span className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
            <StrokeIcon name={v.icon} className="w-7 h-7" />
          </span>
          <h3 className="text-[19px] font-bold text-ink">{v.title}</h3>
          <p className="mt-3 text-[14.5px] leading-relaxed text-mgray">{v.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ================= CARTES « RELATED » (autres services) ================= */
export function RelatedServices({ excludeSlug }: { excludeSlug?: string }) {
  const { lang } = useRouter();
  const t = UI[lang];
  const items = getServices(lang).filter((s) => s.slug !== excludeSlug).slice(0, 4);
  if (!items.length) return null;
  return (
    <section className="py-14 bg-mlight">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <h3 className="text-[15px] font-bold tracking-widest uppercase text-primary mb-8">
          {lang === 'fr' ? 'Nos autres actions' : 'Our other actions'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((s) => (
            <A
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative rounded-2xl overflow-hidden h-[220px] block"
            >
              <Img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 via-primary-deep/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-bold text-[20px]">{s.title}</p>
              </div>
            </A>
          ))}
        </div>
        <div className="mt-8 text-center">
          <PillButton label={t.discoverActions} href="/services" />
        </div>
      </div>
    </section>
  );
}

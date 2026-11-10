'use client';

/* Page d'accueil MAC.CII — design textuel reproduit fidèlement de https://tostan.org/
   (mêmes sections, mêmes motifs), contenu selon https://ongmaccii.vercel.app/ */
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, A } from '@/lib/router';
import { HOME_FR, HOME_EN, UI } from '@/data/maccii';
import { Icon } from './Header';
import { Img, ArticleCard, PillButton } from './sections';

function useCarousel(length: number) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const next = () => setIdx((i) => (i + 1) % length);
  const prev = () => setIdx((i) => (i - 1 + length) % length);
  useEffect(() => {
    if (length <= 1) return;
    timer.current = setInterval(next, 7000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [length]);
  return { idx, setIdx, next, prev };
}

/* Compteur animé (gère « 5,000 » milliers et « 1,8 » décimale) */
function CountUp({ value }: { value: string }) {
  const [display, setDisplay] = useState<string | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/^\d{1,3}(,\d{3})+$/);
    const decimals = /[.,]\d{1,2}$/.test(cleaned) && !groups ? 1 : 0;
    const num = groups
      ? parseInt(cleaned.replace(/,/g, ''), 10)
      : parseFloat(cleaned.replace(/[^\d.,]/g, '').replace(',', '.'));
    if (isNaN(num)) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const fmt = (n: number) =>
      decimals
        ? n.toFixed(decimals).replace('.', ',')
        : Math.round(n).toLocaleString('fr-FR').replace(/\u202F/g, ' ');
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(fmt(num * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        raf = requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, [value]);
  return <span ref={ref}>{display ?? value}</span>;
}

/* Flèche fine style carrousel tostan */
const ThinArrow = ({ dir, className }: { dir: 'l' | 'r'; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {dir === 'l' ? <path d="M15 19l-7-7 7-7" /> : <path d="M9 5l7 7-7 7" />}
  </svg>
);

export function HomePage() {
  const { lang } = useRouter();
  const t = UI[lang];
  const d = lang === 'fr' ? HOME_FR : HOME_EN;
  const hero = useCarousel(d.hero.length);

  /* Carrousel « à la une » : pages de 2 cartes (comme tostan.org) */
  const featPages: (typeof d.featured)[] = [];
  for (let i = 0; i < d.featured.length; i += 2) featPages.push(d.featured.slice(i, i + 2) as typeof d.featured);
  const featured = useCarousel(featPages.length);
  const stories = useCarousel(d.stories.items.length);
  const supporters = useCarousel(d.supporters.length);

  /* Rythme tri-colore violet / rose / or (motif des blocs colorés tostan) */
  const trio = (i: number) => {
    const c = ['bg-primary', 'bg-rose', 'bg-gold'][i % 3];
    return c === 'bg-gold' ? 'bg-gold text-ink' : `${c} text-white`;
  };

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative bg-charcoal text-white">
        <div className="relative h-[620px] md:h-[680px] overflow-hidden">
          {d.hero.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === hero.idx ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <Img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
              <div className="relative mx-auto max-w-[1400px] px-5 lg:px-14 h-full flex flex-col justify-center">
                <h1 className="text-[44px] md:text-[64px] lg:text-[74px] font-bold leading-[1.04] max-w-4xl t-fade-up">
                  {s.title}
                </h1>
                {s.subtitle && (
                  <p className="mt-6 text-[17px] md:text-[19px] text-white/95 max-w-xl leading-relaxed">{s.subtitle}</p>
                )}
                {s.buttons.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-4">
                    {s.buttons.map((b) => (
                      <A key={b.label} href={b.href} className="btn-maccii">
                        {b.label}
                      </A>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {/* Flèches fines aux bords, comme tostan.org */}
          <button onClick={hero.prev} aria-label="Diapositive précédente" className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/85 hover:text-white transition-colors">
            <ThinArrow dir="l" className="w-8 h-8 md:w-10 md:h-10 drop-shadow" />
          </button>
          <button onClick={hero.next} aria-label="Diapositive suivante" className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white/85 hover:text-white transition-colors">
            <ThinArrow dir="r" className="w-8 h-8 md:w-10 md:h-10 drop-shadow" />
          </button>
        </div>

        {/* Bande de statistiques — carte blanche chevauchant le héros,
            chiffres en couleur accent + cellule sombre « Lisez nos Histoires d'Impact » */}
        <div className="relative z-20 mx-auto max-w-[1400px] px-5 lg:px-10 -mt-[88px] -mb-[92px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            {d.stats.slice(0, 3).map((s, i) => (
              <div key={i} className={`p-8 bg-white ${i > 0 ? 'max-md:border-t md:border-l' : ''} border-line`}>
                <p className="text-[32px] lg:text-[36px] font-extrabold text-rose leading-none">
                  <CountUp value={s.n} />{s.suffix}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-ink">{s.label}</p>
              </div>
            ))}
            <A href="/testimonials" className="bg-primary-deep hover:bg-primary-dark transition-colors p-8 flex items-center justify-between gap-4 group">
              <span className="text-white font-bold text-[21px] lg:text-[23px] leading-tight">{t.readStories}</span>
              <span className="w-11 h-11 rounded-full bg-gold text-ink flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Icon name="arrowRight" className="w-4 h-4" />
              </span>
            </A>
          </div>
        </div>
      </section>

      {/* ================= À LA UNE — 2 cartes visibles, carrousel ================= */}
      <section className="pt-[136px] pb-14 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10 relative">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${featured.idx * 100}%)` }}>
              {featPages.map((page, p) => (
                <div key={p} className="w-full shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {page.map((f, i) => (
                      <div key={i} className="bg-mlight overflow-hidden grid grid-cols-1 sm:grid-cols-[0.85fr_1fr] min-h-[380px]">
                        <Img src={f.image} alt={f.title} className="w-full h-[260px] sm:h-full object-cover" />
                        <div className="p-8 md:p-9 flex flex-col justify-center items-start">
                          <span className="inline-block w-fit bg-rose text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                            {f.badge}
                          </span>
                          <h2 className="text-[23px] md:text-[25px] font-bold text-ink leading-tight">{f.title}</h2>
                          <p className="mt-4 text-[14px] leading-relaxed text-mgray italic">{f.text}</p>
                          <div className="mt-6">
                            <A href={f.href} className="btn-maccii !text-[14px] !py-2.5 !px-6">
                              {t.readMore}
                              <span className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center">
                                <Icon name="arrowRight" className="w-3 h-3" />
                              </span>
                            </A>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {featPages.length > 1 && (
            <>
              <button onClick={featured.prev} aria-label="Précédent" className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-primary-deep text-white shadow-lg flex items-center justify-center hover:bg-primary-dark z-10">
                <Icon name="arrowLeft" className="w-4 h-4" />
              </button>
              <button onClick={featured.next} aria-label="Suivant" className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-11 h-11 rounded-full bg-primary-deep text-white shadow-lg flex items-center justify-center hover:bg-primary-dark z-10">
                <Icon name="arrowRight" className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </section>

      {/* ================= AXES D'INTERVENTION — section sombre,
          images à liseré coloré + pastille titre + blocs de stats pleins ================= */}
      <section className="py-16 bg-primary-deep text-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <h2 className="text-center text-[34px] md:text-[44px] font-bold">{t.areasTitle}</h2>
          <p className="mt-4 mx-auto max-w-3xl text-center text-[16px] md:text-[17px] leading-relaxed text-white/90">
            {d.areasIntro}
          </p>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
            {d.areas.map((a, i) => (
              <div key={i} className="flex flex-col">
                <div className="relative">
                  <div className={`h-2 w-full ${trio(i).split(' ')[0]}`} />
                  <Img src={a.image} alt={a.title} className="w-full h-[230px] object-cover" />
                  <span className={`absolute left-1/2 -translate-x-1/2 -bottom-4 whitespace-nowrap ${trio(i)} text-[14px] font-bold px-5 py-2 rounded-full shadow-lg`}>
                    {a.title}
                  </span>
                </div>
                <p className="mt-9 text-[14px] leading-relaxed text-white/90 text-center px-2">{a.text}</p>
                <A href={a.href} className="mt-auto pt-4 mx-auto inline-flex items-center gap-2 text-[14px] font-bold text-white hover:underline w-fit">
                  En savoir plus
                  <Icon name="arrowRight" className="w-3.5 h-3.5" />
                </A>
              </div>
            ))}
          </div>

          {/* Blocs de statistiques pleins, collés (sans espacement) */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3">
            {d.statsBlocks.map((b, i) => (
              <div key={i} className={`px-8 py-10 md:py-12 ${trio(i)}`}>
                <p className="text-[46px] md:text-[54px] font-extrabold leading-none">{b.n}</p>
                <p className={`mt-4 text-[14px] leading-relaxed ${i % 3 === 2 ? 'text-ink/80' : 'text-white/95'}`}>{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BÉNÉVOLAT — photo plein cadre + carte sombre arrondie ================= */}
      <section className="relative">
        <div className="relative min-h-[480px] md:min-h-[540px] flex items-center overflow-hidden">
          <Img src={d.benevolat.image} alt={d.benevolat.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10 w-full py-16">
            <div className="bg-primary-deep rounded-[28px] p-9 md:p-12 max-w-[540px] text-white shadow-[0_28px_70px_rgba(0,0,0,0.35)]">
              <h2 className="text-[30px] md:text-[38px] font-bold leading-tight">{d.benevolat.title}</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-white/90">{d.benevolat.text}</p>
              <div className="mt-7">
                <A href={d.benevolat.href} className="inline-flex items-center gap-2 bg-gold text-ink font-bold text-[15px] px-6 py-2.5 rounded-full hover:brightness-105 transition-all">
                  {t.howToSupport}
                  <span className="w-7 h-7 rounded-full bg-ink text-gold flex items-center justify-center">
                    <Icon name="arrowRight" className="w-3.5 h-3.5" />
                  </span>
                </A>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACTUALITÉS & BLOG ================= */}
      <section className="py-16 bg-mlight">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
            <h2 className="text-[32px] md:text-[40px] font-bold text-ink">{t.newsTitle}</h2>
            <PillButton label={t.exploreNews} href="/services" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {d.news.map((n, i) => (
              <ArticleCard key={i} title={n.title} image={n.image} href={n.href} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= HISTOIRES TRANSFORMATRICES — carte sombre,
          photo flottante chevauchant le haut ================= */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <h2 className="text-[32px] md:text-[40px] font-bold text-ink">{d.stories.title}</h2>
          <div className="relative mt-24">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${stories.idx * 100}%)` }}>
                {d.stories.items.map((s, i) => (
                  <div key={i} className="w-full shrink-0 px-1 md:px-8">
                    <div className="relative max-w-[680px] mx-auto">
                      <Img
                        src={s.image}
                        alt={s.title}
                        className="absolute -top-[90px] md:-top-[110px] left-1/2 -translate-x-1/2 w-[260px] h-[200px] md:w-[320px] md:h-[240px] object-cover rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.3)] z-10"
                      />
                      <div className="bg-primary-deep rounded-[28px] px-7 md:px-14 pb-10 pt-[130px] md:pt-[155px] text-white">
                        <h3 className="text-[22px] md:text-[26px] font-bold leading-snug">{s.title}</h3>
                        <p className="mt-4 text-[14px] leading-relaxed text-white/85">{s.text}</p>
                        <A href={s.href} className="mt-6 inline-flex items-center gap-2 text-[14px] font-bold text-white hover:underline">
                          {t.readMore}
                          <Icon name="arrowRight" className="w-3.5 h-3.5 text-gold" />
                        </A>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={stories.prev} aria-label="Histoire précédente" className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] text-primary-deep flex items-center justify-center hover:bg-mlight z-20">
              <Icon name="arrowLeft" className="w-4 h-4" />
            </button>
            <button onClick={stories.next} aria-label="Histoire suivante" className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] text-primary-deep flex items-center justify-center hover:bg-mlight z-20">
              <Icon name="arrowRight" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= NOS SOUTIENS — intitulé + filet, puis citations ================= */}
      <section className="pb-20 pt-2 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-[15px] md:text-[17px] font-bold tracking-[0.22em] uppercase text-ink whitespace-nowrap">
              {t.supportersLabel}
            </h2>
            <div className="flex-1 h-px bg-line" />
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${supporters.idx * 100}%)` }}>
                {d.supporters.map((s, i) => (
                  <div key={i} className="w-full shrink-0 px-1">
                    <div className="bg-primary-deep rounded-[36px] text-white px-7 md:px-24 py-14 relative text-center min-h-[340px] flex flex-col items-center justify-center">
                      <span className="absolute top-7 left-10 text-[80px] leading-none font-serif text-gold/70 select-none">“</span>
                      <h3 className="text-[24px] md:text-[30px] font-bold">{s.name}</h3>
                      <p className="text-[15px] text-lav font-semibold mt-2 mb-6">{s.role}</p>
                      <p className="text-[14.5px] md:text-[15.5px] leading-relaxed text-white/90 max-w-4xl">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={supporters.prev} aria-label="Témoignage précédent" className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 md:-translate-x-3 w-10 h-10 rounded-full bg-white shadow-lg text-primary-deep flex items-center justify-center hover:bg-mlight z-10">
              <Icon name="arrowLeft" className="w-3.5 h-3.5" />
            </button>
            <button onClick={supporters.next} aria-label="Témoignage suivant" className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 md:translate-x-3 w-10 h-10 rounded-full bg-white shadow-lg text-primary-deep flex items-center justify-center hover:bg-mlight z-10">
              <Icon name="arrowRight" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

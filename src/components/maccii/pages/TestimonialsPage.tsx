'use client';

/* Page Témoignages — MAC.CII */
import React from 'react';
import { useRouter, A } from '@/lib/router';
import { TESTIMONIALS_FR, TESTIMONIALS_EN, UI } from '@/data/maccii';
import { Img, PageHero, CtaBanner } from '../sections';
import { Icon, StrokeIcon } from '../Header';

export function TestimonialsPage() {
  const { lang } = useRouter();
  const t = UI[lang];
  const d = lang === 'fr' ? TESTIMONIALS_FR : TESTIMONIALS_EN;

  return (
    <div>
      <PageHero title={d.hero.title} subtitle={d.hero.subtitle} image="/images/histoire.png" breadcrumb={[lang === 'fr' ? 'Accueil' : 'Home', d.hero.title]} />

      {/* Stats */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-[1000px] px-5 lg:px-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {d.stats.map((s, i) => (
            <div key={i} className="bg-mlight rounded-2xl p-8 text-center">
              <p className="text-[40px] font-extrabold text-primary leading-none">{s.n}</p>
              <p className="mt-3 text-[14.5px] text-ink">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leurs histoires */}
      <section className="pb-16 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <h2 className="text-[30px] md:text-[36px] font-bold text-ink mb-3">
            {lang === 'fr' ? 'Leurs histoires' : 'Their stories'}
          </h2>
          <p className="text-[16px] text-mgray mb-10">
            {lang === 'fr'
              ? 'Des récits authentiques qui montrent comment nos programmes transforment des vies.'
              : 'Authentic stories showing how our programs transform lives.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {d.items.map((it, i) => (
              <div key={i} className="bg-mlight rounded-2xl p-8 flex flex-col hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-5">
                  <StrokeIcon name="quote" className="w-8 h-8 text-primary/40" />
                  <div className="flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <StrokeIcon key={j} name="star" className="w-4 h-4" />
                    ))}
                  </div>
                </div>
                <p className="text-[14.5px] leading-relaxed text-ink grow">« {it.text} »</p>
                <span className="mt-5 inline-block w-fit bg-primary/10 text-primary text-[12px] font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                  {it.tag}
                </span>
                <div className="mt-5 pt-5 border-t border-line flex items-center gap-4">
                  <Img src={it.image} alt={it.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[15px] text-ink">{it.name}</p>
                    <p className="text-[13px] text-primary font-semibold">{it.role}</p>
                    <p className="text-[12.5px] text-mgray">{it.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vidéos */}
      <section className="py-16 bg-mlight">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-[30px] md:text-[36px] font-bold text-ink">{d.videos.title}</h2>
            <p className="mt-3 text-[16px] text-mgray">{d.videos.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {d.videos.items.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                <div className="relative">
                  <Img src={v.image} alt={v.title} className="w-full h-[190px] object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-14 h-14 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-lg">
                      <StrokeIcon name="play" className="w-6 h-6 ml-0.5" />
                    </span>
                  </span>
                </div>
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-[17px] font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-mgray grow">{v.text}</p>
                  <A href="/contact" className="mt-5 inline-flex items-center gap-2 font-bold text-[14px] text-primary hover:gap-3 transition-all w-fit">
                    {lang === 'fr' ? 'Voir la vidéo' : 'Watch the video'}
                    <Icon name="arrowRight" className="w-3.5 h-3.5" />
                  </A>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title={d.cta.title} button={t.howToSupport} image="/images/benevoles.png" href="/volunteer" />
    </div>
  );
}

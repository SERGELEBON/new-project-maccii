'use client';

/* Page À propos — MAC.CII (même design que la maquette d'origine) */
import React from 'react';
import { useRouter } from '@/lib/router';
import { ABOUT_FR, ABOUT_EN } from '@/data/maccii';
import { Img, PageHero, StatsGrid, CtaBanner, IconCards } from '../sections';
import { StrokeIcon } from '../Header';

export function AboutPage() {
  const { lang } = useRouter();
  const d = lang === 'fr' ? ABOUT_FR : ABOUT_EN;
  const { lang: _l } = useRouter();
  void _l;
  return (
    <div>
      <PageHero title={d.hero.title} subtitle={d.hero.subtitle} image={d.histoire.image} breadcrumb={[lang === 'fr' ? 'Accueil' : 'Home', d.hero.title]} />

      {/* Notre Histoire */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[14px] font-bold uppercase tracking-widest text-primary mb-3">{d.histoire.kicker}</p>
            <h2 className="text-[30px] md:text-[36px] font-bold text-ink leading-tight mb-8">{d.histoire.title}</h2>
            <h3 className="text-[20px] font-bold text-primary mb-4">{d.histoire.subtitle}</h3>
            {d.histoire.paras.map((p, i) => (
              <p key={i} className="text-[15.5px] leading-[1.8] text-body mb-4">{p}</p>
            ))}
          </div>
          <Img src={d.histoire.image} alt={d.histoire.kicker} className="w-full h-[420px] object-cover rounded-3xl shadow-xl" />
        </div>
      </section>

      {/* Notre Valeurs */}
      <section className="py-16 bg-mlight">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-[32px] md:text-[38px] font-bold text-ink">{d.valeurs.title}</h2>
            <p className="mt-3 text-[16px] text-mgray">{d.valeurs.subtitle}</p>
          </div>
          <IconCards items={d.valeurs.items} />
        </div>
      </section>

      {/* Le fondateur */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
          <div className="relative">
            <Img src={d.fondateur.image} alt={d.fondateur.title} className="w-full h-[480px] object-cover rounded-3xl shadow-xl" />
            <div className="absolute -bottom-6 -right-4 bg-primary text-white rounded-2xl px-7 py-5 shadow-xl">
              <p className="font-bold text-[18px]">{d.fondateur.signature}</p>
              <p className="text-[13px] text-white/85 mt-1">{d.fondateur.role}</p>
            </div>
          </div>
          <div>
            <h2 className="text-[30px] md:text-[36px] font-bold text-ink mb-8">
              {d.fondateur.title.split(' ').slice(0, -1).join(' ')} <span className="text-primary">{d.fondateur.title.split(' ').slice(-1)}</span>
            </h2>
            {d.fondateur.paras.map((p, i) => (
              <p key={i} className="text-[15.5px] leading-[1.8] text-body mb-4">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-16 bg-mlight">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-[32px] md:text-[38px] font-bold text-ink">{d.equipe.title}</h2>
            <p className="mt-3 text-[16px] text-mgray">{d.equipe.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1100px] mx-auto">
            {d.equipe.members.map((m, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow text-center">
                <Img src={m.image} alt={m.name} className="w-full h-[300px] object-cover" />
                <div className="p-7">
                  <h3 className="text-[20px] font-bold text-ink">{m.name}</h3>
                  <p className="text-[14px] font-semibold text-primary mt-1">{m.role}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-mgray">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Réalisations */}
      <section className="pt-4 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="text-center mb-4">
            <h2 className="text-[32px] md:text-[38px] font-bold text-ink">{d.realisations.title}</h2>
            <p className="mt-3 text-[16px] text-mgray">{d.realisations.subtitle}</p>
          </div>
        </div>
        <StatsGrid stats={d.realisations.stats} />
      </section>

      <CtaBanner
        title={lang === 'fr' ? 'Rejoignez notre mission' : 'Join our mission'}
        button={lang === 'fr' ? 'Devenir bénévole' : 'Become a volunteer'}
        image="/images/benevoles.png"
        href="/volunteer"
      />
    </div>
  );
}

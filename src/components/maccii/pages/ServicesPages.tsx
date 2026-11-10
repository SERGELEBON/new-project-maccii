'use client';

/* Pages Nos Actions (hub) + détail d'un service — MAC.CII */
import React from 'react';
import { useRouter, A } from '@/lib/router';
import { getServices, getService, UI } from '@/data/maccii';
import { Img, PageHero, StatsGrid, CtaBanner, RelatedServices, PillButton } from '../sections';
import { Icon, StrokeIcon } from '../Header';

const SERVICE_ICONS: Record<string, string> = {
  education: 'book',
  sante: 'health',
  agriculture: 'leaf',
  femmes: 'users',
  logement: 'home',
  emploi: 'briefcase',
};

/* ================= HUB NOS ACTIONS ================= */
export function ServicesPage() {
  const { lang } = useRouter();
  const t = UI[lang];
  const fr = lang === 'fr';
  const services = getServices(lang);
  const stats = fr
    ? [
        { n: '5,000+', label: 'Bénéficiaires directs' },
        { n: '25', label: 'Communautés partenaires' },
        { n: '98%', label: 'Taux de réussite' },
        { n: '50+', label: 'Bénévoles actifs' },
      ]
    : [
        { n: '5,000+', label: 'Direct beneficiaries' },
        { n: '25', label: 'Partner communities' },
        { n: '98%', label: 'Success rate' },
        { n: '50+', label: 'Active volunteers' },
      ];

  return (
    <div>
      <PageHero
        title={fr ? 'Nos Actions' : 'Our Actions'}
        subtitle={fr
          ? 'Découvrez comment nous transformons les vies dans les communautés ivoiriennes à travers nos programmes innovants.'
          : 'Discover how we transform lives in Ivorian communities through our innovative programs.'}
        image="/images/actions-phares.png"
        breadcrumb={[fr ? 'Accueil' : 'Home', fr ? 'Nos Actions' : 'Our Actions']}
      />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <p className="text-[14px] font-bold uppercase tracking-widest text-primary mb-3">
            {fr ? 'Nos programmes d’impact' : 'Our impact programs'}
          </p>
          <h2 className="text-[26px] md:text-[32px] font-bold text-ink mb-12 max-w-3xl leading-snug">
            {fr
              ? 'Six axes d’intervention stratégiques pour répondre aux besoins essentiels des communautés.'
              : 'Six strategic areas of intervention to meet the essential needs of communities.'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((s) => (
              <div key={s.slug} className="bg-white rounded-2xl border border-line/70 shadow-sm hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
                <Img src={s.image} alt={s.title} className="w-full h-[190px] object-cover" />
                <div className="p-7 flex flex-col grow">
                  <span className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 -mt-12 relative z-10 border-4 border-white bg-white">
                    <StrokeIcon name={SERVICE_ICONS[s.slug] || 'heartStroke'} className="w-6 h-6 text-primary" />
                  </span>
                  <h3 className="text-[19px] font-bold text-ink">{s.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-mgray grow">{s.short}</p>
                  <p className="mt-4 text-[14px] font-bold text-primary">
                    <span className="text-[20px] font-extrabold">{s.stat.n}</span>{' '}
                    <span className="font-semibold text-body">{s.stat.label}</span>
                  </p>
                  <div className="mt-5">
                    <A href={`/services/${s.slug}`} className="inline-flex items-center gap-2 font-bold text-[14px] text-primary hover:gap-3 transition-all">
                      {t.learnMore}
                      <Icon name="arrowRight" className="w-3.5 h-3.5" />
                    </A>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact global */}
      <section className="py-4 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="text-center mb-4">
            <h2 className="text-[30px] md:text-[36px] font-bold text-ink">
              {fr ? 'Notre Impact Global' : 'Our Global Impact'}
            </h2>
            <p className="mt-3 text-[16px] text-mgray">
              {fr
                ? 'Des chiffres concrets qui témoignent de notre engagement envers les communautés ivoiriennes.'
                : 'Concrete figures that testify to our commitment to Ivorian communities.'}
            </p>
          </div>
        </div>
        <StatsGrid stats={stats} />
      </section>

      <CtaBanner
        title={fr ? 'Prêt à agir ?' : 'Ready to act?'}
        button={fr ? 'Devenir bénévole' : 'Become a volunteer'}
        image="/images/benevoles.png"
        href="/volunteer"
      />
    </div>
  );
}

/* ================= DÉTAIL D'UN SERVICE ================= */
export function ServiceDetailPage({ slug }: { slug: string }) {
  const { lang } = useRouter();
  const t = UI[lang];
  const fr = lang === 'fr';
  const service = getService(lang, slug);

  if (!service) {
    return (
      <div>
        <PageHero title={fr ? 'Action introuvable' : 'Action not found'} breadcrumb={[fr ? 'Accueil' : 'Home', '404']} />
        <section className="py-16 bg-white text-center">
          <p className="text-[16px] text-mgray mb-8">{fr ? 'Ce programme n’existe pas.' : 'This program does not exist.'}</p>
          <PillButton label={fr ? 'Voir nos actions' : 'See our actions'} href="/services" />
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={service.title}
        subtitle={service.short}
        image={service.hero}
        breadcrumb={[fr ? 'Accueil' : 'Home', fr ? 'Nos Actions' : 'Our Actions', service.title]}
      />

      {/* Description */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-14">
          <div>
            <h2 className="text-[28px] font-bold text-ink mb-6">
              {fr ? 'Le programme en détail' : 'The program in detail'}
            </h2>
            {service.desc.map((p, i) => (
              <p key={i} className="text-[15.5px] leading-[1.8] text-body mb-4">{p}</p>
            ))}

            <h3 className="text-[22px] font-bold text-primary mt-10 mb-5">
              {fr ? 'Nos programmes' : 'Our programs'}
            </h3>
            <div className="space-y-3">
              {service.programs.map((p, i) => (
                <div key={i} className="flex items-start gap-3 bg-mlight rounded-xl px-5 py-4">
                  <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                    <StrokeIcon name="check" className="w-4 h-4" />
                  </span>
                  <p className="text-[15px] font-semibold text-ink">{p}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* Stat clé */}
            <div className="bg-primary-deep text-white rounded-3xl p-9 text-center shadow-xl">
              <p className="text-[52px] font-extrabold leading-none">
                {service.stat.n}
              </p>
              <p className="mt-3 text-[15px] text-white/90">{service.stat.label}</p>
            </div>
            {/* Image */}
            <Img src={service.image} alt={service.title} className="w-full h-[260px] object-cover rounded-3xl shadow-lg" />
            {/* CTA */}
            <div className="bg-mlight rounded-3xl p-8 text-center">
              <p className="font-bold text-[18px] text-ink mb-4">
                {fr ? 'Soutenir ce programme' : 'Support this program'}
              </p>
              <div className="flex flex-col gap-3 items-center">
                <A href="/volunteer" className="btn-maccii w-fit">
                  {fr ? 'Devenir bénévole' : 'Become a volunteer'}
                  <Icon name="arrowRight" className="w-4 h-4" />
                </A>
                <A href="/contact" className="text-[14px] font-bold text-primary hover:underline">
                  {fr ? 'Nous contacter' : 'Contact us'}
                </A>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignage lié */}
      {service.testimonial && (
        <section className="py-16 bg-mlight">
          <div className="mx-auto max-w-[1000px] px-5 lg:px-10">
            <div className="bg-white rounded-3xl shadow-lg p-10 md:p-12 grid grid-cols-1 md:grid-cols-[0.35fr_0.65fr] gap-8 items-center">
              <Img src={service.testimonial.image} alt={service.testimonial.name} className="w-full h-[280px] object-cover rounded-2xl" />
              <div>
                <div className="flex gap-1 text-gold mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StrokeIcon key={i} name="star" className="w-5 h-5" />
                  ))}
                </div>
                <StrokeIcon name="quote" className="w-8 h-8 text-primary/30 mb-3" />
                <p className="text-[16.5px] leading-relaxed text-ink">« {service.testimonial.text} »</p>
                <p className="mt-5 font-bold text-[16px] text-ink">{service.testimonial.name}</p>
                <p className="text-[14px] text-primary font-semibold">{service.testimonial.role}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <RelatedServices excludeSlug={service.slug} />

      <CtaBanner
        title={fr ? 'Prêt à agir ?' : 'Ready to act?'}
        button={fr ? 'Devenir bénévole' : 'Become a volunteer'}
        image="/images/benevoles.png"
        href="/volunteer"
      />
    </div>
  );
}

'use client';

/* Pied de page MAC.CII — même structure et motifs que tostan.org :
   logo + baseline + réseaux | Liens utiles | Contacts (Siège / Téléphone) | newsletter,
   barre du bas en couleur accent. Contenu selon https://ongmaccii.vercel.app/ */
import React from 'react';
import { useRouter, A } from '@/lib/router';
import { UI, FOOTER_LINKS } from '@/data/maccii';
import { Icon } from './Header';

export function Footer() {
  const { lang } = useRouter();
  const t = UI[lang];
  const links = FOOTER_LINKS[lang];
  return (
    <footer className="mt-auto bg-primary-deep text-white" role="contentinfo">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_1.4fr_1fr] gap-12">
        {/* Colonne 1 — logo, baseline, réseaux */}
        <div>
          <img
            src="/images/logo-maccii.png"
            alt="MAC.CII — Organisation d'aide et de développement en Côte d'Ivoire"
            className="h-[60px] w-auto rounded-xl bg-white p-1.5"
          />
          <p className="mt-6 text-[14px] leading-relaxed text-white/90 max-w-[280px]">{t.tagline}</p>
          <p className="mt-7 font-bold text-[15px]">{t.followUs}</p>
          <div className="mt-4 flex items-center gap-5">
            {[
              { label: 'Facebook-f', icon: 'facebook' },
              { label: 'X-twitter', icon: 'x' },
              { label: 'Instagram', icon: 'instagram' },
              { label: 'Linkedin', icon: 'linkedin' },
              { label: 'Youtube', icon: 'youtube' },
            ].map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="text-white hover:text-gold transition-colors">
                <Icon name={s.icon} className="w-[17px] h-[17px]" />
              </a>
            ))}
          </div>
        </div>

        {/* Colonne 2 — Liens utiles */}
        <nav aria-label={t.usefulLinks}>
          <h3 className="font-bold text-[23px] mb-6">{t.usefulLinks}</h3>
          <ul className="space-y-4">
            {links.useful.map((l) => (
              <li key={l.label}>
                <A href={l.href} className="text-[15px] font-bold text-white/95 hover:text-gold transition-colors">
                  {l.label}
                </A>
              </li>
            ))}
          </ul>
        </nav>

        {/* Colonne 3 — Contacts */}
        <div>
          <h3 className="font-bold text-[23px] mb-6">{t.contacts}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-[15px] mb-3">{lang === 'fr' ? 'Siège' : 'Headquarters'}</h4>
              <p className="flex gap-2.5 text-[14px] text-white/85 leading-relaxed">
                <Icon name="mapPin" className="w-4 h-4 mt-0.5 shrink-0 text-gold" />
                <span>MAC.CII, Plateau Rue des Jardins, Abidjan, Côte d’Ivoire</span>
              </p>
              <p className="flex gap-2.5 items-center text-[14px] text-white/85 mt-3">
                <Icon name="envelope" className="w-4 h-4 shrink-0 text-gold" />
                <a href="mailto:contact@mac.ci" className="hover:text-gold transition-colors">contact@mac.ci</a>
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[15px] mb-3">{lang === 'fr' ? 'Téléphone' : 'Phone'}</h4>
              <p className="flex gap-2.5 items-center text-[14px] text-white/85">
                <Icon name="phone" className="w-4 h-4 shrink-0 text-gold" />
                <a href="tel:+2250707646361" className="hover:text-gold transition-colors">+225 07 07 64 63 61</a>
              </p>
            </div>
          </div>

          {/* Newsletter — « Rejoignez le mouvement ! » + pilule accent */}
          <div className="mt-10">
            <p className="font-bold text-[15px]">{t.bePart}</p>
            <p className="text-[14px] text-white/85 mt-1">{t.joinNewsletter}</p>
            <A href="/contact" className="mt-4 inline-flex items-center gap-3 bg-gold text-ink font-bold text-[15px] pl-6 pr-1.5 py-1.5 rounded-full hover:brightness-105 transition-all">
              {t.subscribe}
              <span className="w-9 h-9 rounded-full bg-ink text-gold flex items-center justify-center">
                <Icon name="arrowRight" className="w-4 h-4" />
              </span>
            </A>
          </div>
        </div>
      </div>

      {/* Barre du bas — couleur accent, texte sombre */}
      <div className="bg-gold text-ink">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[14px] font-semibold">
          <p>{t.rights}</p>
          <p>{t.credit}</p>
        </div>
      </div>
    </footer>
  );
}

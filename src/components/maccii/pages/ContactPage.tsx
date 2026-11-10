'use client';

/* Page Contact — MAC.CII (formulaire + informations, même design) */
import React, { useState } from 'react';
import { useRouter, A } from '@/lib/router';
import { CONTACT_FR, CONTACT_EN, UI } from '@/data/maccii';
import { PageHero, CtaBanner } from '../sections';
import { Icon, StrokeIcon } from '../Header';

export function ContactPage() {
  const { lang } = useRouter();
  const t = UI[lang];
  const d = lang === 'fr' ? CONTACT_FR : CONTACT_EN;
  const fr = lang === 'fr';
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const inputCls = 'w-full border border-[#ddd] rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary';
  const labelCls = 'block text-[13px] font-bold uppercase tracking-wide text-primary mb-2';

  return (
    <div>
      <PageHero title={d.hero.title} subtitle={d.hero.subtitle} image="/images/contact.png" breadcrumb={[fr ? 'Accueil' : 'Home', d.hero.title]} />

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-14">
          {/* Formulaire */}
          <div>
            <h2 className="text-[26px] font-bold text-ink mb-8">{d.formTitle}</h2>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            >
              <div>
                <label className={labelCls}>{fr ? 'Nom complet' : 'Full name'} <span className="text-rose">*</span></label>
                <input required value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Email <span className="text-rose">*</span></label>
                <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>{fr ? 'Sujet' : 'Subject'} <span className="text-rose">*</span></label>
                <input required value={form.subject} onChange={(e) => set('subject', e.target.value)} className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>{fr ? 'Message' : 'Message'} <span className="text-rose">*</span></label>
                <textarea required rows={6} value={form.message} onChange={(e) => set('message', e.target.value)} className={inputCls} />
              </div>
              <div className="md:col-span-2">
                {sent ? (
                  <div className="bg-primary text-white rounded-xl px-6 py-4 font-bold">
                    {fr ? 'Merci ! Votre message a bien été envoyé.' : 'Thank you! Your message has been sent.'}
                  </div>
                ) : (
                  <button type="submit" className="btn-maccii">
                    {fr ? 'Envoyer le message' : 'Send the message'}
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Informations */}
          <div>
            <h2 className="text-[26px] font-bold text-ink mb-8">{d.infoTitle}</h2>
            <div className="space-y-6">
              {d.infos.map((info, i) => (
                <div key={i} className="bg-mlight rounded-2xl p-6 flex gap-4">
                  <span className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                    <StrokeIcon name={info.icon} className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="font-bold text-[16px] text-ink">{info.title}</h3>
                    {info.lines.map((l, j) => (
                      <p key={j} className="text-[14.5px] text-mgray mt-1">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner title={d.cta.title} button={t.howToSupport} image="/images/benevoles.png" href="/volunteer" />
    </div>
  );
}

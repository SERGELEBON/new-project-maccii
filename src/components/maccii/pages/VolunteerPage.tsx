'use client';

/* Page Devenir Bénévole — MAC.CII (avantages + formulaire complet + FAQ) */
import React, { useState } from 'react';
import { useRouter } from '@/lib/router';
import { VOLUNTEER_FR, VOLUNTEER_EN } from '@/data/maccii';
import { PageHero, IconCards, FaqAccordion } from '../sections';
import { Icon } from '../Header';

export function VolunteerPage() {
  const { lang } = useRouter();
  const d = lang === 'fr' ? VOLUNTEER_FR : VOLUNTEER_EN;
  const fr = lang === 'fr';
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', tel: '', naissance: '', adresse: '',
    niveau: '', experience: '', competences: '', domaines: [] as string[],
    disponibilite: '', motivation: '', urgenceNom: '', urgenceTel: '', consent: false,
  });
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string | boolean | string[]) => setForm((p) => ({ ...p, [k]: v }));
  const toggleDomaine = (dm: string) =>
    set('domaines', form.domaines.includes(dm) ? form.domaines.filter((x) => x !== dm) : [...form.domaines, dm]);

  const inputCls = 'w-full border border-[#ddd] rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary';
  const labelCls = 'block text-[13px] font-bold uppercase tracking-wide text-primary mb-2';

  return (
    <div>
      <PageHero title={d.hero.title} subtitle={d.hero.subtitle} image="/images/benevoles.png" breadcrumb={[fr ? 'Accueil' : 'Home', d.hero.title]} />

      {/* Avantages */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-[30px] md:text-[36px] font-bold text-ink">{d.avantages.title}</h2>
            <p className="mt-3 text-[16px] text-mgray">{d.avantages.subtitle}</p>
          </div>
          <IconCards items={d.avantages.items} />
        </div>
      </section>

      {/* Formulaire de candidature */}
      <section className="py-16 bg-mlight">
        <div className="mx-auto max-w-[1000px] px-5 lg:px-10">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <h2 className="text-[26px] font-bold text-ink mb-3">
              {fr ? 'Formulaire de candidature' : 'Application form'}
            </h2>
            <p className="text-[14.5px] text-mgray mb-8">
              {fr
                ? 'Remplissez ce formulaire pour rejoindre notre équipe de bénévoles.'
                : 'Fill in this form to join our volunteer team.'}
            </p>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            >
              <div>
                <label className={labelCls}>{fr ? 'Prénom' : 'First name'} <span className="text-rose">*</span></label>
                <input required value={form.prenom} onChange={(e) => set('prenom', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{fr ? 'Nom' : 'Last name'} <span className="text-rose">*</span></label>
                <input required value={form.nom} onChange={(e) => set('nom', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Email <span className="text-rose">*</span></label>
                <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{fr ? 'Téléphone' : 'Phone'} <span className="text-rose">*</span></label>
                <input required type="tel" value={form.tel} onChange={(e) => set('tel', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{fr ? 'Date de naissance' : 'Date of birth'} <span className="text-rose">*</span></label>
                <input required type="date" value={form.naissance} onChange={(e) => set('naissance', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{fr ? 'Adresse' : 'Address'}</label>
                <input value={form.adresse} onChange={(e) => set('adresse', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{fr ? 'Niveau d’études' : 'Education level'}</label>
                <select value={form.niveau} onChange={(e) => set('niveau', e.target.value)} className={`${inputCls} bg-white`}>
                  <option value="">{fr ? 'Sélectionnez votre niveau' : 'Select your level'}</option>
                  {d.niveaux.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>{fr ? 'Disponibilité' : 'Availability'} <span className="text-rose">*</span></label>
                <select required value={form.disponibilite} onChange={(e) => set('disponibilite', e.target.value)} className={`${inputCls} bg-white`}>
                  <option value="">{fr ? 'Sélectionnez votre disponibilité' : 'Select your availability'}</option>
                  {d.disponibilites.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>{fr ? 'Expérience bénévole ou professionnelle pertinente' : 'Relevant volunteer or professional experience'}</label>
                <textarea rows={3} value={form.experience} onChange={(e) => set('experience', e.target.value)} className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>{fr ? 'Compétences et talents particuliers' : 'Special skills and talents'}</label>
                <textarea rows={3} value={form.competences} onChange={(e) => set('competences', e.target.value)} className={inputCls} />
              </div>

              {/* Domaines d'intérêt */}
              <div className="md:col-span-2">
                <label className={labelCls}>
                  {fr ? 'Domaines d’intérêt (plusieurs choix possibles)' : 'Areas of interest (multiple choices possible)'} <span className="text-rose">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {d.domaines.map((dm) => (
                    <label key={dm} className={`flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors ${form.domaines.includes(dm) ? 'border-primary bg-primary/5' : 'border-[#ddd] hover:border-primary/50'}`}>
                      <input
                        type="checkbox"
                        checked={form.domaines.includes(dm)}
                        onChange={() => toggleDomaine(dm)}
                        className="w-4 h-4 accent-[#7C3AED]"
                      />
                      <span className="text-[14px] text-ink font-medium">{dm}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className={labelCls}>{fr ? 'Motivation et attentes' : 'Motivation and expectations'} <span className="text-rose">*</span></label>
                <textarea required rows={4} value={form.motivation} onChange={(e) => set('motivation', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{fr ? 'Contact d’urgence (nom)' : 'Emergency contact (name)'} <span className="text-rose">*</span></label>
                <input required value={form.urgenceNom} onChange={(e) => set('urgenceNom', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>{fr ? 'Téléphone d’urgence' : 'Emergency phone'} <span className="text-rose">*</span></label>
                <input required type="tel" value={form.urgenceTel} onChange={(e) => set('urgenceTel', e.target.value)} className={inputCls} />
              </div>

              <label className="flex items-start gap-3 md:col-span-2 text-[14px] text-ink">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(e) => set('consent', e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[#7C3AED]"
                />
                {d.consentement} <span className="text-rose">*</span>
              </label>

              <div className="md:col-span-2">
                {sent ? (
                  <div className="bg-primary text-white rounded-xl px-6 py-4 font-bold">
                    {fr
                      ? 'Merci ! Votre candidature a bien été envoyée. Notre équipe vous contactera très prochainement.'
                      : 'Thank you! Your application has been sent. Our team will contact you shortly.'}
                  </div>
                ) : (
                  <button type="submit" className="btn-maccii">
                    {fr ? 'Envoyer ma candidature' : 'Send my application'}
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      <FaqAccordion title={d.faq.title} items={d.faq.items} />
    </div>
  );
}

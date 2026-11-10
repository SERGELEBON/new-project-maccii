'use client';

/* Page 404 — MAC.CII */
import React from 'react';
import { useRouter } from '@/lib/router';
import { NOTFOUND } from '@/data/maccii';
import { PageHero } from '../sections';
import { PillButton } from '../sections';

export function NotFoundPage() {
  const { lang } = useRouter();
  const d = NOTFOUND[lang];
  return (
    <div>
      <PageHero title="404" image="/images/contact.png" breadcrumb={['MAC.CII', '404']} />
      <section className="py-20 bg-white text-center">
        <div className="mx-auto max-w-[700px] px-5">
          <p className="text-[64px] font-extrabold text-primary leading-none mb-4">404</p>
          <h1 className="text-[28px] font-bold text-ink mb-4">{d.title}</h1>
          <p className="text-[15.5px] text-mgray mb-8">{d.text}</p>
          <PillButton label={d.cta} href="/" />
        </div>
      </section>
    </div>
  );
}

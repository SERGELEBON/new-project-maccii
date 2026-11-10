'use client';

/* MAC.CII — Organisation d'Aide et de Développement en Côte d'Ivoire
   Routeur unique basé sur le hash (#/chemin, /en pour l'anglais). */
import { useEffect } from 'react';
import { RouterProvider, useRouter } from '@/lib/router';
import { Header, DonateTab } from '@/components/maccii/Header';
import { Footer } from '@/components/maccii/Footer';
import { HomePage } from '@/components/maccii/HomePage';
import { AboutPage } from '@/components/maccii/pages/AboutPage';
import { ServicesPage, ServiceDetailPage } from '@/components/maccii/pages/ServicesPages';
import { TestimonialsPage } from '@/components/maccii/pages/TestimonialsPage';
import { ContactPage } from '@/components/maccii/pages/ContactPage';
import { VolunteerPage } from '@/components/maccii/pages/VolunteerPage';
import { NotFoundPage } from '@/components/maccii/pages/NotFoundPage';
import { getService } from '@/data/maccii';

const SERVICE_SLUGS = new Set(['education', 'sante', 'agriculture', 'femmes', 'logement', 'emploi']);

const TITLES: Record<string, { fr: string; en: string }> = {
  '/': { fr: 'MAC.CI - Organisation d’Aide et de Développement en Côte d’Ivoire', en: 'MAC.CI - Aid and Development Organization in Côte d’Ivoire' },
  '/about': { fr: 'À propos | MAC.CII', en: 'About | MAC.CII' },
  '/services': { fr: 'Nos Actions | MAC.CII', en: 'Our Actions | MAC.CII' },
  '/testimonials': { fr: 'Témoignages | MAC.CII', en: 'Testimonials | MAC.CII' },
  '/contact': { fr: 'Contact | MAC.CII', en: 'Contact | MAC.CII' },
  '/volunteer': { fr: 'Devenir Bénévole | MAC.CII', en: 'Become a Volunteer | MAC.CII' },
};

function Router() {
  const { path, lang } = useRouter();

  // Titre de page dynamique
  useEffect(() => {
    const base = path.split('/').slice(0, 2).join('/');
    if (path === '/') document.title = TITLES['/'][lang];
    else if (TITLES[base]) document.title = TITLES[base][lang];
    else if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '').split('/').pop() || '';
      const s = getService(lang, slug);
      document.title = s ? `${s.title} | MAC.CII` : 'MAC.CII';
    } else {
      const clean = path.replace(/^\//, '').replace(/-/g, ' ');
      document.title = `${clean.replace(/\b\w/g, (c) => c.toUpperCase())} | MAC.CII`;
    }
  }, [path, lang]);

  let content: React.ReactNode;

  if (path === '/') content = <HomePage />;
  else if (path === '/about') content = <AboutPage />;
  else if (path === '/services') content = <ServicesPage />;
  else if (path.startsWith('/services/')) {
    const slug = path.replace('/services/', '').split('/').pop() || '';
    content = SERVICE_SLUGS.has(slug) ? <ServiceDetailPage slug={slug} /> : <NotFoundPage />;
  }
  else if (path === '/testimonials') content = <TestimonialsPage />;
  else if (path === '/contact') content = <ContactPage />;
  else if (path === '/volunteer') content = <VolunteerPage />;
  else content = <NotFoundPage />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">{content}</main>
      <Footer />
      <DonateTab />
    </div>
  );
}

export default function Page() {
  return (
    <RouterProvider>
      <Router />
    </RouterProvider>
  );
}

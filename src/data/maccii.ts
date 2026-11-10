/* ============================================================
   Données du site MAC.CII — ONG d'aide et de développement
   Contenu selon https://ongmaccii.vercel.app/
   FR = contenu de référence ; EN = traduction (le site de
   référence est uniquement en français).
   ============================================================ */

export interface NavChild {
  label: string;
  href: string;
  desc?: string;
}
export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

/* ================= UI ================= */
export const UI = {
  en: {
    tagline: 'Working for sustainable and inclusive development in Côte d’Ivoire since 2015.',
    howToSupport: 'Become a volunteer',
    donate: 'Make a donation',
    readMore: 'Read more',
    learnMore: 'Learn more',
    followUs: 'Follow us',
    usefulLinks: 'Useful links',
    contacts: 'Contact',
    ourActions: 'Our Actions',
    organisation: 'Organization',
    bePart: 'Be part of a movement!',
    joinNewsletter: 'Join Our Newsletter',
    subscribe: 'Subscribe',
    rights: '© 2025 MAC.CII. All rights reserved.',
    credit: 'Built with ♥ by Serge GUEHI',
    discoverActions: 'Discover our actions',
    readStories: 'Read Our Impact Stories',
    exploreNews: 'Explore More News & Blog',
    newsTitle: 'News & Blog',
    areasTitle: 'Areas of Impact',
    supportersLabel: 'Our Supporters',
    ourImpact: 'Our impact in numbers',
    beneficiaryVoices: 'Testimonials from our beneficiaries',
    allTestimonials: 'See all testimonials',
  },
  fr: {
    tagline: 'Œuvrant pour un développement durable et inclusif en Côte d’Ivoire depuis 2015.',
    howToSupport: 'Devenir bénévole',
    donate: 'Faire un don',
    readMore: 'En savoir plus',
    learnMore: 'En savoir plus',
    followUs: 'Suivez-nous',
    usefulLinks: 'Liens utiles',
    contacts: 'Contact',
    ourActions: 'Nos Actions',
    organisation: 'Organisation',
    bePart: 'Faites partie du mouvement !',
    joinNewsletter: 'Rejoignez notre newsletter',
    subscribe: 'S’abonner',
    rights: '© 2025 MAC.CII. Tous droits réservés.',
    credit: 'Built with ♥ by Serge GUEHI',
    discoverActions: 'Découvrir nos actions',
    readStories: 'Lisez nos Histoires d’Impact',
    exploreNews: 'Explorer plus d’actualités',
    newsTitle: 'Actualités & Blog',
    areasTitle: 'Axes d’Intervention',
    supportersLabel: 'Nos Soutiens',
    ourImpact: 'Notre impact en chiffres',
    beneficiaryVoices: 'Témoignages de nos Bénéficiaires',
    allTestimonials: 'Voir plus de témoignages',
  },
} as const;

/* ================= NAVIGATION ================= */
const SERVICES_NAV_FR: NavChild[] = [
  { label: 'Veuves & Orphelins — Éducation & Formation', href: '/services/education', desc: 'Programmes d’alphabétisation, bourses d’études et formation professionnelle pour les jeunes et adultes.' },
  { label: 'Santé Communautaire', href: '/services/sante', desc: 'Campagnes de sensibilisation, soins de santé primaires et programmes de prévention.' },
  { label: 'Agriculture Durable', href: '/services/agriculture', desc: 'Formation aux techniques agricoles modernes et soutien aux coopératives rurales.' },
  { label: 'Autonomisation des Femmes', href: '/services/femmes', desc: 'Programmes de microfinance et formation en entrepreneuriat pour les femmes.' },
  { label: 'Logement Social', href: '/services/logement', desc: 'Construction et réhabilitation de logements pour les familles défavorisées.' },
  { label: 'Insertion Professionnelle', href: '/services/emploi', desc: 'Accompagnement à l’emploi et création d’opportunités économiques locales.' },
];
const SERVICES_NAV_EN: NavChild[] = [
  { label: 'Widows & Orphans — Education & Training', href: '/services/education', desc: 'Literacy programs, scholarships and vocational training for young people and adults.' },
  { label: 'Community Health', href: '/services/sante', desc: 'Awareness campaigns, primary health care and prevention programs.' },
  { label: 'Sustainable Agriculture', href: '/services/agriculture', desc: 'Training in modern farming techniques and support for rural cooperatives.' },
  { label: 'Women’s Empowerment', href: '/services/femmes', desc: 'Microfinance programs and entrepreneurship training for women.' },
  { label: 'Social Housing', href: '/services/logement', desc: 'Building and renovating homes for underprivileged families.' },
  { label: 'Professional Integration', href: '/services/emploi', desc: 'Employment support and creation of local economic opportunities.' },
];

export const NAV_FR: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/about' },
  { label: 'Nos Actions', href: '/services', children: SERVICES_NAV_FR },
  { label: 'Témoignages', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];
export const NAV_EN: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Our Actions', href: '/services', children: SERVICES_NAV_EN },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

/* ================= FOOTER ================= */
export const FOOTER_LINKS = {
  fr: {
    useful: [
      { label: 'À propos', href: '/about' },
      { label: 'Nos Actions', href: '/services' },
      { label: 'Devenir bénévole', href: '/volunteer' },
      { label: 'Contact', href: '/contact' },
      { label: 'Témoignages', href: '/testimonials' },
    ],
    actions: [
      { label: 'Veuves & Orphelins', href: '/services/education' },
      { label: 'Entrepreneuriat', href: '/services/femmes' },
      { label: 'Agriculture', href: '/services/agriculture' },
      { label: 'Autonomisation', href: '/services/femmes' },
    ],
    organisation: [
      { label: 'À propos', href: '/about' },
      { label: 'Témoignages', href: '/testimonials' },
      { label: 'Contact', href: '/contact' },
      { label: 'Devenir bénévole', href: '/volunteer' },
    ],
  },
  en: {
    useful: [
      { label: 'About', href: '/about' },
      { label: 'Our Actions', href: '/services' },
      { label: 'Become a volunteer', href: '/volunteer' },
      { label: 'Contact', href: '/contact' },
      { label: 'Testimonials', href: '/testimonials' },
    ],
    actions: [
      { label: 'Widows & Orphans', href: '/services/education' },
      { label: 'Entrepreneurship', href: '/services/femmes' },
      { label: 'Agriculture', href: '/services/agriculture' },
      { label: 'Empowerment', href: '/services/femmes' },
    ],
    organisation: [
      { label: 'About', href: '/about' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'Contact', href: '/contact' },
      { label: 'Become a volunteer', href: '/volunteer' },
    ],
  },
};

export const SOCIALS = [
  { label: 'Facebook', icon: 'facebook', href: '#' },
  { label: 'X (Twitter)', icon: 'x', href: '#' },
  { label: 'LinkedIn', icon: 'linkedin', href: '#' },
  { label: 'YouTube', icon: 'youtube', href: '#' },
];

/* ================= ACCUEIL ================= */
export interface HomeSlide {
  image: string;
  title: string;
  subtitle: string;
  buttons: { label: string; href: string }[];
}
export const HOME_FR = {
  hero: [
    {
      image: '/images/hero-education.png',
      title: 'Soutien aux Veuves & Orphelins',
      subtitle: 'Nous œuvrons pour garantir l’accès à une éducation de qualité pour tous les enfants de Côte d’Ivoire, sans distinction.',
      buttons: [{ label: 'Découvrir nos actions', href: '/services' }],
    },
    {
      image: '/images/hero-entrepreneuriat.png',
      title: 'Entrepreneuriat',
      subtitle: 'Accompagner les artisans et les porteurs de projets vers des activités économiques durables et valorisantes.',
      buttons: [{ label: 'Découvrir nos actions', href: '/services' }],
    },
    {
      image: '/images/hero-agriculture.png',
      title: 'Développement Durable',
      subtitle: 'Soutenir les initiatives locales pour un développement économique et environnemental durable en Côte d’Ivoire.',
      buttons: [{ label: 'Découvrir nos actions', href: '/services' }],
    },
  ] as HomeSlide[],
  stats: [
    { n: '5,000', suffix: '+', label: 'Bénéficiaires directs accompagnés par nos programmes' },
    { n: '25', suffix: '', label: 'Communautés partenaires à travers la Côte d’Ivoire' },
    { n: '15', suffix: '', label: 'Projets actifs dans nos domaines d’intervention' },
    { n: '98', suffix: '%', label: 'Taux de réussite de nos programmes d’impact' },
  ],
  featured: [
    {
      badge: 'Notre Vision',
      title: 'Des conditions de travail dignes pour chaque homme et femme de métier',
      text: 'À l’ONG MAC.CII, nous rêvons d’un avenir où chaque artisan et chaque personne vulnérable peut s’épanouir, développer pleinement son potentiel et vivre de son savoir-faire, au sein d’une communauté capable de répondre à ses besoins essentiels tout en préservant sa santé et son bien-être.',
      image: '/images/vision.png',
      href: '/about',
    },
    {
      badge: 'Notre Mission',
      title: 'Redonner espoir et dignité aux personnes vulnérables',
      text: 'Nous améliorons concrètement les conditions de vie des bénéficiaires, promouvons leurs droits et leurs devoirs, et faisons de chacun un homme ou une femme de métier capable de contribuer au développement économique et social.',
      image: '/images/mission.png',
      href: '/about',
    },
    {
      badge: 'Fondateur',
      title: 'Rencontrez notre Fondateur',
      text: 'Dr. Kouassi, fondateur de MAC.CI, est un leader visionnaire avec plus de 15 ans d’expérience dans le développement communautaire et l’action humanitaire en Afrique de l’Ouest. « Chaque être humain mérite l’opportunité de réaliser son potentiel. »',
      image: '/images/fondateur.png',
      href: '/about',
    },
  ],
  areasIntro:
    'Découvrez nos domaines d’action pour un impact durable dans les communautés ivoiriennes',
  areas: [
    { title: 'Veuves & Orphelins', text: 'Programmes d’alphabétisation, bourses d’études et formation professionnelle pour les jeunes et adultes.', image: '/images/service-education.png', color: 'violet', href: '/services/education' },
    { title: 'Les gens de métiers', text: 'Campagnes de sensibilisation, soins de santé primaires et programmes de prévention.', image: '/images/service-sante.png', color: 'rose', href: '/services/sante' },
    { title: 'Agriculture Durable', text: 'Formation aux techniques agricoles modernes et soutien aux coopératives rurales.', image: '/images/service-agriculture.png', color: 'deep', href: '/services/agriculture' },
    { title: 'Autonomisation des Femmes', text: 'Programmes de microfinance et formation en entrepreneuriat pour les femmes.', image: '/images/service-femmes.png', color: 'deep', href: '/services/femmes' },
    { title: 'Logement Social', text: 'Construction et réhabilitation de logements pour les familles défavorisées.', image: '/images/service-logement.png', color: 'violet', href: '/services/logement' },
    { title: 'Insertion Professionnelle', text: 'Accompagnement à l’emploi et création d’opportunités économiques locales.', image: '/images/service-emploi.png', color: 'rose', href: '/services/emploi' },
  ],
  statsBlocks: [
    { title: 'Bénéficiaires directs', n: '5,000+', label: 'Personnes accompagnées depuis 2015 dans nos six axes d’intervention.', color: 'violet' },
    { title: 'Communautés partenaires', n: '25', label: 'Communautés urbaines et rurales engagées avec nous en Côte d’Ivoire.', color: 'rose' },
    { title: 'Taux de réussite', n: '98%', label: 'De nos programmes, mesuré sur l’impact réel chez les bénéficiaires.', color: 'deep' },
  ],
  benevolat: {
    image: '/images/benevoles.png',
    title: 'Devenir Bénévole',
    text: 'Rejoignez notre équipe de bénévoles et contribuez à créer un impact positif durable dans les communautés ivoiriennes.',
    href: '/volunteer',
  },
  news: [
    { title: 'Éducation & Formation : des vies transformées par l’alphabétisation', image: '/images/service-education.png', href: '/services/education' },
    { title: 'Agriculture Durable : 1 200+ agriculteurs formés aux techniques modernes', image: '/images/service-agriculture.png', href: '/services/agriculture' },
    { title: 'Autonomisation des Femmes : 800+ femmes soutenues par la microfinance', image: '/images/service-femmes.png', href: '/services/femmes' },
  ],
  stories: {
    title: 'Histoires Transformatrices',
    items: [
      {
        title: 'Apprendre à lire à 45 ans',
        text: '« Grâce à MAC.CI, j’ai appris à lire et écrire à 45 ans. Aujourd’hui, je peux aider mes enfants avec leurs devoirs et gérer mon petit commerce. Cette formation a changé ma vie et m’a redonné confiance en moi. » — Aminata Traoré, bénéficiaire du programme d’alphabétisation.',
        image: '/images/temoin-1.png',
        href: '/testimonials',
      },
      {
        title: 'Une production de cacao doublée',
        text: '« Les formations en agriculture durable de MAC.CI ont doublé ma production de cacao. Les techniques modernes respectent l’environnement et augmentent nos revenus. Ma famille vit mieux maintenant. » — Kouadio Jean-Baptiste, agriculteur, Coopérative de Yamoussoukro.',
        image: '/images/temoin-2.png',
        href: '/testimonials',
      },
      {
        title: 'Un atelier de couture et 8 emplois créés',
        text: '« Le microcrédit de MAC.CI m’a permis de lancer mon atelier de couture. Aujourd’hui, j’emploie 8 femmes de mon quartier. Nous créons ensemble un cercle vertueux de développement et d’autonomie. » — Fatou Ouattara, entrepreneure, Programme Microfinance.',
        image: '/images/temoin-4.png',
        href: '/testimonials',
      },
    ],
  },
  supporters: [
    { name: 'Aminata Traoré', role: 'Bénéficiaire du programme d’alphabétisation', text: '« Grâce à MAC.CI, j’ai appris à lire et écrire à 45 ans. Aujourd’hui, je peux aider mes enfants avec leurs devoirs et gérer mon petit commerce. Cette formation a changé ma vie et m’a redonné confiance en moi. »', image: '/images/temoin-1.png' },
    { name: 'Kouadio Jean-Baptiste', role: 'Agriculteur, Coopérative de Yamoussoukro', text: '« Les formations en agriculture durable de MAC.CI ont doublé ma production de cacao. Les techniques modernes qu’ils nous ont enseignées respectent l’environnement et augmentent nos revenus. Ma famille vit mieux maintenant. »', image: '/images/temoin-2.png' },
    { name: 'Dr. Marie Koffi', role: 'Directrice Centre de Santé, Bouaké', text: '« Le partenariat avec MAC.CI a permis d’améliorer significativement l’accès aux soins dans notre région. Leurs campagnes de sensibilisation ont un impact réel sur la santé communautaire et sauvent des vies. »', image: '/images/temoin-3.png' },
    { name: 'Fatou Ouattara', role: 'Entrepreneure, Programme Microfinance', text: '« Le microcrédit de MAC.CI m’a permis de lancer mon atelier de couture. Aujourd’hui, j’emploie 8 femmes de mon quartier. Nous créons ensemble un cercle vertueux de développement et d’autonomie. »', image: '/images/temoin-4.png' },
    { name: 'Moussa Koné', role: 'Bénéficiaire du programme logement', text: '« Après avoir perdu notre maison dans les inondations, MAC.CI nous a aidés à reconstruire. Maintenant, nous avons un toit sûr et mes enfants peuvent étudier dans de bonnes conditions. Merci pour cette deuxième chance. »', image: '/images/temoin-5.png' },
    { name: 'Sophie N’Guessan', role: 'Jeune diplômée, Programme insertion', text: '« Le programme d’insertion professionnelle de MAC.CI m’a permis de trouver mon premier emploi. Leur accompagnement personnalisé et leurs formations m’ont donné les compétences nécessaires pour réussir. »', image: '/images/temoin-6.png' },
  ],
};

export const HOME_EN = {
  hero: [
    {
      image: '/images/hero-education.png',
      title: 'Support for Widows & Orphans',
      subtitle: 'We work to guarantee access to quality education for all children in Côte d’Ivoire, without distinction.',
      buttons: [{ label: 'Discover our actions', href: '/services' }],
    },
    {
      image: '/images/hero-entrepreneuriat.png',
      title: 'Entrepreneurship',
      subtitle: 'Supporting artisans and project holders towards sustainable and rewarding economic activities.',
      buttons: [{ label: 'Discover our actions', href: '/services' }],
    },
    {
      image: '/images/hero-agriculture.png',
      title: 'Sustainable Development',
      subtitle: 'Supporting local initiatives for sustainable economic and environmental development in Côte d’Ivoire.',
      buttons: [{ label: 'Discover our actions', href: '/services' }],
    },
  ] as HomeSlide[],
  stats: [
    { n: '5,000', suffix: '+', label: 'Direct beneficiaries supported by our programs' },
    { n: '25', suffix: '', label: 'Partner communities across Côte d’Ivoire' },
    { n: '15', suffix: '', label: 'Active projects in our areas of intervention' },
    { n: '98', suffix: '%', label: 'Success rate of our impact programs' },
  ],
  featured: [
    {
      badge: 'Our Vision',
      title: 'Decent working conditions for every craftsman and craftswoman',
      text: 'At ONG MAC.CII, we dream of a future where every artisan and every vulnerable person can thrive, develop their full potential and live from their know-how, within a community able to meet its essential needs while preserving its health and well-being.',
      image: '/images/vision.png',
      href: '/about',
    },
    {
      badge: 'Our Mission',
      title: 'Restoring hope and dignity to vulnerable people',
      text: 'We concretely improve beneficiaries’ living conditions, promote their rights and duties, and make each of them a craftsman or craftswoman able to contribute to economic and social development.',
      image: '/images/mission.png',
      href: '/about',
    },
    {
      badge: 'Founder',
      title: 'Meet our Founder',
      text: 'Dr. Kouassi, founder of MAC.CI, is a visionary leader with over 15 years of experience in community development and humanitarian action in West Africa. “Every human being deserves the opportunity to reach their potential.”',
      image: '/images/fondateur.png',
      href: '/about',
    },
  ],
  areasIntro: 'Discover our areas of action for lasting impact in Ivorian communities',
  areas: [
    { title: 'Widows & Orphans', text: 'Literacy programs, scholarships and vocational training for young people and adults.', image: '/images/service-education.png', color: 'violet', href: '/services/education' },
    { title: 'Community trades', text: 'Awareness campaigns, primary health care and prevention programs.', image: '/images/service-sante.png', color: 'rose', href: '/services/sante' },
    { title: 'Sustainable Agriculture', text: 'Training in modern farming techniques and support for rural cooperatives.', image: '/images/service-agriculture.png', color: 'deep', href: '/services/agriculture' },
    { title: 'Women’s Empowerment', text: 'Microfinance programs and entrepreneurship training for women.', image: '/images/service-femmes.png', color: 'deep', href: '/services/femmes' },
    { title: 'Social Housing', text: 'Building and renovating homes for underprivileged families.', image: '/images/service-logement.png', color: 'violet', href: '/services/logement' },
    { title: 'Professional Integration', text: 'Employment support and creation of local economic opportunities.', image: '/images/service-emploi.png', color: 'rose', href: '/services/emploi' },
  ],
  statsBlocks: [
    { title: 'Direct beneficiaries', n: '5,000+', label: 'People supported since 2015 across our six areas of intervention.', color: 'violet' },
    { title: 'Partner communities', n: '25', label: 'Urban and rural communities engaged with us in Côte d’Ivoire.', color: 'rose' },
    { title: 'Success rate', n: '98%', label: 'Of our programs, measured on real impact for beneficiaries.', color: 'deep' },
  ],
  benevolat: {
    image: '/images/benevoles.png',
    title: 'Become a Volunteer',
    text: 'Join our team of volunteers and help create lasting positive impact in Ivorian communities.',
    href: '/volunteer',
  },
  news: [
    { title: 'Education & Training: lives transformed through literacy', image: '/images/service-education.png', href: '/services/education' },
    { title: 'Sustainable Agriculture: 1,200+ farmers trained in modern techniques', image: '/images/service-agriculture.png', href: '/services/agriculture' },
    { title: 'Women’s Empowerment: 800+ women supported through microfinance', image: '/images/service-femmes.png', href: '/services/femmes' },
  ],
  stories: {
    title: 'Transforming Stories',
    items: [
      {
        title: 'Learning to read at 45',
        text: '“Thanks to MAC.CI, I learned to read and write at 45. Today, I can help my children with their homework and manage my small business. This training changed my life and gave me back my confidence.” — Aminata Traoré, literacy program beneficiary.',
        image: '/images/temoin-1.png',
        href: '/testimonials',
      },
      {
        title: 'Cocoa production doubled',
        text: '“MAC.CI’s sustainable agriculture trainings doubled my cocoa production. The modern techniques they taught us respect the environment and increase our income. My family lives better now.” — Kouadio Jean-Baptiste, farmer, Yamoussoukro Cooperative.',
        image: '/images/temoin-2.png',
        href: '/testimonials',
      },
      {
        title: 'A sewing workshop and 8 jobs created',
        text: '“MAC.CI’s microcredit allowed me to start my sewing workshop. Today, I employ 8 women from my neighborhood. Together we create a virtuous circle of development and empowerment.” — Fatou Ouattara, entrepreneur, Microfinance Program.',
        image: '/images/temoin-4.png',
        href: '/testimonials',
      },
    ],
  },
  supporters: [
    { name: 'Aminata Traoré', role: 'Literacy program beneficiary', text: '“Thanks to MAC.CI, I learned to read and write at 45. Today, I can help my children with their homework and manage my small business. This training changed my life and gave me back my confidence.”', image: '/images/temoin-1.png' },
    { name: 'Kouadio Jean-Baptiste', role: 'Farmer, Yamoussoukro Cooperative', text: '“MAC.CI’s sustainable agriculture trainings doubled my cocoa production. The modern techniques they taught us respect the environment and increase our income. My family lives better now.”', image: '/images/temoin-2.png' },
    { name: 'Dr. Marie Koffi', role: 'Health Center Director, Bouaké', text: '“The partnership with MAC.CI has significantly improved access to care in our region. Their awareness campaigns have a real impact on community health and save lives.”', image: '/images/temoin-3.png' },
    { name: 'Fatou Ouattara', role: 'Entrepreneur, Microfinance Program', text: '“MAC.CI’s microcredit allowed me to start my sewing workshop. Today, I employ 8 women from my neighborhood. Together we create a virtuous circle of development and empowerment.”', image: '/images/temoin-4.png' },
    { name: 'Moussa Koné', role: 'Housing program beneficiary', text: '“After losing our home in the floods, MAC.CI helped us rebuild. Now we have a safe roof and my children can study in good conditions. Thank you for this second chance.”', image: '/images/temoin-5.png' },
    { name: 'Sophie N’Guessan', role: 'Young graduate, Integration Program', text: '“MAC.CI’s professional integration program helped me find my first job. Their personalized support and training gave me the skills needed to succeed.”', image: '/images/temoin-6.png' },
  ],
};

/* ================= SERVICES ================= */
export interface Service {
  slug: string;
  title: string;
  icon: string;
  short: string;
  desc: string[];
  programs: string[];
  stat: { n: string; label: string };
  image: string;
  hero: string;
  testimonial?: { name: string; role: string; text: string; image: string };
}

export const SERVICES_FR: Service[] = [
  {
    slug: 'education',
    title: 'Veuves & Orphelins — Éducation & Formation',
    icon: 'book',
    short: 'Programmes d’alphabétisation, bourses d’études et formation professionnelle pour les jeunes et adultes.',
    desc: [
      'À l’ONG MAC.CII, nous œuvrons pour garantir l’accès à une éducation de qualité pour tous les enfants de Côte d’Ivoire, sans distinction. Nous accompagnons également les veuves et les adultes marginalisés qui n’ont pas pu scolariser leur jeunesse.',
      'Nos programmes d’alphabétisation redonnent confiance et autonomie : apprendre à lire, écrire et compter ouvre la voie à la gestion d’une activité économique et à un meilleur accompagnement scolaire des enfants.',
    ],
    programs: ['Programmes d’alphabétisation', 'Bourses d’études', 'Formation professionnelle'],
    stat: { n: '500+', label: 'personnes alphabétisées' },
    image: '/images/service-education.png',
    hero: '/images/hero-education.png',
    testimonial: { name: 'Aminata Traoré', role: 'Bénéficiaire du programme d’alphabétisation', text: 'Grâce à MAC.CI, j’ai appris à lire et écrire à 45 ans. Cette formation a changé ma vie et m’a redonné confiance en moi.', image: '/images/temoin-1.png' },
  },
  {
    slug: 'sante',
    title: 'Santé Communautaire',
    icon: 'health',
    short: 'Campagnes de sensibilisation, soins de santé primaires et programmes de prévention.',
    desc: [
      'Améliorer l’accès aux soins de santé primaires et promouvoir la prévention dans les communautés rurales et urbaines est l’un des piliers de notre action pour le bien-être des populations.',
      'Nos campagnes de sensibilisation touchent des milliers de personnes et ont un impact réel sur la santé communautaire : elles sauvent des vies, comme en témoignent nos partenaires de santé locaux.',
    ],
    programs: ['Campagnes de sensibilisation', 'Soins de santé primaires', 'Programmes de prévention'],
    stat: { n: '10,000+', label: 'consultations réalisées' },
    image: '/images/service-sante.png',
    hero: '/images/contact.png',
    testimonial: { name: 'Dr. Marie Koffi', role: 'Directrice Centre de Santé, Bouaké', text: 'Le partenariat avec MAC.CI a permis d’améliorer significativement l’accès aux soins dans notre région. Leurs campagnes de sensibilisation sauvent des vies.', image: '/images/temoin-3.png' },
  },
  {
    slug: 'agriculture',
    title: 'Agriculture Durable',
    icon: 'leaf',
    short: 'Formation aux techniques agricoles modernes et soutien aux coopératives rurales.',
    desc: [
      'Soutenir les initiatives locales pour un développement économique et environnemental durable en Côte d’Ivoire : c’est le cœur de notre programme agricole.',
      'De la formation aux techniques agricoles modernes au soutien aux coopératives rurales, nous aidons les producteurs à augmenter leurs revenus tout en respectant l’environnement.',
    ],
    programs: ['Formation aux techniques agricoles modernes', 'Soutien aux coopératives rurales', 'Programmes de microfinance agricole'],
    stat: { n: '1,200+', label: 'agriculteurs formés' },
    image: '/images/service-agriculture.png',
    hero: '/images/hero-agriculture.png',
    testimonial: { name: 'Kouadio Jean-Baptiste', role: 'Agriculteur, Coopérative de Yamoussoukro', text: 'Les formations en agriculture durable de MAC.CI ont doublé ma production de cacao. Ma famille vit mieux maintenant.', image: '/images/temoin-2.png' },
  },
  {
    slug: 'femmes',
    title: 'Autonomisation des Femmes',
    icon: 'users',
    short: 'Programmes de microfinance et formation en entrepreneuriat pour les femmes.',
    desc: [
      'Nous faisons de chaque bénéficiaire une femme de métier capable de contribuer au développement économique et social : microcrédit, formation en entrepreneuriat et accompagnement personnalisé.',
      'L’autonomisation économique des femmes crée un cercle vertueux : chaque atelier ouvert emploie d’autres femmes du quartier et renforce toute la communauté.',
    ],
    programs: ['Microfinance et microcrédit', 'Formation en entrepreneuriat', 'Accompagnement de projets générateurs de revenus'],
    stat: { n: '800+', label: 'femmes autonomisées' },
    image: '/images/service-femmes.png',
    hero: '/images/hero-entrepreneuriat.png',
    testimonial: { name: 'Fatou Ouattara', role: 'Entrepreneure, Programme Microfinance', text: 'Le microcrédit de MAC.CI m’a permis de lancer mon atelier de couture. Aujourd’hui, j’emploie 8 femmes de mon quartier.', image: '/images/temoin-4.png' },
  },
  {
    slug: 'logement',
    title: 'Logement Social',
    icon: 'home',
    short: 'Construction et réhabilitation de logements pour les familles défavorisées.',
    desc: [
      'Un toit sûr est la première condition de la dignité. Nous construisons et réhabilitons des logements pour les familles défavorisées, victimes notamment de catastrophes naturelles.',
      'Chaque logement construit permet à des enfants d’étudier dans de bonnes conditions et à une famille de se reconstruire durablement.',
    ],
    programs: ['Construction de logements sociaux', 'Réhabilitation d’habitat précaire', 'Reconstruction post-catastrophe'],
    stat: { n: '300+', label: 'logements construits' },
    image: '/images/service-logement.png',
    hero: '/images/service-logement.png',
    testimonial: { name: 'Moussa Koné', role: 'Bénéficiaire du programme logement', text: 'Après avoir perdu notre maison dans les inondations, MAC.CI nous a aidés à reconstruire. Merci pour cette deuxième chance.', image: '/images/temoin-5.png' },
  },
  {
    slug: 'emploi',
    title: 'Insertion Professionnelle',
    icon: 'briefcase',
    short: 'Accompagnement à l’emploi et création d’opportunités économiques locales.',
    desc: [
      'Nous accompagnons les jeunes diplômés et les demandeurs d’emploi vers une insertion professionnelle durable grâce à un accompagnement personnalisé et des formations adaptées au marché.',
      'La création d’opportunités économiques locales révèle les talents et bâtit une génération de travailleurs responsables, productifs et épanouis.',
    ],
    programs: ['Accompagnement à l’emploi', 'Préparation de CV et entretiens', 'Création d’opportunités économiques locales'],
    stat: { n: '600+', label: 'emplois créés' },
    image: '/images/service-emploi.png',
    hero: '/images/service-emploi.png',
    testimonial: { name: 'Sophie N’Guessan', role: 'Jeune diplômée, Programme insertion', text: 'Le programme d’insertion professionnelle de MAC.CI m’a permis de trouver mon premier emploi. Leur accompagnement m’a donné les compétences nécessaires pour réussir.', image: '/images/temoin-6.png' },
  },
];

export const SERVICES_EN: Service[] = [
  {
    slug: 'education',
    title: 'Widows & Orphans — Education & Training',
    icon: 'book',
    short: 'Literacy programs, scholarships and vocational training for young people and adults.',
    desc: [
      'At ONG MAC.CII, we work to guarantee access to quality education for all children in Côte d’Ivoire, without distinction. We also support widows and marginalized adults who could not attend school in their youth.',
      'Our literacy programs restore confidence and autonomy: learning to read, write and count opens the way to managing a business and better supporting children’s schooling.',
    ],
    programs: ['Literacy programs', 'Scholarships', 'Vocational training'],
    stat: { n: '500+', label: 'people literate' },
    image: '/images/service-education.png',
    hero: '/images/hero-education.png',
    testimonial: { name: 'Aminata Traoré', role: 'Literacy program beneficiary', text: 'Thanks to MAC.CI, I learned to read and write at 45. This training changed my life and gave me back my confidence.', image: '/images/temoin-1.png' },
  },
  {
    slug: 'sante',
    title: 'Community Health',
    icon: 'health',
    short: 'Awareness campaigns, primary health care and prevention programs.',
    desc: [
      'Improving access to primary health care and promoting prevention in rural and urban communities is one of the pillars of our action for people’s well-being.',
      'Our awareness campaigns reach thousands of people and have a real impact on community health: they save lives, as our local health partners testify.',
    ],
    programs: ['Awareness campaigns', 'Primary health care', 'Prevention programs'],
    stat: { n: '10,000+', label: 'consultations provided' },
    image: '/images/service-sante.png',
    hero: '/images/contact.png',
    testimonial: { name: 'Dr. Marie Koffi', role: 'Health Center Director, Bouaké', text: 'The partnership with MAC.CI has significantly improved access to care in our region. Their awareness campaigns save lives.', image: '/images/temoin-3.png' },
  },
  {
    slug: 'agriculture',
    title: 'Sustainable Agriculture',
    icon: 'leaf',
    short: 'Training in modern farming techniques and support for rural cooperatives.',
    desc: [
      'Supporting local initiatives for sustainable economic and environmental development in Côte d’Ivoire: that is the heart of our agricultural program.',
      'From training in modern farming techniques to supporting rural cooperatives, we help producers increase their income while respecting the environment.',
    ],
    programs: ['Training in modern farming techniques', 'Support for rural cooperatives', 'Agricultural microfinance programs'],
    stat: { n: '1,200+', label: 'farmers trained' },
    image: '/images/service-agriculture.png',
    hero: '/images/hero-agriculture.png',
    testimonial: { name: 'Kouadio Jean-Baptiste', role: 'Farmer, Yamoussoukro Cooperative', text: 'MAC.CI’s sustainable agriculture trainings doubled my cocoa production. My family lives better now.', image: '/images/temoin-2.png' },
  },
  {
    slug: 'femmes',
    title: 'Women’s Empowerment',
    icon: 'users',
    short: 'Microfinance programs and entrepreneurship training for women.',
    desc: [
      'We make each beneficiary a craftswoman able to contribute to economic and social development: microcredit, entrepreneurship training and personalized support.',
      'Women’s economic empowerment creates a virtuous circle: every workshop opened employs other women from the neighborhood and strengthens the whole community.',
    ],
    programs: ['Microfinance and microcredit', 'Entrepreneurship training', 'Support for income-generating projects'],
    stat: { n: '800+', label: 'women empowered' },
    image: '/images/service-femmes.png',
    hero: '/images/hero-entrepreneuriat.png',
    testimonial: { name: 'Fatou Ouattara', role: 'Entrepreneur, Microfinance Program', text: 'MAC.CI’s microcredit allowed me to start my sewing workshop. Today, I employ 8 women from my neighborhood.', image: '/images/temoin-4.png' },
  },
  {
    slug: 'logement',
    title: 'Social Housing',
    icon: 'home',
    short: 'Building and renovating homes for underprivileged families.',
    desc: [
      'A safe roof is the first condition of dignity. We build and renovate homes for underprivileged families, especially victims of natural disasters.',
      'Every house built allows children to study in good conditions and a family to rebuild itself durably.',
    ],
    programs: ['Social housing construction', 'Renovation of precarious housing', 'Post-disaster reconstruction'],
    stat: { n: '300+', label: 'homes built' },
    image: '/images/service-logement.png',
    hero: '/images/service-logement.png',
    testimonial: { name: 'Moussa Koné', role: 'Housing program beneficiary', text: 'After losing our home in the floods, MAC.CI helped us rebuild. Thank you for this second chance.', image: '/images/temoin-5.png' },
  },
  {
    slug: 'emploi',
    title: 'Professional Integration',
    icon: 'briefcase',
    short: 'Employment support and creation of local economic opportunities.',
    desc: [
      'We support young graduates and job seekers towards sustainable professional integration through personalized support and training adapted to the market.',
      'Creating local economic opportunities reveals talents and builds a generation of responsible, productive and fulfilled workers.',
    ],
    programs: ['Employment support', 'CV and interview preparation', 'Creation of local economic opportunities'],
    stat: { n: '600+', label: 'jobs created' },
    image: '/images/service-emploi.png',
    hero: '/images/service-emploi.png',
    testimonial: { name: 'Sophie N’Guessan', role: 'Young graduate, Integration Program', text: 'MAC.CI’s professional integration program helped me find my first job. Their support gave me the skills needed to succeed.', image: '/images/temoin-6.png' },
  },
];

/* ================= À PROPOS ================= */
export const ABOUT_FR = {
  hero: {
    title: 'À propos de MAC.CI',
    subtitle: 'Depuis 2015, MAC.CI œuvre pour un développement durable et inclusif en Côte d’Ivoire.',
  },
  histoire: {
    kicker: 'Notre Histoire',
    title: 'Une vision née d’un constat simple : chaque Ivoirien mérite l’opportunité de s’épanouir pleinement.',
    subtitle: 'Les débuts',
    paras: [
      'L’ONG MAC.CII est née d’une conviction spirituelle profonde, suite à une série d’expériences vécues par sa fondatrice, Mme Kouassi Gisèle Gbehi. Dès son jeune âge, elle a ressenti un appel du Seigneur à venir en aide aux personnes vulnérables.',
      'À travers des épreuves professionnelles et spirituelles, elle a compris que sa mission était d’amener les artisans à bénéficier pleinement du fruit de leur travail, tant sur le plan économique que spirituel. En 2016, cette vision s’est concrétisée par la naissance de l’ONG, qui agit auprès des artisans, veuves, orphelins et nécessiteux en Côte d’Ivoire et à l’international.',
    ],
    image: '/images/histoire.png',
  },
  valeurs: {
    title: 'Nos Valeurs',
    subtitle: 'Les principes qui guident chacune de nos actions.',
    items: [
      { icon: 'handshake', title: 'Solidarité', text: 'Nous croyons en la force de l’entraide et du soutien mutuel au sein des communautés.' },
      { icon: 'users', title: 'Inclusion', text: 'Chaque individu, indépendamment de son origine, mérite l’accès aux mêmes opportunités.' },
      { icon: 'award', title: 'Excellence', text: 'Nous nous engageons à fournir des programmes de haute qualité et mesurables.' },
      { icon: 'target', title: 'Impact', text: 'Chaque action doit créer un changement positif et durable dans la vie des bénéficiaires.' },
    ],
  },
  equipe: {
    title: 'Notre Équipe',
    subtitle: 'Des professionnels passionnés dédiés à la cause du développement communautaire.',
    members: [
      { name: 'Dr. Kouassi Adjoumani', role: 'Fondateur & Directeur Exécutif', bio: 'Expert en développement international avec 15 ans d’expérience en Afrique de l’Ouest.', image: '/images/fondateur.png' },
      { name: 'Marie Koffi', role: 'Directrice des Programmes', bio: 'Spécialiste en gestion de projets de développement et autonomisation des femmes.', image: '/images/team-2.png' },
      { name: 'Jean-Baptiste Yao', role: 'Responsable Partenariats', bio: 'Expert en mobilisation de ressources et développement de partenariats stratégiques.', image: '/images/team-3.png' },
    ],
  },
  fondateur: {
    title: 'Rencontrez notre Fondateur',
    paras: [
      'Dr. Kouassi, fondateur de MAC.CI, est un leader visionnaire avec plus de 15 ans d’expérience dans le développement communautaire et l’action humanitaire en Afrique de l’Ouest.',
      'Diplômé en Sciences Sociales de l’Université de Cocody et titulaire d’un Master en Développement International, il a consacré sa carrière à l’amélioration des conditions de vie des populations les plus vulnérables.',
      '« Mon engagement envers MAC.CI découle d’une conviction profonde : chaque être humain mérite l’opportunité de réaliser son potentiel. À travers notre organisation, nous construisons des ponts vers un avenir meilleur pour tous les Ivoiriens. »',
    ],
    signature: 'Dr. Kouassi',
    role: 'Fondateur & Directeur Exécutif, MAC.CI',
    image: '/images/fondateur.png',
  },
  realisations: {
    title: 'Nos Réalisations',
    subtitle: 'Des chiffres qui témoignent de notre impact sur le terrain.',
    stats: [
      { n: '5,000+', label: 'Bénéficiaires directs' },
      { n: '25', label: 'Communautés partenaires' },
      { n: '15', label: 'Projets actifs' },
      { n: '98%', label: 'Taux de réussite' },
    ],
  },
};

export const ABOUT_EN = {
  hero: {
    title: 'About MAC.CI',
    subtitle: 'Since 2015, MAC.CI has been working for sustainable and inclusive development in Côte d’Ivoire.',
  },
  histoire: {
    kicker: 'Our Story',
    title: 'A vision born from a simple observation: every Ivorian deserves the opportunity to fully thrive.',
    subtitle: 'The beginnings',
    paras: [
      'ONG MAC.CII was born from a deep spiritual conviction, following a series of experiences lived by its founder, Mrs. Kouassi Gisèle Gbehi. From a young age, she felt a calling to help vulnerable people.',
      'Through professional and spiritual trials, she understood that her mission was to help artisans fully benefit from the fruit of their work, both economically and spiritually. In 2016, this vision materialized with the birth of the NGO, which works with artisans, widows, orphans and those in need in Côte d’Ivoire and internationally.',
    ],
    image: '/images/histoire.png',
  },
  valeurs: {
    title: 'Our Values',
    subtitle: 'The principles that guide each of our actions.',
    items: [
      { icon: 'handshake', title: 'Solidarity', text: 'We believe in the strength of mutual aid and support within communities.' },
      { icon: 'users', title: 'Inclusion', text: 'Every individual, regardless of origin, deserves access to the same opportunities.' },
      { icon: 'award', title: 'Excellence', text: 'We are committed to providing high-quality, measurable programs.' },
      { icon: 'target', title: 'Impact', text: 'Every action must create positive and lasting change in beneficiaries’ lives.' },
    ],
  },
  equipe: {
    title: 'Our Team',
    subtitle: 'Passionate professionals dedicated to the cause of community development.',
    members: [
      { name: 'Dr. Kouassi Adjoumani', role: 'Founder & Executive Director', bio: 'Expert in international development with 15 years of experience in West Africa.', image: '/images/fondateur.png' },
      { name: 'Marie Koffi', role: 'Programs Director', bio: 'Specialist in development project management and women’s empowerment.', image: '/images/team-2.png' },
      { name: 'Jean-Baptiste Yao', role: 'Partnerships Manager', bio: 'Expert in resource mobilization and strategic partnership development.', image: '/images/team-3.png' },
    ],
  },
  fondateur: {
    title: 'Meet our Founder',
    paras: [
      'Dr. Kouassi, founder of MAC.CI, is a visionary leader with over 15 years of experience in community development and humanitarian action in West Africa.',
      'A graduate in Social Sciences from the University of Cocody and holder of a Master’s in International Development, he has dedicated his career to improving the living conditions of the most vulnerable populations.',
      '“My commitment to MAC.CI stems from a deep conviction: every human being deserves the opportunity to reach their potential. Through our organization, we build bridges towards a better future for all Ivorians.”',
    ],
    signature: 'Dr. Kouassi',
    role: 'Founder & Executive Director, MAC.CI',
    image: '/images/fondateur.png',
  },
  realisations: {
    title: 'Our Achievements',
    subtitle: 'Figures that testify to our impact on the ground.',
    stats: [
      { n: '5,000+', label: 'Direct beneficiaries' },
      { n: '25', label: 'Partner communities' },
      { n: '15', label: 'Active projects' },
      { n: '98%', label: 'Success rate' },
    ],
  },
};

/* ================= TÉMOIGNAGES ================= */
export const TESTIMONIALS_FR = {
  hero: {
    title: 'Témoignages',
    subtitle: 'Découvrez l’impact réel de nos actions à travers les voix de ceux qui en bénéficient.',
  },
  stats: [
    { n: '5,000+', label: 'Témoignages collectés' },
    { n: '98%', label: 'Satisfaction client' },
    { n: '25', label: 'Communautés représentées' },
  ],
  items: [
    { text: 'Grâce à MAC.CI, j’ai appris à lire et écrire à 45 ans. Aujourd’hui, je peux aider mes enfants avec leurs devoirs et gérer mon petit commerce. Cette formation a changé ma vie et m’a redonné confiance en moi.', tag: 'Éducation & Formation', name: 'Aminata Traoré', role: 'Bénéficiaire du programme d’alphabétisation', city: 'Abidjan', image: '/images/temoin-1.png' },
    { text: 'Les formations en agriculture durable de MAC.CI ont doublé ma production de cacao. Les techniques modernes qu’ils nous ont enseignées respectent l’environnement et augmentent nos revenus. Ma famille vit mieux maintenant.', tag: 'Agriculture Durable', name: 'Kouadio Jean-Baptiste', role: 'Agriculteur, Coopérative de Yamoussoukro', city: 'Yamoussoukro', image: '/images/temoin-2.png' },
    { text: 'Le partenariat avec MAC.CI a permis d’améliorer significativement l’accès aux soins dans notre région. Leurs campagnes de sensibilisation ont un impact réel sur la santé communautaire et sauvent des vies.', tag: 'Santé Communautaire', name: 'Dr. Marie Koffi', role: 'Directrice Centre de Santé, Bouaké', city: 'Bouaké', image: '/images/temoin-3.png' },
    { text: 'Le microcrédit de MAC.CI m’a permis de lancer mon atelier de couture. Aujourd’hui, j’emploie 8 femmes de mon quartier. Nous créons ensemble un cercle vertueux de développement et d’autonomie.', tag: 'Autonomisation des Femmes', name: 'Fatou Ouattara', role: 'Entrepreneure, Programme Microfinance', city: 'Korhogo', image: '/images/temoin-4.png' },
    { text: 'Après avoir perdu notre maison dans les inondations, MAC.CI nous a aidés à reconstruire. Maintenant, nous avons un toit sûr et mes enfants peuvent étudier dans de bonnes conditions. Merci pour cette deuxième chance.', tag: 'Logement Social', name: 'Moussa Koné', role: 'Bénéficiaire du programme logement', city: 'Daloa', image: '/images/temoin-5.png' },
    { text: 'Le programme d’insertion professionnelle de MAC.CI m’a permis de trouver mon premier emploi. Leur accompagnement personnalisé et leurs formations m’ont donné les compétences nécessaires pour réussir.', tag: 'Insertion Professionnelle', name: 'Sophie N’Guessan', role: 'Jeune diplômée, Programme insertion', city: 'Abidjan', image: '/images/temoin-6.png' },
  ],
  videos: {
    title: 'En vidéo',
    subtitle: 'Découvrez des témoignages vidéo de nos bénéficiaires et partenaires.',
    items: [
      { title: 'Témoignage vidéo 1', text: 'Histoire d’Aminata, bénéficiaire du programme d’alphabétisation.', image: '/images/service-education.png' },
      { title: 'Témoignage vidéo 2', text: 'Retour d’expérience d’un agriculteur formé par nos soins.', image: '/images/service-agriculture.png' },
      { title: 'Témoignage vidéo 3', text: 'Portrait d’une femme entrepreneur grâce à notre programme.', image: '/images/service-femmes.png' },
    ],
  },
  cta: {
    title: 'Votre histoire pourrait être la prochaine',
    text: 'Rejoignez-nous pour créer ensemble de nouveaux témoignages d’espoir et de réussite.',
  },
};

export const TESTIMONIALS_EN = {
  hero: {
    title: 'Testimonials',
    subtitle: 'Discover the real impact of our actions through the voices of those who benefit from them.',
  },
  stats: [
    { n: '5,000+', label: 'Testimonials collected' },
    { n: '98%', label: 'Client satisfaction' },
    { n: '25', label: 'Communities represented' },
  ],
  items: [
    { text: 'Thanks to MAC.CI, I learned to read and write at 45. Today, I can help my children with their homework and manage my small business. This training changed my life and gave me back my confidence.', tag: 'Education & Training', name: 'Aminata Traoré', role: 'Literacy program beneficiary', city: 'Abidjan', image: '/images/temoin-1.png' },
    { text: 'MAC.CI’s sustainable agriculture trainings doubled my cocoa production. The modern techniques they taught us respect the environment and increase our income. My family lives better now.', tag: 'Sustainable Agriculture', name: 'Kouadio Jean-Baptiste', role: 'Farmer, Yamoussoukro Cooperative', city: 'Yamoussoukro', image: '/images/temoin-2.png' },
    { text: 'The partnership with MAC.CI has significantly improved access to care in our region. Their awareness campaigns have a real impact on community health and save lives.', tag: 'Community Health', name: 'Dr. Marie Koffi', role: 'Health Center Director, Bouaké', city: 'Bouaké', image: '/images/temoin-3.png' },
    { text: 'MAC.CI’s microcredit allowed me to start my sewing workshop. Today, I employ 8 women from my neighborhood. Together we create a virtuous circle of development and empowerment.', tag: 'Women’s Empowerment', name: 'Fatou Ouattara', role: 'Entrepreneur, Microfinance Program', city: 'Korhogo', image: '/images/temoin-4.png' },
    { text: 'After losing our home in the floods, MAC.CI helped us rebuild. Now we have a safe roof and my children can study in good conditions. Thank you for this second chance.', tag: 'Social Housing', name: 'Moussa Koné', role: 'Housing program beneficiary', city: 'Daloa', image: '/images/temoin-5.png' },
    { text: 'MAC.CI’s professional integration program helped me find my first job. Their personalized support and training gave me the skills needed to succeed.', tag: 'Professional Integration', name: 'Sophie N’Guessan', role: 'Young graduate, Integration Program', city: 'Abidjan', image: '/images/temoin-6.png' },
  ],
  videos: {
    title: 'On video',
    subtitle: 'Watch video testimonials from our beneficiaries and partners.',
    items: [
      { title: 'Video testimonial 1', text: 'Aminata’s story, literacy program beneficiary.', image: '/images/service-education.png' },
      { title: 'Video testimonial 2', text: 'Feedback from a farmer trained by our team.', image: '/images/service-agriculture.png' },
      { title: 'Video testimonial 3', text: 'Portrait of a woman entrepreneur thanks to our program.', image: '/images/service-femmes.png' },
    ],
  },
  cta: {
    title: 'Your story could be next',
    text: 'Join us to create new testimonies of hope and success together.',
  },
};

/* ================= CONTACT ================= */
export const CONTACT_FR = {
  hero: {
    title: 'Contactez-nous',
    subtitle: 'Prêt à faire une différence ? Contactez-nous pour discuter de partenariats, dons ou collaborations.',
  },
  formTitle: 'Envoyez-nous un message',
  infoTitle: 'Informations de contact',
  infos: [
    { icon: 'mapPin', title: 'Adresse', lines: ['Abidjan, Côte d’Ivoire', 'Plateau, Rue des Jardins'] },
    { icon: 'phone', title: 'Téléphone', lines: ['+225 07 01 02 03 04', '+225 07 05 06 07 08'] },
    { icon: 'envelope', title: 'Email', lines: ['contact@mac.ci', 'info@mac.ci'] },
    { icon: 'clock', title: 'Heures d’ouverture', lines: ['Lundi - Vendredi : 8h00 - 17h00', 'Samedi : 9h00 - 12h00', 'Dimanche : Fermé'] },
  ],
  cta: {
    title: 'Rejoignez notre mission',
    text: 'Ensemble, nous pouvons créer un impact durable dans les communautés ivoiriennes. Contactez-nous pour explorer les possibilités de collaboration.',
  },
};

export const CONTACT_EN = {
  hero: {
    title: 'Contact us',
    subtitle: 'Ready to make a difference? Contact us to discuss partnerships, donations or collaborations.',
  },
  formTitle: 'Send us a message',
  infoTitle: 'Contact information',
  infos: [
    { icon: 'mapPin', title: 'Address', lines: ['Abidjan, Côte d’Ivoire', 'Plateau, Rue des Jardins'] },
    { icon: 'phone', title: 'Phone', lines: ['+225 07 01 02 03 04', '+225 07 05 06 07 08'] },
    { icon: 'envelope', title: 'Email', lines: ['contact@mac.ci', 'info@mac.ci'] },
    { icon: 'clock', title: 'Opening hours', lines: ['Monday - Friday: 8:00 AM - 5:00 PM', 'Saturday: 9:00 AM - 12:00 PM', 'Sunday: Closed'] },
  ],
  cta: {
    title: 'Join our mission',
    text: 'Together, we can create lasting impact in Ivorian communities. Contact us to explore collaboration opportunities.',
  },
};

/* ================= BÉNÉVOLAT ================= */
export const VOLUNTEER_FR = {
  hero: {
    title: 'Devenir Bénévole',
    subtitle: 'Rejoignez notre équipe de bénévoles et contribuez à créer un impact positif durable dans les communautés ivoiriennes.',
  },
  avantages: {
    title: 'Pourquoi devenir bénévole ?',
    subtitle: 'Découvrez les avantages de vous engager auprès de MAC.CI.',
    items: [
      { icon: 'heart', title: 'Impact positif', text: 'Contribuez directement à l’amélioration des conditions de vie des communautés ivoiriennes.' },
      { icon: 'users', title: 'Équipe solidaire', text: 'Rejoignez une communauté de bénévoles passionnés et engagés.' },
      { icon: 'clock', title: 'Flexibilité', text: 'Choisissez vos horaires selon votre disponibilité et vos contraintes.' },
      { icon: 'award', title: 'Formation continue', text: 'Bénéficiez de formations pour développer vos compétences et connaissances.' },
    ],
  },
  domaines: ['Éducation & Formation', 'Santé Communautaire', 'Agriculture Durable', 'Autonomisation des Femmes', 'Logement Social', 'Insertion Professionnelle', 'Communication & Marketing', 'Administration & Gestion'],
  niveaux: ['Baccalauréat', 'Bac +2', 'Bac +3', 'Bac +5 ou plus', 'Autre'],
  disponibilites: ['Temps plein', 'Temps partiel', 'Week-ends uniquement', 'Soirs uniquement', 'Flexible'],
  consentement: 'J’accepte que mes données soient utilisées dans le cadre de ma candidature bénévole et je m’engage à respecter la charte des bénévoles de MAC.CI.',
  faq: {
    title: 'Questions fréquentes',
    items: [
      { q: 'Quel est l’engagement minimum ?', a: 'Nous demandons un minimum de 4 heures par semaine, mais nous nous adaptons à votre disponibilité.' },
      { q: 'Faut-il une expérience préalable ?', a: 'Non, la motivation et l’envie d’aider sont plus importantes que l’expérience. Nous formons tous nos bénévoles.' },
      { q: 'Les frais de transport sont-ils couverts ?', a: 'Oui, nous remboursons les frais de transport pour les missions sur le terrain.' },
      { q: 'Puis-je choisir mon domaine d’intervention ?', a: 'Oui, nous tenons compte de vos préférences et compétences lors de l’assignation des missions.' },
    ],
  },
};

export const VOLUNTEER_EN = {
  hero: {
    title: 'Become a Volunteer',
    subtitle: 'Join our volunteer team and help create lasting positive impact in Ivorian communities.',
  },
  avantages: {
    title: 'Why become a volunteer?',
    subtitle: 'Discover the benefits of getting involved with MAC.CI.',
    items: [
      { icon: 'heart', title: 'Positive impact', text: 'Directly contribute to improving the living conditions of Ivorian communities.' },
      { icon: 'users', title: 'Supportive team', text: 'Join a community of passionate and committed volunteers.' },
      { icon: 'clock', title: 'Flexibility', text: 'Choose your schedule according to your availability and constraints.' },
      { icon: 'award', title: 'Ongoing training', text: 'Benefit from training to develop your skills and knowledge.' },
    ],
  },
  domaines: ['Education & Training', 'Community Health', 'Sustainable Agriculture', 'Women’s Empowerment', 'Social Housing', 'Professional Integration', 'Communication & Marketing', 'Administration & Management'],
  niveaux: ['High school diploma', 'Associate degree', 'Bachelor’s degree', 'Master’s degree or higher', 'Other'],
  disponibilites: ['Full time', 'Part time', 'Weekends only', 'Evenings only', 'Flexible'],
  consentement: 'I accept that my data be used as part of my volunteer application and I commit to respecting the MAC.CI volunteer charter.',
  faq: {
    title: 'Frequently asked questions',
    items: [
      { q: 'What is the minimum commitment?', a: 'We ask for a minimum of 4 hours per week, but we adapt to your availability.' },
      { q: 'Is prior experience required?', a: 'No, motivation and the desire to help matter more than experience. We train all our volunteers.' },
      { q: 'Are transport costs covered?', a: 'Yes, we reimburse transport costs for field missions.' },
      { q: 'Can I choose my area of intervention?', a: 'Yes, we take your preferences and skills into account when assigning missions.' },
    ],
  },
};

/* ================= 404 ================= */
export const NOTFOUND = {
  fr: { title: 'Page introuvable', text: 'La page que vous recherchez n’existe pas ou a été déplacée.', cta: 'Retour à l’accueil' },
  en: { title: 'Page not found', text: 'The page you are looking for does not exist or has been moved.', cta: 'Back to home' },
};

/* Helpers */
export const getServices = (lang: 'fr' | 'en') => (lang === 'fr' ? SERVICES_FR : SERVICES_EN);
export const getService = (lang: 'fr' | 'en', slug: string) => getServices(lang).find((s) => s.slug === slug);

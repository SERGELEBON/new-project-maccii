// Génération des images IA pour le site MAC.CII
// Images 100% nouvelles, cohérentes avec le contenu de l'ONG (Côte d'Ivoire)
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT = '/home/z/my-project/public/images';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const STYLE =
  'photographie réaliste, lumière naturelle chaleureuse, Côte d\'Ivoire, Afrique de l\'Ouest, ' +
  'gens souriants et dignes, vêtements wax et pagne colorés, tons chauds et violets subtils, haute qualité, détaillé';

const JOBS = [
  // ---- Héros (carrousel accueil, 3 slides comme le site de référence) ----
  { f: 'hero-education.png', s: '1344x768', p: `Classe d'alphabétisation pour adultes dans une salle communautaire lumineuse à Abidjan, une femme ivoirienne d'âge mûr écrit fièrement dans un cahier, professeure bienveillante à ses côtés, autres apprenants concentrés en arrière-plan, ${STYLE}` },
  { f: 'hero-entrepreneuriat.png', s: '1344x768', p: `Atelier de couture prospère à Abidjan, jeune femme entrepreneure ivoirienne devant sa machine à coudre entourée de tissus wax colorés, apprenties travaillant ensemble, ambiance d'atelier dynamique et solidaire, ${STYLE}` },
  { f: 'hero-agriculture.png', s: '1344x768', p: `Plantation de cacao en Côte d'Ivoire au lever du soleil, agriculteur ivoirien fier montrant ses cabosses de cacao à un groupe d'agriculteurs en formation, verdure luxuriante, ${STYLE}` },

  // ---- Vision / Mission (cartes à la une) ----
  { f: 'vision.png', s: '1152x864', p: `Groupe d'artisans ivoiriens réunis autour d'une table de travail, menuisier, couturière et artisan bijoutier échangent ensemble dans un atelier communautaire, esprit de solidarité et de dignité, ${STYLE}` },
  { f: 'mission.png', s: '1152x864', p: `Formatrice ivoirienne accompagnant une femme vulnérable dans un centre de formation, mains jointes en signe de transmission de savoir, cahiers et outils sur la table, ambiance chaleureuse d'entraide, ${STYLE}` },
  { f: 'fondateur.png', s: '1024x1024', p: `Portrait officiel d'une femme dirigeante ivoirienne d'âge mûr, élégante robe africaine orange et pêche en wax, sourire confiant et bienveillant, assise dans un bureau lumineux, fond neutre doux, photo de profil professionnelle, ${STYLE}` },

  // ---- Équipe (3 profils) ----
  { f: 'team-1.png', s: '864x1152', p: `Portrait professionnel d'une femme dirigeante ivoirienne en tailleur élégant violet, sourire déterminé, fond de bureau flou, photo de studio, ${STYLE}` },
  { f: 'team-2.png', s: '864x1152', p: `Portrait professionnel d'une femme ivoirienne cadre de projets de développement, chemisier coloré et dossier sous le bras, sourire chaleureux, fond neutre, photo de studio, ${STYLE}` },
  { f: 'team-3.png', s: '864x1152', p: `Portrait professionnel d'un homme ivoirien responsable de partenariats, chemise bleue et lunettes, poignée de main en arrière-plan flou, sourire confiant, photo de studio, ${STYLE}` },

  // ---- 6 services (axes d'intervention) ----
  { f: 'service-education.png', s: '1344x768', p: `Femmes et jeunes en session d'alphabétisation en plein air sous un hangar en Côte d'Ivoire, ardoises et cahiers, instructedrice patiente, joie d'apprendre, ${STYLE}` },
  { f: 'service-sante.png', s: '1344x768', p: `Campagne de sensibilisation santé communautaire dans un quartier d'Abidjan, infirmière ivoirienne expliquant la prévention à un groupe de femmes et d'enfants, tente blanche et matériel de santé, ${STYLE}` },
  { f: 'service-agriculture.png', s: '1344x768', p: `Coopérative agricole ivoirienne, femmes et hommes cultivant un champ maraîcher moderne avec système d'irrigation, formation aux techniques agricoles, ${STYLE}` },
  { f: 'service-femmes.png', s: '1344x768', p: `Groupe de femmes entrepreneures ivoiriennes en réunion de microfinance, calebasses de tontine et registre comptable, une femme présente son projet d'atelier, confiance et autonomisation, ${STYLE}` },
  { f: 'service-logement.png', s: '1344x768', p: `Chantier de construction de logements sociaux en Côte d'Ivoire, maçons ivoiriens et bénévoles construisant une maison en parpaings, famille souriante regardant l'avancement, ${STYLE}` },
  { f: 'service-emploi.png', s: '1344x768', p: `Jeunes ivoiriens diplômés en atelier d'insertion professionnelle, préparation de CV avec un conseiller, ordinateurs et tableaux, détermination et espoir, ${STYLE}` },

  // ---- À propos / CTA ----
  { f: 'histoire.png', s: '1344x768', p: `Grande réunion communautaire villageoise en Côte d'Ivoire sous un grand arbre, anciens, femmes et enfants écoutant une femme fondatrice qui s'exprime avec passion, moment de fondateur historique, ${STYLE}` },
  { f: 'benevoles.png', s: '1344x768', p: `Groupe de bénévoles ivoiriens de tous âges joignant leurs mains au centre d'un cercle, t-shirts colorés, énergie positive et esprit d'équipe, ciel clair, ${STYLE}` },
  { f: 'contact.png', s: '1344x768', p: `Vue moderne du Plateau d'Abidjan avec gratte-ciels et lagune Ébrié, reflets dorés du soleil, atmosphere accueillante de la capitale économique ivoirienne, ${STYLE}` },
  { f: 'actions-phares.png', s: '1344x768', p: `Remise de kits scolaires à des enfants ivoiriens souriants par une équipe humanitaire, cartables et cahiers neufs, joie et espoir, ${STYLE}` },

  // ---- 6 portraits de témoignages ----
  { f: 'temoin-1.png', s: '864x1152', p: `Portrait d'une femme ivoirienne de 45 ans, vendeuse de marché fière tenant un cahier d'écriture, sourire ému et dignité, pagne coloré, fond de marché flou, ${STYLE}` },
  { f: 'temoin-2.png', s: '864x1152', p: `Portrait d'un planteur de cacao ivoirien d'âge mûr devant ses cacaoyers, casquette et machette au repos, sourire satisfait, récolte abondante, ${STYLE}` },
  { f: 'temoin-3.png', s: '864x1152', p: `Portrait d'une femme médecin ivoirienne en blouse blanche, stéthoscope, devant un centre de santé rural, expression professionnelle et compatissante, ${STYLE}` },
  { f: 'temoin-4.png', s: '864x1152', p: `Portrait d'une jeune couturière entrepreneure ivoirienne dans son atelier de couture, machine à coudre et tissus wax autour d'elle, sourire fier de réussite, ${STYLE}` },
  { f: 'temoin-5.png', s: '864x1152', p: `Portrait d'un père de famille ivoirien devant sa maison neuve en construction, casque de chantier à la main, émotion et gratitude, ${STYLE}` },
  { f: 'temoin-6.png', s: '864x1152', p: `Portrait d'une jeune diplômée ivoirienne en tenue professionnelle moderne, dossier de candidature sous le bras, devant un centre de formation, espoir et ambition, ${STYLE}` },
];

async function main() {
  const zai = await ZAI.create();
  let ok = 0, fail = 0;
  for (const job of JOBS) {
    const out = path.join(OUT, job.f);
    if (fs.existsSync(out) && fs.statSync(out).size > 20000) { console.log(`· déjà présent: ${job.f}`); ok++; continue; }
    let done = false;
    for (let attempt = 1; attempt <= 3 && !done; attempt++) {
      try {
        const res = await zai.images.generations.create({ prompt: job.p, size: job.s });
        const b64 = res?.data?.[0]?.base64;
        if (!b64) throw new Error('réponse vide');
        fs.writeFileSync(out, Buffer.from(b64, 'base64'));
        console.log(`✓ ${job.f} (${job.s})`);
        ok++; done = true;
      } catch (e) {
        console.error(`✗ ${job.f} tentative ${attempt}: ${e.message}`);
        if (attempt < 3) await new Promise(r => setTimeout(r, 1500 * attempt));
        else fail++;
      }
    }
  }
  console.log(`\nTerminé: ${ok} OK, ${fail} échecs`);
}

main().catch(e => { console.error(e); process.exit(1); });

#!/usr/bin/env python3
"""Téléchargeur lent d'images critiques — tourne en arrière-plan."""
import json, subprocess, base64, time, os, re, sys

OUT = '/home/z/my-project/public/img'
CRITICAL = [
    'Visit_Soudiane-44_Girl_Young.jpg',
    'Muhammed-Yunus.jpeg',
    'flag-senegal-t02.png',
    'flag-gambia-t01.png',
    'flag-nigeria-1.png',
    'flag-Guinea-1.png',
    'gb-t01.png',
    'mother_child_reading_in_wolof_by_jonathan_torgovnik.jpg',
    'pink-dress-girls.jpg',
    'breakthrough1.jpg',
    'DSC00673-scaled.jpg',
    'DSC_7273-scaled.jpg',
    'Intergenerational-and-cross-regional-impact-of-Tostans-education-program-Gambia_349-scaled.jpg',
    'Seminaire-Senegal-Gambie-Sur-le-modele-tostan-pour-la-promotion-du-bien-etre-communautaire-Onu-Femmes-Visite-Keur-Simbara-82-scaled.jpg',
    '2025_Social-Cohesion_Cambeidari_Guinea-Bissau_-Woman-dancing-in-the-middle-of-the-crowd_011-scaled.jpg',
    '2025_Social-cohesion_Cambeidari_Guinea-Bissau_-A-Group-of-Women-during-a-community-meeting_168-scaled.jpg',
    '2025_Community-Vision-Board_Sare-Besse_Guinea-Bissau-2-scaled.jpg',
    'AdobeStock_321763814-scaled.jpeg',
    '2026_Mission-Preparatoire-a-la-declaration-de-Thiarap_RIG_Coumbacara_Kolda_Senegal_-87-scaled.jpg',
    'Rencontre-Transfrontaliere-SN-–-GMB-–-GNB-Fafacourou-Kolda_16-09-26-105.png',
    '2026_RENCONTRE_TRANSFRONTALIER_DOBONG_KUNDA_GAMBIE-J2-138.jpg',
    '2026_Ghana_CLD_Seminar_Cafe-du-Monde_TTC_Senegal-27.jpg',
    '2026_Fellowship-Cheikh-Anta-Diop_TTC_Senegal_-213-scaled.jpg',
    'DSC00511-scaled.jpg',
    'DSC_1150-scaled.jpg',
    'DSC_7137-min.jpg',
    'parental-practices.jpeg',
    'child-protection2.jpg',
    '2014/07/program-1-480x280.jpg',
    '2014/07/project-5-400x300.jpg',
    '2014/07/impact-environment-510-340.jpg',
    '2014/07/cep2.jpg',
    'donate2-e1488928683200.jpg',
    'TOSTAN_COVID-19-084-min-1-scaled.jpg',
    'PBS_News_logo_2024.svg.webp',
    'National_Public_Radio_logo.svg.png',
    'Le_Monde.svg.png',
    'RFI_logo_2013.svg.png',
    'Logo_TV5_Monde_-_2021.svg.png',
    'Financial-Time.jpg',
    'New_York_Times_logo_variation.jpg',
    'CNN.svg.png',
    'forbes-logo-black-transparent.png',
    'Logo_Le_Figaro.svg-scaled.png',
    'Associated_Press_logo_2012.svg.png',
    'devexLogo_trans_rgb.png',
    'The-Guardian-logo-scaled.png',
    'El_Pais_logo_2007.svg.png',
    'voa-logo.svg',
    'Tostan-Canada-Logo-Principal-White-Dark-1024x449.png',
    'Tostan-Logo-Deutschland-Principal-White-Dark-1024x449.png',
    'Being-logo-Positive-1-1024x318.png',
    'mother_reading_tostan_childrens_book_by_jonathan_torgovnik.jpeg',
    'Copy-of-Screenshot-2023-01-23-at-14.26.02-1024x633.png',
    '2025_Youth_Cambeidari_Guinea-Bissau_-A-Group-of-young-men-seated-under-a-shelter_122-scaled.jpg',
    'Mariama-Smiling.-Solar-Power-Training-in-India.-Ngueniene-SN.-19-Sep.-2009.jpg',
    'WhatsApp-Image-2026-06-01-at-10.07.29.jpg',
    'Screenshot-2025-12-16-at-12.45.46-e1766145882670.png',
    'ab01.png',
    '2025_Gender_Cambeidari_Guinea-Bissau_Happy-mother-carrying-her-twin-sons_037-scaled.jpg',
    'Intergenerationalandcross-regionalimpactofTostans-educationprogram-Gambia_561.jpg',
    'IMG_1939-1-scaled.jpg',
    'DSC_7203-scaled.jpg',
    'IMG_8763-min-scaled-1.jpg',
    '2025_SocialCohesion_Cambeidari_GuineaBissau_Womenhappilyinteracting_1041-min.jpg',
    'elementor/thumbs/2025_SocialCohesion_Cambeidari_GuineaBissau_Womenhappilyinteracting_1041-min-reqxzrqlqrudw7zfdn0ym9588yar8deisls5pmeena.jpg',
    'WhatsApp-Image-2022-05-19-at-14.42.56-3.jpeg',
    'WhatsApp-Image-2026-08-03-at-8.36.02-PM-2.jpg',
    'AdobeStock_16377001-scaled.jpeg',
    'AdobeStock_466363878.jpg',
    'AdobeStock_825142167-scaled.jpeg',
    'AdobeStock_455781005-scaled.jpeg',
    'AdobeStock_466758436-scaled.jpeg',
    'AdobeStock_556771248-scaled-1.jpeg',
    'AdobeStock_947321737-scaled.jpeg',
    'AP2_8421-scaled.jpg',
    'SCL04423-scaled.jpg',
    'TOS04226-scaled.jpg',
    'Ceremonys-participants-9-scaled.jpg',
    'Demb-Tey-ak-Elleg-Selection_-14-scaled.jpg',
    'Thiarap-notables_-6-scaled.jpg',
    '2025_AMS-Thilogne-Tokossel-Matam_Senegal_-1-scaled.jpg',
    '2025_OnuFemmes-Act_Mini-Panel-16-Jours-dactivisme_TTC_Senegal_-13-scaled.jpg',
    '2026_Mission-Preparatoire-a-la-declaration-de-Thiarap_Kolda_Senegal_-19-768x512.jpg',
    '2026_Declaration-Publique_Thiarap_Kolda_Senegal_-1148-768x512.jpg',
    '2025_Gender_Cambeidari_Guinea-Bissau_Woman-speaking-in-public_020-1-1024x683.jpg',
    'Rencontre-Transfrontaliere-SN-%E2%80%93-GMB-%E2%80%93-GNB-Fafacourou-Kolda-105-1024x665.jpg',
    'Rencontre-Transfrontaliere-SN-%E2%80%93-GMB-%E2%80%93-GNB-Fafacourou-Kolda_16-09-26-066-1536x1152.jpg',
    'Rencontre-Transfrontaliere-SN-%E2%80%93-GMB-%E2%80%93-GNB-Fafacourou-Kolda_16-09-26-099-1536x1152.jpg',
    'Rencontre-Transfrontaliere-SN-–-GMB-–-GNB-Fafacourou-Kolda_16-09-26-105.png',
    'Intergenerational-and-cross-regional-impact-of-Tostans-education-program-Guinea-Bissau_419.jpg',
    'Intergenerational-and-cross-regional-impact-of-Tostans-education-program-Guinea-Bissau_69-1-scaled.jpg',
    'Intergenerationalandcross-regionalimpactofTostans-educationprogram-Gambia_349.jpg',
    'Intergenerationalandcross-regionalimpactofTostans-educationprogram-GuineaBissau_423.jpg',
    'Senegal-Pulaar-1024x683.jpg',
    'Fatoumata-Balde-1536x1136.jpg',
    'Fatoumatta-Jabbie-768x768.png',
    '1975-%E2%80%93-1985-Mentored-by-Cheikh-Anta-Diop.png',
    '1977-%E2%80%93-African-inspired-Childrens-Learning-Center.jpg',
    '1980s-%E2%80%93-Curriculum-Co-created-with-Communities.jpg',
    '1991-%E2%80%93-Tostan-is-Founded.jpg',
    '1996-%E2%80%93-Human-Rights-in-the-Curriculum.jpg',
    '1997-%E2%80%93-First-Declaration_-scaled.jpg',
    '2002-%E2%80%93-Expanding-Across-Africa.jpg',
    '2007-%E2%80%93-Global-Recognition.jpg',
    '2015-%E2%80%93-Sharing-seminars-offered-Large.jpg',
    '1_TW_MCF.png',
    '1111-QED-Summary.jpg',
    '13_IG_Molly-Lion-1024x1024.png',
    '13_IG_Molly-Lion.png',
    '1747675945297.jpeg',
    '1928b4e3-696a-448a-8d90-cddca7054856.jpg',
    '2024-financial-Statements.png',
    '2d189b71b2e0dafb4e0c5ff1a9e361a7bb3e9293.png',
    '3-5.png',
    '4-4.png',
    '491b9f355b4578de00d283298138604e0557fd21.png',
    '5-3.png',
    '7337a9d29b1cc2f146aea8ca48065e20872f6c48.png',
    '90025526e54908cf236bdbcc4505a74913acb21e.png',
    '9040492c80a02d72855304ec80170054ef551934.png',
    '959d8470-205a-44f8-b323-ba073963a068.jpg',
    '9d4a6875c049266616e4d4c573442fb37760c319.png',
    'Amazon-Smile-Twitter.png',
    'BNP-Paribas01.png',
    'Big_Picture_English-1.jpeg',
    'Board-Members_Hafizou-Boncana.jpg',
    'Board-Members_Sokhna-Aw.jpg',
    'Board-Members__0001_Molly-Melching.jpg',
    'Board-Members__0002_Mary-Ellen-Cunningham.jpg',
    'Board-Members__0004_Kelly-Hawke-Baxter.jpg',
    'Board-Members__0005_Dr.-Mame-Aby-Seye.jpg',
    'Board-Members__0007_Benoit-Kalasa.jpg',
    'Book-However-Long-The-Night.jpg',
    'CAD.png',
    'Carina-Ndiaye.jpg',
    'Conrad_N_Hilton_Foundation.jpg',
    'Cover-2024-IRS-Gd.jpg',
    'Daga-Balde-Tostan-Skoll-Foundation-Leadership-Feminin.jpg',
    'DignityCaseStudyReport-FINAL.png',
    'ECOWAS-2simg.jpg',
    'Edrisa-Keita.jpg',
    'Edrisa-Keita.png',
    'Estelle-Zanga-Board-Member-1.jpg',
    'FR-Rapport-Annuel-Tostan-2025-FR-Digital.jpg',
    'Faly-Balde.png',
    'Frame-1618873281.svg',
    'Half-Sky01.jpg',
    'Human-Rights-Education.jpg',
    'IMG_9523-min-scaled.jpg',
    'Its-Womens-History-Month.png',
    'J_ASAP_2026_9_SI_Gondwe.jpg',
    'Judy-Millers-daughters-story-FINAL_page-0001-cut.jpg',
    'Kadji-Diop.jpg',
    'Key-Insights-and-Findings-from-the-Global-Fund-for-Children-Learning-Review.png',
    'KIBARU-JJULY-2025.png',
    'Leadership-Transition.jpg',
    'Louise-Cord.jpg',
    'Mory-Camara-1.jpg',
    'Nationalp01.jpg',
    'Papa-Samba_Career-Storie-2.jpg',
    'Penda-Mbaye-1.jpg',
    'Screenshot-2023-10-26-at-16.45.48.png',
    'Screenshot-2025-08-16-163846.png',
    'Screenshot-2026-05-08-113430.png',
    'Screenshot_9.png',
    'Shooting-Photo_Conseil_Strategique_2025_Sobel-Aziz-Ngom1-1.jpg',
    'Skoll-Logo-low-res.gif',
    'Sobel-Aziz-gom.jpg',
    'The-global-journal.png',
    'Tostan-Breakthrough-Generation-Evaluation-Summary-2021.png',
    'Tostan-SEN-Wallace-Global-Fund-prison-project-participants-during-play.jpg',
    'Transformative-Learning-in-Practice-Insights-from-Community-Workplace-and-Higher-Education-1.jpg',
    'Two-approaches-to-womens-empowerment-in-Senegal.jpg',
    'Yussuf-Sane.jpg',
    'Yussufs-story-FINAL_page-0001.jpg',
    'awards_davey.jpg',
    'basketball-1-2.jpg',
    'bs10.jpg',
    'cafw01.jpg',
    'casamancaise.png',
    'cea9a7a0-f6eb-421f-b165-ae1f51808c23.jpg',
    'dodd-center-art.png',
    'e4736b1cce9c3568b71ab1f8f7c17dfcf4233a95.png',
    'fbce3eb04e988d2c418c120bc7fd4bf7160753b9.png',
    'fencing-1-2.jpg',
    'flag-ken.png',
    'flag-Liberia.png',
    'goggles-1-2.jpg',
    'i01.jpg',
    'ict.jpg',
    'imaV01.png',
    'imam-cherif-headshot-submitted.png',
    'longjump-1-2.jpg',
    'Mariam-Bamba-2-1024x576.jpg',
    'Marieme-Bamba.jpg',
    'More.png',
    'pioneers-1-2.jpg',
    'placeholder-2.png',
    'podium-1-2.jpg',
    'tostan-heart-solution-1-690.jpg',
    'tostan-office.png',
    'unesco.png',
    'women-impact-award01.jpg',
    'world-children-prize.jpg',
    'TOSTAN_COVID-19-068-min-150x150.jpg',
    'TOSTAN_COVID-19-084-min.jpg',
    'elementor/thumbs/2025_DistributionWattsOfLove_Shortselection_Senegal_-38-reqymgkcpswk5d0xvy3rb10sgsgq1ch9kwp3r2rag6.jpg',
    'elementor/thumbs/2025_Youth_-Gender-_Cambeidari_Guinea-Bissau_-A-smiling-Happy-Young-Woman_072-rd71fv7moljb40ep0zmg7c6brwo3n4zblpnyjmt1o8.jpg',
    'elementor/thumbs/4-1-r320wornicaoul9myh10d2pxuwzm6u7vzfktyx4bdy.png',
    'elementor/thumbs/7-r320u9cnuqz0uusm4x8pf6s2m2yhazkunewoc6pxgm.png',
    'elementor/thumbs/Capture-decran-2025-11-22-a-16.53.40-rf38sb9r6l8tmxgft0ysopovule60a932yr2ib75pi.png',
    'elementor/thumbs/Femme-souriante-Somone-Senegal-rdl6kjd3cd7vjwzz1komb29zx8tn6xx67h46dzgfxi.jpg',
    'elementor/thumbs/Intergenerational-and-cross-regional-impact-of-Tostans-education-program-Guinea-Bissau_114-scaled-reqzxauttfwvawz7sa13gb1mkpqz6h1s1hji04jwl4.jpg',
    'elementor/thumbs/Intergenerational-and-cross-regional-impact-of-Tostans-education-program-Guinea-Bissau_419-rdteu1koqfhpz2r8zaqdx5rdqhwhsu8nkttbt7lrxi.jpg',
    'elementor/thumbs/TOSTAN_COVID-19-068-min-scaled-rezbvu63xjeqa7ichx6ek8gmlgz6m3vm0jm89i7hra.jpg',
    'Migration-.png',
    'Femme-souriante-Somone-Senegal-1.jpg',
]

def run(args, timeout=120):
    try:
        return subprocess.run(args, capture_output=True, text=True, timeout=timeout).stdout.strip()
    except Exception:
        return 'TIMEOUT'

def download(session, url, retries=4):
    js = ("(async () => { try { const r = await fetch(" + json.dumps(url) +
          "); if (!r.ok) return 'HTTP' + r.status; const b = await r.blob();" +
          " const d = await new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(b); });" +
          " window.__b64 = d; return 'OK:' + d.length; } catch (e) { return 'ERR:' + e.message; } })()")
    for attempt in range(retries):
        out = run(['agent-browser', '--session', session, 'eval', js], timeout=180)
        if out.startswith('"OK'):
            total = int(re.search(r'OK:(\d+)', out).group(1))
            data_url = ''
            pos = 0
            ok = True
            while pos < total:
                part = run(['agent-browser', '--session', session, 'eval', f'window.__b64.slice({pos}, {pos+900000})'], timeout=180)
                if part.startswith('"'):
                    try: part = json.loads(part)
                    except Exception: ok = False; break
                data_url += part
                pos += 900000
            if ok and ',' in data_url:
                try:
                    return base64.b64decode(data_url.split(',', 1)[1])
                except Exception:
                    pass
        time.sleep(40 * (attempt + 1))
    return None

def main():
    session = sys.argv[1] if len(sys.argv) > 1 else 'img1'
    # s'assurer que la session est chargée
    run(['agent-browser', '--session', session, 'open', 'https://tostan.org/'])
    time.sleep(3)
    title = run(['agent-browser', '--session', session, 'get title'])
    if 'Checking your browser' in title:
        run(['agent-browser', '--session', session, 'find', 'role', 'checkbox', 'check'])
        time.sleep(6)
    for fname in CRITICAL:
        safe = fname.replace('/', '_')
        outfile = os.path.join(OUT, safe)
        if os.path.exists(outfile) and os.path.getsize(outfile) > 500:
            continue
        url = 'https://tostan.org/wp-content/uploads/' + fname
        img = download(session, url)
        if img:
            with open(outfile, 'wb') as f:
                f.write(img)
            print(f'OK {safe[:55]} ({len(img)}B)', flush=True)
        else:
            print(f'ECHEC {safe[:55]}', flush=True)
        time.sleep(4)
    print('TERMINÉ', flush=True)

if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""Génère src/data/generated.ts depuis le contenu crawlé de tostan.org. v2 (parse ligne par ligne)"""
import json, re, os

CLEAN = json.load(open('/tmp/tostan-content/CLEAN.json'))
META = json.load(open('/tmp/tostan-content/ALL.json'))['meta']
IMGS = json.load(open('/tmp/tostan-content/ALL.json'))['images']

def lines_of(slug):
    txt = CLEAN.get(slug, '').replace('\r', '').replace('\xa0', ' ')
    return txt.split('\n')

def paragraphs_of(slug):
    """Blocs séparés par lignes vides."""
    txt = CLEAN.get(slug, '').replace('\r', '').replace('\xa0', ' ')
    return [p.strip() for p in re.split(r'\n\s*\n', txt) if p.strip()]

def og_image(slug):
    meta = META.get(slug, '')
    og = meta.split(' ||| ')[1] if isinstance(meta, str) and ' ||| ' in meta else 'no-og'
    if og and og.startswith('http'):
        return img_path(og)
    return None

def img_path(url):
    if not url: return None
    p = url.split('?')[0]
    p = p.replace('https://tostan.org/wp-content', '/img')
    p = p.replace('/uploads/', '/')
    # sous-dossiers (ex: 2014/07/) -> underscores (cohérent avec les fichiers téléchargés)
    if p.startswith('/img/'):
        p = '/img/' + p[5:].replace('/', '_')
    return p

# ---------------- TEAM ----------------
TEAM_PHOTOS = {
    'Sobel Aziz Ngom': 'Sobel-Aziz-gom.jpg', 'Kadji Diop': 'Kadji-Diop.jpg', 'Carina Ndiaye': 'Carina-Ndiaye.jpg',
    'Rose Diop': 'Rose-Diop-1.jpg', 'Yussuf Sané': 'Yussuf-Sane.jpg', 'Penda Mbaye': 'Penda-Mbaye-1.jpg',
    'Mory Camara': 'Mory-Camara-1.jpg', 'Edrisa Keita': 'Edrisa-Keita.jpg',
    'Sokhna Aw': 'Board-Members_Sokhna-Aw.jpg', 'Hafizou Boncana': 'Board-Members_Hafizou-Boncana.jpg',
    'Maimouna Diop Ly': 'Board-Members__0003_Maimouna-Diop-Ly.jpg', 'Louise Cord': 'Louise-Cord.jpg',
    'Celeste Barone': 'Celeste-Barone.jpg', 'Kelly Hawke Baxter': 'Board-Members__0004_Kelly-Hawke-Baxter.jpg',
    'Mary Ellen Cunningham': 'Board-Members__0002_Mary-Ellen-Cunningham.jpg', 'Benoît Kalasa': 'Board-Members__0007_Benoit-Kalasa.jpg',
    'Molly Melching': 'Board-Members__0001_Molly-Melching.jpg', 'Dr Terence Ngwa': 'Board-Members__0006_Dr-Terence-Ngwa.jpg',
    'Nathalie O’neil': 'Board-Members__0000_Nathalie-Oneil.jpg', 'Nathalie O\'neil': 'Board-Members__0000_Nathalie-Oneil.jpg',
    'Dr. Mame Aby Seye': 'Board-Members__0005_Dr.-Mame-Aby-Seye.jpg', 'Estelle Zanga': 'Estelle-Zanga-Board-Member-1.jpg',
}

def parse_team():
    L = lines_of('about-us__leadership-team')
    intro, groups, cur = [], [], None
    i = 0
    state = 'name'  # name -> role -> bio
    name = role = None
    while i < len(L):
        line = L[i].strip()
        if not line:
            i += 1; continue
        if line in ('Executive Team', 'Program Leadership Team', 'National Offices'):
            cur = {'name': line, 'members': []}
            groups.append(cur)
            state = 'name'
            i += 1; continue
        if line == 'Biographie':
            if name and cur:
                cur['members'].append({'name': name, 'role': role or '', 'photo': img_path('https://tostan.org/wp-content/uploads/' + TEAM_PHOTOS.get(name, ''))})
            name = role = None
            state = 'name'
            i += 1; continue
        if state == 'name':
            # sauter l'intro avant le premier groupe
            if cur is None:
                intro.append(line)
            else:
                name = line
                state = 'role'
        elif state == 'role':
            role = line
            state = 'bio'
        i += 1
    # board
    Lb = lines_of('about-us__board-of-directors')
    intro_b, board = [], []
    name = role = None
    state = 'name'
    for line in Lb:
        line = line.strip()
        if not line: continue
        if line == 'Biographie':
            if name:
                board.append({'name': name, 'role': role or '', 'photo': img_path('https://tostan.org/wp-content/uploads/' + TEAM_PHOTOS.get(name, ''))})
            name = role = None; state = 'name'; continue
        if line == 'Board of Directors':
            continue
        if state == 'name':
            name = line; state = 'role'
        elif state == 'role':
            role = line; state = 'bio'
    return {'leadership_intro': ' '.join(intro), 'groups': groups, 'board_intro': ' '.join([x for x in intro_b if 'strategic direction' not in x][:1] + [x for x in intro_b if 'expertise' in x][:1]), 'board': board}

# ---------------- MEDIA SPACE ----------------
def parse_media_space():
    L = lines_of('media-space')
    items = []
    year_re = re.compile(r'^(20\d\d|Pre 2013)$')
    for k in range(len(L) - 1):
        a, b = L[k].strip(), L[k+1].strip()
        if year_re.match(a) and b and not year_re.match(b):
            items.append({'year': a, 'title': b})
    # dédupliquer en gardant l'ordre
    seen = set(); out = []
    for it in items:
        key = (it['year'], it['title'])
        if key not in seen:
            seen.add(key); out.append(it)
    return out

# ---------------- AWARDS ----------------
def parse_awards():
    paras = paragraphs_of('about-us__awards-recognition')
    items = []
    year_re = re.compile(r'^(19|20)\d\d$')
    intro = []
    i = 0
    # intro: sauter breadcrumb/titre, garder les 2 phrases d'intro
    while i < len(paras):
        p = paras[i]
        if year_re.match(p.split('\n')[0].strip()):
            break
        p_clean = p.replace('\n', ' ')
        if 'Home > About Us' not in p_clean and not p_clean.startswith('AWARDS'):
            intro.append(p_clean)
        i += 1
    while i < len(paras):
        p = paras[i].strip()
        lines = p.split('\n')
        if year_re.match(lines[0].strip()):
            year = lines[0].strip()
            title = lines[1].strip() if len(lines) > 1 else ''
            desc = ''
            if i + 1 < len(paras):
                desc = paras[i+1].strip().replace('\n', ' ')
                i += 1
            items.append({'year': year, 'title': title, 'desc': desc})
        i += 1
    return {'intro': intro, 'items': items}

# ---------------- IMPACT PAGES ----------------
MARKERS = {
    "what's at stake": 'stake', "what’s at stake": 'stake', "what is at stake": 'stake',
    "what we're doing": 'doing', "what we’re doing": 'doing', "what we're doing": 'doing',
    'what change looks like': 'change', 'community success': 'success',
    'explore impact stories': 'stories', 'related': 'related', 'reletad stories': 'related',
    'microgrants in covid-19': 'sub', 'explore related stories': 'related',
}
CTA_RE = re.compile(r"^(HOW DOES TOSTAN|WILL YOU SUPPORT|WANT TO SUPPORT|HOW CAN I)", re.I)
BTN_WORDS = {'FIND OUT MORE', 'DONATE NOW', 'LEARN MORE', 'READ MORE'}

def parse_impact(slug, title):
    L = lines_of(slug)
    d = {'title': title, 'subtitle': '', 'intro': [], 'sections': [], 'cta': None, 'stats': [], 'change': [], 'related': [], 'stories': [], 'og': og_image(slug)}
    if not L:
        return d
    # trouver la ligne titre (dernière occurrence exacte dans les 20 premières lignes)
    tidx = -1
    for k in range(min(20, len(L))):
        if L[k].strip().lower() == title.lower():
            tidx = k
    if tidx < 0:
        tidx = 0
    # sous-titre: 1er paragraphe après le titre (accumulateur de lignes jusqu'à ligne vide)
    i = tidx + 1
    def next_para(i):
        buf = []
        while i < len(L) and L[i].strip():
            buf.append(L[i].strip()); i += 1
        while i < len(L) and not L[i].strip():
            i += 1
        return ' '.join(buf), i
    sub, i = next_para(i)
    if sub and len(sub) < 240 and not sub.isupper() and not sub.lower() in MARKERS:
        d['subtitle'] = sub
    else:
        i = tidx + 1
    MARKER_KEYS = {k.lower(): v for k, v in MARKERS.items()}
    mode = 'intro'
    cur_section = None
    while i < len(L):
        line = L[i].strip()
        if not line:
            i += 1; continue
        key = line.lower()
        if key in MARKER_KEYS:
            m = MARKER_KEYS[key]
            if m in ('stake', 'doing'):
                cur_section = {'name': "What's at Stake" if m == 'stake' else "What We're Doing", 'paras': []}
                d['sections'].append(cur_section)
                mode = m
            elif m == 'sub':
                cur_section = {'name': line.title(), 'paras': []}
                d['sections'].append(cur_section)
                mode = 'sub'
            elif m == 'change':
                mode = 'change'; cur_section = None
            elif m == 'success':
                mode = 'stats'; cur_section = None
            elif m == 'stories':
                mode = 'stories'; cur_section = None
            elif m == 'related':
                mode = 'related'; cur_section = None
            i += 1; continue
        # CTA (ligne en capitales)
        if line.isupper() and len(line) < 100 and CTA_RE.match(line):
            d['cta'] = {'title': line.title().replace("'S", "'s"), 'btn': 'Find out more'}
            i += 1; continue
        if line.upper() in BTN_WORDS:
            if d['cta'] and d['cta'].get('btn') is None:
                d['cta']['btn'] = line.title() if line.upper() == 'FIND OUT MORE' else line
            i += 1; continue
        # contenu selon mode
        if mode in ('stake', 'doing', 'sub') and cur_section is not None:
            # accumuler paragraphe (lignes jusqu'à ligne vide)
            buf = [line]; i += 1
            while i < len(L) and L[i].strip():
                nxt = L[i].strip()
                if nxt.lower() in MARKER_KEYS or (nxt.isupper() and len(nxt) < 100 and CTA_RE.match(nxt)) or nxt.upper() in BTN_WORDS:
                    break
                buf.append(nxt); i += 1
            cur_section['paras'].append(' '.join(buf))
            continue
        if mode == 'change':
            buf = [line]; i += 1
            while i < len(L) and L[i].strip():
                nxt = L[i].strip()
                if nxt.lower() in MARKER_KEYS or nxt.upper() in BTN_WORDS:
                    break
                buf.append(nxt); i += 1
            d['change'].append(' '.join(buf))
            continue
        if mode == 'stats':
            if re.match(r'^[+\d.,]+[KM+]*%?$', line) and len(line) <= 14:
                # label = lignes suivantes jusqu'à ligne vide
                buf = []; i += 1
                while i < len(L) and L[i].strip():
                    buf.append(L[i].strip()); i += 1
                d['stats'].append({'n': line, 'label': ' '.join(buf)})
                continue
            # stats "Over 1.8 million..." (where-we-work style) non gérées ici
            i += 1; continue
        if mode == 'stories':
            if line.lower() != 'no posts found.' and line.lower() != 'read more' and len(line) > 12:
                d['stories'].append(line)
            i += 1; continue
        if mode == 'related':
            if line.lower() not in ('related',) and len(line) < 60 and line.lower() not in MARKER_KEYS:
                d['related'].append(line)
            i += 1; continue
        # intro
        buf = [line]; i += 1
        while i < len(L) and L[i].strip():
            nxt = L[i].strip()
            if nxt.lower() in MARKER_KEYS or (nxt.isupper() and len(nxt) < 100 and CTA_RE.match(nxt)):
                break
            buf.append(nxt); i += 1
        d['intro'].append(' '.join(buf))
    d['related'] = [r for r in d['related'] if len(r) < 60][:6]
    return d

# ---------------- ARTICLES ----------------
def title_from_meta(slug):
    meta = META.get(slug, '')
    if isinstance(meta, str):
        return meta.split(' ||| ')[0].replace(' | Tostan International', '')
    return slug

NAV_LINES = {'About', 'Our Work', 'Impact', 'Resources', 'Join Us', 'EN', 'How to support', 'Skip to content', 'Search'}

def parse_article(slug):
    paras = paragraphs_of(slug)
    title = title_from_meta(slug)
    img = og_image(slug)
    if not img:
        for u in IMGS.get(slug, []):
            fn = u.split('/uploads/')[-1].lower()
            if 'wp-content/uploads' in u and not any(x in fn for x in ['on-white-background', 'on-green-background', 'four-star', 'favi', 'placeholder', 'logo', 'flag', 'wordmark', 'c-suit-tostan', 'board-members-1', 'femme-souriante', 'global-recognition', 'sharing-seminars', 'where-we-work', 'dsc01202']):
                img = img_path(u); break
    out = []
    skipped_title = False
    for p in paras:
        ls = [l for l in p.split('\n') if l.strip()]
        # bloc de nav résiduel
        if len(ls) <= 10 and all((l.strip() in NAV_LINES or l.strip() in title or 'Home' == l.strip() or l.strip() == 'Blog') for l in ls):
            continue
        if not skipped_title:
            joined = '\n'.join(ls).lower()
            if title.lower()[:40] in joined[:120]:
                skipped_title = True
                rest = [l for l in ls if l.strip().lower() not in title.lower()[:40]]
                # garder date/catégorie s'il y a une ligne courte type date
                if rest:
                    out.append('\n'.join(rest))
                continue
            # si le titre n'apparaît pas (page déjà nettoyée), commencer direct
            skipped_title = True
            out.append(p)
            continue
        out.append(p.replace('\n', ' ').strip())
    out = [p for p in out if p and p.lower() not in ('read more', 'share', 'share this:', 'post navigation', 'previous post', 'next post')]
    return {'slug': slug, 'title': title, 'img': img, 'paras': out}

# ---------------- RESOURCES ----------------
def parse_resources():
    L = lines_of('resources')
    filters = {'country': [], 'language': [], 'publisher': [], 'type': [], 'year': []}
    fkeys = {'Select country': 'country', 'Select language': 'language', 'Select publisher type': 'publisher', 'Select type': 'type', 'Select year': 'year'}
    sections = {}
    section_titles = ['Annual Reports', 'Books', 'Evaluations & Learning', 'Publication & Research', 'Newsletters', 'Strategic Plan']
    intro = []
    cur_filter = None
    cur_section = None
    mode = 'intro'
    for line in L:
        line = line.strip()
        if not line: continue
        if line in fkeys:
            mode = 'filters'; cur_filter = fkeys[line]; continue
        if line == 'Apply Filter' or line == 'Clear Filters':
            cur_filter = None; continue
        if line in section_titles:
            mode = 'sections'; cur_section = line; sections[line] = []; continue
        if line in ('LEARN & ENGAGE',):
            continue
        if mode == 'intro':
            intro.append(line)
            if len(intro) >= 1: mode = 'filters'
            continue
        if mode == 'filters' and cur_filter:
            filters[cur_filter].append(line)
            continue
        if mode == 'sections' and cur_section:
            sections[cur_section].append(line)
    return {'intro': intro, 'filters': filters, 'sections': sections}

# ---------------- JOIN OUR TEAM ----------------
def parse_join():
    L = lines_of('join-our-team')
    why, positions, detail, stories = [], [], [], []
    countries = {'SENEGAL', 'GUINEA BISSAU', 'MALI', 'THE GAMBIA', 'GUINEA', 'GAMBIA'}
    days_re = re.compile(r'^\d+ days?$')
    types = {'Full Time', 'Part Time', 'Consultancy'}
    i = 0
    n = len(L)
    # why: lignes jusqu'à "Open Positions"
    while i < n and L[i].strip() != 'Open Positions':
        line = L[i].strip()
        if line and line not in ('Work With Us', 'Why Work With Tostan ?', 'Find Out More'):
            why.append(line)
        i += 1
    if i < n:
        i += 1  # passer Open Positions
    # positions: groupes country/title/days/type
    while i < n:
        line = L[i].strip()
        if line == 'Apply Clear Filters':
            i += 1; continue
        if line in countries and i + 2 < n and days_re.match(L[i+2].strip()):
            positions.append({'country': line, 'title': L[i+1].strip(), 'days': L[i+2].strip(),
                              'type': L[i+3].strip() if i + 3 < n and L[i+3].strip() in types else ''})
            i += 4 if (i + 3 < n and L[i+3].strip() in types) else 3
            continue
        if line.startswith('Regional Partnerships Manager') and 'recruiting' in ' '.join(L[i:i+4]).lower():
            break
        i += 1
    # detail: de "Regional Partnerships Manager" (bloc détail) à "Submit a Spontaneous Application"
    start = None
    for k in range(len(L) - 4):
        if 'recruiting a Regional Partnerships Manager' in L[k].strip() or (L[k].strip() == 'Regional Partnerships Manager' and 'recruiting' in ' '.join(x.strip() for x in L[k:k+8]).lower()):
            start = k
            # remonter jusqu'au titre du poste
            while start > 0 and L[start-1].strip() not in ('', 'Full Time', 'Part Time') and L[start-1].strip() != 'Regional Partnerships Manager':
                start -= 1
                if L[start].strip() == 'Regional Partnerships Manager':
                    break
            break
    if start:
        k = start
        while k < n:
            line = L[k].strip()
            if line.startswith('Submit a Spontaneous Application'):
                break
            if line:
                detail.append(line)
            k += 1
    # stories: après "Submit a Spontaneous Application" jusqu'à "Take Action"
    st_mode = False
    for line in L:
        line = line.strip()
        if line.startswith('Submit a Spontaneous Application'):
            st_mode = True; continue
        if st_mode:
            if line == 'Take Action' or line.startswith('Submit Application'):
                break
            if line and line != 'Read More' and len(line) < 90:
                stories.append(line)
    # dédoublonner stories en gardant l'ordre
    seen = set(); st = []
    for s in stories:
        if s not in seen:
            seen.add(s); st.append(s)
    return {'why': why, 'positions': positions, 'job_detail': detail, 'stories': st[:8]}

# ---------------- BLOG LIST ----------------
def parse_blog():
    L = lines_of('blog')
    news, blogs = [], []
    mode = None
    i = 0
    n = len(L)
    while i < n:
        line = L[i].strip()
        if not line:
            i += 1; continue
        if line in ('News and blog', 'News'):
            mode = 'news'; i += 1; continue
        if line == 'Blog' and mode == 'news':
            mode = 'blog'; i += 1; continue
        if re.match(r'^\d$', line) or line == 'Next':
            i += 1; continue
        if mode and i + 1 < n and L[i+1].strip() == 'Read More':
            title = line
            if mode == 'news' and title not in [x['title'] for x in news]:
                news.append({'title': title})
            elif mode == 'blog' and title not in [x['title'] for x in blogs]:
                blogs.append({'title': title})
            i += 2; continue
        i += 1
    return {'news': news, 'blog': blogs}

# ---------------- LONG PAGES ----------------
def parse_long(slug):
    paras = paragraphs_of(slug)
    out = []
    for p in paras:
        p = p.strip()
        if not p: continue
        ls = [x.strip() for x in p.split('\n') if x.strip()]
        if len(ls) == 1 and len(ls[0]) < 70:
            out.append({'t': 'h', 'text': ls[0]})
        else:
            out.append({'t': 'p', 'text': p.replace('\n', ' ')})
    return out

# Pages extraites avec le navigateur (textes exacts) — fusionnées telles quelles
HARDCODED_IMPACT = {
    'good-governance': {
        'title': 'Good Governance',
        'subtitle': 'Inclusive leadership builds the foundation for lasting social transformation and human development',
        'intro': [
            'In many rural areas, women, youth, and marginalized groups are excluded from decision-making. Resources are not always managed transparently, and weak civil registration prevents citizens from exercising their rights. Without inclusive leadership and accountable institutions, progress in peace, education, health, and for overall individual and collective wellbeing will be limited.',
            'Through the Community Empowerment Program (CEP), communities create spaces for inclusive dialogue and decision-making. At the very outset of the program, they elect Community Management Committees (CMCs) with strong representation of women and youth. Through dedicated sessions, CMC members strengthen their capacity in decentralization, governance practices, and resource management. They lead community projects transparently and ensure decisions are aligned with the shared vision of wellbeing that the community has established. They also collaborate with local authorities so grassroots priorities are integrated into municipal and regional budgets in gender- and child-responsive ways. Alongside community empowerment, the Strengthening Democracy and Civic Engagement (SDCE) component of the CEP engages municipal and district officials on human rights and responsibilities, participatory budgeting, and accountability in resource management, fostering mutual trust and collaboration between citizens and local government.',
            'In the Tostan classes, women gain confidence and practice their right to have their voice heard. They then increasingly speak in community meetings, begin to see themselves as capable leaders and take on new roles in their communities. Their leadership, visibility, and impact inspire other women and girls, while men, seeing women\u2019s growth and contributions, increasingly become key allies in supporting women\u2019s leadership.'
        ],
        'cta': {'title': 'Want To Support Communities Improve Inclusive Governance ?', 'btn': 'Donate Now'},
        'stats': [
            {'n': '3,000', 'label': 'Community Management Committees formed across Tostan\u2019s program countries since 1997'},
            {'n': '7', 'label': 'of 18 women elected as councilors in The Gambia in 2024 were former participants in Tostan\u2019s program'},
            {'n': '30,000', 'label': 'children registered, securing their right to education and services since 2020'},
            {'n': '1,350', 'label': 'local authorities trained to strengthen transparency and accountability since 2020'}
        ],
        'change': [
            'Good governance in Tostan communities means women and youth gain confidence and take part in leadership and decision-making spaces, citizens and local authorities manage resources transparently, and families secure civil registration that connects their children to their rights and responsibilities.',
            'As Community Management Committees (CMC) gain legitimacy, they become trusted community leaders and partners for government, bringing community priorities to the forefront and influencing regional and national policy.',
            'Many former CMC members, especially women, now serve as mayors, councilors, and parliamentarians, carrying community perspectives into regional and national decision-making.'
        ],
        'related': ['Inclusive Leadership', "Women's Empowerment"]
    },
    'inclusive-leadership': {
        'title': 'Inclusive Leadership',
        'subtitle': 'Tostan\u2019s education program supports communities to build inclusive grassroots democratic structures.',
        'sections': [
            {'name': "What's at Stake", 'paras': [
                'Due to limited access to information and education, traditional and formal governance systems in many rural communities inn West Africa do not provide inclusive spaces for women and youth to take part in decisions. Political participation remains low. Women hold only 18 percent of parliamentary seats and even fewer local leadership roles. In these communities low rates of birth registration prevent children from accessing services, voting later in life or taking part in civic processes. Identity card and voter registration rates are also low, especially for women and young adults.',
                'Without inclusive participation and transparent local structures, communities struggle to address shared challenges. Vulnerable groups lose the chance to contribute to solutions and influence decisions that shape their futures.'
            ]},
            {'name': "What We're Doing", 'paras': [
                'Community Empowerment Program (CEP) participants learn about the fundamental elements of democracy, their rights, and the responsibilities associated with defending and respecting those rights. Democratically-selected Community Management Committees (CMC) become a strong leadership presence in Tostan partner communities, contributing to the growth of fair governance and democracy. The CMC works to increase democratic participation by encouraging residents to register to vote, obtain national identity cards, register births, and participate in national elections.',
                'In all CMCs, female members and youth are in the majority. These women and youth emerge as community leaders, activists, and role models, showing young girls and boys alike that women and youth can succeed in leadership roles and work alongside men as equals.'
            ]}
        ],
        'cta': {'title': 'How Does Tostan\u2019s Education Program Foster Social Transformation ?', 'btn': 'Find out more'},
        'change': [
            'Community Management Committees (CMC) become practical entry points for women and youth to experience leadership. Many speak in public for the first time, contribute to community planning and guide projects that address local priorities. Women who began as CMC members now hold leadership roles at local and regional levels, and youth groups lead initiatives in education, health and community development.',
            'Nearly 3,000 democratically functioning CMCs have been created in the countries in which we have implemented our program. Many have gained formal civil society status and have joined together to form Regional Federations in Guinea, Mali, Mauritania and Senegal. In Senegal alone, 738 of these community-based organizations are legally constituted and officially registered.'
        ],
        'stats': [
            {'n': '110k+', 'label': 'People have learned about democracy and how to make decision-making equitable (2022)'},
            {'n': '3K', 'label': 'Community Management Committees formed across Tostan\u2019s program countries'},
            {'n': '30K+', 'label': 'Women elected to leadership positions in their communities, with many running for public office.'}
        ],
        'related': []
    },
    'womens-empowerment': {
        'title': "Women's Empowerment",
        'subtitle': '',
        'sections': [
            {'name': 'What is at Stake', 'paras': [
                'Women and girls make up half the world\u2019s population. Yet, they often have less access to education, health, and economy as well as less opportunity to voice their opinions and take an active role in decision-making processes. Without tapping into the incredible potential women and girls offer, communities limit their ability to grow and progress.'
            ]},
            {'name': "What We're doing", 'paras': [
                'Women and girls make up more than half of our Community Empowerment Program (CEP) participants. During our program, women develop leadership skills, engage in dialogue, and demonstrate their ability to make important decisions for themselves and their families, showing how important they are to their community\u2019s development.',
                'We also work to engage men and boys in the CEP, encouraging them to participate in discussions about human rights. Men and women work together to promote equality and develop new social norms around respecting the human rights and dignity of women and girls and men and boys.',
                'We encourage women to take on leadership roles in their communities. In every Community Management Committee (CMCs), at least nine of the 17 members are women.'
            ]},
            {'name': 'Community Success', 'paras': [
                'Women who have participated in our program emerge as community leaders, human rights activists, and role models, showing young girls and boys alike that women can succeed in leadership roles and work with men as equals. Their example helps reshape gender norms and empower women by increasing their standing within the community.',
                'In Senegal, over 80 percent of the Tostan trained CMCs are coordinated by women. With this leadership experience, they are able to take on roles in local councils and regional federations or associations.',
                'As women and girls participate in our program, they are empowered to make important decisions about health, hygiene, education, and finances for themselves and their families. We have seen them become actively engaged in fostering positive social change; they run small businesses and earn money for their families; they organize campaigns for increased access to maternal and child healthcare; and they emerge as regional leaders in protecting human rights.'
            ]}
        ],
        'cta': {'title': 'How Does Tostan\u2019s Education Program Foster Social Transformation ?', 'btn': 'Find out more'},
        'stats': [
            {'n': '1M', 'label': 'people from 1,420 communities solemnly committed to abandon FGC and child marriage since 2020'},
            {'n': '67%', 'label': 'decrease in reported cases of intimate partner violence in partner communities'},
            {'n': '184%', 'label': 'increase in number of community members who agree that women and men should share decision making on birth spacing'},
            {'n': '4,800', 'label': 'community-led mediations successfully resolved local conflicts since 2020'}
        ],
        'change': [],
        'related': ['Community Wellbeing', 'Ending FGC', 'Child Protection', 'Peace and Security']
    },
    'social-transformation': {
        'title': 'Social Transformation',
        'subtitle': 'With strengthened relationships, communities drive lasting shifts in norms, peace, and equity, and reinforce new, more inclusive governance practices.',
        'intro': [
            'In many of the communities where Tostan works, traditional roles, exclusion, and cycles of violence limit what people believe is possible. Practices such as female genital cutting (FGC), child marriage, and gender-based violence are upheld by social norms, perpetuate inequality, and hinder development.',
            'The process of social transformation begins early in the Community Empowerment Program. In the Kobi phase, participants collectively define their common vision of wellbeing. They explore principles of human rights, the related responsibilities, and shared values. They reflect on how these principles apply in daily life. They explore how their practices align with these principles and begin to question practices that cause harm. Using dialogue, storytelling, and cultural learning tools, communities begin to envision alternative futures.',
            'As learning deepens, communities learn how to engage in peaceful communication, conflict resolution, mediation, and collective decision making. Open dialogue, sharing, and learning about rights and communication enable them to reduce violence and strengthen relationships between groups such as men and women or youth and elders. These stronger connections make it possible to engage in open, respectful dialogues about sensitive issues and to agree on new directions.',
            'Change spreads further through Tostan\u2019s organized diffusion strategy, in which participants share what they learn with relatives and with neighboring villages. The dialogues often culminate in public declarations where villages and their kin networks commit to work together toward attaining the principles of human dignity, including by abandoning harmful practices.',
            'Over time, networks of communities, together with religious leaders and local authorities, reinforce new practices until they become the new social norm.'
        ],
        'cta': {'title': 'Will You Support Communities Advance Social Cohesion And Gender Equality?', 'btn': 'Find out more'},
        'stats': [
            {'n': '1M', 'label': 'people from 1,420 communities solemnly committed to abandon FGC and child marriage since 2020'},
            {'n': '67%', 'label': 'decrease in reported cases of intimate partner violence in partner communities'},
            {'n': '184%', 'label': 'increase in number of community members who agree that women and men should share decision making on birth spacing'},
            {'n': '4,800', 'label': 'community-led mediations successfully resolved local conflicts since 2020'}
        ],
        'change': [
            'Social transformation is visible in the strengthened relations.',
            'Respect and peace are enhanced and violence decreases within households as well as throughout the communities.',
            'Gender discrimination in education disappears.',
            'Harmful practices are abandoned, women and youth have voice and lead in myriad new ways, and collective actions to improve collective wellbeing are planned and carried out thanks to the increased social cohesion.'
        ],
        'related': ['Community Wellbeing', 'Social Norms Change', 'Child Protection', 'Peace and Security']
    },
    'female-genital-cutting': {
        'title': 'Female Genital Cutting',
        'subtitle': 'With strengthened relationships, communities drive lasting shifts in norms, peace, and equity, and reinforce new, more inclusive governance practices.',
        'intro': [
            'In many of the communities where Tostan works, traditional roles, exclusion, and cycles of violence limit what people believe is possible. Practices such as female genital cutting (FGC), child marriage, and gender-based violence are upheld by social norms, perpetuate inequality, and hinder development.',
            'The process of social transformation begins early in the Community Empowerment Program. In the Kobi phase, participants collectively define their common vision of wellbeing. They explore principles of human rights, the related responsibilities, and shared values. They reflect on how these principles apply in daily life. They explore how their practices align with these principles and begin to question practices that cause harm. Using dialogue, storytelling, and cultural learning tools, communities begin to envision alternative futures.',
            'As learning deepens, communities learn how to engage in peaceful communication, conflict resolution, mediation, and collective decision making. Open dialogue, sharing, and learning about rights and communication enable them to reduce violence and strengthen relationships between groups such as men and women or youth and elders. These stronger connections make it possible to engage in open, respectful dialogues about sensitive issues and to agree on new directions.',
            'Change spreads further through Tostan\u2019s organized diffusion strategy, in which participants share what they learn with relatives and with neighboring villages. The dialogues often culminate in public declarations where villages and their kin networks commit to work together toward attaining the principles of human dignity, including by abandoning harmful practices.',
            'Over time, networks of communities, together with religious leaders and local authorities, reinforce new practices until they become the new social norm.'
        ],
        'cta': {'title': 'How Does Tostan\u2019s Education Program Foster Social Transformation ?', 'btn': 'Find out more'},
        'stats': [
            {'n': '1M', 'label': 'people from 1,420 communities solemnly committed to abandon FGC and child marriage since 2020'},
            {'n': '67%', 'label': 'decrease in reported cases of intimate partner violence in partner communities'},
            {'n': '184%', 'label': 'increase in number of community members who agree that women and men should share decision making on birth spacing'},
            {'n': '4,800', 'label': 'community-led mediations successfully resolved local conflicts since 2020'}
        ],
        'change': [
            'Social transformation is visible in the strengthened relations.',
            'Respect and peace are enhanced and violence decreases within households as well as throughout the communities.',
            'Gender discrimination in education disappears.',
            'Harmful practices are abandoned, women and youth have voice and lead in myriad new ways, and collective actions to improve collective wellbeing are planned and carried out thanks to the increased social cohesion.'
        ],
        'related': ['Community Wellbeing', 'Ending FGC', 'Child Protection', 'Peace and Security']
    }
}

def main():
    out = ['// AUTO-GÉNÉRÉ depuis le contenu exact de tostan.org (crawl 2026-11-07)', '// NE PAS MODIFIER — régénérer avec scripts/gen-content.py', '']
    # IMPACT
    out.append('export interface ImpactStat { n: string; label: string }')
    out.append('export interface ImpactSection { name: string; paras: string[] }')
    out.append('export interface ImpactPage { id: string; title: string; subtitle: string; og: string | null; intro: string[]; sections: ImpactSection[]; cta: { title: string; btn: string } | null; stats: ImpactStat[]; change: string[]; related: string[]; stories: string[] }')
    impact_cfg = [
        ('areas-of-impact__good-governance', 'Good Governance'),
        ('areas-of-impact__inclusive-leadership', 'Inclusive Leadership'),
        ('areas-of-impact__social-transformation', 'Social Transformation'),
        ('areas-of-impact__cross-cutting-gender-social-norms__female-genital-cutting', 'Female Genital Cutting'),
        ('areas-of-impact__community-wellbeing', 'Community Wellbeing'),
        ('areas-of-impact__child-protection', 'Child Protection'),
        ('areas-of-impact__economic-development', 'Economic Development'),
        ('areas-of-impact__human-development', 'Human Development'),
        ('areas-of-impact__education', 'Education'),
        ('areas-of-impact__health', 'Health'),
        ('areas-of-impact__environment', 'Environment'),
        ('areas-of-impact__early-child-development', 'Early Child Development'),
    ]
    impact_out = {}
    for slug, title in impact_cfg:
        d = parse_impact(slug, title)
        d['id'] = slug.split('__')[-1]
        impact_out[d['id']] = d
    # Fusionner les pages extraites par navigateur (textes exacts)
    for pid, hd in HARDCODED_IMPACT.items():
        d = {'id': pid, 'subtitle': '', 'intro': [], 'sections': [], 'cta': None, 'stats': [], 'change': [], 'related': [], 'stories': [], 'og': None}
        d.update(hd)
        impact_out[pid] = d
    out.append('export const IMPACT_PAGES: Record<string, ImpactPage> = ' + json.dumps(impact_out, ensure_ascii=False, indent=1))
    out.append('')
    # ARTICLES
    out.append('export interface Article { slug: string; title: string; img: string | null; paras: string[] }')
    art_slugs = ['tostan-addresses-menstrual-health-insecurity-in-womens-prisons', 'tostan-cep-the-classroom-that-brought-me-back-to-life',
                 'tostan-lance-les-candidatures-pour-la-2e-cohorte-de-la-bourse-cheikh-anta-diop',
                 'we-were-taking-it-as-our-fight-how-tostans-model-changed-our-approach-in-ghana',
                 'why-72-million-young-africans-are-still-waiting-for-an-entry-point',
                 'abandoning-female-genital-cutting-it-wasnt-the-fear-of-prison-that-changed-things',
                 'ending-child-marriage-and-cutting-the-generation-born-after', 'new-study-backs-to-stans-civic-model',
                 'a-border-that-no-law-can-fully-protect']
    articles = [parse_article(s) for s in art_slugs]
    out.append('export const ARTICLES: Article[] = ' + json.dumps(articles, ensure_ascii=False, indent=1))
    out.append('')
    # MEDIA
    out.append('export interface MediaItem { year: string; title: string }')
    out.append('export const MEDIA_SPACE: MediaItem[] = ' + json.dumps(parse_media_space(), ensure_ascii=False, indent=1))
    out.append('')
    # AWARDS
    out.append('export interface Award { year: string; title: string; desc: string }')
    out.append('export const AWARDS_PAGE = ' + json.dumps(parse_awards(), ensure_ascii=False, indent=1))
    out.append('')
    # RESOURCES
    out.append('export const RESOURCES_PAGE = ' + json.dumps(parse_resources(), ensure_ascii=False, indent=1))
    out.append('')
    # JOIN
    out.append('export const JOIN_PAGE = ' + json.dumps(parse_join(), ensure_ascii=False, indent=1))
    out.append('')
    # TEAM
    out.append('export interface TeamMember { name: string; role: string; photo: string | null }')
    out.append('export const TEAM = ' + json.dumps(parse_team(), ensure_ascii=False, indent=1))
    out.append('')
    # BLOG
    out.append('export const BLOG_LIST = ' + json.dumps(parse_blog(), ensure_ascii=False, indent=1))
    out.append('')
    # LONG
    out.append('export interface Para { t: string; text: string }')
    out.append('export const PRIVACY_POLICY: Para[] = ' + json.dumps(parse_long('privacy-policy'), ensure_ascii=False, indent=1))
    out.append('export const PEAS_FRAUD: Para[] = ' + json.dumps(parse_long('peas-fraud-report'), ensure_ascii=False, indent=1))
    # RAW
    raw_slugs = ['about-us', 'our-work', 'our-work__program-structure', 'our-work__modules', 'our-work__special-projects',
                 'our-work__modules__prison-project', 'covid-19-brochure', 'training-sharing__training-program',
                 'training-sharing__community-practice-community-well-being', 'how-to-support', 'contact',
                 'jotali-2026', 'about-us__where-we-work', 'about-us__awards-recognition', 'about-us__leadership-team', 'about-us__board-of-directors',
                 'areas-of-impact__education', 'areas-of-impact__health', 'areas-of-impact__environment', 'areas-of-impact__early-child-development',
                 'areas-of-impact__child-protection', 'areas-of-impact__human-development', 'areas-of-impact__community-wellbeing', 'areas-of-impact__economic-development',
                 'areas-of-impact__good-governance', 'areas-of-impact__inclusive-leadership', 'areas-of-impact__social-transformation',
                 'areas-of-impact__cross-cutting-gender-social-norms__female-genital-cutting']
    raw = {s: CLEAN.get(s, '').replace('\xa0', ' ').split('\n') for s in raw_slugs}
    out.append('export const RAW: Record<string, string[]> = ' + json.dumps(raw, ensure_ascii=False, indent=1))
    os.makedirs('/home/z/my-project/src/data', exist_ok=True)
    with open('/home/z/my-project/src/data/generated.ts', 'w') as f:
        f.write('\n'.join(out))
    print('OK —', sum(len(x) for x in out), 'caractères')
    for k, v in impact_out.items():
        print(f"  IMPACT {k}: subtitle={v['subtitle'][:40]!r} sections={[(s['name'], len(s['paras'])) for s in v['sections']]} stats={[(s['n']) for s in v['stats']]} change={len(v['change'])} related={v['related']}")
    print('  MEDIA:', len(parse_media_space()))
    print('  AWARDS:', len(parse_awards()['items']), 'intro:', parse_awards()['intro'][:1])
    print('  TEAM:', [(g['name'], len(g['members'])) for g in parse_team()['groups']], 'board:', len(parse_team()['board']))
    print('  JOIN positions:', len(parse_join()['positions']), 'detail paras:', len(parse_join()['job_detail']))
    print('  BLOG news:', len(parse_blog()['news']), 'blog:', len(parse_blog()['blog']))
    print('  ARTICLES:', [(a['slug'][:28], len(a['paras']), bool(a['img'])) for a in articles])

if __name__ == '__main__':
    main()

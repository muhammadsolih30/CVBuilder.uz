import { TemplateType, QuestionnaireAnswers } from '@/types/cv';

export interface TemplateCatalogItem {
  id: string; // e.g. 't001', 't002', ..., 't1024'
  number: number;
  name: string;
  category: 'modern' | 'ats' | 'tech' | 'creative' | 'executive' | 'minimal' | 'academic';
  categoryLabel: string;
  description: string;
  layout: string;
  recommendedFor: ('it' | 'design' | 'sales' | 'finance' | 'management' | 'education' | 'student' | 'other')[];
  badge?: 'Tavsiya etilgan' | 'Trend' | 'ATS 99%' | 'Yangi' | 'TOP' | 'Premium';
  accentHex?: string;
  hasPhotoFocus?: boolean;
}

export const CATEGORIES = [
  { key: 'all', label: 'Barchasi (1000+)' },
  { key: 'modern', label: 'Zamonaviy' },
  { key: 'ats', label: 'ATS Standart' },
  { key: 'tech', label: 'IT & Dasturchi' },
  { key: 'creative', label: 'Kreativ & Dizayn' },
  { key: 'executive', label: 'Executive & Rahbar' },
  { key: 'minimal', label: 'Minimal & Toza' },
  { key: 'academic', label: 'Talaba & Akademik' },
] as const;

// 20+ Layout arxitekturalari
export const LAYOUT_STYLES = [
  'minimal-clean',
  'sidebar-left',
  'header-full',
  'side-right',
  'dark-sidebar',
  'left-stripe',
  'double-bar',
  'corner',
  'centered',
  'top-bar',
  'timeline',
  'cards',
  'compact-ats',
  'bordered-pro',
  'monogram',
  'gradient-hero',
  'split-contrast',
  'tech-grid',
  'executive-suite',
  'creative-asymmetric',
] as const;

const STATIC_25_NAMES: [string, string][] = [
  ["Clean Line", "Minimalist toza chiziq"],
  ["Dark Accent", "Qora fonli zamonaviy dizayn"],
  ["Classic Top", "Rangli sarlavhali klassik"],
  ["Modern Panel", "Chap panelli professional"],
  ["Teal Photo", "Fotosuratga urg'u berilgan"],
  ["Blue Box", "Blokli zamonaviy tuzilma"],
  ["Bold Stripe", "Chap chiziqli qat'iy uslub"],
  ["Cyber Dark", "Dasturchilar uchun quyuq mavzu"],
  ["Double Bar", "Ikki chiziqli muvozanatli"],
  ["Forest Pro", "Ekologik va tabiiy ohanglar"],
  ["Red Dual", "Qat'iyatli ikki ustun"],
  ["Navy Side", "Korporativ ko'k panelli"],
  ["Purple Soft", "Yumshoq binafsha zamonaviy"],
  ["Corner Fold", "Burchakli geometrik dizayn"],
  ["Gold Dark", "Premium oltinrang va qora"],
  ["Sky Banner", "Keng moviy sarlavhali"],
  ["Prism Dark", "Kontrastli jiddiy ko'rinish"],
  ["Amber Warm", "Iliq qahrabo rangli"],
  ["Centered", "Markazlashgan klassika"],
  ["Gradient", "Rang-barang gradient banner"],
  ["Cyan Lines", "Moviy chiziqli texnik"],
  ["Cyber Navy", "To'q dengiz ko'k sidebar"],
  ["Split View", "O'ng panelli zamonaviy"],
  ["Green Block", "Yashil blokli biznes"],
  ["Compact Pro", "Zich va to'liq ma'lumotli"],
];

const ADJECTIVES = [
  "Nova", "Apex", "Elite", "Prime", "Vanguard", "Nexus", "Pulse", "Zenith",
  "Aura", "Quantum", "Vertex", "Flux", "Core", "Matrix", "Echo", "Atlas",
  "Vector", "Titan", "Horizon", "Catalyst", "Summit", "Velocity", "Aero", "Stellar"
];

const SUB_TITLES = [
  "Professional karyera uchun optimal tuzilma",
  "ATS skanerlaridan 100% muvaffaqiyatli o'tish",
  "Texnik mutaxassislar va dasturchilar uchun",
  "Portfolioli kreativ va ijodiy mutaxassislar",
  "Katta tajribaga ega rahbar va yetakchilar",
  "Talabalar va yangi boshlovchilar uchun qulay",
  "Xalqaro masofaviy (Remote) ish o'rinlari uchun",
  "Ko'p yillik tajribani ixcham jamlash"
];

// 1024 ta shablonni deterministik va tezkor yaratish
function generate1000Templates(): TemplateCatalogItem[] {
  const list: TemplateCatalogItem[] = [];

  // t001 - t025
  for (let i = 1; i <= 25; i++) {
    const [name, desc] = STATIC_25_NAMES[i - 1];
    const cat: TemplateCatalogItem['category'] =
      i === 8 || i === 21 ? 'tech' :
      i === 2 || i === 15 ? 'creative' :
      i === 1 || i === 19 || i === 25 ? 'minimal' :
      i === 4 || i === 7 || i === 12 ? 'executive' :
      i % 2 === 0 ? 'ats' : 'modern';

    list.push({
      id: `t${String(i).padStart(3, '0')}`,
      number: i,
      name,
      category: cat,
      categoryLabel: CATEGORIES.find(c => c.key === cat)?.label || 'Zamonaviy',
      description: desc,
      layout: LAYOUT_STYLES[(i - 1) % LAYOUT_STYLES.length],
      recommendedFor: cat === 'tech' ? ['it'] : cat === 'creative' ? ['design'] : cat === 'executive' ? ['management', 'sales'] : ['all' as any],
      badge: i === 1 ? 'TOP' : i === 2 ? 'Trend' : i === 8 ? 'ATS 99%' : undefined,
    });
  }

  // t026 - t1024 (jami 1024 ta)
  const categoriesList: TemplateCatalogItem['category'][] = [
    'modern', 'ats', 'tech', 'creative', 'executive', 'minimal', 'academic'
  ];

  for (let i = 26; i <= 1024; i++) {
    const numStr = String(i).padStart(3, '0');
    const cat = categoriesList[(i * 3 + 5) % categoriesList.length];
    const adj = ADJECTIVES[i % ADJECTIVES.length];
    const layout = LAYOUT_STYLES[i % LAYOUT_STYLES.length];
    const desc = SUB_TITLES[i % SUB_TITLES.length];

    let rec: TemplateCatalogItem['recommendedFor'] = ['all' as any];
    if (cat === 'tech') rec = ['it'];
    else if (cat === 'creative') rec = ['design'];
    else if (cat === 'executive') rec = ['management', 'finance', 'sales'];
    else if (cat === 'academic') rec = ['student', 'education'];
    else if (cat === 'ats') rec = ['it', 'finance', 'sales', 'management'];

    let badge: TemplateCatalogItem['badge'] = undefined;
    if (i % 37 === 0) badge = 'Tavsiya etilgan';
    else if (i % 43 === 0) badge = 'Trend';
    else if (i % 29 === 0) badge = 'ATS 99%';
    else if (i % 53 === 0) badge = 'TOP';
    else if (i > 950) badge = 'Yangi';

    list.push({
      id: `t${numStr}`,
      number: i,
      name: `${adj} ${cat.charAt(0).toUpperCase() + cat.slice(1)} ${i}`,
      category: cat,
      categoryLabel: CATEGORIES.find(c => c.key === cat)?.label || 'Zamonaviy',
      description: desc,
      layout,
      recommendedFor: rec,
      badge,
      hasPhotoFocus: layout.includes('header') || layout.includes('sidebar'),
    });
  }

  return list;
}

export const ALL_CATALOG_TEMPLATES = generate1000Templates();

// Smart Tavsiya mexanizmi
export function getRecommendedTemplates(answers: Partial<QuestionnaireAnswers>): {
  template: TemplateCatalogItem;
  score: number;
  reasons: string[];
}[] {
  const { industry = 'it', experienceLevel = 'mid', purpose = 'ats', hasPhoto = false } = answers;

  return ALL_CATALOG_TEMPLATES.map(template => {
    let score = 70;
    const reasons: string[] = [];

    // Soha mosligi
    if (template.recommendedFor.includes(industry) || template.recommendedFor.includes('all' as any)) {
      score += 15;
      reasons.push(`${industry.toUpperCase()} sohasi uchun maxsus tuzilma`);
    }

    // Maqsad mosligi (ATS, xalqaro, kreativ)
    if (purpose === 'ats' && (template.category === 'ats' || template.category === 'minimal')) {
      score += 12;
      reasons.push("ATS skanerlaridan oson o'tuvchi format");
    } else if (purpose === 'creative' && (template.category === 'creative' || template.category === 'modern')) {
      score += 12;
      reasons.push("Ko'zni quvontiruvchi vizual elementlar");
    } else if (purpose === 'international' && (template.layout === 'minimal-clean' || template.layout === 'compact-ats')) {
      score += 10;
      reasons.push("Xalqaro standartlarga mos");
    }

    // Tajriba darajasi
    if (experienceLevel === 'senior' || experienceLevel === 'lead') {
      if (template.category === 'executive' || template.layout.includes('timeline')) {
        score += 8;
        reasons.push("Katta tajribani yoritish uchun mos");
      }
    } else if (experienceLevel === 'entry') {
      if (template.category === 'academic' || template.category === 'minimal') {
        score += 8;
        reasons.push("Ko'nikmalar va ta'limga ko'proq urg'u");
      }
    }

    // Foto afzalligi
    if (hasPhoto && template.hasPhotoFocus) {
      score += 5;
    }

    // Score ni 99 bilan chegaralash
    const finalScore = Math.min(99, score);

    return {
      template,
      score: finalScore,
      reasons,
    };
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, 12);
}

export interface CVData {
  personalInfo: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    linkedin: string;
    telegram: string;
    photo: string | null;
    summary: string;
  };
  workExperience: WorkExperience[];
  education: Education[];
  skills: {
    technical: Skill[];
    soft: Skill[];
  };
  languages: Language[];
  template: TemplateType;
  accentColor: AccentColor;
  font: FontType;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  university: string;
  startYear: string;
  endYear: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface Language {
  id: string;
  name: string;
  level: 'Boshlang\'ich' | 'O\'rta' | 'Yaxshi' | 'Mukammal' | 'Ona tili';
}

export type TemplateType =
  | 'minimal' | 'modern' | 'dark' | 'classic'
  | 't001' | 't002' | 't003' | 't004' | 't005'
  | 't006' | 't007' | 't008' | 't009' | 't010'
  | 't011' | 't012' | 't013' | 't014' | 't015'
  | 't016' | 't017' | 't018' | 't019' | 't020'
  | 't021' | 't022' | 't023' | 't024' | 't025'
  | 't026' | 't027' | 't028' | 't029' | 't030'
  | 't031' | 't032' | 't033' | 't034' | 't035'
  | 't036' | 't037' | 't038' | 't039' | 't040'
  | 't041' | 't042' | 't043' | 't044' | 't045'
  | 't046' | 't047' | 't048' | 't049' | 't050'
  | 't051' | 't052' | 't053' | 't054' | 't055'
  | 't056' | 't057' | 't058' | 't059' | 't060'
  | 't061' | 't062' | 't063' | 't064' | 't065'
  | 't066' | 't067' | 't068' | 't069' | 't070'
  | 't071' | 't072' | 't073' | 't074' | 't075'
  | 't076' | 't077' | 't078' | 't079' | 't080'
  | 't081' | 't082' | 't083' | 't084' | 't085'
  | 't086' | 't087' | 't088' | 't089' | 't090'
  | 't091' | 't092' | 't093' | 't094' | 't095'
  | 't096' | 't097' | 't098' | 't099' | 't100';

// ✅ TUZATILDI: faqat 3 ta emas, 24 ta rang
export type AccentColor =
  | 'blue' | 'sky' | 'cyan' | 'teal' | 'green' | 'emerald'
  | 'lime' | 'yellow' | 'amber' | 'orange' | 'red' | 'rose'
  | 'pink' | 'fuchsia' | 'purple' | 'violet' | 'indigo'
  | 'slate' | 'gray' | 'zinc' | 'black' | 'brown' | 'gold' | 'navy';

export type FontType = 'Inter' | 'Poppins' | 'Roboto';

export const defaultCVData: CVData = {
  personalInfo: {
    fullName: '',
    phone: '',
    email: '',
    address: '',
    linkedin: '',
    telegram: '',
    photo: null,
    summary: '',
  },
  workExperience: [],
  education: [],
  skills: { technical: [], soft: [] },
  languages: [],
  template: 't001',
  accentColor: 'blue',
  font: 'Inter',
};
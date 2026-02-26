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

export type TemplateType = 'minimal' | 'modern' | 'dark' | 'classic';
export type AccentColor = 'blue' | 'green' | 'black';
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
  skills: {
    technical: [],
    soft: [],
  },
  languages: [],
  template: 'minimal',
  accentColor: 'blue',
  font: 'Inter',
};

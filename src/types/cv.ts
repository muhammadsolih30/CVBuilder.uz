export interface CVData {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    phone: string;
    email: string;
    address: string;
    linkedin: string;
    telegram: string;
    github?: string;
    website?: string;
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
  projects?: Project[];
  certificates?: Certificate[];
  template: TemplateType;
  accentColor: AccentColor;
  font: FontType;
  fontSize: number;
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
  level: "Boshlang'ich" | "O'rta" | "Yaxshi" | "Mukammal" | "Ona tili";
}

export interface Project {
  id: string;
  title: string;
  role?: string;
  link?: string;
  startDate?: string;
  endDate?: string;
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  link?: string;
  description?: string;
}

export interface QuestionnaireAnswers {
  industry: 'it' | 'design' | 'sales' | 'finance' | 'management' | 'education' | 'student' | 'other';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
  purpose: 'ats' | 'international' | 'local' | 'creative';
  hasPhoto: boolean;
}

export type TemplateType =
  | 'minimal' | 'modern' | 'dark' | 'classic'
  | `t${string}`
  | string;

export type AccentColor =
  | 'blue' | 'sky' | 'cyan' | 'teal' | 'green' | 'emerald'
  | 'lime' | 'yellow' | 'amber' | 'orange' | 'red' | 'rose'
  | 'pink' | 'fuchsia' | 'purple' | 'violet' | 'indigo'
  | 'slate' | 'gray' | 'zinc' | 'black' | 'brown' | 'gold' | 'navy';

export type FontType = 'Inter' | 'Poppins' | 'Roboto';

export const defaultCVData: CVData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    phone: '',
    email: '',
    address: '',
    linkedin: '',
    telegram: '',
    github: '',
    website: '',
    photo: null,
    summary: '',
  },
  workExperience: [],
  education: [],
  skills: { technical: [], soft: [] },
  languages: [],
  projects: [],
  certificates: [],
  template: 't001',
  accentColor: 'blue',
  font: 'Inter',
  fontSize: 22,
};
import { CVData } from '@/types/cv';

export const DEMO_CV_DATA: Record<string, CVData> = {
  it: {
    personalInfo: {
      fullName: "Rustam Karimov",
      jobTitle: "Senior Full-Stack Dasturchi",
      phone: "+998 90 123 45 67",
      email: "rustam.karimov@gmail.com",
      address: "Toshkent shahri, O'zbekiston",
      linkedin: "linkedin.com/in/rustam-dev",
      telegram: "@rustam_dev",
      github: "github.com/rustamkarimov",
      website: "https://rustam.dev",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      summary: "7 yillik tajribaga ega Senior Full-Stack dasturchi. Yuqori yuklamali FinTech va E-commerce tizimlarini (React, Node.js, Go, PostgreSQL, AWS) arxitekturasini qurish, microservice'lar va jamoani boshqarish bo'yicha mustahkam tajriba.",
    },
    workExperience: [
      {
        id: "exp-1",
        jobTitle: "Lead Software Engineer",
        company: "Paytech Global MCHJ",
        location: "Toshkent",
        startDate: "2022-03",
        endDate: "",
        current: true,
        description: "• Kunlik 2M+ tranzaksiya o'tkazuvchi to'lov tizimi arxitekturasini loyihalashtirdim.\n• API kechikish vaqtini 180ms dan 45ms ga qisqartirdim (4x tezlashish).\n• 8 nafar dasturchidan iborat jamoaga mentorlik qildim.",
      },
      {
        id: "exp-2",
        jobTitle: "Senior Frontend Developer",
        company: "Digital Solutions Agency",
        location: "Toshkent / Remote",
        startDate: "2019-06",
        endDate: "2022-02",
        current: false,
        description: "• React, TypeScript va Next.js asosida 12+ xalqaro loyihalarni ishlab chiqdim.\n• Web vitals tezligini 40% dan 95% ga ko'tarib, konversiyani 22% oshirdim.",
      },
    ],
    education: [
      {
        id: "edu-1",
        degree: "Dasturiy injiniring bakalavri",
        university: "Toshkent Axborot Texnologiyalari Universiteti (TATU)",
        startYear: "2015",
        endYear: "2019",
        description: "GPA: 4.8 / 5.0. Dasturlash olimpiadalari g'olibi.",
      },
    ],
    skills: {
      technical: [
        { id: "s-1", name: "TypeScript & React", level: 5 },
        { id: "s-2", name: "Node.js & Express", level: 5 },
        { id: "s-3", name: "PostgreSQL & Redis", level: 4 },
        { id: "s-4", name: "Docker & AWS", level: 4 },
        { id: "s-5", name: "CI/CD & Git", level: 5 },
      ],
      soft: [
        { id: "s-6", name: "Jamoa yetakchiligi", level: 5 },
        { id: "s-7", name: "Muammolarni hal qilish", level: 5 },
        { id: "s-8", name: "Agile & Scrum", level: 4 },
      ],
    },
    languages: [
      { id: "l-1", name: "O'zbek tili", level: "Ona tili" },
      { id: "l-2", name: "Ingliz tili", level: "Mukammal" },
      { id: "l-3", name: "Rus tili", level: "Yaxshi" },
    ],
    projects: [
      {
        id: "p-1",
        title: "FastPay FinTech Platform",
        role: "Lead Architect",
        link: "https://fastpay.demo",
        description: "O'zbekistondagi to'lov agregatori. 150+ internet-do'konlar bilan integratsiya.",
      },
      {
        id: "p-2",
        title: "OpenCV QR Scanner SDK",
        role: "Creator",
        link: "https://github.com/rustam/qr-sdk",
        description: "Ochiq kodli QR kodlarni yuqori tezlikda aniqlovchi kutubxona (1.5k+ GitHub yulduzlari).",
      },
    ],
    certificates: [
      {
        id: "c-1",
        title: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023",
      },
      {
        id: "c-2",
        title: "Meta Certified Front-End Developer",
        issuer: "Coursera / Meta",
        date: "2021",
      },
    ],
    template: "t001",
    accentColor: "blue",
    font: "Inter",
    fontSize: 22,
  },

  marketing: {
    personalInfo: {
      fullName: "Madina Usmonova",
      jobTitle: "Raqamli Marketing va SMM Bo'yicha Mutaxassis",
      phone: "+998 97 765 43 21",
      email: "madina.marketing@mail.ru",
      address: "Toshkent, O'zbekiston",
      linkedin: "linkedin.com/in/madina-marketing",
      telegram: "@madina_market",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      summary: "5 yillik tajribaga ega kreativ marketing menejeri. Target reklama, brend strategiyasi, kontent rejalashtirish va analitika (Meta Ads, Google Ads, TikTok) orqali kompaniya savdosini 3 baravarga oshirish bo'yicha tajribaga ega.",
    },
    workExperience: [
      {
        id: "exp-m1",
        jobTitle: "Bosh Marketing Menejeri",
        company: "Apex Retail Group",
        location: "Toshkent",
        startDate: "2021-08",
        endDate: "",
        current: true,
        description: "• Oylik $35,000+ reklama byudjetini samarali boshqardim (ROAS: 4.8x).\n• Kompaniya ijtimoiy tarmoqlaridagi obunachilar sonini 45,000 dan 280,000 ga yetkazdim.\n• Yangi mahsulot taqdimotida 1 oyda 50,000 dona sotuvga erishdik.",
      },
    ],
    education: [
      {
        id: "edu-m1",
        degree: "Marketing va Jamoatchilik bilan aloqalar",
        university: "Toshkent Davlat Iqtisodiyot Universiteti (TDIU)",
        startYear: "2016",
        endYear: "2020",
        description: "Qizil diplom bilan tamomlagan.",
      },
    ],
    skills: {
      technical: [
        { id: "sm-1", name: "Meta & TikTok Ads", level: 5 },
        { id: "sm-2", name: "Google Analytics 4", level: 4 },
        { id: "sm-3", name: "SEO & Copywriting", level: 5 },
        { id: "sm-4", name: "Figma & Canva Pro", level: 4 },
      ],
      soft: [
        { id: "sm-5", name: "Kreativ fikrlash", level: 5 },
        { id: "sm-6", name: "Muzokara olib borish", level: 5 },
      ],
    },
    languages: [
      { id: "lm-1", name: "O'zbek tili", level: "Ona tili" },
      { id: "lm-2", name: "Rus tili", level: "Mukammal" },
      { id: "lm-3", name: "Ingliz tili", level: "Yaxshi" },
    ],
    projects: [
      {
        id: "pm-1",
        title: "Brendni Rebrending Qilish",
        role: "Strateg",
        description: "15 yillik savdo brendining to'liq vizual va kontent yangilanishi.",
      },
    ],
    certificates: [
      {
        id: "cm-1",
        title: "Meta Certified Digital Marketing Associate",
        issuer: "Meta",
        date: "2022",
      },
    ],
    template: "t003",
    accentColor: "emerald",
    font: "Poppins",
    fontSize: 22,
  },
};

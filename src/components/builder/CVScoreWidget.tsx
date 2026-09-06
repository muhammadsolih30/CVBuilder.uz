import React from 'react';
import { CVData } from '@/types/cv';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Props {
  data: CVData;
}

export default function CVScoreWidget({ data }: Props) {
  // Score hisoblash
  let score = 0;
  const tips: string[] = [];

  if (data.personalInfo.fullName.trim().length > 3) {
    score += 15;
  } else {
    tips.push("To'liq ismingizni kiriting");
  }

  if (data.personalInfo.jobTitle?.trim()) {
    score += 10;
  } else {
    tips.push("Karyera lavozimingizni kiriting (masalan: Frontend Developer)");
  }

  if (data.personalInfo.phone && data.personalInfo.email) {
    score += 15;
  } else {
    tips.push("Telefon va email kontaktlarini to'ldiring");
  }

  if (data.personalInfo.summary && data.personalInfo.summary.length > 50) {
    score += 15;
  } else {
    tips.push("Professional xulosa (haqingizda qisqacha) yozing");
  }

  if (data.workExperience.length > 0) {
    score += 20;
    const hasDesc = data.workExperience.some(w => w.description.length > 20);
    if (!hasDesc) {
      tips.push("Ish joyingizdagi asosiy yutuqlaringizni yozing");
    }
  } else {
    tips.push("Kamida 1 ta ish tajribasi yoki amaliyot qo'shing");
  }

  if (data.education.length > 0) {
    score += 10;
  } else {
    tips.push("Ta'lim ma'lumotini kiriting");
  }

  if (data.skills.technical.length >= 3) {
    score += 10;
  } else {
    tips.push("Kamida 3 ta asosiy ko'nikma qo'shing");
  }

  if ((data.projects && data.projects.length > 0) || (data.certificates && data.certificates.length > 0)) {
    score += 5;
  }

  const finalScore = Math.min(100, score);

  const getStatus = () => {
    if (finalScore >= 85) return { label: "A'lo darajada (ATS Tayyor)", color: 'text-emerald-600', bg: 'bg-emerald-500' };
    if (finalScore >= 60) return { label: "Yaxshi daraja", color: 'text-amber-600', bg: 'bg-amber-500' };
    return { label: "To'ldirilishi kerak", color: 'text-rose-600', bg: 'bg-rose-500' };
  };

  const status = getStatus();

  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
        <div className="flex items-center justify-between sm:justify-start gap-1.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground">CV To'liqligi & ATS</span>
          </div>
          <span className={`text-xs font-bold sm:hidden ${status.color}`}>
            {finalScore}%
          </span>
        </div>
        <span className={`text-xs font-bold hidden sm:inline ${status.color}`}>
          {finalScore}% — {status.label}
        </span>
        <span className={`text-[11px] font-medium sm:hidden ${status.color}`}>
          {status.label}
        </span>
      </div>

      <Progress value={finalScore} className="h-2" />

      {tips.length > 0 && (
        <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 text-amber-500 flex-shrink-0" />
          <span>Tavsiya: {tips[0]}</span>
        </p>
      )}
    </div>
  );
}

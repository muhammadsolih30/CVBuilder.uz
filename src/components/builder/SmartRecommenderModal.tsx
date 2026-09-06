import React, { useState } from 'react';
import { getRecommendedTemplates, TemplateCatalogItem } from '@/data/templatesCatalog';
import { QuestionnaireAnswers } from '@/types/cv';
import { Button } from '@/components/ui/button';
import { Sparkles, Check, ArrowRight, ArrowLeft, RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TemplatePreview } from './StepTemplate';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
  currentTemplateId: string;
}

const INDUSTRIES = [
  { key: 'it', label: 'IT & Dasturlash', icon: '💻', desc: 'Frontend, Backend, DevOps, QA' },
  { key: 'design', label: 'Dizayn & Kreativ', icon: '🎨', desc: 'UI/UX, Grafik, 3D, Motion' },
  { key: 'sales', label: 'Savdo & Marketing', icon: '📈', desc: 'SMM, Target, Sotuv menejeri' },
  { key: 'finance', label: 'Moliya & Buxgalteriya', icon: '💰', desc: 'Buxgalter, Auditor, Tahlilchi' },
  { key: 'management', label: 'Boshqaruv & HR', icon: '👔', desc: 'Project manager, HR, Rahbar' },
  { key: 'student', label: 'Talaba / Tajribasiz', icon: '🎓', desc: 'Amaliyot, birinchi ish joyi' },
] as const;

const EXPERIENCE_LEVELS = [
  { key: 'entry', label: 'Boshlang\'ich (0-1 yil)', desc: 'Talaba yoki yangi sohani o\'zlashtirgan' },
  { key: 'mid', label: 'O\'rta daraja (1-3 yil)', desc: 'Amaliy tajriba va aniq natijalarga ega' },
  { key: 'senior', label: 'Katta mutaxassis (3-5+ yil)', desc: 'Mustaqil qaror qabul qiluvchi ekspert' },
  { key: 'lead', label: 'Rahbar / Yetakchi (Lead)', desc: 'Jamoa va strategiyani boshqaruvchi' },
] as const;

const PURPOSES = [
  { key: 'ats', label: 'ATS Standart (Tizim tekshiruvi)', desc: 'Katta korporatsiyalar uchun 100% o\'tuvchi format' },
  { key: 'international', label: 'Xalqaro / Remote ish', desc: 'Yevropa, AQSh va xorijiy kompaniyalar talablari' },
  { key: 'local', label: 'Mahalliy kompaniyalar', desc: 'O\'zbekiston bozoridagi bizneslar uchun optimal' },
  { key: 'creative', label: 'Kreativ portfolio', desc: 'Vizual jihatdan diqqatni tortuvchi noyob uslub' },
] as const;

export default function SmartRecommenderModal({
  isOpen,
  onClose,
  onSelectTemplate,
  currentTemplateId,
}: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    industry: 'it',
    experienceLevel: 'mid',
    purpose: 'ats',
    hasPhoto: true,
  });

  if (!isOpen) return null;

  const recommendations = getRecommendedTemplates(answers);

  const handleSelect = (templateId: string) => {
    onSelectTemplate(templateId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between gradient-primary text-white">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Aqlli Shablon Tanlash Yordamchisi</h3>
              <p className="text-xs text-white/80">
                3 ta tezkor savol orqali sohangizga 99% mos shablonlarni aniqlang
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 0 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  1-qadam / 3
                </span>
                <h4 className="text-xl font-bold mt-1">Qaysi sohada faoliyat yuritasiz?</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Tanlangan soha bo'yicha eng yuqori natija bergan shablonlar tavsiya qilinadi
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {INDUSTRIES.map(item => {
                  const isSelected = answers.industry === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setAnswers(p => ({ ...p, industry: item.key as any }))}
                      className={`p-4 rounded-xl text-left border-2 transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20'
                          : 'border-border hover:border-primary/50 bg-card'
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  2-qadam / 3
                </span>
                <h4 className="text-xl font-bold mt-1">Tajriba darajangiz qanday?</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Har bir tajriba bosqichi uchun alohida e'tibor qaratiladigan bo'limlar mavjud
                </p>
              </div>

              <div className="space-y-2.5">
                {EXPERIENCE_LEVELS.map(item => {
                  const isSelected = answers.experienceLevel === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setAnswers(p => ({ ...p, experienceLevel: item.key as any }))}
                      className={`w-full p-3.5 rounded-xl text-left border-2 transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20'
                          : 'border-border hover:border-primary/50 bg-card'
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-sm text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-primary flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  3-qadam / 3
                </span>
                <h4 className="text-xl font-bold mt-1">CV asosiy maqsadi qanday?</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Topshirayotgan kompaniyangiz format talablariga moslaymiz
                </p>
              </div>

              <div className="space-y-2.5">
                {PURPOSES.map(item => {
                  const isSelected = answers.purpose === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setAnswers(p => ({ ...p, purpose: item.key as any }))}
                      className={`w-full p-3.5 rounded-xl text-left border-2 transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20'
                          : 'border-border hover:border-primary/50 bg-card'
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-sm text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-primary flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Rasm tanlovi */}
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Profil fotosurati bilan bo'lsinmi?</p>
                  <p className="text-xs text-muted-foreground">
                    Xalqaro AQSh/Buyuk Britaniya standartida ko'pincha rasmsiz topshiriladi
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={answers.hasPhoto ? 'default' : 'outline'}
                    onClick={() => setAnswers(p => ({ ...p, hasPhoto: true }))}
                  >
                    Ha, rasm bilan
                  </Button>
                  <Button
                    size="sm"
                    variant={!answers.hasPhoto ? 'default' : 'outline'}
                    onClick={() => setAnswers(p => ({ ...p, hasPhoto: false }))}
                  >
                    Yo'q, rasmsiz
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-green-500/10 text-green-600 rounded-full">
                  <Check className="w-3.5 h-3.5" /> Moslik tahlili tayyor
                </span>
                <h4 className="text-xl font-bold mt-2">Siz uchun eng mos 6 ta shablon</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Algoritm sizning sohangiz ({answers.industry.toUpperCase()}) va tajribangizga mos shablonlarni tanladi
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto p-1">
                {recommendations.slice(0, 6).map(({ template, score, reasons }) => {
                  const isCurrent = currentTemplateId === template.id;
                  return (
                    <div
                      key={template.id}
                      onClick={() => handleSelect(template.id)}
                      className={`group cursor-pointer rounded-xl p-2.5 border-2 transition-all relative flex flex-col justify-between hover:shadow-md ${
                        isCurrent
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                          : 'border-border hover:border-primary/50 bg-card'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                          {score}% moslik
                        </span>
                        {template.badge && (
                          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                            {template.badge}
                          </span>
                        )}
                      </div>

                      {/* Haqiqiy dizaynli SVG preview */}
                      <div className="w-full h-28 bg-white rounded-lg border border-border/50 mb-2 group-hover:scale-[1.02] transition-transform overflow-hidden">
                        <TemplatePreview tKey={template.id} accent="#2563eb" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-foreground truncate">{template.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{template.description}</p>
                      </div>

                      <Button
                        size="sm"
                        className="w-full mt-2.5 text-xs h-7"
                        variant={isCurrent ? 'secondary' : 'default'}
                      >
                        {isCurrent ? "Tanlangan" : "Qo'llash"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-muted/30 border-t border-border flex items-center justify-between">
          {step > 0 && step < 3 ? (
            <Button variant="ghost" size="sm" onClick={() => setStep(s => s - 1)}>
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Ortga
            </Button>
          ) : step === 3 ? (
            <Button variant="ghost" size="sm" onClick={() => setStep(0)}>
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Qayta boshlash
            </Button>
          ) : (
            <div />
          )}

          {step < 2 && (
            <Button size="sm" onClick={() => setStep(s => s + 1)}>
              Davom etish
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          )}

          {step === 2 && (
            <Button
              size="sm"
              className="gradient-primary text-white"
              onClick={() => setStep(3)}
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              Tavsiyalarni ko'rish
            </Button>
          )}

          {step === 3 && (
            <Button variant="outline" size="sm" onClick={onClose}>
              Yopish
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

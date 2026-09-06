import { useState, useRef } from "react";
import { useCVData } from "@/hooks/useCVData";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ArrowLeft,
  RotateCcw,
  Eye,
  Columns,
  Download,
  Upload,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import StepPersonalInfo from "@/components/builder/StepPersonalInfo";
import StepWorkExperience from "@/components/builder/StepWorkExperience";
import StepEducation from "@/components/builder/StepEducation";
import StepSkills from "@/components/builder/StepSkills";
import StepLanguages from "@/components/builder/StepLanguages";
import StepProjects from "@/components/builder/StepProjects";
import StepCertificates from "@/components/builder/StepCertificates";
import StepTemplate from "@/components/builder/StepTemplate";
import CVPreview from "@/components/builder/CVPreview";
import SplitPreviewPanel from "@/components/builder/SplitPreviewPanel";
import CVScoreWidget from "@/components/builder/CVScoreWidget";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function BuilderPage() {
  const { t } = useTranslation();

  const STEPS = [
    { label: t("builder.steps.personal"), key: "personal", short: t("builder.steps.personal").substring(0, 6) },
    { label: t("builder.steps.work"), key: "work", short: t("builder.steps.work").substring(0, 3) },
    { label: t("builder.steps.education"), key: "education", short: t("builder.steps.education").substring(0, 6) },
    { label: t("builder.steps.skills"), key: "skills", short: t("builder.steps.skills").substring(0, 7) },
    { label: t("builder.steps.languages"), key: "languages", short: t("builder.steps.languages").substring(0, 6) },
    { label: t("builder.steps.projects"), key: "projects", short: t("builder.steps.projects").substring(0, 6) },
    { label: t("builder.steps.certificates"), key: "certificates", short: t("builder.steps.certificates").substring(0, 10) },
    { label: t("builder.steps.template"), key: "template", short: t("builder.steps.template").substring(0, 6) },
  ];

  const [step, setStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isSplitPreview, setIsSplitPreview] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    cvData,
    setCVData,
    updatePersonalInfo,
    resetData,
    loadDemo,
    exportJSON,
    importJSON,
  } = useCVData();
  const navigate = useNavigate();

  const progress = ((step + 1) / STEPS.length) * 100;

  const goToStep = (n: number) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleReset = () => {
    if (window.confirm("Barcha ma'lumotlarni tozalab, yangidan boshlamoqchimisiz?")) {
      resetData();
      goToStep(0);
    }
  };

  const handleLoadDemo = (type: 'it' | 'marketing') => {
    if (
      cvData.personalInfo.fullName &&
      !window.confirm("Mavjud ma'lumotlaringiz namunaviy ma'lumotlar bilan almashtiriladi. Rozimisiz?")
    ) {
      return;
    }
    loadDemo(type);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        importJSON(parsed);
        alert("CV ma'lumotlari muvaffaqiyatli tiklandi!");
      } catch {
        alert("Fayl formati noto'g'ri. JSON fayl yuklang.");
      }
    };
    reader.readAsText(file);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StepPersonalInfo
            data={cvData.personalInfo}
            onChange={updatePersonalInfo}
          />
        );
      case 1:
        return (
          <StepWorkExperience
            data={cvData.workExperience}
            onChange={(v) => setCVData((p) => ({ ...p, workExperience: v }))}
          />
        );
      case 2:
        return (
          <StepEducation
            data={cvData.education}
            onChange={(v) => setCVData((p) => ({ ...p, education: v }))}
          />
        );
      case 3:
        return (
          <StepSkills
            data={cvData.skills}
            onChange={(v) => setCVData((p) => ({ ...p, skills: v }))}
          />
        );
      case 4:
        return (
          <StepLanguages
            data={cvData.languages}
            onChange={(v) => setCVData((p) => ({ ...p, languages: v }))}
          />
        );
      case 5:
        return (
          <StepProjects
            data={cvData.projects || []}
            onChange={(v) => setCVData((p) => ({ ...p, projects: v }))}
          />
        );
      case 6:
        return (
          <StepCertificates
            data={cvData.certificates || []}
            onChange={(v) => setCVData((p) => ({ ...p, certificates: v }))}
          />
        );
      case 7:
        return (
          <StepTemplate
            data={cvData}
            onChange={(field, value) =>
              setCVData((p) => ({
                ...p,
                [field]: field === "fontSize" ? Number(value) : value,
              }))
            }
          />
        );
      default:
        return null;
    }
  };

  if (showPreview) {
    return (
      <CVPreview
        data={cvData}
        onBack={() => {
          setShowPreview(false);
          window.scrollTo({ top: 0, behavior: "instant" });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Yashirin JSON fayl yuklash */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileImport}
        accept=".json"
        className="hidden"
      />

      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="w-full px-4 sm:px-6 flex items-center justify-between h-14">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 gradient-primary rounded flex items-center justify-center shadow-sm">
                <FileText className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-bold text-sm text-foreground tracking-tight">
                CVBuilder.uz
              </span>
            </div>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Namuna yuklash tugmalari */}
            <div className="hidden sm:flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleLoadDemo('it')}
                className="text-xs h-8 text-muted-foreground hover:text-primary"
                title="Dasturchi namunasi"
              >
                <BookOpen className="w-3.5 h-3.5 mr-1 text-primary" />
                <span>IT Namunasi</span>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleLoadDemo('marketing')}
                className="text-xs h-8 text-muted-foreground hover:text-emerald-600"
                title="Marketing namunasi"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                <span>Marketing Namunasi</span>
              </Button>
            </div>

            {/* Zaxira yuklab olish */}
            <Button
              size="sm"
              variant="ghost"
              onClick={exportJSON}
              className="text-xs h-8 text-muted-foreground hover:text-foreground hidden md:flex"
              title="CV ma'lumotlarini JSON fayl qilib yuklab olish"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              <span>Zaxira</span>
            </Button>

            {/* Split Screen Toggle (Desktop) */}
            <Button
              size="sm"
              variant={isSplitPreview ? "secondary" : "ghost"}
              onClick={() => setIsSplitPreview(!isSplitPreview)}
              className="text-xs h-8 hidden lg:flex items-center gap-1.5"
              title="Yonma-yon jonli ko'rishni yoqish/o'chirish"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>{isSplitPreview ? "Jonli ko'rinish" : "Bir ustun"}</span>
            </Button>

            {/* Tozalash */}
            <Button
              size="sm"
              variant="ghost"
              onClick={handleReset}
              className="text-muted-foreground hover:text-destructive h-8 px-2"
              title={t("builder.clear")}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline ml-1 text-xs">{t("builder.clear")}</span>
            </Button>

            {/* To'liq ko'rish */}
            <Button
              size="sm"
              className="gradient-primary text-white h-8 text-xs font-semibold px-3 shadow-sm"
              onClick={() => {
                setShowPreview(true);
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
            >
              <Eye className="w-3.5 h-3.5 mr-1" />
              <span>{t("builder.preview")}</span>
            </Button>
            
            <div className="flex items-center gap-1 ml-1 border-l border-border pl-1">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Jarayon chizig'i */}
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Steps Tabs */}
      <div className="bg-card border-b border-border overflow-x-auto scrollbar-none">
        <div className="w-full max-w-7xl mx-auto flex px-2 sm:px-6">
          {STEPS.map((s, i) => (
            <button
              key={s.key}
              onClick={() => goToStep(i)}
              className={`flex-1 min-w-[70px] px-2 sm:px-3 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap text-center ${
                i === step
                  ? "border-primary text-primary font-semibold"
                  : i < step
                    ? "border-transparent text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="mr-1">{i < step ? "✓" : `${i + 1}.`}</span>
              <span className="hidden md:inline">{s.label}</span>
              <span className="md:hidden">{s.short}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Asosiy Ish Maydoni (Split Screen yoki Oddiy) */}
      <div className="flex-1 flex flex-col">
        <div
          className={`flex-1 w-full ${
            isSplitPreview ? "lg:grid lg:grid-cols-12" : "max-w-4xl mx-auto"
          }`}
        >
          {/* Chap ustun: Forma va Bosqichlar */}
          <div
            className={`flex flex-col justify-between p-4 sm:p-6 lg:p-8 ${
              isSplitPreview ? "lg:col-span-6 xl:col-span-6 overflow-y-auto" : "w-full"
            }`}
          >
            <div className="space-y-6 max-w-2xl mx-auto w-full">
              {/* CV To'liqligi / ATS Ko'rsatkichi */}
              <CVScoreWidget data={cvData} />

              {/* Bosqich komponenti */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* O'ng ustun: Jonli Split Preview (faqat Desktop lg va katta ekranlarda) */}
          {isSplitPreview && (
            <div className="hidden lg:block lg:col-span-6 xl:col-span-6 h-[calc(100vh-108px)] sticky top-[108px]">
              <SplitPreviewPanel
                data={cvData}
                onExpand={() => {
                  setShowPreview(true);
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Nav Footer */}
      <div className="sticky bottom-0 z-40 bg-card/90 backdrop-blur-md border-t border-border">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            onClick={() => goToStep(Math.max(0, step - 1))}
            disabled={step === 0}
          >
            {t("builder.back")}
          </Button>

          <span className="text-xs sm:text-sm font-medium text-muted-foreground">
            {step + 1} / {STEPS.length} — {STEPS[step].label}
          </span>

          <div className="flex items-center gap-2">
            {step === STEPS.length - 1 && (
              <Button
                variant="outline"
                className="font-semibold"
                onClick={() => {
                  try {
                    localStorage.setItem("cv-builder-data", JSON.stringify(cvData));
                    alert(t("builder.saveSuccess"));
                  } catch {}
                }}
              >
                {t("builder.save")}
              </Button>
            )}

            {step < STEPS.length - 1 ? (
              <Button onClick={() => goToStep(step + 1)}>{t("builder.next")}</Button>
            ) : (
              <Button
                className="gradient-primary text-primary-foreground font-semibold"
                onClick={() => {
                  setShowPreview(true);
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
              >
                {t("builder.preview")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

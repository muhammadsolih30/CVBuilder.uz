import { useState } from "react";
import { useCVData } from "@/hooks/useCVData";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import StepPersonalInfo from "@/components/builder/StepPersonalInfo";
import StepWorkExperience from "@/components/builder/StepWorkExperience";
import StepEducation from "@/components/builder/StepEducation";
import StepSkills from "@/components/builder/StepSkills";
import StepLanguages from "@/components/builder/StepLanguages";
import StepTemplate from "@/components/builder/StepTemplate";
import CVPreview from "@/components/builder/CVPreview";

const STEPS = [
  { label: "Shaxsiy ma'lumotlar", key: "personal", short: "Shaxsiy" },
  { label: "Ish tajribasi", key: "work", short: "Ish" },
  { label: "Ta'lim", key: "education", short: "Ta'lim" },
  { label: "Ko'nikmalar", key: "skills", short: "Ko'nikma" },
  { label: "Tillar", key: "languages", short: "Tillar" },
  { label: "Dizayn", key: "template", short: "Dizayn" },
];

export default function BuilderPage() {
  const [step, setStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const { cvData, setCVData, updatePersonalInfo, resetData } = useCVData();
  const navigate = useNavigate();

  const progress = ((step + 1) / STEPS.length) * 100;

  // Har qanday step o'zgarishda ekran tepasiga qaytadi
  const goToStep = (n: number) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleReset = () => {
    if (window.confirm("Barcha ma'lumotlarni o'chirmoqchimisiz?")) {
      resetData();
      goToStep(0);
    }
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
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container-narrow flex items-center justify-between h-14 px-4 sm:px-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 gradient-primary rounded flex items-center justify-center">
                <FileText className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-semibold text-sm text-foreground">
                CVBuilder.uz
              </span>
            </div>
          </button>
          <div className="flex items-center gap-2">
            {/* FIX: resetData endi ishlatiladi */}
            <Button
              size="sm"
              variant="ghost"
              onClick={handleReset}
              className="text-muted-foreground hover:text-destructive"
              title="Tozalash"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline ml-1.5">Tozalash</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowPreview(true)}
            >
              Ko'rish
            </Button>
          </div>
        </div>
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="bg-card border-b border-border overflow-x-auto">
        <div className="container-narrow flex px-2 sm:px-6">
          {STEPS.map((s, i) => (
            <button
              key={s.key}
              onClick={() => goToStep(i)}
              className={`flex-1 px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                i === step
                  ? "border-primary text-primary"
                  : i < step
                    ? "border-transparent text-foreground"
                    : "border-transparent text-muted-foreground"
              }`}
            >
              <span className="mr-1">{i < step ? "✓" : `${i + 1}.`}</span>
              {/* FIX: mobile'da short label, desktop'da to'liq */}
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{s.short}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1">
        <div className="container-narrow px-4 sm:px-6 py-6 sm:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="sticky bottom-0 bg-card/80 backdrop-blur-md border-t border-border">
        <div className="container-narrow flex items-center justify-between px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            onClick={() => goToStep(Math.max(0, step - 1))}
            disabled={step === 0}
          >
            Ortga
          </Button>
          <span className="text-sm text-muted-foreground">
            {step + 1}/{STEPS.length}
          </span>
          {step < STEPS.length - 1 ? (
            <Button onClick={() => goToStep(step + 1)}>Keyingisi</Button>
          ) : (
            <Button
              className="gradient-primary text-primary-foreground"
              onClick={() => {
                setShowPreview(true);
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
            >
              CV ni ko'rish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

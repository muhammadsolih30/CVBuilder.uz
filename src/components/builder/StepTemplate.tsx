import React from "react";
import { CVData, TemplateType, AccentColor, FontType } from "@/types/cv";
import { Label } from "@/components/ui/label";

interface Props {
  data: CVData;
  onChange: (field: string, value: string) => void;
}

const MinimalPreview = () => (
  <svg
    viewBox="0 0 90 120"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
  >
    <rect width="90" height="120" fill="#ffffff" rx="3" />
    <rect x="10" y="10" width="50" height="6" fill="#1a1a1a" rx="1" />
    <rect x="10" y="19" width="35" height="3" fill="#888" rx="1" />
    <rect x="10" y="24" width="45" height="2" fill="#bbb" rx="1" />
    <line x1="10" y1="31" x2="80" y2="31" stroke="#ddd" strokeWidth="0.5" />
    <rect x="10" y="35" width="20" height="2.5" fill="#333" rx="1" />
    <rect x="10" y="41" width="65" height="2" fill="#ccc" rx="1" />
    <rect x="10" y="45" width="55" height="2" fill="#ccc" rx="1" />
    <rect x="10" y="56" width="20" height="2.5" fill="#333" rx="1" />
    <rect x="10" y="62" width="65" height="2" fill="#ccc" rx="1" />
    <rect x="10" y="66" width="50" height="2" fill="#ccc" rx="1" />
    <rect x="10" y="73" width="20" height="2.5" fill="#333" rx="1" />
    <rect x="10" y="79" width="40" height="3" fill="#e0e0e0" rx="1.5" />
    <rect x="10" y="79" width="28" height="3" fill="#555" rx="1.5" />
  </svg>
);

const ModernPreview = () => (
  <svg
    viewBox="0 0 90 120"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
  >
    <rect width="90" height="120" fill="#f8f9fa" rx="3" />
    <rect width="30" height="120" fill="#1e293b" />
    <circle cx="15" cy="18" r="9" fill="#334155" />
    <rect x="5" y="32" width="20" height="2" fill="#94a3b8" rx="1" />
    <rect x="5" y="37" width="18" height="1.5" fill="#64748b" rx="1" />
    <rect x="5" y="50" width="15" height="1.5" fill="#60a5fa" rx="1" />
    <rect x="5" y="55" width="20" height="2" fill="#e0e0e0" rx="1" />
    <rect x="5" y="55" width="14" height="2" fill="#60a5fa" rx="1" />
    <rect x="36" y="12" width="45" height="5" fill="#1e293b" rx="1" />
    <rect x="36" y="20" width="35" height="2.5" fill="#64748b" rx="1" />
    <rect x="36" y="30" width="20" height="2" fill="#3b82f6" rx="1" />
    <rect x="36" y="35" width="48" height="1.5" fill="#ccc" rx="1" />
    <rect x="36" y="39" width="42" height="1.5" fill="#ccc" rx="1" />
    <rect x="36" y="51" width="20" height="2" fill="#3b82f6" rx="1" />
    <rect x="36" y="56" width="48" height="1.5" fill="#ccc" rx="1" />
  </svg>
);

const ClassicPreview = () => (
  <svg
    viewBox="0 0 90 120"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
  >
    <rect width="90" height="120" fill="#fffdf7" rx="3" />
    <rect width="90" height="28" fill="#7c6f5c" />
    <rect x="10" y="8" width="45" height="5" fill="#ffffff" rx="1" />
    <rect x="10" y="16" width="30" height="3" fill="#e8dcc8" rx="1" />
    <rect x="10" y="34" width="22" height="2.5" fill="#7c6f5c" rx="1" />
    <line x1="10" y1="38" x2="80" y2="38" stroke="#c4b49a" strokeWidth="0.8" />
    <rect x="10" y="42" width="48" height="2" fill="#555" rx="1" />
    <rect x="10" y="47" width="65" height="1.5" fill="#aaa" rx="1" />
    <rect x="10" y="62" width="22" height="2.5" fill="#7c6f5c" rx="1" />
    <line x1="10" y1="66" x2="80" y2="66" stroke="#c4b49a" strokeWidth="0.8" />
    <rect x="10" y="70" width="45" height="2" fill="#555" rx="1" />
  </svg>
);

const DarkPreview = () => (
  <svg
    viewBox="0 0 90 120"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
  >
    <rect width="90" height="120" fill="#0f172a" rx="3" />
    <rect width="90" height="4" fill="#6366f1" />
    <rect x="10" y="12" width="55" height="6" fill="#f8fafc" rx="1" />
    <rect x="10" y="21" width="38" height="3" fill="#94a3b8" rx="1" />
    <rect x="10" y="39" width="3" height="10" fill="#6366f1" rx="1" />
    <rect x="16" y="40" width="20" height="2.5" fill="#e2e8f0" rx="1" />
    <rect x="16" y="45" width="55" height="1.5" fill="#475569" rx="1" />
    <rect x="10" y="57" width="3" height="10" fill="#6366f1" rx="1" />
    <rect x="16" y="58" width="25" height="2.5" fill="#e2e8f0" rx="1" />
    <rect x="16" y="63" width="55" height="1.5" fill="#475569" rx="1" />
  </svg>
);

// BUG FIX: to'g'ridan-to'g'ri Map ishlatiladi - Record[undefined] crash bo'lmaydi
const TEMPLATE_MAP: Record<string, React.FC> = {
  minimal: MinimalPreview,
  modern: ModernPreview,
  classic: ClassicPreview,
  dark: DarkPreview,
};

const templates: { key: TemplateType; name: string; desc: string }[] = [
  { key: "minimal", name: "Minimal", desc: "Toza va sodda" },
  { key: "modern", name: "Modern", desc: "Yon panel bilan" },
  { key: "classic", name: "Classic", desc: "An'anaviy uslub" },
  { key: "dark", name: "Dark Pro", desc: "Professional qora" },
];

const colors: { key: AccentColor; label: string; hex: string }[] = [
  { key: "blue", label: "Ko'k", hex: "#2563eb" },
  { key: "green", label: "Yashil", hex: "#0d9488" },
  { key: "black", label: "Qora", hex: "#1e293b" },
];

const fonts: { key: FontType; label: string }[] = [
  { key: "Inter", label: "Inter" },
  { key: "Poppins", label: "Poppins" },
  { key: "Roboto", label: "Roboto" },
];

// BUG FIX: xavfsiz preview render - undefined bo'lsa MinimalPreview qaytaradi
function SafePreview({ templateKey }: { templateKey: string }) {
  const Component = TEMPLATE_MAP[templateKey] || MinimalPreview;
  return <Component />;
}

export default function StepTemplate({ data, onChange }: Props) {
  // BUG FIX: data undefined bo'lsa crash bo'lmasligi uchun
  const safeTemplate = data?.template || "minimal";
  const safeColor = data?.accentColor || "blue";
  const safeFont = data?.font || "Inter";

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-1">Dizayn tanlang</h2>
        <p className="text-muted-foreground">
          CV shabloni, rangi va shriftini tanlang
        </p>
      </div>

      {/* Shablonlar */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Shablon</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {templates.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => onChange("template", t.key)}
              className={[
                "glass-card p-3 text-center transition-all",
                safeTemplate === t.key
                  ? "ring-2 ring-primary shadow-lg"
                  : "hover:shadow-md",
              ].join(" ")}
            >
              <div
                className="rounded-lg mb-2 overflow-hidden shadow-sm border border-border"
                style={{ aspectRatio: "3/4" }}
              >
                <SafePreview templateKey={t.key} />
              </div>
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Ranglar */}
      <div>
        <Label className="text-base font-semibold mb-3 block">
          Aksent rangi
        </Label>
        <div className="flex gap-5 flex-wrap">
          {colors.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => onChange("accentColor", c.key)}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className={[
                  "w-10 h-10 rounded-full transition-all",
                  safeColor === c.key
                    ? "ring-2 ring-offset-2 ring-primary scale-110"
                    : "hover:scale-105",
                ].join(" ")}
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-xs text-muted-foreground">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Shriftlar */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Shrift</Label>
        <div className="flex gap-3 flex-wrap">
          {fonts.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => onChange("font", f.key)}
              className={[
                "px-5 py-3 rounded-xl border-2 transition-all",
                safeFont === f.key
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground",
              ].join(" ")}
              style={{ fontFamily: `'${f.key}', sans-serif` }}
            >
              <p className="text-xl font-semibold">Aa</p>
              <p className="text-xs text-muted-foreground mt-0.5">{f.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Tanlangan xulosa */}
      <div className="glass-card p-4 flex items-center gap-3">
        <div
          className="rounded overflow-hidden border border-border flex-shrink-0"
          style={{ width: 48, height: 64 }}
        >
          <SafePreview templateKey={safeTemplate} />
        </div>
        <div>
          <p className="text-sm font-semibold">
            ✓ {templates.find((t) => t.key === safeTemplate)?.name ?? "Minimal"}{" "}
            tanlandi
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {colors.find((c) => c.key === safeColor)?.label ?? "Ko'k"} rang ·{" "}
            {safeFont} shrift
          </p>
        </div>
      </div>
    </div>
  );
}

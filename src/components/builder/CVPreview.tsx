import React, { useRef, useState, useLayoutEffect } from "react";
import { CVData } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Eye } from "lucide-react";
import html2pdf from "html2pdf.js";

interface Props {
  data: CVData;
  onBack: () => void;
}

// ─── 24 ta rang (StepTemplate bilan AYNAN MOS) ─────────────
const COLOR_MAP: Record<string, string> = {
  blue: "#2563eb",
  sky: "#0ea5e9",
  cyan: "#06b6d4",
  teal: "#14b8a6",
  green: "#16a34a",
  emerald: "#10b981",
  lime: "#84cc16",
  yellow: "#eab308",
  amber: "#f59e0b",
  orange: "#f97316",
  red: "#ef4444",
  rose: "#f43f5e",
  pink: "#ec4899",
  fuchsia: "#d946ef",
  purple: "#a855f7",
  violet: "#8b5cf6",
  indigo: "#6366f1",
  slate: "#64748b",
  gray: "#6b7280",
  zinc: "#71717a",
  black: "#1e293b",
  brown: "#92400e",
  gold: "#b45309",
  navy: "#1e3a5f",
};

// ─── t001–t025 statik template konfiguratsiyalari ──────────
// SVG ko'rinishi bilan AYNAN MOS keladi
const STATIC_CONFIGS = [
  // t001: Clean Line — oddiy chiziq + sarlavha
  { layout: "minimal-clean", bg: "#ffffff", hdr: "accent", dark: false },
  // t002: Dark Accent — qora fon
  { layout: "dark-sidebar", bg: "#0f172a", hdr: "accent", dark: true },
  // t003: Classic Top — to'liq rangli header
  { layout: "header-full", bg: "#fffdf7", hdr: "accent", dark: false },
  // t004: Modern Panel — chap sidebar
  { layout: "sidebar-left", bg: "#f8f9fa", hdr: "#1e293b", dark: false },
  // t005: Teal Photo — to'liq header + foto
  { layout: "header-full", bg: "#ffffff", hdr: "accent", dark: false },
  // t006: Blue Box — box sarlavha
  { layout: "minimal-clean", bg: "#fafafa", hdr: "accent", dark: false },
  // t007: Bold Stripe — chap qalin chiziq
  { layout: "left-stripe", bg: "#ffffff", hdr: "#1a1a1a", dark: false },
  // t008: Cyber Dark — qora fon
  { layout: "dark-sidebar", bg: "#1a1a2e", hdr: "accent", dark: true },
  // t009: Double Bar — ikki chiziq
  { layout: "double-bar", bg: "#ffffff", hdr: "#1e1b4b", dark: false },
  // t010: Forest Pro — yashil header
  { layout: "header-full", bg: "#f0fdf4", hdr: "#166534", dark: false },
  // t011: Red Dual — ikki chiziq qizil
  { layout: "double-bar", bg: "#ffffff", hdr: "#1e293b", dark: false },
  // t012: Navy Side — chap navy panel
  { layout: "sidebar-left", bg: "#f8f9fa", hdr: "#1e3a5f", dark: false },
  // t013: Purple Soft — to'liq binafsha header
  { layout: "header-full", bg: "#fdf4ff", hdr: "#7c3aed", dark: false },
  // t014: Corner Fold — burchak dizayn
  { layout: "corner", bg: "#ffffff", hdr: "#1e293b", dark: false },
  // t015: Gold Dark — qora fon
  { layout: "dark-sidebar", bg: "#1c1c1c", hdr: "accent", dark: true },
  // t016: Sky Banner — to'liq header
  { layout: "header-full", bg: "#f8fafc", hdr: "accent", dark: false },
  // t017: Prism Dark — header + foto
  { layout: "header-full", bg: "#ffffff", hdr: "#111827", dark: false },
  // t018: Amber Warm — amber header
  { layout: "header-full", bg: "#fffbeb", hdr: "#92400e", dark: false },
  // t019: Centered — markaziy sarlavha
  { layout: "centered", bg: "#ffffff", hdr: "#1e293b", dark: false },
  // t020: Gradient — gradient header
  { layout: "header-full", bg: "#ffffff", hdr: "accent", dark: false },
  // t021: Cyan Lines — ikki chiziq
  { layout: "double-bar", bg: "#ffffff", hdr: "#0c4a6e", dark: false },
  // t022: Cyber Navy — qora fon navy
  { layout: "dark-sidebar", bg: "#1a1a2e", hdr: "accent", dark: true },
  // t023: Split View — o'ng panel
  { layout: "side-right", bg: "#ffffff", hdr: "#0f172a", dark: false },
  // t024: Green Block — yashil header
  { layout: "header-full", bg: "#f0fdf4", hdr: "#14532d", dark: false },
  // t025: Mocha Dark — qora fon
  { layout: "dark-sidebar", bg: "#0f0f0f", hdr: "accent", dark: true },
] as const;

// ─── t026–t100 dinamik template konfiguratsiyalari ─────────
// DYN_PALETTES bilan AYNAN MOS (StepTemplate.tsx dan ko'chirilgan)
const DYN_PALETTES = [
  { bg: "#fff", hdr: "#1e3a5f", sty: "top-bar" },
  { bg: "#f5f7f0", hdr: "#3a5a1c", sty: "full-header" },
  { bg: "#fff", hdr: "#6b1a1a", sty: "left-stripe" },
  { bg: "#f8f9fa", hdr: "#374151", sty: "minimal" },
  { bg: "#f0fdfa", hdr: "#134e4a", sty: "corner" },
  { bg: "#fffbeb", hdr: "#78350f", sty: "double-bar" },
  { bg: "#eff6ff", hdr: "#1e3a8a", sty: "full-header" },
  { bg: "#f0fdf4", hdr: "#14532d", sty: "side-right" },
  { bg: "#fff1f2", hdr: "#881337", sty: "top-bar" },
  { bg: "#0f0f0f", hdr: "#1a1a1a", sty: "minimal" },
  { bg: "#fff", hdr: "#0c4a6e", sty: "full-header" },
  { bg: "#fafaf9", hdr: "#292524", sty: "corner" },
  { bg: "#fdf4ff", hdr: "#581c87", sty: "left-stripe" },
  { bg: "#fff", hdr: "#064e3b", sty: "double-bar" },
  { bg: "#fffbeb", hdr: "#78350f", sty: "full-header" },
  { bg: "#fff", hdr: "#1e1b4b", sty: "top-bar" },
  { bg: "#f8fafc", hdr: "#0f172a", sty: "side-right" },
  { bg: "#fff", hdr: "#4a1942", sty: "full-header" },
  { bg: "#f0fdf4", hdr: "#052e16", sty: "minimal" },
  { bg: "#fff", hdr: "#172554", sty: "double-bar" },
  { bg: "#fafafa", hdr: "#18181b", sty: "corner" },
  { bg: "#fff", hdr: "#450a0a", sty: "left-stripe" },
  { bg: "#f8fafc", hdr: "#020617", sty: "full-header" },
  { bg: "#fff", hdr: "#0c4a6e", sty: "top-bar" },
  { bg: "#fafafa", hdr: "#111827", sty: "minimal" },
  { bg: "#fff", hdr: "#1a2e05", sty: "full-header" },
  { bg: "#f8f9fa", hdr: "#0f172a", sty: "corner" },
  { bg: "#fff", hdr: "#280d0d", sty: "left-stripe" },
  { bg: "#fdf4ff", hdr: "#4a044e", sty: "double-bar" },
  { bg: "#fff", hdr: "#0c0a09", sty: "full-header" },
  { bg: "#f0f9ff", hdr: "#082f49", sty: "top-bar" },
  { bg: "#fff", hdr: "#052e16", sty: "side-right" },
  { bg: "#fafafa", hdr: "#27272a", sty: "minimal" },
  { bg: "#fff", hdr: "#3b0764", sty: "corner" },
  { bg: "#fdf8f0", hdr: "#7c2d12", sty: "full-header" },
  { bg: "#fff", hdr: "#0a2540", sty: "left-stripe" },
  { bg: "#f0fdf4", hdr: "#14532d", sty: "double-bar" },
  { bg: "#fff", hdr: "#111827", sty: "top-bar" },
  { bg: "#fafaf9", hdr: "#1c1917", sty: "full-header" },
  { bg: "#fff", hdr: "#030712", sty: "minimal" },
  { bg: "#fff", hdr: "#0c4a6e", sty: "corner" },
  { bg: "#f5f3ff", hdr: "#3730a3", sty: "full-header" },
  { bg: "#fff", hdr: "#1a1a1a", sty: "top-bar" },
  { bg: "#f8fafc", hdr: "#1e293b", sty: "side-right" },
  { bg: "#fff", hdr: "#166534", sty: "left-stripe" },
  { bg: "#fef2f2", hdr: "#7f1d1d", sty: "double-bar" },
  { bg: "#fff", hdr: "#1e3a5f", sty: "full-header" },
  { bg: "#fffdf7", hdr: "#713f12", sty: "corner" },
  { bg: "#fff", hdr: "#064e3b", sty: "top-bar" },
  { bg: "#f9fafb", hdr: "#111827", sty: "minimal" },
  { bg: "#fff", hdr: "#0f172a", sty: "full-header" },
  { bg: "#fdf4ff", hdr: "#701a75", sty: "left-stripe" },
  { bg: "#fff", hdr: "#0c4a6e", sty: "double-bar" },
  { bg: "#f0fdf4", hdr: "#166534", sty: "top-bar" },
  { bg: "#fff", hdr: "#1e1b4b", sty: "side-right" },
  { bg: "#fafaf9", hdr: "#292524", sty: "minimal" },
  { bg: "#fff", hdr: "#172554", sty: "corner" },
  { bg: "#fff7ed", hdr: "#c2410c", sty: "full-header" },
  { bg: "#fff", hdr: "#0f172a", sty: "top-bar" },
  { bg: "#f0fdf4", hdr: "#052e16", sty: "left-stripe" },
  { bg: "#fdf4ff", hdr: "#4a044e", sty: "double-bar" },
  { bg: "#fff", hdr: "#0a2540", sty: "full-header" },
  { bg: "#fafaf9", hdr: "#1c1917", sty: "corner" },
  { bg: "#fff", hdr: "#0f172a", sty: "top-bar" },
  { bg: "#fff", hdr: "#0c4a6e", sty: "side-right" },
  { bg: "#f9fafb", hdr: "#030712", sty: "minimal" },
  { bg: "#fff", hdr: "#450a0a", sty: "full-header" },
  { bg: "#fdf4ff", hdr: "#3b0764", sty: "left-stripe" },
  { bg: "#fff", hdr: "#1a2e05", sty: "double-bar" },
  { bg: "#fafafa", hdr: "#18181b", sty: "corner" },
  { bg: "#fff", hdr: "#082f49", sty: "top-bar" },
  { bg: "#fffbeb", hdr: "#78350f", sty: "side-right" },
  { bg: "#fff", hdr: "#1e1b4b", sty: "full-header" },
  { bg: "#f0fdf4", hdr: "#14532d", sty: "minimal" },
  { bg: "#fff", hdr: "#111827", sty: "left-stripe" },
];

type LayoutType =
  | "minimal-clean"
  | "dark-sidebar"
  | "header-full"
  | "sidebar-left"
  | "left-stripe"
  | "double-bar"
  | "corner"
  | "side-right"
  | "top-bar"
  | "minimal"
  | "centered"
  | "full-header";

interface TplConfig {
  layout: LayoutType;
  pageBg: string;
  headerColor: string;
  dark: boolean;
  accentHex: string;
}

function resolveConfig(templateKey: string, accentHex: string): TplConfig {
  // Eski templatelar
  const oldMap: Record<string, Omit<TplConfig, "accentHex">> = {
    modern: {
      layout: "sidebar-left",
      pageBg: "#ffffff",
      headerColor: accentHex,
      dark: false,
    },
    classic: {
      layout: "header-full",
      pageBg: "#ffffff",
      headerColor: accentHex,
      dark: false,
    },
    dark: {
      layout: "dark-sidebar",
      pageBg: "#0f172a",
      headerColor: accentHex,
      dark: true,
    },
    minimal: {
      layout: "minimal",
      pageBg: "#ffffff",
      headerColor: accentHex,
      dark: false,
    },
  };
  if (oldMap[templateKey]) return { ...oldMap[templateKey], accentHex };

  const idx = parseInt(templateKey.replace("t", ""), 10);

  // t001–t025
  if (idx >= 1 && idx <= 25) {
    const c = STATIC_CONFIGS[idx - 1];
    const resolvedHdr = c.hdr === "accent" ? accentHex : c.hdr;
    return {
      layout: c.layout as LayoutType,
      pageBg: c.bg,
      headerColor: resolvedHdr,
      dark: c.dark,
      accentHex,
    };
  }

  // t026–t100
  const dynIdx = idx - 26;
  if (dynIdx >= 0 && dynIdx < DYN_PALETTES.length) {
    const p = DYN_PALETTES[dynIdx];
    // sty nomlarini layout nomlariga o'girish
    const styMap: Record<string, LayoutType> = {
      "full-header": "header-full",
      "top-bar": "top-bar",
      "left-stripe": "left-stripe",
      minimal: "minimal-clean",
      corner: "corner",
      "double-bar": "double-bar",
      "side-right": "side-right",
    };
    const isDark =
      p.bg === "#0f0f0f" || p.bg === "#1a1a2e" || p.bg === "#0a0a0a";
    return {
      layout: styMap[p.sty] || "minimal-clean",
      pageBg: p.bg,
      headerColor: p.hdr,
      dark: isDark,
      accentHex,
    };
  }

  return {
    layout: "minimal-clean",
    pageBg: "#ffffff",
    headerColor: accentHex,
    dark: false,
    accentHex,
  };
}

// ─── Mobile scale wrapper ──────────────────────────────────
function CvScaleWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    function update() {
      const vw = window.innerWidth;
      const available = vw - 16;
      setScale(available < 794 ? available / 794 : 1);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: "2rem",
        paddingBottom:
          scale < 1 ? `calc(${(1 - scale) * 297}mm + 2rem)` : "2rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          transformOrigin: "top center",
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function CVPreview({ data, onBack }: Props) {
  const cvRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const accentHex = COLOR_MAP[data.accentColor] || "#2563eb";
  const cfg = resolveConfig(data.template, accentHex);
  const { layout, pageBg, headerColor, dark } = cfg;

  const {
    personalInfo: p,
    workExperience,
    education,
    skills,
    languages,
  } = data;

  // ─── PDF download ───────────────────────────────────────
  const handleDownload = async () => {
    if (!cvRef.current) return;
    setDownloading(true);
    try {
      await html2pdf()
        .set({
          margin: 0,
          filename: `${p.fullName || "CV"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            letterRendering: true,
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(cvRef.current)
        .save();
    } finally {
      setDownloading(false);
    }
  };

  // ─── ATS Score ──────────────────────────────────────────
  const score = [
    p.fullName ? 15 : 0,
    p.email ? 10 : 0,
    p.phone ? 10 : 0,
    p.summary && p.summary.length > 30 ? 15 : 0,
    workExperience.length > 0 ? 20 : 0,
    education.length > 0 ? 10 : 0,
    skills.technical.length + skills.soft.length > 0 ? 10 : 0,
    languages.length > 0 ? 10 : 0,
  ].reduce((a, b) => a + b, 0);
  const scoreColor =
    score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444";
  const scoreLabel = score >= 70 ? "Yaxshi" : score >= 40 ? "O'rta" : "Past";

  // ─── Yordamchi komponentlar ─────────────────────────────
  const bodyText = dark ? "#e2e8f0" : "#1e293b";
  const subText = dark ? "#94a3b8" : "#6b7280";
  const lineColor = dark ? "#1e293b" : "#e2e8f0";

  // Font size scale — barcha yozuvlar shu asosda oʼlchadi
  const fs = (data.fontSize ?? 15) / 15;

  const SH = ({ color, border }: { color: string; border?: string }) =>
    ({
      fontSize: 10 * fs,
      fontWeight: "bold" as const,
      textTransform: "uppercase" as const,
      letterSpacing: "0.1em",
      color,
      marginBottom: 6,
      paddingBottom: 3,
      borderBottom: `1.5px solid ${border || color + "40"}`,
    }) as React.CSSProperties;

  const Dots = ({
    level,
    fg,
    bg,
  }: {
    level: number;
    fg: string;
    bg: string;
  }) => (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          style={{
            width: 12,
            height: 3,
            borderRadius: 2,
            backgroundColor: n <= level ? fg : bg,
          }}
        />
      ))}
    </div>
  );

  // SVG ikonlar — PDF da to'g'ri chiqadi, emoji cho'zilmaydi
  const Icon = ({ d, color }: { d: string; color: string }) => (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
      }}
    >
      <path d={d} />
    </svg>
  );
  const ICONS = {
    phone:
      "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.64a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
    email:
      "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
    location:
      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6",
    linkedin:
      "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z M2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4",
    telegram: "M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
  };

  const ContactLine = ({ color }: { color: string }) => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        fontSize: 10 * fs,
        color,
        alignItems: "center",
      }}
    >
      {p.phone && (
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Icon d={ICONS.phone} color={color} /> {p.phone}
        </span>
      )}
      {p.email && (
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Icon d={ICONS.email} color={color} /> {p.email}
        </span>
      )}
      {p.address && (
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Icon d={ICONS.location} color={color} /> {p.address}
        </span>
      )}
      {p.linkedin && (
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Icon d={ICONS.linkedin} color={color} /> {p.linkedin}
        </span>
      )}
      {p.telegram && (
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Icon d={ICONS.telegram} color={color} /> {p.telegram}
        </span>
      )}
    </div>
  );

  // Ish tajribasi bloki
  const WorkBlock = ({ acol }: { acol: string }) => (
    <>
      {workExperience.map((w) => (
        <div
          key={w.id}
          style={{
            marginBottom: 12,
            paddingBottom: 10,
            borderBottom: `1px solid ${lineColor}`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <p style={{ fontWeight: 600, fontSize: 11 * fs, color: bodyText }}>
              {w.jobTitle}
            </p>
            <p
              style={{
                fontSize: 9 * fs,
                color: subText,
                flexShrink: 0,
                marginLeft: 8,
              }}
            >
              {w.startDate} — {w.current ? "Hozir" : w.endDate}
            </p>
          </div>
          <p style={{ fontSize: 10 * fs, color: acol, marginBottom: 2 }}>
            {w.company}
            {w.location ? ` · ${w.location}` : ""}
          </p>
          {w.description && (
            <p
              style={{
                fontSize: 9.5 * fs,
                color: subText,
                whiteSpace: "pre-line",
                lineHeight: 1.6,
              }}
            >
              {w.description}
            </p>
          )}
        </div>
      ))}
    </>
  );

  // Ta'lim bloki
  const EduBlock = ({ acol }: { acol: string }) => (
    <>
      {education.map((e) => (
        <div key={e.id} style={{ marginBottom: 10 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <p style={{ fontWeight: 600, fontSize: 11 * fs, color: bodyText }}>
              {e.degree}
            </p>
            <p
              style={{
                fontSize: 9 * fs,
                color: subText,
                flexShrink: 0,
                marginLeft: 8,
              }}
            >
              {e.startYear} — {e.endYear}
            </p>
          </div>
          <p style={{ fontSize: 10 * fs, color: acol }}>{e.university}</p>
          {e.description && (
            <p style={{ fontSize: 9.5 * fs, color: subText, marginTop: 2 }}>
              {e.description}
            </p>
          )}
        </div>
      ))}
    </>
  );

  // Ko'nikmalar + Tillar grid
  const SkillLangGrid = ({
    acol,
    dotEmpty,
  }: {
    acol: string;
    dotEmpty: string;
  }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <div>
          <p style={SH({ color: acol })}>KO'NIKMALAR</p>
          {[...skills.technical, ...skills.soft].map((s) => (
            <div key={s.id} style={{ marginBottom: 7 }}>
              <p
                style={{ fontSize: 10 * fs, marginBottom: 2, color: bodyText }}
              >
                {s.name}
              </p>
              <Dots level={s.level} fg={acol} bg={dotEmpty} />
            </div>
          ))}
        </div>
      )}
      {languages.length > 0 && (
        <div>
          <p style={SH({ color: acol })}>TILLAR</p>
          {languages.map((l) => (
            <p
              key={l.id}
              style={{ fontSize: 10 * fs, marginBottom: 5, color: bodyText }}
            >
              {l.name} — <span style={{ color: subText }}>{l.level}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );

  // Standart asosiy kontent (sidebar-siz layoutlar uchun)
  const MainContent = ({ acol }: { acol: string }) => (
    <>
      {p.summary && (
        <div style={{ marginBottom: 16 }}>
          <p style={SH({ color: acol })}>PROFIL</p>
          <p
            style={{
              fontSize: 10 * fs,
              lineHeight: 1.7,
              color: dark ? "#cbd5e1" : "#374151",
            }}
          >
            {p.summary}
          </p>
        </div>
      )}
      {workExperience.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <p style={SH({ color: acol })}>ISH TAJRIBASI</p>
          <WorkBlock acol={acol} />
        </div>
      )}
      {education.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <p style={SH({ color: acol })}>TA'LIM</p>
          <EduBlock acol={acol} />
        </div>
      )}
      <SkillLangGrid acol={acol} dotEmpty={dark ? "#334155" : "#e2e8f0"} />
    </>
  );

  // ==========================================================
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Toolbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Tahrirlash</span>
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm bg-gray-50 rounded-lg px-3 py-1.5 border">
              <Eye className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-500 hidden sm:inline">ATS:</span>
              <span className="font-bold" style={{ color: scoreColor }}>
                {score}%{" "}
                <span className="hidden sm:inline text-xs font-normal">
                  ({scoreLabel})
                </span>
              </span>
            </div>
            <Button
              onClick={handleDownload}
              disabled={downloading}
              className="gap-2"
              style={{ backgroundColor: accentHex, color: "#fff" }}
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? "Yuklanmoqda..." : "PDF yuklash"}</span>
            </Button>
          </div>
        </div>
      </div>

      <CvScaleWrapper>
        <div
          ref={cvRef}
          style={{
            width: "210mm",
            minWidth: "210mm",
            minHeight: "297mm",
            fontFamily: `'${data.font}', ${data.font}, Arial, sans-serif`,
            color: bodyText,
            fontSize: `${data.fontSize ?? 22}px`,
            lineHeight: "1.6",
            backgroundColor: pageBg,
            boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
          }}
        >
          {/* ══════════════════════════════════════════
              MINIMAL-CLEAN  (t001, t006, t019...)
              Sarlavha + ostida rang chiziq
          ══════════════════════════════════════════ */}
          {layout === "minimal-clean" && (
            <div style={{ padding: "28px 32px" }}>
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 10,
                  }}
                >
                  {p.photo && (
                    <img
                      src={p.photo}
                      alt=""
                      style={{
                        width: 68,
                        height: 68,
                        borderRadius: "50%",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div>
                    <h1
                      style={{
                        fontSize: 20 * fs,
                        fontWeight: "bold",
                        color: bodyText,
                        marginBottom: 4,
                      }}
                    >
                      {p.fullName || "Ism Familiya"}
                    </h1>
                    <ContactLine color={subText} />
                  </div>
                </div>
                <div style={{ height: 2, backgroundColor: accentHex }} />
              </div>
              <MainContent acol={accentHex} />
            </div>
          )}

          {/* ══════════════════════════════════════════
              HEADER-FULL / FULL-HEADER
              (t003, t005, t010, t013, t016, t017, t018, t020, t024, dyn...)
              To'liq rangli header bloki
          ══════════════════════════════════════════ */}
          {(layout === "header-full" || layout === "full-header") && (
            <div>
              <div
                style={{
                  padding: "24px 28px 20px",
                  backgroundColor: headerColor,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {p.photo && (
                    <img
                      src={p.photo}
                      alt=""
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        objectFit: "cover",
                        flexShrink: 0,
                        border: "2px solid rgba(255,255,255,0.4)",
                      }}
                    />
                  )}
                  <div>
                    <h1
                      style={{
                        fontSize: 22 * fs,
                        fontWeight: "bold",
                        color: "#fff",
                        marginBottom: 6,
                      }}
                    >
                      {p.fullName || "Ism Familiya"}
                    </h1>
                    <ContactLine color="rgba(255,255,255,0.85)" />
                  </div>
                </div>
              </div>
              <div style={{ padding: "20px 28px" }}>
                <div
                  style={{
                    height: 2,
                    background: `linear-gradient(90deg, ${headerColor}, transparent)`,
                    marginBottom: 18,
                  }}
                />
                {p.summary && (
                  <div style={{ marginBottom: 16 }}>
                    <p style={SH({ color: headerColor })}>PROFIL</p>
                    <p
                      style={{
                        fontSize: 10 * fs,
                        lineHeight: 1.7,
                        color: "#374151",
                      }}
                    >
                      {p.summary}
                    </p>
                  </div>
                )}
                {workExperience.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <p style={SH({ color: headerColor })}>ISH TAJRIBASI</p>
                    {workExperience.map((w) => (
                      <div key={w.id} style={{ marginBottom: 12 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <p style={{ fontWeight: 600, fontSize: 11 * fs }}>
                            {w.jobTitle}
                            {w.company && (
                              <span style={{ color: headerColor }}>
                                {" "}
                                — {w.company}
                              </span>
                            )}
                          </p>
                          <p
                            style={{
                              fontSize: 9 * fs,
                              color: "#94a3b8",
                              flexShrink: 0,
                              marginLeft: 8,
                            }}
                          >
                            {w.startDate} — {w.current ? "Hozir" : w.endDate}
                          </p>
                        </div>
                        {w.location && (
                          <p style={{ fontSize: 9.5 * fs, color: "#64748b" }}>
                            {w.location}
                          </p>
                        )}
                        {w.description && (
                          <p
                            style={{
                              fontSize: 9.5 * fs,
                              marginTop: 3,
                              whiteSpace: "pre-line",
                              lineHeight: 1.6,
                              color: "#4b5563",
                            }}
                          >
                            {w.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {education.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <p style={SH({ color: headerColor })}>TA'LIM</p>
                    {education.map((e) => (
                      <div key={e.id} style={{ marginBottom: 10 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <p style={{ fontWeight: 600, fontSize: 11 * fs }}>
                            {e.degree}
                            {e.university && (
                              <span style={{ color: headerColor }}>
                                {" "}
                                — {e.university}
                              </span>
                            )}
                          </p>
                          <p
                            style={{
                              fontSize: 9 * fs,
                              color: "#94a3b8",
                              flexShrink: 0,
                              marginLeft: 8,
                            }}
                          >
                            {e.startYear} — {e.endYear}
                          </p>
                        </div>
                        {e.description && (
                          <p style={{ fontSize: 9.5 * fs, color: "#64748b" }}>
                            {e.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <SkillLangGrid acol={headerColor} dotEmpty="#e2e8f0" />
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              SIDEBAR-LEFT  (t004, t012, modern)
              Chap rangli sidebar + o'ng main
          ══════════════════════════════════════════ */}
          {layout === "sidebar-left" && (
            <div style={{ display: "flex", minHeight: "297mm" }}>
              <div
                style={{
                  width: "68mm",
                  minWidth: "68mm",
                  padding: "28px 20px",
                  backgroundColor: headerColor,
                  color: "#fff",
                }}
              >
                {p.photo && (
                  <img
                    src={p.photo}
                    alt=""
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                      margin: "0 auto 16px",
                      border: "3px solid rgba(255,255,255,0.3)",
                    }}
                  />
                )}
                <h1
                  style={{
                    fontSize: 14 * fs,
                    fontWeight: "bold",
                    marginBottom: 4,
                    lineHeight: 1.3,
                  }}
                >
                  {p.fullName || "Ism Familiya"}
                </h1>
                <div style={{ marginTop: 16 }}>
                  <p
                    style={{
                      fontSize: 8.5 * fs,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 8,
                      opacity: 0.7,
                    }}
                  >
                    KONTAKT
                  </p>
                  {p.phone && (
                    <p
                      style={{
                        fontSize: 10 * fs,
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Icon d={ICONS.phone} color="rgba(255,255,255,0.8)" />{" "}
                      {p.phone}
                    </p>
                  )}
                  {p.email && (
                    <p
                      style={{
                        fontSize: 10 * fs,
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        wordBreak: "break-all",
                      }}
                    >
                      <Icon d={ICONS.email} color="rgba(255,255,255,0.8)" />{" "}
                      {p.email}
                    </p>
                  )}
                  {p.address && (
                    <p
                      style={{
                        fontSize: 10 * fs,
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Icon d={ICONS.location} color="rgba(255,255,255,0.8)" />{" "}
                      {p.address}
                    </p>
                  )}
                  {p.linkedin && (
                    <p
                      style={{
                        fontSize: 10 * fs,
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        wordBreak: "break-all",
                      }}
                    >
                      <Icon d={ICONS.linkedin} color="rgba(255,255,255,0.8)" />{" "}
                      {p.linkedin}
                    </p>
                  )}
                  {p.telegram && (
                    <p
                      style={{
                        fontSize: 10 * fs,
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Icon d={ICONS.telegram} color="rgba(255,255,255,0.8)" />{" "}
                      {p.telegram}
                    </p>
                  )}
                </div>
                {(skills.technical.length > 0 || skills.soft.length > 0) && (
                  <div style={{ marginTop: 20 }}>
                    <p
                      style={{
                        fontSize: 8.5 * fs,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: 8,
                        opacity: 0.7,
                      }}
                    >
                      KO'NIKMALAR
                    </p>
                    {[...skills.technical, ...skills.soft].map((s) => (
                      <div key={s.id} style={{ marginBottom: 8 }}>
                        <p style={{ fontSize: 8.5 * fs, marginBottom: 3 }}>
                          {s.name}
                        </p>
                        <Dots
                          level={s.level}
                          fg="rgba(255,255,255,0.9)"
                          bg="rgba(255,255,255,0.2)"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {languages.length > 0 && (
                  <div style={{ marginTop: 20 }}>
                    <p
                      style={{
                        fontSize: 8.5 * fs,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: 8,
                        opacity: 0.7,
                      }}
                    >
                      TILLAR
                    </p>
                    {languages.map((l) => (
                      <p
                        key={l.id}
                        style={{
                          fontSize: 8.5 * fs,
                          marginBottom: 5,
                          opacity: 0.9,
                        }}
                      >
                        {l.name} — {l.level}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ flex: 1, padding: "28px 24px" }}>
                {p.summary && (
                  <div style={{ marginBottom: 18 }}>
                    <p style={SH({ color: headerColor })}>PROFIL</p>
                    <p
                      style={{
                        fontSize: 10 * fs,
                        lineHeight: 1.7,
                        color: "#374151",
                      }}
                    >
                      {p.summary}
                    </p>
                  </div>
                )}
                {workExperience.length > 0 && (
                  <div style={{ marginBottom: 18 }}>
                    <p style={SH({ color: headerColor })}>ISH TAJRIBASI</p>
                    <WorkBlock acol={headerColor} />
                  </div>
                )}
                {education.length > 0 && (
                  <div style={{ marginBottom: 18 }}>
                    <p style={SH({ color: headerColor })}>TA'LIM</p>
                    <EduBlock acol={headerColor} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              DARK-SIDEBAR  (t002, t008, t015, t022, t025, dark)
              Qora/to'q fon, rangli chiziq yuqorida
          ══════════════════════════════════════════ */}
          {layout === "dark-sidebar" && (
            <div
              style={{
                backgroundColor: pageBg,
                color: "#f1f5f9",
                minHeight: "297mm",
              }}
            >
              <div style={{ height: 4, backgroundColor: accentHex }} />
              <div style={{ padding: "24px 28px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    marginBottom: 20,
                    paddingBottom: 16,
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {p.photo && (
                    <img
                      src={p.photo}
                      alt=""
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        objectFit: "cover",
                        flexShrink: 0,
                        border: `2px solid ${accentHex}`,
                      }}
                    />
                  )}
                  <div>
                    <h1
                      style={{
                        fontSize: 20 * fs,
                        fontWeight: "bold",
                        color: "#f8fafc",
                        marginBottom: 6,
                      }}
                    >
                      {p.fullName || "Ism Familiya"}
                    </h1>
                    <ContactLine color="#94a3b8" />
                  </div>
                </div>
                {p.summary && (
                  <div style={{ marginBottom: 16 }}>
                    <p
                      style={SH({
                        color: accentHex,
                        border: "rgba(255,255,255,0.1)",
                      })}
                    >
                      PROFIL
                    </p>
                    <p
                      style={{
                        fontSize: 10 * fs,
                        color: "#cbd5e1",
                        lineHeight: 1.7,
                      }}
                    >
                      {p.summary}
                    </p>
                  </div>
                )}
                {workExperience.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <p
                      style={SH({
                        color: accentHex,
                        border: "rgba(255,255,255,0.1)",
                      })}
                    >
                      ISH TAJRIBASI
                    </p>
                    {workExperience.map((w) => (
                      <div
                        key={w.id}
                        style={{
                          marginBottom: 12,
                          paddingLeft: 12,
                          borderLeft: `3px solid ${accentHex}`,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <p
                            style={{
                              fontWeight: 600,
                              fontSize: 11 * fs,
                              color: "#e2e8f0",
                            }}
                          >
                            {w.jobTitle}
                          </p>
                          <p
                            style={{
                              fontSize: 9 * fs,
                              color: "#475569",
                              flexShrink: 0,
                              marginLeft: 8,
                            }}
                          >
                            {w.startDate} — {w.current ? "Hozir" : w.endDate}
                          </p>
                        </div>
                        <p
                          style={{
                            fontSize: 10 * fs,
                            color: accentHex,
                            marginBottom: 2,
                          }}
                        >
                          {w.company}
                          {w.location ? ` · ${w.location}` : ""}
                        </p>
                        {w.description && (
                          <p
                            style={{
                              fontSize: 9.5 * fs,
                              color: "#94a3b8",
                              whiteSpace: "pre-line",
                              lineHeight: 1.6,
                            }}
                          >
                            {w.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {education.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <p
                      style={SH({
                        color: accentHex,
                        border: "rgba(255,255,255,0.1)",
                      })}
                    >
                      TA'LIM
                    </p>
                    {education.map((e) => (
                      <div
                        key={e.id}
                        style={{
                          marginBottom: 10,
                          paddingLeft: 12,
                          borderLeft: `3px solid ${accentHex}`,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <p
                            style={{
                              fontWeight: 600,
                              fontSize: 11 * fs,
                              color: "#e2e8f0",
                            }}
                          >
                            {e.degree}
                          </p>
                          <p
                            style={{
                              fontSize: 9 * fs,
                              color: "#475569",
                              flexShrink: 0,
                              marginLeft: 8,
                            }}
                          >
                            {e.startYear} — {e.endYear}
                          </p>
                        </div>
                        <p style={{ fontSize: 10 * fs, color: accentHex }}>
                          {e.university}
                        </p>
                        {e.description && (
                          <p
                            style={{
                              fontSize: 9.5 * fs,
                              color: "#94a3b8",
                              marginTop: 2,
                            }}
                          >
                            {e.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <SkillLangGrid
                  acol={accentHex}
                  dotEmpty="rgba(255,255,255,0.1)"
                />
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              LEFT-STRIPE  (t007, dyn left-stripe...)
              Chap qalin rangli chiziq
          ══════════════════════════════════════════ */}
          {layout === "left-stripe" && (
            <div style={{ display: "flex", minHeight: "297mm" }}>
              <div
                style={{ width: 8, backgroundColor: accentHex, flexShrink: 0 }}
              />
              <div style={{ flex: 1, padding: "28px 24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 20,
                  }}
                >
                  {p.photo && (
                    <img
                      src={p.photo}
                      alt=""
                      style={{
                        width: 68,
                        height: 68,
                        borderRadius: "50%",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div>
                    <h1
                      style={{
                        fontSize: 20 * fs,
                        fontWeight: "bold",
                        color: headerColor,
                        marginBottom: 5,
                      }}
                    >
                      {p.fullName || "Ism Familiya"}
                    </h1>
                    <ContactLine color={subText} />
                  </div>
                </div>
                <MainContent acol={accentHex} />
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              DOUBLE-BAR  (t009, t011, t021, dyn double-bar...)
              Ikki qalin chiziq + sarlavha
          ══════════════════════════════════════════ */}
          {layout === "double-bar" && (
            <div style={{ padding: "28px 32px" }}>
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    height: 3,
                    backgroundColor: headerColor,
                    marginBottom: 3,
                  }}
                />
                <div
                  style={{
                    height: 3,
                    backgroundColor: accentHex,
                    marginBottom: 14,
                  }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  {p.photo && (
                    <img
                      src={p.photo}
                      alt=""
                      style={{
                        width: 66,
                        height: 66,
                        borderRadius: "50%",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div>
                    <h1
                      style={{
                        fontSize: 20 * fs,
                        fontWeight: "bold",
                        color: headerColor,
                        marginBottom: 5,
                      }}
                    >
                      {p.fullName || "Ism Familiya"}
                    </h1>
                    <ContactLine color={subText} />
                  </div>
                </div>
              </div>
              <MainContent acol={accentHex} />
            </div>
          )}

          {/* ══════════════════════════════════════════
              CORNER  (t014, dyn corner...)
              Burchakda rangli uchburchak
          ══════════════════════════════════════════ */}
          {layout === "corner" && (
            <div style={{ position: "relative", padding: "28px 32px" }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 0,
                  height: 0,
                  borderTop: `90px solid ${accentHex}`,
                  borderRight: "90px solid transparent",
                  opacity: 0.22,
                }}
              />
              <div style={{ marginBottom: 20, paddingTop: 8 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 10,
                  }}
                >
                  {p.photo && (
                    <img
                      src={p.photo}
                      alt=""
                      style={{
                        width: 68,
                        height: 68,
                        borderRadius: "50%",
                        objectFit: "cover",
                        flexShrink: 0,
                        border: `2px solid ${accentHex}`,
                      }}
                    />
                  )}
                  <div>
                    <h1
                      style={{
                        fontSize: 20 * fs,
                        fontWeight: "bold",
                        color: headerColor,
                        marginBottom: 5,
                      }}
                    >
                      {p.fullName || "Ism Familiya"}
                    </h1>
                    <ContactLine color={subText} />
                  </div>
                </div>
                <div
                  style={{
                    height: 1.5,
                    backgroundColor: accentHex,
                    opacity: 0.6,
                  }}
                />
              </div>
              <MainContent acol={accentHex} />
            </div>
          )}

          {/* ══════════════════════════════════════════
              SIDE-RIGHT  (t023, dyn side-right...)
              O'ng tomonda sidebar, chapda asosiy kontent
          ══════════════════════════════════════════ */}
          {layout === "side-right" && (
            <div style={{ display: "flex", minHeight: "297mm" }}>
              <div style={{ flex: 1, padding: "24px 20px 24px 28px" }}>
                <div style={{ marginBottom: 20 }}>
                  {p.photo && (
                    <img
                      src={p.photo}
                      alt=""
                      style={{
                        width: 68,
                        height: 68,
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginBottom: 10,
                      }}
                    />
                  )}
                  <h1
                    style={{
                      fontSize: 18 * fs,
                      fontWeight: "bold",
                      color: headerColor,
                      marginBottom: 5,
                    }}
                  >
                    {p.fullName || "Ism Familiya"}
                  </h1>
                  <div
                    style={{
                      height: 2,
                      backgroundColor: accentHex,
                      marginBottom: 12,
                    }}
                  />
                </div>
                {p.summary && (
                  <div style={{ marginBottom: 14 }}>
                    <p style={SH({ color: accentHex })}>PROFIL</p>
                    <p
                      style={{
                        fontSize: 10 * fs,
                        lineHeight: 1.7,
                        color: "#374151",
                      }}
                    >
                      {p.summary}
                    </p>
                  </div>
                )}
                {workExperience.length > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <p style={SH({ color: accentHex })}>ISH TAJRIBASI</p>
                    <WorkBlock acol={accentHex} />
                  </div>
                )}
                {education.length > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <p style={SH({ color: accentHex })}>TA'LIM</p>
                    <EduBlock acol={accentHex} />
                  </div>
                )}
              </div>
              <div
                style={{
                  width: "55mm",
                  minWidth: "55mm",
                  padding: "24px 16px",
                  backgroundColor: "#f1f5f9",
                  borderLeft: `3px solid ${accentHex}`,
                }}
              >
                <div style={{ marginBottom: 16 }}>
                  <p
                    style={{
                      fontSize: 9 * fs,
                      fontWeight: "bold",
                      color: accentHex,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 8,
                    }}
                  >
                    KONTAKT
                  </p>
                  {p.phone && (
                    <p
                      style={{
                        fontSize: 10 * fs,
                        marginBottom: 6,
                        color: "#374151",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Icon d={ICONS.phone} color="#64748b" /> {p.phone}
                    </p>
                  )}
                  {p.email && (
                    <p
                      style={{
                        fontSize: 10 * fs,
                        marginBottom: 6,
                        color: "#374151",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        wordBreak: "break-all",
                      }}
                    >
                      <Icon d={ICONS.email} color="#64748b" /> {p.email}
                    </p>
                  )}
                  {p.address && (
                    <p
                      style={{
                        fontSize: 10 * fs,
                        marginBottom: 6,
                        color: "#374151",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Icon d={ICONS.location} color="#64748b" /> {p.address}
                    </p>
                  )}
                  {p.linkedin && (
                    <p
                      style={{
                        fontSize: 10 * fs,
                        marginBottom: 6,
                        color: "#374151",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        wordBreak: "break-all",
                      }}
                    >
                      <Icon d={ICONS.linkedin} color="#64748b" /> {p.linkedin}
                    </p>
                  )}
                  {p.telegram && (
                    <p
                      style={{
                        fontSize: 10 * fs,
                        marginBottom: 6,
                        color: "#374151",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Icon d={ICONS.telegram} color="#64748b" /> {p.telegram}
                    </p>
                  )}
                </div>
                {(skills.technical.length > 0 || skills.soft.length > 0) && (
                  <div style={{ marginBottom: 16 }}>
                    <p
                      style={{
                        fontSize: 9 * fs,
                        fontWeight: "bold",
                        color: accentHex,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 8,
                      }}
                    >
                      KO'NIKMALAR
                    </p>
                    {[...skills.technical, ...skills.soft].map((s) => (
                      <div key={s.id} style={{ marginBottom: 7 }}>
                        <p
                          style={{
                            fontSize: 9 * fs,
                            marginBottom: 2,
                            color: "#374151",
                          }}
                        >
                          {s.name}
                        </p>
                        <Dots level={s.level} fg={accentHex} bg="#e2e8f0" />
                      </div>
                    ))}
                  </div>
                )}
                {languages.length > 0 && (
                  <div>
                    <p
                      style={{
                        fontSize: 9 * fs,
                        fontWeight: "bold",
                        color: accentHex,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 8,
                      }}
                    >
                      TILLAR
                    </p>
                    {languages.map((l) => (
                      <p
                        key={l.id}
                        style={{
                          fontSize: 9 * fs,
                          color: "#374151",
                          marginBottom: 5,
                        }}
                      >
                        {l.name} —{" "}
                        <span style={{ color: "#64748b" }}>{l.level}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              TOP-BAR  (dyn top-bar...)
              Yuqorida kichik rangli chiziq, sarlavha pastda
          ══════════════════════════════════════════ */}
          {layout === "top-bar" && (
            <div>
              <div style={{ height: 5, backgroundColor: accentHex }} />
              <div style={{ padding: "24px 28px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    marginBottom: 16,
                  }}
                >
                  {p.photo && (
                    <img
                      src={p.photo}
                      alt=""
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div>
                    <h1
                      style={{
                        fontSize: 20 * fs,
                        fontWeight: "bold",
                        color: headerColor,
                        marginBottom: 5,
                      }}
                    >
                      {p.fullName || "Ism Familiya"}
                    </h1>
                    <ContactLine color={subText} />
                  </div>
                </div>
                <div
                  style={{
                    height: 1.5,
                    background: `linear-gradient(90deg, ${accentHex}, ${accentHex}30)`,
                    marginBottom: 18,
                  }}
                />
                <MainContent acol={accentHex} />
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              MINIMAL  (dyn minimal)
              Oddiy, pastki chiziq, sarlavha centered
          ══════════════════════════════════════════ */}
          {layout === "minimal" && (
            <div style={{ padding: "28px 32px" }}>
              <div
                style={{
                  marginBottom: 20,
                  paddingBottom: 16,
                  borderBottom: `2.5px solid ${accentHex}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  {p.photo && (
                    <img
                      src={p.photo}
                      alt=""
                      style={{
                        width: 68,
                        height: 68,
                        borderRadius: "50%",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <h1
                      style={{
                        fontSize: 21 * fs,
                        fontWeight: "bold",
                        color:
                          headerColor === "accent" ? accentHex : headerColor,
                        marginBottom: 5,
                      }}
                    >
                      {p.fullName || "Ism Familiya"}
                    </h1>
                    <ContactLine color={subText} />
                  </div>
                </div>
              </div>
              <MainContent acol={accentHex} />
            </div>
          )}

          {/* ══════════════════════════════════════════
              CENTERED  (t019 — markaziy sarlavha)
              Doira foto va markazlashtirilgan ism
          ══════════════════════════════════════════ */}
          {layout === "centered" && (
            <div style={{ padding: "28px 32px" }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                {p.photo && (
                  <img
                    src={p.photo}
                    alt=""
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "inline-block",
                      marginBottom: 10,
                      border: `3px solid ${accentHex}40`,
                    }}
                  />
                )}
                <h1
                  style={{
                    fontSize: 22 * fs,
                    fontWeight: "bold",
                    color: "#1e293b",
                    marginBottom: 6,
                  }}
                >
                  {p.fullName || "Ism Familiya"}
                </h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 14,
                    fontSize: 9.5 * fs,
                    color: "#64748b",
                    marginBottom: 10,
                  }}
                >
                  {p.phone && (
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <Icon d={ICONS.phone} color="#64748b" /> {p.phone}
                    </span>
                  )}
                  {p.email && (
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <Icon d={ICONS.email} color="#64748b" /> {p.email}
                    </span>
                  )}
                  {p.address && (
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <Icon d={ICONS.location} color="#64748b" /> {p.address}
                    </span>
                  )}
                  {p.linkedin && (
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <Icon d={ICONS.linkedin} color="#64748b" /> {p.linkedin}
                    </span>
                  )}
                  {p.telegram && (
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 4 }}
                    >
                      <Icon d={ICONS.telegram} color="#64748b" /> {p.telegram}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    height: 1.5,
                    backgroundColor: "#e2e8f0",
                    maxWidth: "80%",
                    margin: "0 auto",
                  }}
                />
              </div>
              <MainContent acol={accentHex} />
            </div>
          )}
        </div>
      </CvScaleWrapper>
    </div>
  );
}

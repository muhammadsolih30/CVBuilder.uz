import React, { useState } from "react";
import { CVData, TemplateType, AccentColor, FontType } from "@/types/cv";
import { Eye, Check, Search, Palette, Type, Layout } from "lucide-react";

interface Props {
  data: CVData;
  onChange: (field: string, value: string) => void;
}

// ─────────────────────────────────────────────────
// 24 TA RANG
// ─────────────────────────────────────────────────
const COLORS: { key: string; label: string; hex: string }[] = [
  { key: "blue", label: "Ko'k", hex: "#2563eb" },
  { key: "sky", label: "Osmon", hex: "#0ea5e9" },
  { key: "cyan", label: "Moviy", hex: "#06b6d4" },
  { key: "teal", label: "Yashil-Ko'k", hex: "#14b8a6" },
  { key: "green", label: "Yashil", hex: "#16a34a" },
  { key: "emerald", label: "Zumrad", hex: "#10b981" },
  { key: "lime", label: "Limon", hex: "#84cc16" },
  { key: "yellow", label: "Sariq", hex: "#eab308" },
  { key: "amber", label: "Qahrabo", hex: "#f59e0b" },
  { key: "orange", label: "To'q sariq", hex: "#f97316" },
  { key: "red", label: "Qizil", hex: "#ef4444" },
  { key: "rose", label: "Atirgul", hex: "#f43f5e" },
  { key: "pink", label: "Pushti", hex: "#ec4899" },
  { key: "fuchsia", label: "Fuksiya", hex: "#d946ef" },
  { key: "purple", label: "Binafsha", hex: "#a855f7" },
  { key: "violet", label: "Viola", hex: "#8b5cf6" },
  { key: "indigo", label: "Indigo", hex: "#6366f1" },
  { key: "slate", label: "Kulrang-Ko'k", hex: "#64748b" },
  { key: "gray", label: "Kulrang", hex: "#6b7280" },
  { key: "zinc", label: "Rux", hex: "#71717a" },
  { key: "black", label: "Qora", hex: "#1e293b" },
  { key: "brown", label: "Jigarrang", hex: "#92400e" },
  { key: "gold", label: "Oltin", hex: "#b45309" },
  { key: "navy", label: "Dengiz Ko'k", hex: "#1e3a5f" },
];

// ─────────────────────────────────────────────────
// SHRIFTLAR
// ─────────────────────────────────────────────────
const FONTS: { key: FontType; label: string }[] = [
  { key: "Inter", label: "Inter" },
  { key: "Poppins", label: "Poppins" },
  { key: "Roboto", label: "Roboto" },
];

// ─────────────────────────────────────────────────
// SVG PREVIEW — 25 ta noyob statik uslub
// ─────────────────────────────────────────────────
function Svg01({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fff" rx="2" />
      <rect x="8" y="8" width="50" height="6" fill="#1a1a1a" rx="1" />
      <rect x="8" y="17" width="35" height="2.5" fill="#888" rx="1" />
      <line x1="8" y1="24" x2="82" y2="24" stroke={a} strokeWidth="1.5" />
      <rect x="8" y="29" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="34" width="65" height="1.5" fill="#e2e8f0" rx="1" />
      <rect x="8" y="38" width="55" height="1.5" fill="#e2e8f0" rx="1" />
      <rect x="8" y="48" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="53" width="60" height="1.5" fill="#e2e8f0" rx="1" />
      <rect x="8" y="57" width="50" height="1.5" fill="#e2e8f0" rx="1" />
      <rect x="8" y="67" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="72" width="55" height="1.5" fill="#e2e8f0" rx="1" />
    </svg>
  );
}
function Svg02({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#0f172a" rx="2" />
      <rect width="90" height="3" fill={a} />
      <rect x="8" y="10" width="50" height="6" fill="#f8fafc" rx="1" />
      <rect x="8" y="19" width="35" height="2.5" fill="#94a3b8" rx="1" />
      <rect x="8" y="28" width="2.5" height="10" fill={a} rx="1" />
      <rect x="14" y="29" width="18" height="2" fill="#e2e8f0" rx="1" />
      <rect x="14" y="33" width="55" height="1.5" fill="#334155" rx="1" />
      <rect x="14" y="37" width="45" height="1.5" fill="#334155" rx="1" />
      <rect x="8" y="47" width="2.5" height="10" fill={a} rx="1" />
      <rect x="14" y="48" width="22" height="2" fill="#e2e8f0" rx="1" />
      <rect x="14" y="52" width="55" height="1.5" fill="#334155" rx="1" />
    </svg>
  );
}
function Svg03({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fffdf7" rx="2" />
      <rect width="90" height="26" fill={a} />
      <rect x="8" y="7" width="45" height="5" fill="#fff" rx="1" />
      <rect
        x="8"
        y="15"
        width="30"
        height="2.5"
        fill="rgba(255,255,255,0.6)"
        rx="1"
      />
      <rect x="8" y="32" width="20" height="2" fill={a} rx="1" />
      <line
        x1="8"
        y1="36"
        x2="82"
        y2="36"
        stroke={a}
        strokeWidth="0.8"
        opacity="0.4"
      />
      <rect x="8" y="40" width="60" height="1.5" fill="#bbb" rx="1" />
      <rect x="8" y="44" width="50" height="1.5" fill="#ccc" rx="1" />
      <rect x="8" y="54" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="58" width="55" height="1.5" fill="#bbb" rx="1" />
    </svg>
  );
}
function Svg04({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#f8f9fa" rx="2" />
      <rect width="28" height="120" fill="#1e293b" />
      <circle cx="14" cy="16" r="8" fill="#334155" />
      <rect x="4" y="29" width="20" height="2" fill="#94a3b8" rx="1" />
      <rect x="4" y="34" width="18" height="1.5" fill="#64748b" rx="1" />
      <rect x="4" y="42" width="14" height="1.5" fill={a} rx="1" />
      <rect x="4" y="47" width="20" height="2.5" fill="#334155" rx="1" />
      <rect x="4" y="47" width="14" height="2.5" fill={a} rx="1" />
      <rect x="34" y="10" width="48" height="5" fill="#1e293b" rx="1" />
      <rect x="34" y="18" width="35" height="2.5" fill="#64748b" rx="1" />
      <rect x="34" y="28" width="20" height="2" fill={a} rx="1" />
      <rect x="34" y="33" width="50" height="1.5" fill="#ddd" rx="1" />
      <rect x="34" y="37" width="42" height="1.5" fill="#ddd" rx="1" />
      <rect x="34" y="47" width="20" height="2" fill={a} rx="1" />
      <rect x="34" y="52" width="50" height="1.5" fill="#ddd" rx="1" />
    </svg>
  );
}
function Svg05({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fff" rx="2" />
      <rect width="90" height="32" fill={a} />
      <circle cx="20" cy="16" r="10" fill="rgba(255,255,255,0.2)" />
      <rect x="34" y="8" width="40" height="5" fill="#fff" rx="1" />
      <rect
        x="34"
        y="16"
        width="28"
        height="2.5"
        fill="rgba(255,255,255,0.7)"
        rx="1"
      />
      <rect x="8" y="40" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="45" width="70" height="1.5" fill="#e2e8f0" rx="1" />
      <rect x="8" y="49" width="60" height="1.5" fill="#e2e8f0" rx="1" />
      <rect x="8" y="58" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="63" width="65" height="1.5" fill="#e2e8f0" rx="1" />
    </svg>
  );
}
function Svg06({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fafafa" rx="2" />
      <rect x="8" y="8" width="74" height="18" fill="#f0f4ff" rx="3" />
      <rect x="14" y="12" width="40" height="5" fill={a} rx="1" />
      <rect x="14" y="20" width="28" height="2" fill="#6b7280" rx="1" />
      <line x1="8" y1="31" x2="82" y2="31" stroke="#e5e7eb" strokeWidth="1" />
      <rect x="8" y="36" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="41" width="70" height="1.5" fill="#d1d5db" rx="1" />
      <rect x="8" y="45" width="58" height="1.5" fill="#d1d5db" rx="1" />
      <rect x="8" y="55" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="60" width="65" height="1.5" fill="#d1d5db" rx="1" />
    </svg>
  );
}
function Svg07({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fff" rx="2" />
      <rect x="8" y="8" width="6" height="104" fill={a} rx="2" />
      <rect x="18" y="10" width="45" height="6" fill="#1a1a1a" rx="1" />
      <rect x="18" y="19" width="32" height="2.5" fill="#6b7280" rx="1" />
      <rect x="18" y="30" width="20" height="2" fill={a} rx="1" />
      <rect x="18" y="35" width="60" height="1.5" fill="#e5e7eb" rx="1" />
      <rect x="18" y="39" width="50" height="1.5" fill="#e5e7eb" rx="1" />
      <rect x="18" y="49" width="20" height="2" fill={a} rx="1" />
      <rect x="18" y="54" width="58" height="1.5" fill="#e5e7eb" rx="1" />
    </svg>
  );
}
function Svg08({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#1a1a2e" rx="2" />
      <rect x="8" y="8" width="55" height="7" fill={a} rx="1" />
      <rect x="8" y="18" width="35" height="2.5" fill="#a8a8b3" rx="1" />
      <line x1="8" y1="25" x2="82" y2="25" stroke={a} strokeWidth="0.8" />
      <rect x="8" y="29" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="34" width="70" height="1.5" fill="#2d2d44" rx="1" />
      <rect x="8" y="38" width="58" height="1.5" fill="#2d2d44" rx="1" />
      <rect x="8" y="48" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="53" width="65" height="1.5" fill="#2d2d44" rx="1" />
    </svg>
  );
}
function Svg09({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fff" rx="2" />
      <rect x="8" y="8" width="74" height="3" fill={a} />
      <rect x="8" y="13" width="74" height="3" fill={a} opacity="0.35" />
      <rect x="8" y="20" width="50" height="6" fill="#1e1b4b" rx="1" />
      <rect
        x="8"
        y="29"
        width="35"
        height="2.5"
        fill={a}
        rx="1"
        opacity="0.7"
      />
      <rect x="8" y="37" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="42" width="70" height="1.5" fill="#e0e7ff" rx="1" />
      <rect x="8" y="46" width="55" height="1.5" fill="#e0e7ff" rx="1" />
      <rect x="8" y="56" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="61" width="65" height="1.5" fill="#e0e7ff" rx="1" />
    </svg>
  );
}
function Svg10({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#f0fdf4" rx="2" />
      <rect x="8" y="8" width="74" height="22" fill="#166534" rx="2" />
      <rect x="14" y="12" width="42" height="5" fill="#fff" rx="1" />
      <rect x="14" y="20" width="28" height="2.5" fill="#bbf7d0" rx="1" />
      <rect x="8" y="36" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="41" width="70" height="1.5" fill="#a7f3d0" rx="1" />
      <rect x="8" y="45" width="55" height="1.5" fill="#a7f3d0" rx="1" />
      <rect x="8" y="55" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="60" width="65" height="1.5" fill="#a7f3d0" rx="1" />
    </svg>
  );
}
function Svg11({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fff" rx="2" />
      <rect x="8" y="8" width="74" height="2" fill={a} />
      <rect x="8" y="13" width="50" height="7" fill="#1e293b" rx="1" />
      <rect x="8" y="23" width="35" height="2.5" fill="#64748b" rx="1" />
      <rect x="8" y="31" width="74" height="2" fill={a} />
      <rect x="8" y="37" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="42" width="70" height="1.5" fill="#e2e8f0" rx="1" />
      <rect x="8" y="46" width="55" height="1.5" fill="#e2e8f0" rx="1" />
      <rect x="8" y="56" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="61" width="65" height="1.5" fill="#e2e8f0" rx="1" />
    </svg>
  );
}
function Svg12({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fff" rx="2" />
      <rect width="32" height="120" fill="#1e3a5f" />
      <rect
        x="4"
        y="8"
        width="24"
        height="24"
        fill="rgba(255,255,255,0.1)"
        rx="12"
      />
      <rect x="4" y="36" width="24" height="2" fill={a} rx="1" />
      <rect x="4" y="41" width="24" height="1.5" fill="#64748b" rx="1" />
      <rect x="4" y="45" width="24" height="1.5" fill="#64748b" rx="1" />
      <rect x="4" y="55" width="18" height="1.5" fill={a} rx="1" />
      <rect x="4" y="60" width="24" height="2.5" fill="#334155" rx="1" />
      <rect x="4" y="60" width="16" height="2.5" fill={a} rx="1" />
      <rect x="38" y="10" width="44" height="6" fill="#1e3a5f" rx="1" />
      <rect x="38" y="19" width="32" height="2.5" fill="#64748b" rx="1" />
      <rect x="38" y="29" width="18" height="2" fill={a} rx="1" />
      <rect x="38" y="34" width="44" height="1.5" fill="#e2e8f0" rx="1" />
      <rect x="38" y="38" width="36" height="1.5" fill="#e2e8f0" rx="1" />
    </svg>
  );
}
function Svg13({ a: _a }: { a: string }) {
  const purple = "#7c3aed";
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fdf4ff" rx="2" />
      <rect width="90" height="28" fill={purple} />
      <circle cx="72" cy="14" r="10" fill="rgba(255,255,255,0.15)" />
      <rect x="8" y="8" width="48" height="5" fill="#fff" rx="1" />
      <rect
        x="8"
        y="16"
        width="32"
        height="2.5"
        fill="rgba(255,255,255,0.6)"
        rx="1"
      />
      <rect x="8" y="35" width="18" height="2" fill={purple} rx="1" />
      <rect x="8" y="40" width="70" height="1.5" fill="#e9d5ff" rx="1" />
      <rect x="8" y="44" width="58" height="1.5" fill="#e9d5ff" rx="1" />
      <rect x="8" y="54" width="18" height="2" fill={purple} rx="1" />
      <rect x="8" y="59" width="65" height="1.5" fill="#e9d5ff" rx="1" />
    </svg>
  );
}
function Svg14({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fff" rx="2" />
      <polygon points="0,0 44,0 0,44" fill={a} opacity="0.18" />
      <rect x="8" y="52" width="74" height="1.5" fill={a} />
      <rect x="8" y="10" width="38" height="6" fill="#1e293b" rx="1" />
      <rect x="8" y="19" width="26" height="2.5" fill="#64748b" rx="1" />
      <rect x="8" y="58" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="63" width="70" height="1.5" fill="#f1f5f9" rx="1" />
      <rect x="8" y="67" width="55" height="1.5" fill="#f1f5f9" rx="1" />
      <rect x="8" y="77" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="82" width="65" height="1.5" fill="#f1f5f9" rx="1" />
    </svg>
  );
}
function Svg15({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#1c1c1c" rx="2" />
      <rect x="8" y="8" width="40" height="1.5" fill={a} />
      <rect x="8" y="12" width="50" height="7" fill="#fff" rx="1" />
      <rect x="8" y="22" width="35" height="2.5" fill="#9ca3af" rx="1" />
      <rect x="8" y="30" width="40" height="1.5" fill={a} />
      <rect x="8" y="36" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="41" width="70" height="1.5" fill="#374151" rx="1" />
      <rect x="8" y="45" width="58" height="1.5" fill="#374151" rx="1" />
      <rect x="8" y="55" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="60" width="65" height="1.5" fill="#374151" rx="1" />
    </svg>
  );
}
function Svg16({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#f8fafc" rx="2" />
      <rect x="8" y="8" width="74" height="24" fill={a} rx="2" />
      <rect x="14" y="13" width="42" height="5.5" fill="#fff" rx="1" />
      <rect
        x="14"
        y="21"
        width="55"
        height="2"
        fill="rgba(255,255,255,0.5)"
        rx="1"
      />
      <rect x="8" y="38" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="43" width="70" height="1.5" fill="#e0f2fe" rx="1" />
      <rect x="8" y="47" width="58" height="1.5" fill="#e0f2fe" rx="1" />
      <rect x="8" y="57" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="62" width="65" height="1.5" fill="#e0f2fe" rx="1" />
    </svg>
  );
}
function Svg17({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fff" rx="2" />
      <rect x="8" y="8" width="74" height="28" fill="#111827" rx="2" />
      <rect x="8" y="8" width="74" height="28" fill={a} rx="2" opacity="0.28" />
      <circle cx="20" cy="22" r="10" fill="#374151" />
      <rect x="35" y="14" width="40" height="5" fill="#f9fafb" rx="1" />
      <rect x="35" y="22" width="30" height="2.5" fill="#9ca3af" rx="1" />
      <rect x="8" y="42" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="47" width="70" height="1.5" fill="#e5e7eb" rx="1" />
      <rect x="8" y="51" width="55" height="1.5" fill="#e5e7eb" rx="1" />
      <rect x="8" y="61" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="66" width="65" height="1.5" fill="#e5e7eb" rx="1" />
    </svg>
  );
}
function Svg18({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fffbeb" rx="2" />
      <rect x="8" y="8" width="74" height="20" fill="#92400e" rx="2" />
      <rect x="14" y="12" width="40" height="5" fill="#fef3c7" rx="1" />
      <rect
        x="14"
        y="20"
        width="28"
        height="2"
        fill="rgba(254,243,199,0.6)"
        rx="1"
      />
      <rect x="8" y="34" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="39" width="70" height="1.5" fill="#fde68a" rx="1" />
      <rect x="8" y="43" width="58" height="1.5" fill="#fde68a" rx="1" />
      <rect x="8" y="53" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="58" width="65" height="1.5" fill="#fde68a" rx="1" />
    </svg>
  );
}
function Svg19({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fff" rx="2" />
      <circle
        cx="45"
        cy="18"
        r="13"
        fill="#f1f5f9"
        stroke={a}
        strokeWidth="1.5"
      />
      <rect x="22" y="35" width="46" height="5" fill="#1e293b" rx="1" />
      <rect x="28" y="43" width="34" height="2.5" fill="#64748b" rx="1" />
      <rect x="8" y="52" width="74" height="1" fill="#e2e8f0" />
      <rect x="8" y="57" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="62" width="70" height="1.5" fill="#e2e8f0" rx="1" />
      <rect x="8" y="66" width="55" height="1.5" fill="#e2e8f0" rx="1" />
      <rect x="8" y="76" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="81" width="65" height="1.5" fill="#e2e8f0" rx="1" />
    </svg>
  );
}
function Svg20({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <defs>
        <linearGradient
          id={`g20${a.replace("#", "")}`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0%" stopColor={a} />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="90" height="120" fill="#fff" rx="2" />
      <rect
        x="8"
        y="8"
        width="74"
        height="22"
        fill={`url(#g20${a.replace("#", "")})`}
        rx="2"
      />
      <rect x="14" y="13" width="42" height="5" fill="#fff" rx="1" />
      <rect
        x="14"
        y="21"
        width="55"
        height="2"
        fill="rgba(255,255,255,0.5)"
        rx="1"
      />
      <rect x="8" y="36" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="41" width="70" height="1.5" fill="#ede9fe" rx="1" />
      <rect x="8" y="45" width="58" height="1.5" fill="#ede9fe" rx="1" />
      <rect x="8" y="55" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="60" width="65" height="1.5" fill="#ede9fe" rx="1" />
    </svg>
  );
}
function Svg21({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fff" rx="2" />
      <rect x="8" y="8" width="74" height="2" fill={a} />
      <rect x="8" y="12" width="74" height="2" fill={a} opacity="0.4" />
      <rect x="8" y="18" width="50" height="7" fill="#0c4a6e" rx="1" />
      <rect x="8" y="28" width="35" height="2.5" fill="#6b7280" rx="1" />
      <rect x="8" y="37" width="74" height="2" fill={a} />
      <rect x="8" y="43" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="48" width="70" height="1.5" fill="#cffafe" rx="1" />
      <rect x="8" y="52" width="55" height="1.5" fill="#cffafe" rx="1" />
      <rect x="8" y="62" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="67" width="65" height="1.5" fill="#cffafe" rx="1" />
    </svg>
  );
}
function Svg22({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#1a1a2e" rx="2" />
      <rect width="90" height="2" fill={a} />
      <rect x="8" y="8" width="55" height="7" fill="#e2e8f0" rx="1" />
      <rect x="8" y="18" width="38" height="2.5" fill="#64748b" rx="1" />
      <rect x="8" y="27" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="32" width="74" height="0.8" fill="#0f3460" />
      <rect x="8" y="36" width="70" height="1.5" fill="#1e3a5f" rx="1" />
      <rect x="8" y="40" width="58" height="1.5" fill="#1e3a5f" rx="1" />
      <rect x="8" y="50" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="55" width="65" height="1.5" fill="#1e3a5f" rx="1" />
    </svg>
  );
}
function Svg23({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fff" rx="2" />
      <rect x="60" y="0" width="30" height="120" fill="#f8fafc" />
      <rect x="8" y="10" width="48" height="6" fill="#0f172a" rx="1" />
      <rect x="8" y="19" width="35" height="2.5" fill="#94a3b8" rx="1" />
      <rect x="8" y="30" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="35" width="46" height="1.5" fill="#e2e8f0" rx="1" />
      <rect x="8" y="39" width="38" height="1.5" fill="#e2e8f0" rx="1" />
      <rect x="8" y="49" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="54" width="46" height="1.5" fill="#e2e8f0" rx="1" />
      <rect x="64" y="10" width="20" height="2" fill={a} rx="1" />
      <rect x="64" y="15" width="20" height="1.5" fill="#cbd5e1" rx="1" />
      <rect x="64" y="25" width="14" height="1.5" fill={a} rx="1" />
      <rect x="64" y="30" width="20" height="2.5" fill="#e2e8f0" rx="1" />
      <rect x="64" y="30" width="12" height="2.5" fill={a} rx="1" />
    </svg>
  );
}
function Svg24({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#f0fdf4" rx="2" />
      <rect x="8" y="8" width="74" height="24" fill="#14532d" rx="2" />
      <rect x="68" y="8" width="14" height="24" fill={a} />
      <rect x="14" y="13" width="48" height="5" fill="#ecfdf5" rx="1" />
      <rect x="14" y="21" width="36" height="2.5" fill="#a7f3d0" rx="1" />
      <rect x="8" y="38" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="43" width="70" height="1.5" fill="#a7f3d0" rx="1" />
      <rect x="8" y="47" width="55" height="1.5" fill="#a7f3d0" rx="1" />
      <rect x="8" y="57" width="20" height="2" fill={a} rx="1" />
      <rect x="8" y="62" width="65" height="1.5" fill="#a7f3d0" rx="1" />
    </svg>
  );
}
function Svg25({ a }: { a: string }) {
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill="#fafaf9" rx="2" />
      <rect x="8" y="8" width="74" height="22" fill="#1c1917" rx="2" />
      <rect x="8" y="8" width="74" height="22" fill={a} rx="2" opacity="0.35" />
      <rect x="14" y="13" width="42" height="5" fill="#fef3c7" rx="1" />
      <rect x="14" y="21" width="55" height="2" fill="#78716c" rx="1" />
      <rect x="8" y="36" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="41" width="70" height="1.5" fill="#e7e5e4" rx="1" />
      <rect x="8" y="45" width="55" height="1.5" fill="#e7e5e4" rx="1" />
      <rect x="8" y="55" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="60" width="65" height="1.5" fill="#e7e5e4" rx="1" />
    </svg>
  );
}

// ─── Dinamik shablonlar (t026–t100) ───────────────
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

function DynSvg({ pal, a }: { pal: (typeof DYN_PALETTES)[0]; a: string }) {
  const { bg, hdr, sty } = pal;
  const sub = "#e2e8f0";

  const base = { bg, hdr, a, sub };

  if (sty === "full-header")
    return (
      <svg
        viewBox="0 0 90 120"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <rect width="90" height="120" fill={bg} rx="2" />
        <rect x="8" y="8" width="74" height="22" fill={hdr} rx="2" />
        <rect
          x="14"
          y="13"
          width="40"
          height="5"
          fill={bg}
          rx="1"
          opacity="0.9"
        />
        <rect
          x="14"
          y="21"
          width="55"
          height="2"
          fill={a}
          rx="1"
          opacity="0.5"
        />
        <rect x="8" y="36" width="18" height="2" fill={a} rx="1" />
        <rect x="8" y="41" width="70" height="1.5" fill={sub} rx="1" />
        <rect x="8" y="45" width="55" height="1.5" fill={sub} rx="1" />
        <rect x="8" y="55" width="18" height="2" fill={a} rx="1" />
        <rect x="8" y="60" width="65" height="1.5" fill={sub} rx="1" />
      </svg>
    );
  if (sty === "left-stripe")
    return (
      <svg
        viewBox="0 0 90 120"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <rect width="90" height="120" fill={bg} rx="2" />
        <rect x="8" y="8" width="5" height="104" fill={a} rx="2" />
        <rect x="17" y="10" width="45" height="6" fill={hdr} rx="1" />
        <rect
          x="17"
          y="19"
          width="32"
          height="2.5"
          fill={a}
          rx="1"
          opacity="0.7"
        />
        <rect x="17" y="30" width="20" height="2" fill={a} rx="1" />
        <rect x="17" y="35" width="58" height="1.5" fill={sub} rx="1" />
        <rect x="17" y="39" width="48" height="1.5" fill={sub} rx="1" />
        <rect x="17" y="49" width="20" height="2" fill={a} rx="1" />
        <rect x="17" y="54" width="55" height="1.5" fill={sub} rx="1" />
      </svg>
    );
  if (sty === "top-bar")
    return (
      <svg
        viewBox="0 0 90 120"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <rect width="90" height="120" fill={bg} rx="2" />
        <rect x="8" y="8" width="74" height="3" fill={a} />
        <rect x="8" y="14" width="50" height="7" fill={hdr} rx="1" />
        <rect
          x="8"
          y="24"
          width="35"
          height="2.5"
          fill={a}
          rx="1"
          opacity="0.7"
        />
        <rect x="8" y="33" width="20" height="2" fill={a} rx="1" />
        <rect x="8" y="38" width="70" height="1.5" fill={sub} rx="1" />
        <rect x="8" y="42" width="55" height="1.5" fill={sub} rx="1" />
        <rect x="8" y="52" width="20" height="2" fill={a} rx="1" />
        <rect x="8" y="57" width="65" height="1.5" fill={sub} rx="1" />
      </svg>
    );
  if (sty === "double-bar")
    return (
      <svg
        viewBox="0 0 90 120"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <rect width="90" height="120" fill={bg} rx="2" />
        <rect x="8" y="8" width="74" height="2" fill={hdr} />
        <rect x="8" y="12" width="74" height="2" fill={a} />
        <rect x="8" y="17" width="50" height="7" fill={hdr} rx="1" />
        <rect x="8" y="27" width="35" height="2.5" fill="#94a3b8" rx="1" />
        <rect x="8" y="36" width="20" height="2" fill={a} rx="1" />
        <rect x="8" y="41" width="70" height="1.5" fill={sub} rx="1" />
        <rect x="8" y="45" width="55" height="1.5" fill={sub} rx="1" />
        <rect x="8" y="55" width="20" height="2" fill={a} rx="1" />
        <rect x="8" y="60" width="65" height="1.5" fill={sub} rx="1" />
      </svg>
    );
  if (sty === "side-right")
    return (
      <svg
        viewBox="0 0 90 120"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <rect width="90" height="120" fill={bg} rx="2" />
        <rect x="60" y="0" width="30" height="120" fill={sub} />
        <rect x="8" y="10" width="48" height="6" fill={hdr} rx="1" />
        <rect x="8" y="19" width="35" height="2.5" fill="#6b7280" rx="1" />
        <rect x="8" y="30" width="18" height="2" fill={a} rx="1" />
        <rect x="8" y="35" width="46" height="1.5" fill={sub} rx="1" />
        <rect x="8" y="39" width="38" height="1.5" fill={sub} rx="1" />
        <rect x="8" y="49" width="18" height="2" fill={a} rx="1" />
        <rect x="8" y="54" width="46" height="1.5" fill={sub} rx="1" />
        <rect x="64" y="10" width="20" height="2" fill={a} rx="1" />
      </svg>
    );
  if (sty === "corner")
    return (
      <svg
        viewBox="0 0 90 120"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <rect width="90" height="120" fill={bg} rx="2" />
        <polygon points="0,0 50,0 0,50" fill={a} opacity="0.14" />
        <rect x="8" y="55" width="74" height="1" fill={a} />
        <rect x="8" y="10" width="40" height="6" fill={hdr} rx="1" />
        <rect
          x="8"
          y="19"
          width="28"
          height="2.5"
          fill={a}
          rx="1"
          opacity="0.7"
        />
        <rect x="8" y="60" width="18" height="2" fill={a} rx="1" />
        <rect x="8" y="65" width="70" height="1.5" fill={sub} rx="1" />
        <rect x="8" y="69" width="55" height="1.5" fill={sub} rx="1" />
        <rect x="8" y="79" width="18" height="2" fill={a} rx="1" />
        <rect x="8" y="84" width="65" height="1.5" fill={sub} rx="1" />
      </svg>
    );
  // minimal
  return (
    <svg
      viewBox="0 0 90 120"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <rect width="90" height="120" fill={bg} rx="2" />
      <rect x="8" y="8" width="50" height="7" fill={hdr} rx="1" />
      <rect x="8" y="18" width="35" height="2.5" fill="#94a3b8" rx="1" />
      <line x1="8" y1="25" x2="82" y2="25" stroke={a} strokeWidth="1.5" />
      <rect x="8" y="30" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="35" width="70" height="1.5" fill={sub} rx="1" />
      <rect x="8" y="39" width="58" height="1.5" fill={sub} rx="1" />
      <rect x="8" y="49" width="18" height="2" fill={a} rx="1" />
      <rect x="8" y="54" width="65" height="1.5" fill={sub} rx="1" />
    </svg>
  );
}

const STATIC_SVGS = [
  Svg01,
  Svg02,
  Svg03,
  Svg04,
  Svg05,
  Svg06,
  Svg07,
  Svg08,
  Svg09,
  Svg10,
  Svg11,
  Svg12,
  Svg13,
  Svg14,
  Svg15,
  Svg16,
  Svg17,
  Svg18,
  Svg19,
  Svg20,
  Svg21,
  Svg22,
  Svg23,
  Svg24,
  Svg25,
];

function TemplatePreview({ tKey, accent }: { tKey: string; accent: string }) {
  const idx = parseInt(tKey.replace("t", ""), 10);
  if (idx >= 1 && idx <= 25) {
    const SvgComp = STATIC_SVGS[idx - 1];
    return <SvgComp a={accent} />;
  }
  const dynIdx = idx - 26;
  if (dynIdx >= 0 && dynIdx < DYN_PALETTES.length) {
    return <DynSvg pal={DYN_PALETTES[dynIdx]} a={accent} />;
  }
  return <Svg01 a={accent} />;
}

// ─────────────────────────────────────────────────
// TEMPLATE RO'YXATI
// ─────────────────────────────────────────────────
const STATIC_NAMES: [string, string][] = [
  ["Clean Line", "Toza chiziq"],
  ["Dark Accent", "Qora aksent"],
  ["Classic Top", "Klassik sarlavha"],
  ["Modern Panel", "Yon panelli"],
  ["Teal Photo", "Foto bilan"],
  ["Blue Box", "Ko'k quti"],
  ["Bold Stripe", "Qalin chiziq"],
  ["Cyber Dark", "Kiber qora"],
  ["Double Bar", "Qo'sh chiziq"],
  ["Forest Pro", "O'rmon yashil"],
  ["Red Dual", "Qizil juft"],
  ["Navy Side", "Dengiz panel"],
  ["Purple Soft", "Yumshoq binafsha"],
  ["Corner Fold", "Burchak burama"],
  ["Gold Dark", "Oltin-qora"],
  ["Sky Banner", "Osmon banneri"],
  ["Prism Dark", "Prizma qora"],
  ["Amber Warm", "Iliq qahrabo"],
  ["Centered", "Markaziy foto"],
  ["Gradient", "Gradient"],
  ["Cyan Lines", "Moviy chiziqlar"],
  ["Cyber Navy", "Kiber dengiz"],
  ["Split View", "Bo'lingan ko'rinish"],
  ["Green Block", "Yashil blok"],
  ["Mocha Dark", "Qahva qora"],
];
const DYN_ADJ = [
  "Elegant",
  "Bold",
  "Clean",
  "Sharp",
  "Sleek",
  "Refined",
  "Crisp",
  "Vivid",
  "Polished",
  "Precise",
  "Smooth",
  "Bright",
  "Rich",
  "Calm",
  "Dynamic",
  "Soft",
  "Strong",
  "Deep",
  "Warm",
  "Cool",
  "Fresh",
  "Pure",
  "Clear",
  "Fine",
];
const DYN_DESC = [
  "Professional",
  "Modern",
  "Classic",
  "Elegant",
  "Bold",
  "Creative",
  "Minimal",
  "Stylish",
  "Dynamic",
  "Clean",
  "Refined",
  "Sharp",
  "Balanced",
  "Strong",
  "Fluid",
  "Precise",
  "Vivid",
  "Sleek",
  "Calm",
  "Rich",
  "Fresh",
  "Clear",
  "Warm",
  "Crisp",
];

const ALL_TEMPLATES = [
  ...STATIC_NAMES.map(([name, desc], i) => ({
    key: `t${String(i + 1).padStart(3, "0")}` as TemplateType,
    name,
    desc,
  })),
  ...DYN_PALETTES.map((_, i) => ({
    key: `t${String(i + 26).padStart(3, "0")}` as TemplateType,
    name: `${DYN_ADJ[i % DYN_ADJ.length]} ${i + 26}`,
    desc: DYN_DESC[i % DYN_DESC.length],
  })),
];

// ─────────────────────────────────────────────────
// PREVIEW DIALOG
// ─────────────────────────────────────────────────
function PreviewModal({
  tKey,
  name,
  desc,
  accent,
  onSelect,
}: {
  tKey: string;
  name: string;
  desc: string;
  accent: string;
  onSelect: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="absolute top-1.5 right-1.5 bg-black/50 hover:bg-black/80 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10"
        title="Katta ko'rish"
      >
        <Eye className="w-2.5 h-2.5" />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-80 max-w-[92vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base">{name}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                ✕
              </button>
            </div>
            <div className="flex justify-center p-3 bg-gray-50 rounded-xl mb-4">
              <div
                style={{ width: 200, height: 267 }}
                className="rounded-lg overflow-hidden shadow-lg border border-gray-200"
              >
                <TemplatePreview tKey={tKey} accent={accent} />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50"
              >
                Yopish
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelect();
                  setOpen(false);
                }}
                className="flex-1 py-2.5 text-white rounded-xl text-sm font-bold hover:opacity-90"
                style={{ backgroundColor: accent }}
              >
                ✓ Tanlash
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────
// ASOSIY KOMPONENT
// ─────────────────────────────────────────────────
export default function StepTemplate({ data, onChange }: Props) {
  const [search, setSearch] = useState("");

  const safeTemplate = (data?.template as string) || "t001";
  const safeColor = data?.accentColor || "blue";
  const safeFont = data?.font || "Inter";
  const safeFontSize = data?.fontSize ?? 22;

  const accentHex = COLORS.find((c) => c.key === safeColor)?.hex || "#2563eb";

  const filtered = ALL_TEMPLATES.filter(
    (t) =>
      search === "" ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Sarlavha */}
      <div>
        <h2 className="text-2xl font-bold mb-0.5">Dizayn tanlang</h2>
        <p className="text-muted-foreground text-sm">
          Rangni va shriftni tanlang, keyin{" "}
          <span className="font-semibold text-foreground">100 ta</span> shablon
          ichidan birini tanlang
        </p>
      </div>

      {/* ═══════════════════════════════════
          1. RANG — ENG TEPADA
      ════════════════════════════════════ */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4" style={{ color: accentHex }} />
          <span className="text-sm font-semibold">Aksent rangi</span>
          <span
            className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium text-white"
            style={{ backgroundColor: accentHex }}
          >
            {COLORS.find((c) => c.key === safeColor)?.label}
          </span>
        </div>
        {/* 12-ustunli rang grid */}
        <div className="grid grid-cols-12 gap-1.5">
          {COLORS.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => onChange("accentColor", c.key)}
              title={c.label}
              className="relative aspect-square rounded-lg transition-all duration-150 hover:scale-110 focus:outline-none"
              style={{
                backgroundColor: c.hex,
                boxShadow:
                  safeColor === c.key
                    ? `0 0 0 2.5px #fff, 0 0 0 4.5px ${c.hex}`
                    : undefined,
                transform: safeColor === c.key ? "scale(1.12)" : undefined,
              }}
            >
              {safeColor === c.key && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white drop-shadow" />
                </span>
              )}
            </button>
          ))}
        </div>
        {/* Rang nomlari satri */}
        <div className="grid grid-cols-12 gap-1.5 mt-1">
          {COLORS.map((c) => (
            <p
              key={c.key}
              className="text-[8px] text-center text-muted-foreground truncate leading-tight"
            >
              {c.label}
            </p>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════
          2. SHRIFT
      ════════════════════════════════════ */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Type className="w-4 h-4" style={{ color: accentHex }} />
          <span className="text-sm font-semibold">Shrift</span>
        </div>
        <div className="flex gap-3">
          {FONTS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => onChange("font", f.key)}
              className={[
                "flex-1 py-3 rounded-xl border-2 transition-all",
                safeFont === f.key
                  ? "shadow-sm"
                  : "border-border hover:border-gray-400",
              ].join(" ")}
              style={{
                fontFamily: `'${f.key}', sans-serif`,
                borderColor: safeFont === f.key ? accentHex : undefined,
                backgroundColor:
                  safeFont === f.key ? accentHex + "12" : undefined,
              }}
            >
              <p
                className="text-xl font-bold text-center"
                style={{ color: accentHex }}
              >
                Aa
              </p>
              <p className="text-xs text-center text-muted-foreground mt-0.5">
                {f.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════
          2b. YOZUV KATTALIGI
      ════════════════════════════════════ */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4" style={{ color: accentHex }} />
            <span className="text-sm font-semibold">Yozuv kattaligi</span>
          </div>
          <span
            className="text-sm font-bold px-2.5 py-0.5 rounded-full"
            style={{ backgroundColor: accentHex + "18", color: accentHex }}
          >
            {safeFontSize}px
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-7 text-center">
            12
          </span>
          <div className="flex-1 relative">
            <input
              type="range"
              min={12}
              max={32}
              step={1}
              value={safeFontSize}
              onChange={(e) => onChange("fontSize", e.target.value)}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${accentHex} 0%, ${accentHex} ${((safeFontSize - 12) / 20) * 100}%, #e2e8f0 ${((safeFontSize - 12) / 20) * 100}%, #e2e8f0 100%)`,
                accentColor: accentHex,
              }}
            />
          </div>
          <span className="text-xs text-muted-foreground w-7 text-center">
            32
          </span>
        </div>
        <div className="flex justify-between mt-2 px-8">
          <span className="text-[10px] text-muted-foreground">Kichik</span>
          <span className="text-[10px] text-muted-foreground">
            Default (22px)
          </span>
          <span className="text-[10px] text-muted-foreground">Katta</span>
        </div>
        {/* Namuna ko'rinishi */}
        <div
          className="mt-3 p-3 rounded-xl border border-border bg-muted/30"
          style={{ fontFamily: `'${safeFont}', sans-serif` }}
        >
          <p
            className="font-bold text-foreground leading-snug"
            style={{ fontSize: safeFontSize }}
          >
            Muhammadsolih Abduvosiyev
          </p>
          <p
            className="text-muted-foreground mt-0.5"
            style={{ fontSize: safeFontSize * 0.75 }}
          >
            Frontend dasturchi · Samarqand viloyati
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════
          3. SHABLONLAR
      ════════════════════════════════════ */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Layout className="w-4 h-4" style={{ color: accentHex }} />
          <span className="text-sm font-semibold">Shablon</span>
          <span className="text-xs text-muted-foreground">
            ({filtered.length} ta)
          </span>
          <div className="ml-auto flex items-center gap-1.5 bg-muted rounded-lg px-3 py-1.5">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm outline-none w-28 placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div
          className="overflow-y-auto rounded-xl pr-0.5"
          style={{ maxHeight: 480 }}
        >
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))",
            }}
          >
            {filtered.map((t) => {
              const isSelected = safeTemplate === t.key;
              return (
                <div key={t.key} className="relative group">
                  <button
                    type="button"
                    onClick={() => onChange("template", t.key)}
                    className="w-full rounded-xl p-1.5 transition-all text-left bg-white"
                    style={{
                      border: isSelected
                        ? `2px solid ${accentHex}`
                        : "2px solid #e5e7eb",
                      boxShadow: isSelected
                        ? `0 0 0 1px ${accentHex}30`
                        : undefined,
                    }}
                  >
                    {/* Preview rasm */}
                    <div
                      className="w-full rounded-md overflow-hidden mb-1.5 border border-gray-100"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <TemplatePreview tKey={t.key} accent={accentHex} />
                    </div>
                    <p className="text-[10px] font-semibold truncate leading-tight">
                      {t.name}
                    </p>
                    <p className="text-[9px] text-muted-foreground truncate">
                      {t.desc}
                    </p>

                    {isSelected && (
                      <div
                        className="absolute top-2 left-2 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: accentHex }}
                      >
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </button>

                  <PreviewModal
                    tKey={t.key}
                    name={t.name}
                    desc={t.desc}
                    accent={accentHex}
                    onSelect={() => onChange("template", t.key)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════
          XULOSA KARTOCHKASI
      ════════════════════════════════════ */}
      <div
        className="rounded-2xl p-4 flex items-center gap-4 border"
        style={{
          borderColor: accentHex + "50",
          backgroundColor: accentHex + "08",
        }}
      >
        <div
          className="rounded-xl overflow-hidden border border-gray-200 shadow-sm flex-shrink-0"
          style={{ width: 52, height: 70 }}
        >
          <TemplatePreview tKey={safeTemplate} accent={accentHex} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate flex items-center gap-1.5">
            <Check
              className="w-3.5 h-3.5 flex-shrink-0"
              style={{ color: accentHex }}
            />
            {ALL_TEMPLATES.find((t) => t.key === safeTemplate)?.name ||
              safeTemplate}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {COLORS.find((c) => c.key === safeColor)?.label} rang · {safeFont}{" "}
            shrift · {safeFontSize}px
          </p>
        </div>
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 border-2 border-white shadow"
          style={{ backgroundColor: accentHex }}
        />
      </div>
    </div>
  );
}

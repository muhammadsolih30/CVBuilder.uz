import { CVData } from '@/types/cv';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Eye } from 'lucide-react';
import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';

interface Props {
  data: CVData;
  onBack: () => void;
}

const accentStyles = {
  blue:  { bg: '#2563eb', text: '#ffffff', light: '#dbeafe', mid: '#93c5fd' },
  green: { bg: '#0d9488', text: '#ffffff', light: '#ccfbf1', mid: '#5eead4' },
  black: { bg: '#1e293b', text: '#ffffff', light: '#e2e8f0', mid: '#94a3b8' },
};

const classicHeaderColors = {
  blue:  '#1d4ed8',
  green: '#0f766e',
  black: '#1e293b',
};

export default function CVPreview({ data, onBack }: Props) {
  const cvRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const accent = accentStyles[data.accentColor];
  const { personalInfo: p, workExperience, education, skills, languages } = data;

  const handleDownload = async () => {
    if (!cvRef.current) return;
    setDownloading(true);
    try {
      await html2pdf().set({
        margin: 0,
        filename: `${p.fullName || 'CV'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }).from(cvRef.current).save();
    } finally {
      setDownloading(false);
    }
  };

  const scoreFactors = [
    p.fullName ? 15 : 0,
    p.email ? 10 : 0,
    p.phone ? 10 : 0,
    p.summary && p.summary.length > 30 ? 15 : 0,
    workExperience.length > 0 ? 20 : 0,
    education.length > 0 ? 10 : 0,
    (skills.technical.length + skills.soft.length) > 0 ? 10 : 0,
    languages.length > 0 ? 10 : 0,
  ];
  const score = scoreFactors.reduce((a, b) => a + b, 0);
  const scoreColor = score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';
  const scoreLabel = score >= 70 ? 'Yaxshi' : score >= 40 ? "O'rta" : 'Past';

  const isModern  = data.template === 'modern';
  const isClassic = data.template === 'classic';
  const isDark    = data.template === 'dark';

  // Reusable section header style
  const sectionHead = (color: string) => ({
    fontSize: 10,
    fontWeight: 'bold' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color,
    marginBottom: 6,
    paddingBottom: 3,
    borderBottom: `1.5px solid ${color}30`,
  });

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
            {/* ATS Score */}
            <div className="flex items-center gap-2 text-sm bg-gray-50 rounded-lg px-3 py-1.5 border">
              <Eye className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-500 hidden sm:inline">ATS:</span>
              <span className="font-bold" style={{ color: scoreColor }}>
                {score}% <span className="hidden sm:inline text-xs font-normal">({scoreLabel})</span>
              </span>
            </div>

            <Button
              onClick={handleDownload}
              disabled={downloading}
              className="gradient-primary text-primary-foreground gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Yuklanmoqda...' : 'PDF yuklash'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* BUG FIX: Mobile da scroll qilib ko'rish uchun overflow-x-auto */}
      <div className="flex justify-center py-8 px-4 overflow-x-auto">
        <div
          ref={cvRef}
          style={{
            width: '210mm',
            minWidth: '210mm',
            minHeight: '297mm',
            fontFamily: `'${data.font}', ${data.font}, Arial, sans-serif`,
            color: '#1e293b',
            fontSize: '11px',
            lineHeight: '1.6',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 32px rgba(0,0,0,0.15)',
          }}
        >

          {/* ===== MODERN TEMPLATE ===== */}
          {isModern && (
            <div style={{ display: 'flex', minHeight: '297mm' }}>
              {/* Sidebar */}
              <div style={{ width: '68mm', minWidth: '68mm', padding: '28px 20px', backgroundColor: accent.bg, color: accent.text }}>
                {p.photo && (
                  <img
                    src={p.photo}
                    alt=""
                    style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', display: 'block', margin: '0 auto 16px', border: '3px solid rgba(255,255,255,0.3)' }}
                  />
                )}
                <h1 style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 4, lineHeight: 1.3 }}>{p.fullName || 'Ism Familiya'}</h1>

                <div style={{ marginTop: 16 }}>
                  <p style={{ fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, opacity: 0.7 }}>KONTAKT</p>
                  {p.phone    && <p style={{ fontSize: 9, marginBottom: 5, opacity: 0.9 }}>📞 {p.phone}</p>}
                  {p.email    && <p style={{ fontSize: 9, marginBottom: 5, opacity: 0.9, wordBreak: 'break-all' }}>✉️ {p.email}</p>}
                  {p.address  && <p style={{ fontSize: 9, marginBottom: 5, opacity: 0.9 }}>📍 {p.address}</p>}
                  {p.linkedin && <p style={{ fontSize: 9, marginBottom: 5, opacity: 0.9, wordBreak: 'break-all' }}>🔗 {p.linkedin}</p>}
                  {p.telegram && <p style={{ fontSize: 9, marginBottom: 5, opacity: 0.9 }}>💬 {p.telegram}</p>}
                </div>

                {(skills.technical.length > 0 || skills.soft.length > 0) && (
                  <div style={{ marginTop: 20 }}>
                    <p style={{ fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, opacity: 0.7 }}>KO'NIKMALAR</p>
                    {[...skills.technical, ...skills.soft].map(s => (
                      <div key={s.id} style={{ marginBottom: 8 }}>
                        <p style={{ fontSize: 9, marginBottom: 3 }}>{s.name}</p>
                        <div style={{ display: 'flex', gap: 2 }}>
                          {[1,2,3,4,5].map(n => (
                            <div key={n} style={{ width: 10, height: 3, borderRadius: 2, backgroundColor: n <= s.level ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)' }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {languages.length > 0 && (
                  <div style={{ marginTop: 20 }}>
                    <p style={{ fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, opacity: 0.7 }}>TILLAR</p>
                    {languages.map(l => (
                      <p key={l.id} style={{ fontSize: 9, marginBottom: 5, opacity: 0.9 }}>{l.name} — {l.level}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Main */}
              <div style={{ flex: 1, padding: '28px 24px' }}>
                {p.summary && (
                  <div style={{ marginBottom: 18 }}>
                    <p style={sectionHead(accent.bg)}>PROFIL</p>
                    <p style={{ fontSize: 10, lineHeight: 1.7, color: '#374151' }}>{p.summary}</p>
                  </div>
                )}

                {workExperience.length > 0 && (
                  <div style={{ marginBottom: 18 }}>
                    <p style={sectionHead(accent.bg)}>ISH TAJRIBASI</p>
                    {workExperience.map(w => (
                      <div key={w.id} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${accent.light}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                          <p style={{ fontWeight: 600, fontSize: 11 }}>{w.jobTitle}</p>
                          <p style={{ fontSize: 9, color: '#94a3b8', flexShrink: 0, marginLeft: 8 }}>{w.startDate} — {w.current ? 'Hozir' : w.endDate}</p>
                        </div>
                        <p style={{ fontSize: 10, color: accent.bg, marginBottom: 3 }}>{w.company}{w.location ? ` · ${w.location}` : ''}</p>
                        {w.description && <p style={{ fontSize: 9, color: '#6b7280', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{w.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {education.length > 0 && (
                  <div style={{ marginBottom: 18 }}>
                    <p style={sectionHead(accent.bg)}>TA'LIM</p>
                    {education.map(e => (
                      <div key={e.id} style={{ marginBottom: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <p style={{ fontWeight: 600, fontSize: 11 }}>{e.degree}</p>
                          <p style={{ fontSize: 9, color: '#94a3b8', flexShrink: 0, marginLeft: 8 }}>{e.startYear} — {e.endYear}</p>
                        </div>
                        <p style={{ fontSize: 10, color: accent.bg }}>{e.university}</p>
                        {e.description && <p style={{ fontSize: 9, color: '#6b7280', marginTop: 2 }}>{e.description}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===== CLASSIC TEMPLATE ===== */}
          {isClassic && (
            <div>
              {/* Header band */}
              <div style={{ padding: '24px 28px 20px', backgroundColor: classicHeaderColors[data.accentColor] }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {p.photo && (
                    <img src={p.photo} alt="" style={{ width: 72, height: 72, borderRadius: 6, objectFit: 'cover', flexShrink: 0, border: '2px solid rgba(255,255,255,0.4)' }} />
                  )}
                  <div>
                    <h1 style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 6 }}>{p.fullName || 'Ism Familiya'}</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 9.5, color: 'rgba(255,255,255,0.85)' }}>
                      {p.phone    && <span>📞 {p.phone}</span>}
                      {p.email    && <span>✉️ {p.email}</span>}
                      {p.address  && <span>📍 {p.address}</span>}
                      {p.linkedin && <span>🔗 {p.linkedin}</span>}
                      {p.telegram && <span>💬 {p.telegram}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '20px 28px' }}>
                <div style={{ height: 2, background: `linear-gradient(90deg, ${classicHeaderColors[data.accentColor]}, transparent)`, marginBottom: 18 }} />

                {p.summary && (
                  <div style={{ marginBottom: 16 }}>
                    <p style={sectionHead(classicHeaderColors[data.accentColor])}>PROFIL</p>
                    <p style={{ fontSize: 10, lineHeight: 1.7, color: '#374151' }}>{p.summary}</p>
                  </div>
                )}

                {workExperience.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <p style={sectionHead(classicHeaderColors[data.accentColor])}>ISH TAJRIBASI</p>
                    {workExperience.map(w => (
                      <div key={w.id} style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <p style={{ fontWeight: 600, fontSize: 11 }}>
                            {w.jobTitle}
                            {w.company && <span style={{ color: classicHeaderColors[data.accentColor] }}> — {w.company}</span>}
                          </p>
                          <p style={{ fontSize: 9, color: '#94a3b8', flexShrink: 0, marginLeft: 8 }}>{w.startDate} — {w.current ? 'Hozir' : w.endDate}</p>
                        </div>
                        {w.location && <p style={{ fontSize: 9.5, color: '#64748b' }}>{w.location}</p>}
                        {w.description && <p style={{ fontSize: 9.5, marginTop: 3, whiteSpace: 'pre-line', lineHeight: 1.6, color: '#4b5563' }}>{w.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {education.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <p style={sectionHead(classicHeaderColors[data.accentColor])}>TA'LIM</p>
                    {education.map(e => (
                      <div key={e.id} style={{ marginBottom: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <p style={{ fontWeight: 600, fontSize: 11 }}>
                            {e.degree}
                            {e.university && <span style={{ color: classicHeaderColors[data.accentColor] }}> — {e.university}</span>}
                          </p>
                          <p style={{ fontSize: 9, color: '#94a3b8', flexShrink: 0, marginLeft: 8 }}>{e.startYear} — {e.endYear}</p>
                        </div>
                        {e.description && <p style={{ fontSize: 9.5, color: '#64748b' }}>{e.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 4 }}>
                  {(skills.technical.length > 0 || skills.soft.length > 0) && (
                    <div>
                      <p style={sectionHead(classicHeaderColors[data.accentColor])}>KO'NIKMALAR</p>
                      {[...skills.technical, ...skills.soft].map(s => (
                        <div key={s.id} style={{ marginBottom: 7 }}>
                          <p style={{ fontSize: 10, marginBottom: 2 }}>{s.name}</p>
                          <div style={{ display: 'flex', gap: 2 }}>
                            {[1,2,3,4,5].map(n => (
                              <div key={n} style={{ width: 14, height: 4, borderRadius: 2, backgroundColor: n <= s.level ? classicHeaderColors[data.accentColor] : '#e2e8f0' }} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {languages.length > 0 && (
                    <div>
                      <p style={sectionHead(classicHeaderColors[data.accentColor])}>TILLAR</p>
                      {languages.map(l => (
                        <p key={l.id} style={{ fontSize: 10, marginBottom: 5 }}>
                          {l.name} <span style={{ color: '#64748b' }}>— {l.level}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===== DARK TEMPLATE ===== */}
          {isDark && (
            // BUG FIX: Dark top bar margin bug tuzatildi - alohida wrapper
            <div style={{ backgroundColor: '#0f172a', color: '#f1f5f9', minHeight: '297mm' }}>
              {/* Top accent bar - alohida, padding outside */}
              <div style={{ height: 4, backgroundColor: accent.bg, width: '100%' }} />

              <div style={{ padding: '24px 28px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #1e293b' }}>
                  {p.photo && (
                    <img src={p.photo} alt="" style={{ width: 70, height: 70, borderRadius: 8, objectFit: 'cover', flexShrink: 0, border: `2px solid ${accent.bg}` }} />
                  )}
                  <div>
                    <h1 style={{ fontSize: 20, fontWeight: 'bold', color: '#f8fafc', marginBottom: 6 }}>{p.fullName || 'Ism Familiya'}</h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 9.5, color: '#94a3b8' }}>
                      {p.phone    && <span>📞 {p.phone}</span>}
                      {p.email    && <span>✉️ {p.email}</span>}
                      {p.address  && <span>📍 {p.address}</span>}
                      {p.linkedin && <span>🔗 {p.linkedin}</span>}
                      {p.telegram && <span>💬 {p.telegram}</span>}
                    </div>
                  </div>
                </div>

                {p.summary && (
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ ...sectionHead(accent.bg), borderBottomColor: '#1e293b' }}>PROFIL</p>
                    <p style={{ fontSize: 10, color: '#cbd5e1', lineHeight: 1.7 }}>{p.summary}</p>
                  </div>
                )}

                {workExperience.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ ...sectionHead(accent.bg), borderBottomColor: '#1e293b' }}>ISH TAJRIBASI</p>
                    {workExperience.map(w => (
                      <div key={w.id} style={{ marginBottom: 12, paddingLeft: 12, borderLeft: `3px solid ${accent.bg}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <p style={{ fontWeight: 600, fontSize: 11, color: '#e2e8f0' }}>{w.jobTitle}</p>
                          <p style={{ fontSize: 9, color: '#475569', flexShrink: 0, marginLeft: 8 }}>{w.startDate} — {w.current ? 'Hozir' : w.endDate}</p>
                        </div>
                        <p style={{ fontSize: 10, color: accent.mid, marginBottom: 2 }}>{w.company}{w.location ? ` · ${w.location}` : ''}</p>
                        {w.description && <p style={{ fontSize: 9.5, color: '#94a3b8', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{w.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {education.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ ...sectionHead(accent.bg), borderBottomColor: '#1e293b' }}>TA'LIM</p>
                    {education.map(e => (
                      <div key={e.id} style={{ marginBottom: 10, paddingLeft: 12, borderLeft: `3px solid ${accent.bg}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <p style={{ fontWeight: 600, fontSize: 11, color: '#e2e8f0' }}>{e.degree}</p>
                          <p style={{ fontSize: 9, color: '#475569', flexShrink: 0, marginLeft: 8 }}>{e.startYear} — {e.endYear}</p>
                        </div>
                        <p style={{ fontSize: 10, color: accent.mid }}>{e.university}</p>
                        {e.description && <p style={{ fontSize: 9.5, color: '#94a3b8', marginTop: 2 }}>{e.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  {(skills.technical.length > 0 || skills.soft.length > 0) && (
                    <div>
                      <p style={{ ...sectionHead(accent.bg), borderBottomColor: '#1e293b' }}>KO'NIKMALAR</p>
                      {[...skills.technical, ...skills.soft].map(s => (
                        <div key={s.id} style={{ marginBottom: 8 }}>
                          <p style={{ fontSize: 10, color: '#cbd5e1', marginBottom: 3 }}>{s.name}</p>
                          <div style={{ display: 'flex', gap: 2 }}>
                            {[1,2,3,4,5].map(n => (
                              <div key={n} style={{ width: 14, height: 4, borderRadius: 2, backgroundColor: n <= s.level ? accent.bg : '#1e293b' }} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {languages.length > 0 && (
                    <div>
                      <p style={{ ...sectionHead(accent.bg), borderBottomColor: '#1e293b' }}>TILLAR</p>
                      {languages.map(l => (
                        <p key={l.id} style={{ fontSize: 10, color: '#94a3b8', marginBottom: 5 }}>{l.name} — {l.level}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===== MINIMAL TEMPLATE ===== */}
          {!isModern && !isClassic && !isDark && (
            <div style={{ padding: '28px 32px' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20, paddingBottom: 16, borderBottom: `2.5px solid ${accent.bg}` }}>
                {p.photo && (
                  <img src={p.photo} alt="" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                )}
                <div style={{ flex: 1 }}>
                  <h1 style={{ fontSize: 22, fontWeight: 'bold', color: accent.bg, marginBottom: 6 }}>{p.fullName || 'Ism Familiya'}</h1>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: 9.5, color: '#64748b' }}>
                    {p.phone    && <span>📞 {p.phone}</span>}
                    {p.email    && <span>✉️ {p.email}</span>}
                    {p.address  && <span>📍 {p.address}</span>}
                    {p.linkedin && <span>🔗 {p.linkedin}</span>}
                    {p.telegram && <span>💬 {p.telegram}</span>}
                  </div>
                </div>
              </div>

              {p.summary && (
                <div style={{ marginBottom: 16 }}>
                  <p style={sectionHead(accent.bg)}>PROFIL</p>
                  <p style={{ fontSize: 10, lineHeight: 1.7, color: '#374151' }}>{p.summary}</p>
                </div>
              )}

              {workExperience.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <p style={sectionHead(accent.bg)}>ISH TAJRIBASI</p>
                  {workExperience.map(w => (
                    <div key={w.id} style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <p style={{ fontWeight: 600, fontSize: 11 }}>{w.jobTitle}</p>
                        <p style={{ fontSize: 9, color: '#94a3b8', flexShrink: 0, marginLeft: 8 }}>{w.startDate} — {w.current ? 'Hozir' : w.endDate}</p>
                      </div>
                      <p style={{ fontSize: 10, color: accent.bg, marginBottom: 2 }}>{w.company}{w.location ? ` · ${w.location}` : ''}</p>
                      {w.description && <p style={{ fontSize: 9.5, color: '#4b5563', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{w.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {education.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <p style={sectionHead(accent.bg)}>TA'LIM</p>
                  {education.map(e => (
                    <div key={e.id} style={{ marginBottom: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <p style={{ fontWeight: 600, fontSize: 11 }}>{e.degree}</p>
                        <p style={{ fontSize: 9, color: '#94a3b8', flexShrink: 0, marginLeft: 8 }}>{e.startYear} — {e.endYear}</p>
                      </div>
                      <p style={{ fontSize: 10, color: accent.bg }}>{e.university}</p>
                      {e.description && <p style={{ fontSize: 9.5, color: '#64748b', marginTop: 2 }}>{e.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {(skills.technical.length > 0 || skills.soft.length > 0) && (
                  <div>
                    <p style={sectionHead(accent.bg)}>KO'NIKMALAR</p>
                    {[...skills.technical, ...skills.soft].map(s => (
                      <div key={s.id} style={{ marginBottom: 7 }}>
                        <p style={{ fontSize: 10, marginBottom: 2 }}>{s.name}</p>
                        <div style={{ display: 'flex', gap: 2 }}>
                          {[1,2,3,4,5].map(n => (
                            <div key={n} style={{ width: 14, height: 4, borderRadius: 2, backgroundColor: n <= s.level ? accent.bg : '#e2e8f0' }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {languages.length > 0 && (
                  <div>
                    <p style={sectionHead(accent.bg)}>TILLAR</p>
                    {languages.map(l => (
                      <p key={l.id} style={{ fontSize: 10, marginBottom: 5 }}>{l.name} — <span style={{ color: '#64748b' }}>{l.level}</span></p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
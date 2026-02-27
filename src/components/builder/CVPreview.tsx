import { CVData } from '@/types/cv';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';

interface Props {
  data: CVData;
  onBack: () => void;
}

const accentStyles = {
  blue:  { bg: '#2563eb', text: '#ffffff', light: '#eff6ff', mid: '#93c5fd' },
  green: { bg: '#0d9488', text: '#ffffff', light: '#f0fdfa', mid: '#5eead4' },
  black: { bg: '#1e293b', text: '#ffffff', light: '#f1f5f9', mid: '#94a3b8' },
};

const classicHeaderColors = {
  blue:  '#1d4ed8',
  green: '#0f766e',
  black: '#1e293b',
};

export default function CVPreview({ data, onBack }: Props) {
  const cvRef = useRef<HTMLDivElement>(null);
  const accent = accentStyles[data.accentColor];
  const { personalInfo: p, workExperience, education, skills, languages } = data;

  const handleDownload = () => {
    if (!cvRef.current) return;
    html2pdf().set({
      margin: 0,
      filename: `${p.fullName || 'CV'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }).from(cvRef.current).save();
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

  // FIX: text-warning class yo'q edi → inline color
  const scoreColor = score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';

  const isModern  = data.template === 'modern';
  const isClassic = data.template === 'classic';
  const isDark    = data.template === 'dark';

  return (
    <div className="min-h-screen bg-muted">
      {/* Toolbar */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container-narrow flex items-center justify-between px-4 sm:px-6 py-3">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />Tahrirlash
          </Button>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">ATS ball:</span>
              <span className="font-bold" style={{ color: scoreColor }}>{score}%</span>
            </div>
            <Button className="gradient-primary text-primary-foreground" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />PDF yuklash
            </Button>
          </div>
        </div>
      </div>

      {/* CV */}
      <div className="flex justify-center py-8 px-4">
        <div ref={cvRef} className="shadow-xl" style={{
          width: '210mm', minHeight: '297mm',
          fontFamily: `'${data.font}', ${data.font}, sans-serif`,
          color: '#1e293b', fontSize: '11px', lineHeight: '1.5',
          backgroundColor: '#ffffff',
        }}>

          {/* ===== MODERN ===== */}
          {isModern && (
            <div className="flex min-h-[297mm]">
              <div className="w-[70mm] p-6" style={{ backgroundColor: accent.bg, color: accent.text }}>
                {p.photo && (
                  <img src={p.photo} alt="" className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2"
                    style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
                )}
                <h1 className="text-xl font-bold mb-1">{p.fullName || 'Ism Familiya'}</h1>
                <div className="mt-4 space-y-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  <p className="font-semibold text-sm mb-2">Kontakt</p>
                  {p.phone    && <p>📞 {p.phone}</p>}
                  {p.email    && <p>✉️ {p.email}</p>}
                  {p.address  && <p>📍 {p.address}</p>}
                  {p.linkedin && <p>🔗 {p.linkedin}</p>}
                  {p.telegram && <p>💬 {p.telegram}</p>}
                </div>
                {(skills.technical.length > 0 || skills.soft.length > 0) && (
                  <div className="mt-5">
                    <p className="font-semibold text-sm mb-2">Ko'nikmalar</p>
                    {[...skills.technical, ...skills.soft].map(s => (
                      <div key={s.id} className="mb-1.5">
                        <p className="text-xs">{s.name}</p>
                        <div className="flex gap-0.5 mt-0.5">
                          {[1,2,3,4,5].map(n => (
                            <div key={n} className="w-3 h-1 rounded-full"
                              style={{ backgroundColor: n <= s.level ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)' }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {languages.length > 0 && (
                  <div className="mt-5">
                    <p className="font-semibold text-sm mb-2">Tillar</p>
                    {languages.map(l => <p key={l.id} className="text-xs mb-1">{l.name} — {l.level}</p>)}
                  </div>
                )}
              </div>
              <div className="flex-1 p-6">
                {p.summary && (
                  <div className="mb-5">
                    <h2 className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: accent.bg }}>Profil</h2>
                    <p className="text-xs leading-relaxed">{p.summary}</p>
                  </div>
                )}
                {workExperience.length > 0 && (
                  <div className="mb-5">
                    <h2 className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: accent.bg }}>Ish tajribasi</h2>
                    {workExperience.map(w => (
                      <div key={w.id} className="mb-3 pb-3" style={{ borderBottom: `1px solid ${accent.light}` }}>
                        <div className="flex justify-between items-start">
                          <p className="font-semibold text-xs">{w.jobTitle}</p>
                          <p className="text-xs" style={{ color: '#94a3b8' }}>{w.startDate} — {w.current ? 'Hozir' : w.endDate}</p>
                        </div>
                        <p className="text-xs" style={{ color: accent.bg }}>{w.company}{w.location ? `, ${w.location}` : ''}</p>
                        {w.description && <p className="text-xs mt-1 whitespace-pre-line">{w.description}</p>}
                      </div>
                    ))}
                  </div>
                )}
                {education.length > 0 && (
                  <div className="mb-5">
                    <h2 className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: accent.bg }}>Ta'lim</h2>
                    {education.map(e => (
                      <div key={e.id} className="mb-3">
                        <div className="flex justify-between items-start">
                          <p className="font-semibold text-xs">{e.degree}</p>
                          <p className="text-xs" style={{ color: '#94a3b8' }}>{e.startYear} — {e.endYear}</p>
                        </div>
                        <p className="text-xs" style={{ color: accent.bg }}>{e.university}</p>
                        {e.description && <p className="text-xs mt-1">{e.description}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===== CLASSIC ===== */}
          {/* FIX: Classic endi o'z dizaynida */}
          {isClassic && (
            <div>
              <div className="p-6 pb-4" style={{ backgroundColor: classicHeaderColors[data.accentColor] }}>
                <div className="flex items-center gap-4">
                  {p.photo && (
                    <img src={p.photo} alt=""
                      style={{ width: 72, height: 72, borderRadius: 4, objectFit: 'cover', border: '2px solid rgba(255,255,255,0.4)' }} />
                  )}
                  <div>
                    <h1 style={{ fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 4 }}>
                      {p.fullName || 'Ism Familiya'}
                    </h1>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 10, color: 'rgba(255,255,255,0.8)' }}>
                      {p.phone    && <span>📞 {p.phone}</span>}
                      {p.email    && <span>✉️ {p.email}</span>}
                      {p.address  && <span>📍 {p.address}</span>}
                      {p.linkedin && <span>🔗 {p.linkedin}</span>}
                      {p.telegram && <span>💬 {p.telegram}</span>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-5">
                <div style={{ height: 2, background: `linear-gradient(90deg, ${classicHeaderColors[data.accentColor]}, transparent)`, marginBottom: 16 }} />
                {p.summary && (
                  <div className="mb-5">
                    <h2 style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: classicHeaderColors[data.accentColor], marginBottom: 6, borderBottom: `1px solid ${accent.light}`, paddingBottom: 3 }}>Profil</h2>
                    <p className="text-xs leading-relaxed">{p.summary}</p>
                  </div>
                )}
                {workExperience.length > 0 && (
                  <div className="mb-5">
                    <h2 style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: classicHeaderColors[data.accentColor], marginBottom: 6, borderBottom: `1px solid ${accent.light}`, paddingBottom: 3 }}>Ish tajribasi</h2>
                    {workExperience.map(w => (
                      <div key={w.id} className="mb-3">
                        <div className="flex justify-between items-start">
                          <p style={{ fontWeight: 600, fontSize: 11 }}>{w.jobTitle} — <span style={{ color: classicHeaderColors[data.accentColor] }}>{w.company}</span></p>
                          <p style={{ fontSize: 10, color: '#94a3b8', flexShrink: 0, marginLeft: 8 }}>{w.startDate} — {w.current ? 'Hozir' : w.endDate}</p>
                        </div>
                        {w.location && <p style={{ fontSize: 10, color: '#64748b' }}>{w.location}</p>}
                        {w.description && <p style={{ fontSize: 10, marginTop: 3, whiteSpace: 'pre-line', lineHeight: 1.6 }}>{w.description}</p>}
                      </div>
                    ))}
                  </div>
                )}
                {education.length > 0 && (
                  <div className="mb-5">
                    <h2 style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: classicHeaderColors[data.accentColor], marginBottom: 6, borderBottom: `1px solid ${accent.light}`, paddingBottom: 3 }}>Ta'lim</h2>
                    {education.map(e => (
                      <div key={e.id} className="mb-2">
                        <div className="flex justify-between items-start">
                          <p style={{ fontWeight: 600, fontSize: 11 }}>{e.degree} — <span style={{ color: classicHeaderColors[data.accentColor] }}>{e.university}</span></p>
                          <p style={{ fontSize: 10, color: '#94a3b8', flexShrink: 0, marginLeft: 8 }}>{e.startYear} — {e.endYear}</p>
                        </div>
                        {e.description && <p style={{ fontSize: 10, color: '#64748b' }}>{e.description}</p>}
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  {(skills.technical.length > 0 || skills.soft.length > 0) && (
                    <div>
                      <h2 style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: classicHeaderColors[data.accentColor], marginBottom: 6, borderBottom: `1px solid ${accent.light}`, paddingBottom: 3 }}>Ko'nikmalar</h2>
                      {[...skills.technical, ...skills.soft].map(s => (
                        <div key={s.id} style={{ marginBottom: 6 }}>
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
                      <h2 style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: classicHeaderColors[data.accentColor], marginBottom: 6, borderBottom: `1px solid ${accent.light}`, paddingBottom: 3 }}>Tillar</h2>
                      {languages.map(l => <p key={l.id} style={{ fontSize: 10, marginBottom: 4 }}>{l.name} — <span style={{ color: '#64748b' }}>{l.level}</span></p>)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===== DARK ===== */}
          {isDark && (
            <div className="p-8" style={{ backgroundColor: '#0f172a', color: '#f1f5f9', minHeight: '297mm' }}>
              <div style={{ height: 4, background: accent.bg, margin: '-32px -32px 20px -32px' }} />
              <div className="flex items-start gap-5 mb-6 pb-4" style={{ borderBottom: '1px solid #1e293b' }}>
                {p.photo && <img src={p.photo} alt="" style={{ width: 72, height: 72, borderRadius: 8, objectFit: 'cover', border: `2px solid ${accent.bg}` }} />}
                <div className="flex-1">
                  <h1 style={{ fontSize: 22, fontWeight: 'bold', color: '#f8fafc', marginBottom: 4 }}>{p.fullName || 'Ism Familiya'}</h1>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 10, color: '#94a3b8' }}>
                    {p.phone    && <span>📞 {p.phone}</span>}
                    {p.email    && <span>✉️ {p.email}</span>}
                    {p.address  && <span>📍 {p.address}</span>}
                    {p.linkedin && <span>🔗 {p.linkedin}</span>}
                    {p.telegram && <span>💬 {p.telegram}</span>}
                  </div>
                </div>
              </div>
              {p.summary && (
                <div className="mb-5">
                  <h2 style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.12em', color: accent.bg, marginBottom: 6 }}>Profil</h2>
                  <p style={{ fontSize: 10, color: '#cbd5e1', lineHeight: 1.6 }}>{p.summary}</p>
                </div>
              )}
              {workExperience.length > 0 && (
                <div className="mb-5">
                  <h2 style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.12em', color: accent.bg, marginBottom: 6 }}>Ish tajribasi</h2>
                  {workExperience.map(w => (
                    <div key={w.id} style={{ marginBottom: 12, paddingLeft: 12, borderLeft: `3px solid ${accent.bg}` }}>
                      <div className="flex justify-between">
                        <p style={{ fontWeight: 600, fontSize: 11, color: '#e2e8f0' }}>{w.jobTitle}</p>
                        <p style={{ fontSize: 10, color: '#475569' }}>{w.startDate} — {w.current ? 'Hozir' : w.endDate}</p>
                      </div>
                      <p style={{ fontSize: 10, color: accent.mid }}>{w.company}{w.location ? `, ${w.location}` : ''}</p>
                      {w.description && <p style={{ fontSize: 10, color: '#94a3b8', marginTop: 3, whiteSpace: 'pre-line', lineHeight: 1.6 }}>{w.description}</p>}
                    </div>
                  ))}
                </div>
              )}
              {education.length > 0 && (
                <div className="mb-5">
                  <h2 style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.12em', color: accent.bg, marginBottom: 6 }}>Ta'lim</h2>
                  {education.map(e => (
                    <div key={e.id} style={{ marginBottom: 10, paddingLeft: 12, borderLeft: `3px solid ${accent.bg}` }}>
                      <div className="flex justify-between">
                        <p style={{ fontWeight: 600, fontSize: 11, color: '#e2e8f0' }}>{e.degree}</p>
                        <p style={{ fontSize: 10, color: '#475569' }}>{e.startYear} — {e.endYear}</p>
                      </div>
                      <p style={{ fontSize: 10, color: accent.mid }}>{e.university}</p>
                      {e.description && <p style={{ fontSize: 10, color: '#94a3b8' }}>{e.description}</p>}
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {(skills.technical.length > 0 || skills.soft.length > 0) && (
                  <div>
                    <h2 style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.12em', color: accent.bg, marginBottom: 6 }}>Ko'nikmalar</h2>
                    {[...skills.technical, ...skills.soft].map(s => (
                      <div key={s.id} style={{ marginBottom: 6 }}>
                        <p style={{ fontSize: 10, color: '#cbd5e1', marginBottom: 2 }}>{s.name}</p>
                        <div style={{ display: 'flex', gap: 2 }}>
                          {[1,2,3,4,5].map(n => <div key={n} style={{ width: 14, height: 4, borderRadius: 2, backgroundColor: n <= s.level ? accent.bg : '#1e293b' }} />)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {languages.length > 0 && (
                  <div>
                    <h2 style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.12em', color: accent.bg, marginBottom: 6 }}>Tillar</h2>
                    {languages.map(l => <p key={l.id} style={{ fontSize: 10, color: '#94a3b8', marginBottom: 4 }}>{l.name} — {l.level}</p>)}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===== MINIMAL ===== */}
          {!isModern && !isClassic && !isDark && (
            <div className="p-8">
              <div className="flex items-start gap-5 mb-6 pb-5" style={{ borderBottom: `2px solid ${accent.bg}` }}>
                {p.photo && <img src={p.photo} alt="" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover' }} />}
                <div className="flex-1">
                  <h1 style={{ fontSize: 22, fontWeight: 'bold', color: accent.bg, marginBottom: 6 }}>{p.fullName || 'Ism Familiya'}</h1>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: 10, color: '#64748b' }}>
                    {p.phone    && <span>📞 {p.phone}</span>}
                    {p.email    && <span>✉️ {p.email}</span>}
                    {p.address  && <span>📍 {p.address}</span>}
                    {p.linkedin && <span>🔗 {p.linkedin}</span>}
                    {p.telegram && <span>💬 {p.telegram}</span>}
                  </div>
                </div>
              </div>
              {p.summary && (
                <div className="mb-5">
                  <h2 style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: accent.bg, marginBottom: 4 }}>Profil</h2>
                  <p style={{ fontSize: 10, lineHeight: 1.6, color: '#374151' }}>{p.summary}</p>
                </div>
              )}
              {workExperience.length > 0 && (
                <div className="mb-5">
                  <h2 style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: accent.bg, marginBottom: 4 }}>Ish tajribasi</h2>
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 8 }}>
                    {workExperience.map(w => (
                      <div key={w.id} style={{ marginBottom: 12 }}>
                        <div className="flex justify-between items-start">
                          <p style={{ fontWeight: 600, fontSize: 11 }}>{w.jobTitle}</p>
                          <p style={{ fontSize: 10, color: '#94a3b8', flexShrink: 0, marginLeft: 8 }}>{w.startDate} — {w.current ? 'Hozir' : w.endDate}</p>
                        </div>
                        <p style={{ fontSize: 10, color: accent.bg }}>{w.company}{w.location ? `, ${w.location}` : ''}</p>
                        {w.description && <p style={{ fontSize: 10, marginTop: 3, whiteSpace: 'pre-line', lineHeight: 1.6, color: '#374151' }}>{w.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {education.length > 0 && (
                <div className="mb-5">
                  <h2 style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: accent.bg, marginBottom: 4 }}>Ta'lim</h2>
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 8 }}>
                    {education.map(e => (
                      <div key={e.id} style={{ marginBottom: 10 }}>
                        <div className="flex justify-between items-start">
                          <p style={{ fontWeight: 600, fontSize: 11 }}>{e.degree}</p>
                          <p style={{ fontSize: 10, color: '#94a3b8', flexShrink: 0, marginLeft: 8 }}>{e.startYear} — {e.endYear}</p>
                        </div>
                        <p style={{ fontSize: 10, color: accent.bg }}>{e.university}</p>
                        {e.description && <p style={{ fontSize: 10, color: '#64748b' }}>{e.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {(skills.technical.length > 0 || skills.soft.length > 0) && (
                  <div>
                    <h2 style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: accent.bg, marginBottom: 6 }}>Ko'nikmalar</h2>
                    {[...skills.technical, ...skills.soft].map(s => (
                      <div key={s.id} style={{ marginBottom: 6 }}>
                        <p style={{ fontSize: 10 }}>{s.name}</p>
                        <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>
                          {[1,2,3,4,5].map(n => <div key={n} style={{ width: 14, height: 4, borderRadius: 2, backgroundColor: n <= s.level ? accent.bg : '#e2e8f0' }} />)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {languages.length > 0 && (
                  <div>
                    <h2 style={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: accent.bg, marginBottom: 6 }}>Tillar</h2>
                    {languages.map(l => <p key={l.id} style={{ fontSize: 10, marginBottom: 4 }}>{l.name} — {l.level}</p>)}
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
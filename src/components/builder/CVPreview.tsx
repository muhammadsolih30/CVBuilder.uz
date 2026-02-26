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
  blue: { bg: '#2563eb', text: '#ffffff', light: '#eff6ff' },
  green: { bg: '#0d9488', text: '#ffffff', light: '#f0fdfa' },
  black: { bg: '#1e293b', text: '#ffffff', light: '#f1f5f9' },
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
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }).from(cvRef.current).save();
  };

  // ATS Score
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

  const isModern = data.template === 'modern';

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
              <span className={`font-bold ${score >= 70 ? 'text-accent' : score >= 40 ? 'text-warning' : 'text-destructive'}`}>
                {score}%
              </span>
            </div>
            <Button className="gradient-primary text-primary-foreground" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />PDF yuklash
            </Button>
          </div>
        </div>
      </div>

      {/* CV Render */}
      <div className="flex justify-center py-8 px-4">
        <div
          ref={cvRef}
          className="bg-white shadow-xl"
          style={{ width: '210mm', minHeight: '297mm', fontFamily: `${data.font}, sans-serif`, color: '#1e293b', fontSize: '11px', lineHeight: '1.5' }}
        >
          {isModern ? (
            /* MODERN template with sidebar */
            <div className="flex min-h-[297mm]">
              {/* Sidebar */}
              <div className="w-[70mm] p-6" style={{ backgroundColor: accent.bg, color: accent.text }}>
                {p.photo && (
                  <img src={p.photo} alt="" className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2" style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
                )}
                <h1 className="text-xl font-bold mb-1">{p.fullName || 'Ism Familiya'}</h1>
                
                {/* Contact */}
                <div className="mt-4 space-y-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  <p className="font-semibold text-sm" style={{ color: accent.text }}>Kontakt</p>
                  {p.phone && <p>📞 {p.phone}</p>}
                  {p.email && <p>✉️ {p.email}</p>}
                  {p.address && <p>📍 {p.address}</p>}
                  {p.linkedin && <p>🔗 {p.linkedin}</p>}
                  {p.telegram && <p>💬 {p.telegram}</p>}
                </div>

                {/* Skills */}
                {(skills.technical.length > 0 || skills.soft.length > 0) && (
                  <div className="mt-5">
                    <p className="font-semibold text-sm mb-2" style={{ color: accent.text }}>Ko'nikmalar</p>
                    {[...skills.technical, ...skills.soft].map(s => (
                      <div key={s.id} className="mb-1.5">
                        <p className="text-xs">{s.name}</p>
                        <div className="flex gap-0.5 mt-0.5">
                          {[1,2,3,4,5].map(n => (
                            <div key={n} className="w-3 h-1 rounded-full" style={{ backgroundColor: n <= s.level ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)' }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Languages */}
                {languages.length > 0 && (
                  <div className="mt-5">
                    <p className="font-semibold text-sm mb-2" style={{ color: accent.text }}>Tillar</p>
                    {languages.map(l => (
                      <p key={l.id} className="text-xs mb-1">{l.name} — {l.level}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Main content */}
              <div className="flex-1 p-6">
                {p.summary && (
                  <div className="mb-5">
                    <h2 className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: accent.bg }}>Profil</h2>
                    <p className="text-xs">{p.summary}</p>
                  </div>
                )}

                {workExperience.length > 0 && (
                  <div className="mb-5">
                    <h2 className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: accent.bg }}>Ish tajribasi</h2>
                    {workExperience.map(w => (
                      <div key={w.id} className="mb-3">
                        <div className="flex justify-between">
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
                        <div className="flex justify-between">
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
          ) : (
            /* MINIMAL / CLASSIC / DARK templates */
            <div className="p-8" style={data.template === 'dark' ? { backgroundColor: '#1e293b', color: '#f1f5f9' } : {}}>
              {/* Header */}
              <div className="flex items-start gap-5 mb-6 pb-4" style={{ borderBottom: `2px solid ${data.template === 'dark' ? '#334155' : accent.bg}` }}>
                {p.photo && (
                  <img src={p.photo} alt="" className="w-20 h-20 rounded-full object-cover" />
                )}
                <div className="flex-1">
                  <h1 className="text-2xl font-bold" style={{ color: data.template === 'dark' ? '#f1f5f9' : accent.bg }}>
                    {p.fullName || 'Ism Familiya'}
                  </h1>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs" style={{ color: data.template === 'dark' ? '#94a3b8' : '#64748b' }}>
                    {p.phone && <span>📞 {p.phone}</span>}
                    {p.email && <span>✉️ {p.email}</span>}
                    {p.address && <span>📍 {p.address}</span>}
                    {p.telegram && <span>💬 {p.telegram}</span>}
                  </div>
                </div>
              </div>

              {/* Summary */}
              {p.summary && (
                <div className="mb-5">
                  <h2 className="text-sm font-bold mb-1.5 uppercase tracking-wider" style={{ color: data.template === 'dark' ? '#94a3b8' : accent.bg }}>Profil</h2>
                  <p className="text-xs">{p.summary}</p>
                </div>
              )}

              {/* Work Experience */}
              {workExperience.length > 0 && (
                <div className="mb-5">
                  <h2 className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: data.template === 'dark' ? '#94a3b8' : accent.bg }}>Ish tajribasi</h2>
                  {workExperience.map(w => (
                    <div key={w.id} className="mb-3">
                      <div className="flex justify-between">
                        <p className="font-semibold text-xs">{w.jobTitle}</p>
                        <p className="text-xs" style={{ color: data.template === 'dark' ? '#64748b' : '#94a3b8' }}>{w.startDate} — {w.current ? 'Hozir' : w.endDate}</p>
                      </div>
                      <p className="text-xs" style={{ color: data.template === 'dark' ? '#60a5fa' : accent.bg }}>{w.company}{w.location ? `, ${w.location}` : ''}</p>
                      {w.description && <p className="text-xs mt-1 whitespace-pre-line">{w.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div className="mb-5">
                  <h2 className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: data.template === 'dark' ? '#94a3b8' : accent.bg }}>Ta'lim</h2>
                  {education.map(e => (
                    <div key={e.id} className="mb-3">
                      <div className="flex justify-between">
                        <p className="font-semibold text-xs">{e.degree}</p>
                        <p className="text-xs" style={{ color: data.template === 'dark' ? '#64748b' : '#94a3b8' }}>{e.startYear} — {e.endYear}</p>
                      </div>
                      <p className="text-xs" style={{ color: data.template === 'dark' ? '#60a5fa' : accent.bg }}>{e.university}</p>
                      {e.description && <p className="text-xs mt-1">{e.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Skills & Languages row */}
              <div className="grid grid-cols-2 gap-6">
                {(skills.technical.length > 0 || skills.soft.length > 0) && (
                  <div>
                    <h2 className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: data.template === 'dark' ? '#94a3b8' : accent.bg }}>Ko'nikmalar</h2>
                    {[...skills.technical, ...skills.soft].map(s => (
                      <div key={s.id} className="mb-1.5">
                        <div className="flex justify-between text-xs">
                          <span>{s.name}</span>
                        </div>
                        <div className="flex gap-0.5 mt-0.5">
                          {[1,2,3,4,5].map(n => (
                            <div key={n} className="w-4 h-1 rounded-full" style={{ backgroundColor: n <= s.level ? accent.bg : (data.template === 'dark' ? '#334155' : '#e2e8f0') }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {languages.length > 0 && (
                  <div>
                    <h2 className="text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: data.template === 'dark' ? '#94a3b8' : accent.bg }}>Tillar</h2>
                    {languages.map(l => (
                      <p key={l.id} className="text-xs mb-1">{l.name} — {l.level}</p>
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

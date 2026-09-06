import React from 'react';
import { Certificate } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Award, ExternalLink } from 'lucide-react';

interface Props {
  data: Certificate[];
  onChange: (data: Certificate[]) => void;
}

export default function StepCertificates({ data = [], onChange }: Props) {
  const add = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        title: '',
        issuer: '',
        date: '',
        link: '',
      },
    ]);
  };

  const update = (id: string, field: string, value: string) => {
    onChange(data.map(item => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const remove = (id: string) => onChange(data.filter(item => item.id !== id));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Sertifikatlar & Kurslar</h2>
          <p className="text-muted-foreground">
            Olingan xalqaro va mahalliy sertifikatlar, professional kurslar
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary font-medium rounded-full">
          Ixtiyoriy
        </span>
      </div>

      {data.length === 0 && (
        <div className="glass-card p-8 text-center border-dashed">
          <Award className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground mb-4">Hali sertifikat qo'shilmagan</p>
          <Button onClick={add}>
            <Plus className="w-4 h-4 mr-2" />
            Sertifikat qo'shish
          </Button>
        </div>
      )}

      {data.map((item, i) => (
        <div key={item.id} className="glass-card p-5 space-y-4 relative">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
              {item.title || `Sertifikat #${i + 1}`}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => remove(item.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block text-xs">Sertifikat / Kurs nomi</Label>
              <Input
                value={item.title}
                onChange={e => update(item.id, 'title', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-xs">Bergan tashkilot</Label>
              <Input
                value={item.issuer}
                onChange={e => update(item.id, 'issuer', e.target.value)}
                placeholder="Amazon Web Services / Coursera"
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-xs">Olingan yili / vaqti</Label>
              <Input
                value={item.date || ''}
                onChange={e => update(item.id, 'date', e.target.value)}
                placeholder="2023"
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-xs flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
                Sertifikat havolasi (ID / Link)
              </Label>
              <Input
                value={item.link || ''}
                onChange={e => update(item.id, 'link', e.target.value)}
                placeholder="https://coursera.org/verify/..."
              />
            </div>
          </div>
        </div>
      ))}

      {data.length > 0 && (
        <Button variant="outline" onClick={add} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Yana sertifikat qo'shish
        </Button>
      )}
    </div>
  );
}

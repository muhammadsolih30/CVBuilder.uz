import { CVData, TemplateType, AccentColor } from '@/types/cv';
import { Label } from '@/components/ui/label';

interface Props {
  data: CVData;
  onChange: (field: string, value: any) => void;
}

const templates: { key: TemplateType; name: string; desc: string }[] = [
  { key: 'minimal', name: 'Minimal', desc: 'Toza va sodda' },
  { key: 'modern', name: 'Modern', desc: 'Yon panel bilan' },
  { key: 'classic', name: 'Classic', desc: 'An\'anaviy uslub' },
  { key: 'dark', name: 'Dark Pro', desc: 'Professional qora' },
];

const colors: { key: AccentColor; label: string; cls: string }[] = [
  { key: 'blue', label: 'Ko\'k', cls: 'bg-primary' },
  { key: 'green', label: 'Yashil', cls: 'bg-accent' },
  { key: 'black', label: 'Qora', cls: 'bg-foreground' },
];

export default function StepTemplate({ data, onChange }: Props) {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-1">Dizayn tanlang</h2>
        <p className="text-muted-foreground">CV shabloni va rangini tanlang</p>
      </div>

      {/* Templates */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Shablon</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {templates.map(t => (
            <button
              key={t.key}
              onClick={() => onChange('template', t.key)}
              className={`glass-card p-3 text-center transition-all ${
                data.template === t.key ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
              }`}
            >
              <div className="aspect-[3/4] bg-muted rounded-lg mb-2 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">{t.name}</span>
              </div>
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <Label className="text-base font-semibold mb-3 block">Rang</Label>
        <div className="flex gap-3">
          {colors.map(c => (
            <button
              key={c.key}
              onClick={() => onChange('accentColor', c.key)}
              className={`w-12 h-12 rounded-full ${c.cls} transition-all ${
                data.accentColor === c.key ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'hover:scale-105'
              }`}
              title={c.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

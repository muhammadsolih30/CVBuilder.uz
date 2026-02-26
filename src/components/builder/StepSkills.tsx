import { Skill } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  data: { technical: Skill[]; soft: Skill[] };
  onChange: (data: { technical: Skill[]; soft: Skill[] }) => void;
}

function SkillSection({ title, skills, onAdd, onUpdate, onRemove }: {
  title: string; skills: Skill[];
  onAdd: () => void; onUpdate: (id: string, f: string, v: any) => void; onRemove: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">{title}</Label>
        <Button variant="ghost" size="sm" onClick={onAdd}><Plus className="w-4 h-4 mr-1" />Qo'shish</Button>
      </div>
      {skills.map(skill => (
        <div key={skill.id} className="flex items-center gap-3">
          <Input
            value={skill.name}
            onChange={e => onUpdate(skill.id, 'name', e.target.value)}
            placeholder="Ko'nikma nomi"
            className="flex-1"
          />
          <div className="w-32 flex items-center gap-2">
            <Slider
              value={[skill.level]}
              onValueChange={([v]) => onUpdate(skill.id, 'level', v)}
              min={1} max={5} step={1}
            />
            <span className="text-xs text-muted-foreground w-4">{skill.level}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onRemove(skill.id)}>
            <Trash2 className="w-3.5 h-3.5 text-destructive" />
          </Button>
        </div>
      ))}
      {skills.length === 0 && <p className="text-sm text-muted-foreground">Hali qo'shilmagan</p>}
    </div>
  );
}

export default function StepSkills({ data, onChange }: Props) {
  const addSkill = (type: 'technical' | 'soft') => {
    onChange({ ...data, [type]: [...data[type], { id: crypto.randomUUID(), name: '', level: 3 }] });
  };

  const updateSkill = (type: 'technical' | 'soft', id: string, field: string, value: any) => {
    onChange({ ...data, [type]: data[type].map(s => s.id === id ? { ...s, [field]: value } : s) });
  };

  const removeSkill = (type: 'technical' | 'soft', id: string) => {
    onChange({ ...data, [type]: data[type].filter(s => s.id !== id) });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Ko'nikmalar</h2>
        <p className="text-muted-foreground">Texnik va shaxsiy ko'nikmalaringiz</p>
      </div>
      <div className="glass-card p-5">
        <SkillSection title="Texnik ko'nikmalar" skills={data.technical}
          onAdd={() => addSkill('technical')}
          onUpdate={(id, f, v) => updateSkill('technical', id, f, v)}
          onRemove={id => removeSkill('technical', id)}
        />
      </div>
      <div className="glass-card p-5">
        <SkillSection title="Shaxsiy ko'nikmalar" skills={data.soft}
          onAdd={() => addSkill('soft')}
          onUpdate={(id, f, v) => updateSkill('soft', id, f, v)}
          onRemove={id => removeSkill('soft', id)}
        />
      </div>
    </div>
  );
}

import { Education } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function StepEducation({ data, onChange }: Props) {
  const add = () => {
    onChange([...data, { id: crypto.randomUUID(), degree: '', university: '', startYear: '', endYear: '', description: '' }]);
  };

  const update = (id: string, field: string, value: string) => {
    onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const remove = (id: string) => onChange(data.filter(item => item.id !== id));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Ta'lim</h2>
        <p className="text-muted-foreground">Ta'lim ma'lumotlaringizni kiriting</p>
      </div>

      {data.length === 0 && (
        <div className="glass-card p-8 text-center">
          <p className="text-muted-foreground mb-4">Hali ta'lim qo'shilmagan</p>
          <Button onClick={add}><Plus className="w-4 h-4 mr-2" />Qo'shish</Button>
        </div>
      )}

      {data.map((item, i) => (
        <div key={item.id} className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Ta'lim #{i + 1}</h3>
            <Button variant="ghost" size="sm" onClick={() => remove(item.id)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block">Daraja / Mutaxassislik</Label>
              <Input value={item.degree} onChange={e => update(item.id, 'degree', e.target.value)} placeholder="Bakalavr, IT" />
            </div>
            <div>
              <Label className="mb-1.5 block">Universitet</Label>
              <Input value={item.university} onChange={e => update(item.id, 'university', e.target.value)} placeholder="Toshkent Davlat Universiteti" />
            </div>
            <div>
              <Label className="mb-1.5 block">Boshlanish yili</Label>
              <Input value={item.startYear} onChange={e => update(item.id, 'startYear', e.target.value)} placeholder="2020" />
            </div>
            <div>
              <Label className="mb-1.5 block">Tugash yili</Label>
              <Input value={item.endYear} onChange={e => update(item.id, 'endYear', e.target.value)} placeholder="2024" />
            </div>
          </div>
          <div>
            <Label className="mb-1.5 block">Qo'shimcha</Label>
            <Textarea value={item.description} onChange={e => update(item.id, 'description', e.target.value)} placeholder="GPA, yutuqlar..." rows={2} />
          </div>
        </div>
      ))}

      {data.length > 0 && (
        <Button variant="outline" onClick={add} className="w-full">
          <Plus className="w-4 h-4 mr-2" />Yana qo'shish
        </Button>
      )}
    </div>
  );
}

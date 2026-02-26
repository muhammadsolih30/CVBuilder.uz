import { WorkExperience } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export default function StepWorkExperience({ data, onChange }: Props) {
  const add = () => {
    onChange([...data, {
      id: crypto.randomUUID(),
      jobTitle: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '',
    }]);
  };

  const update = (id: string, field: string, value: any) => {
    onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const remove = (id: string) => onChange(data.filter(item => item.id !== id));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Ish tajribasi</h2>
        <p className="text-muted-foreground">Oxirgi ish joyingizdan boshlang</p>
      </div>

      {data.length === 0 && (
        <div className="glass-card p-8 text-center">
          <p className="text-muted-foreground mb-4">Hali ish tajribasi qo'shilmagan</p>
          <Button onClick={add}><Plus className="w-4 h-4 mr-2" />Qo'shish</Button>
        </div>
      )}

      {data.map((item, i) => (
        <div key={item.id} className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Ish tajribasi #{i + 1}</h3>
            <Button variant="ghost" size="sm" onClick={() => remove(item.id)}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1.5 block">Lavozim</Label>
              <Input value={item.jobTitle} onChange={e => update(item.id, 'jobTitle', e.target.value)} placeholder="Marketing menejer" />
            </div>
            <div>
              <Label className="mb-1.5 block">Kompaniya</Label>
              <Input value={item.company} onChange={e => update(item.id, 'company', e.target.value)} placeholder="Kompaniya nomi" />
            </div>
            <div>
              <Label className="mb-1.5 block">Joylashuv</Label>
              <Input value={item.location} onChange={e => update(item.id, 'location', e.target.value)} placeholder="Toshkent" />
            </div>
            <div className="flex items-end">
              <div className="flex items-center gap-2">
                <Checkbox checked={item.current} onCheckedChange={v => update(item.id, 'current', v)} />
                <span className="text-sm">Hozirda ishlayapman</span>
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block">Boshlanish</Label>
              <Input type="month" value={item.startDate} onChange={e => update(item.id, 'startDate', e.target.value)} />
            </div>
            {!item.current && (
              <div>
                <Label className="mb-1.5 block">Tugash</Label>
                <Input type="month" value={item.endDate} onChange={e => update(item.id, 'endDate', e.target.value)} />
              </div>
            )}
          </div>
          <div>
            <Label className="mb-1.5 block">Tavsif</Label>
            <Textarea
              value={item.description}
              onChange={e => update(item.id, 'description', e.target.value)}
              placeholder="• Asosiy vazifalar va yutuqlaringiz..."
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              💡 HR tavsiyasi: Natija bilan yozing (masalan: "Savdoni 20% oshirdim")
            </p>
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

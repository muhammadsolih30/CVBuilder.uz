import { Language } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

const LEVELS: Language['level'][] = ["Boshlang'ich", "O'rta", "Yaxshi", "Mukammal", "Ona tili"];

interface Props {
  data: Language[];
  onChange: (data: Language[]) => void;
}

export default function StepLanguages({ data, onChange }: Props) {
  const add = () => {
    onChange([...data, { id: crypto.randomUUID(), name: '', level: "O'rta" }]);
  };

  const update = (id: string, field: string, value: string) => {
    onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const remove = (id: string) => onChange(data.filter(item => item.id !== id));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Tillar</h2>
        <p className="text-muted-foreground">Bilgan tillaringizni kiriting</p>
      </div>

      {data.length === 0 && (
        <div className="glass-card p-8 text-center">
          <p className="text-muted-foreground mb-4">Hali til qo'shilmagan</p>
          <Button onClick={add}><Plus className="w-4 h-4 mr-2" />Qo'shish</Button>
        </div>
      )}

      {data.map(item => (
        <div key={item.id} className="glass-card p-4 flex items-center gap-4">
          <div className="flex-1">
            <Label className="mb-1.5 block text-sm">Til</Label>
            <Input value={item.name} onChange={e => update(item.id, 'name', e.target.value)} placeholder="O'zbek tili" />
          </div>
          <div className="w-40">
            <Label className="mb-1.5 block text-sm">Daraja</Label>
            <Select value={item.level} onValueChange={v => update(item.id, 'level', v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button variant="ghost" size="sm" className="mt-5" onClick={() => remove(item.id)}>
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
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

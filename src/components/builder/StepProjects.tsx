import React from 'react';
import { Project } from '@/types/cv';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Globe, FolderGit2 } from 'lucide-react';

interface Props {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export default function StepProjects({ data = [], onChange }: Props) {
  const add = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        title: '',
        role: '',
        link: '',
        startDate: '',
        endDate: '',
        description: '',
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
          <h2 className="text-2xl font-bold mb-1">Loyihalar & Portfolio</h2>
          <p className="text-muted-foreground">
            Bajarilgan amaliy loyihalar, veb-saytlar yoki ilovalaringiz
          </p>
        </div>
        <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary font-medium rounded-full">
          Ixtiyoriy
        </span>
      </div>

      {data.length === 0 && (
        <div className="glass-card p-8 text-center border-dashed">
          <FolderGit2 className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground mb-4">Hali loyihalar qo'shilmagan</p>
          <Button onClick={add}>
            <Plus className="w-4 h-4 mr-2" />
            Loyiha qo'shish
          </Button>
        </div>
      )}

      {data.map((item, i) => (
        <div key={item.id} className="glass-card p-5 space-y-4 relative">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
              {item.title || `Loyiha #${i + 1}`}
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
              <Label className="mb-1.5 block text-xs">Loyiha nomi</Label>
              <Input
                value={item.title}
                onChange={e => update(item.id, 'title', e.target.value)}
                placeholder="E-commerce mobil ilova"
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-xs">Sizning rolingiz</Label>
              <Input
                value={item.role || ''}
                onChange={e => update(item.id, 'role', e.target.value)}
                placeholder="Lead Developer / UI Designer"
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="mb-1.5 block text-xs flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                Loyiha havolasi (Sayt / GitHub)
              </Label>
              <Input
                value={item.link || ''}
                onChange={e => update(item.id, 'link', e.target.value)}
                placeholder="https://example.com yoki github.com/user/repo"
              />
            </div>
          </div>

          <div>
            <Label className="mb-1.5 block text-xs">Loyiha tavsifi va natijalar</Label>
            <Textarea
              value={item.description}
              onChange={e => update(item.id, 'description', e.target.value)}
              placeholder="• Qaysi texnologiyalar ishlatildi, qanday muammo yechildi va qanday natijaga erishildi..."
              rows={3}
            />
          </div>
        </div>
      ))}

      {data.length > 0 && (
        <Button variant="outline" onClick={add} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Yana loyiha qo'shish
        </Button>
      )}
    </div>
  );
}

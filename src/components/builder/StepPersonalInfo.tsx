import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Send,
  X,
  Briefcase,
} from "lucide-react";

interface Props {
  data: {
    fullName: string;
    jobTitle: string;
    phone: string;
    email: string;
    address: string;
    linkedin: string;
    telegram: string;
    photo: string | null;
    summary: string;
  };
  onChange: (field: string, value: string | null) => void;
}

const fields = [
  {
    key: "fullName",
    label: "To'liq ism",
    icon: User,
    placeholder: "Alisher Navoiy",
    required: true,
    span: true,
  },
  {
    key: "jobTitle",
    label: "Lavozim / Kasb",
    icon: Briefcase,
    placeholder: "Frontend dasturchi",
    required: false,
    span: true,
  },
  {
    key: "phone",
    label: "Telefon",
    icon: Phone,
    placeholder: "+998 90 123 45 67",
  },
  {
    key: "email",
    label: "Email",
    icon: Mail,
    placeholder: "email@example.com",
  },
  {
    key: "address",
    label: "Manzil",
    icon: MapPin,
    placeholder: "Toshkent, O'zbekiston",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    placeholder: "linkedin.com/in/username",
  },
  { key: "telegram", label: "Telegram", icon: Send, placeholder: "@username" },
];

export default function StepPersonalInfo({ data, onChange }: Props) {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Rasm hajmi 5MB dan oshmasligi kerak");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange("photo", reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Shaxsiy ma'lumotlar</h2>
        <p className="text-muted-foreground">
          Asosiy kontakt ma'lumotlaringizni kiriting
        </p>
      </div>

      {/* Photo */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <label className="cursor-pointer group">
            <div className="w-20 h-20 rounded-full bg-muted border-2 border-dashed border-border group-hover:border-primary transition-colors flex items-center justify-center overflow-hidden">
              {data.photo ? (
                <img
                  src={data.photo}
                  alt="Rasm"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </label>
          {data.photo && (
            <button
              onClick={() => onChange("photo", null)}
              className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors shadow-sm"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
        <div>
          <p className="font-medium">Profil rasmi</p>
          <p className="text-sm text-muted-foreground">
            Ixtiyoriy • JPG, PNG • Max 5MB
          </p>
          {data.photo && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-destructive hover:text-destructive px-0 h-auto mt-1"
              onClick={() => onChange("photo", null)}
            >
              O'chirish
            </Button>
          )}
        </div>
      </div>

      {/* Fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.key} className={f.span ? "sm:col-span-2" : ""}>
            <Label className="flex items-center gap-1.5 mb-1.5">
              <f.icon className="w-3.5 h-3.5 text-muted-foreground" />
              {f.label}
              {f.required && <span className="text-destructive">*</span>}
            </Label>
            <Input
              value={(data as Record<string, string>)[f.key] || ""}
              onChange={(e) => onChange(f.key, e.target.value)}
              placeholder={f.placeholder}
            />
          </div>
        ))}
      </div>

      {/* Summary */}
      <div>
        <Label className="mb-1.5 block">Professional xulosa</Label>
        <Textarea
          value={data.summary}
          onChange={(e) => onChange("summary", e.target.value)}
          placeholder="O'zingiz haqingizda qisqacha yozing..."
          rows={4}
        />
        <p className="text-xs text-muted-foreground mt-1">
          💡 HR tavsiyasi: Natijalaringizni raqamlar bilan yozing (masalan:
          "Savdoni 30% oshirdim")
        </p>
      </div>
    </div>
  );
}

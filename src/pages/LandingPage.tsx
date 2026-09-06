import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Sparkles,
  Download,
  CheckCircle,
  Globe,
  Zap,
  Star,
  Users,
  Shield,
  Clock,
  ArrowRight,
  Search,
  Check,
  Award,
  ChevronDown,
  Layout,
  Layers,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ALL_CATALOG_TEMPLATES, CATEGORIES } from "@/data/templatesCatalog";
import SmartRecommenderModal from "@/components/builder/SmartRecommenderModal";
import { TemplatePreview } from "@/components/builder/StepTemplate";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// ─── SEO Head hook ─────────────────────────────────────────
function useSEO() {
  useEffect(() => {
    document.title =
      "CVBuilder.uz — 1000+ Bepul Online CV Shablonlari | Professional Resume";

    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(
        `meta[${attr}="${name}"]`,
      ) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta(
      "description",
      "O'zbekistondagi eng ilg'or bepul CV yaratish platformasi. 1000+ zamonaviy shablon, ATS-friendly formatlar, real-vaqtda jonli tahrirlash, PDF va DOCX yuklab olish.",
    );
    setMeta(
      "keywords",
      "cv yaratish, resume yaratish, cv shablon, 1000 cv shablon, online cv, bepul cv, o'zbek cv, rezyume yaratish, ats cv, professional resume",
    );
    setMeta("og:title", "CVBuilder.uz — 1000+ Bepul Online CV Shablonlari", true);
    setMeta(
      "og:description",
      "5 daqiqada professional CV yozing. 1000+ zamonaviy shablon, PDF va Word yuklab oling. 100% bepul!",
      true,
    );
    setMeta("og:url", "https://cvbuilder.uz/", true);
  }, []);
}

// ─── Statik Ma'lumotlar ────────────────────────────────────
const steps = [
  {
    icon: FileText,
    title: "Ma'lumot kiriting",
    desc: "Ism, telefon, email va tajribangizni kiriting. Smart yordamchi tavsiyalaridan foydalaning.",
    step: "01",
  },
  {
    icon: Sparkles,
    title: "1000+ Shablon tanlang",
    desc: "Sohangizga mos, ATS filtrlardan 100% o'tuvchi minglab dizaynlardan eng yaxshisini tanlang.",
    step: "02",
  },
  {
    icon: Download,
    title: "Bir zumda yuklab oling",
    desc: "PDF, DOCX (Word), PNG, JPG yoki SVG formatida yuqori sifatda bepul yuklab oling.",
    step: "03",
  },
];

const features = [
  {
    icon: CheckCircle,
    title: "100% ATS-Friendly formatlar",
    desc: "Barcha xalqaro va yirik kompaniyalar Applicant Tracking System tizimiga to'liq mos tuzilma.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Layers,
    title: "1000+ Professional Shablonlar",
    desc: "IT, marketing, dizayn, moliya va boshqaruv sohalari uchun maxsus moslashtirilgan zamonaviy dizaynlar.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Sparkles,
    title: "Jonli Split-Screen Tahrirlash",
    desc: "Ma'lumot kiritayotganingizda, o'ng tomonda A4 varaqdagi o'zgarishlar real-vaqtda ko'rinadi.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Globe,
    title: "Ko'p tilli qo'llab-quvvatlash",
    desc: "O'zbek, Rus va Ingliz tillarida CV tayyorlang. Mahalliy va xorijiy kompaniyalar uchun mos.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Shield,
    title: "100% Xavfsiz va Maxfiy",
    desc: "Ma'lumotlaringiz begona serverlarga yuborilmaydi. Faqat sizning brauzeringizda saqlanadi.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Download,
    title: "Barcha Mashhur Formatlar",
    desc: "PDF, Word (DOCX), PNG, JPG va SVG fayl sifatida bir bosish bilan eksport qiling.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

const comparisonData = [
  { feature: "ATS skaneridan 100% o'tish", cvbuilder: true, word: false, canva: false },
  { feature: "1000+ Professional shablonlar", cvbuilder: true, word: false, canva: true },
  { feature: "Real-vaqtda jonli A4 ko'rinish", cvbuilder: true, word: false, canva: true },
  { feature: "O'zbek tili va sohalariga moslik", cvbuilder: true, word: false, canva: false },
  { feature: "Tayyor PDF va DOCX eksport", cvbuilder: true, word: true, canva: false },
  { feature: "100% Bepul, ro'yxatdan o'tishsiz", cvbuilder: true, word: false, canva: false },
];

const faqs = [
  {
    q: "CVBuilder.uz haqiqatan ham bepulmi?",
    a: "Ha, platformadan foydalanish, barcha 1000+ shablonlar va PDF/DOCX eksporti 100% bepul. Hech qanday yashirin to'lov yoki obuna talab qilinmaydi.",
  },
  {
    q: "1000+ shablonlar orasidan qanday qilib o'zimga mosini tanlayman?",
    a: "Bizning 'Aqlli Shablon Tanlash' yordamchimiz bor! Sohangiz (IT, Dizayn, Savdo, Moliya) va tajribangizni tanlasangiz, algoritm eng mos shablonlarni chiqarib beradi.",
  },
  {
    q: "ATS nima va bu shablonlar unga qanday moslashtirilgan?",
    a: "ATS (Applicant Tracking System) — kompaniyalar nomzodlarning CV larini o'qish uchun ishlatadigan dastur. Shablonlarimiz to'g'ri matn ierarxiyasi va tuzilmasiga ega bo'lib, skanerlashda hech qanday ma'lumot yo'qolmaydi.",
  },
  {
    q: "Kiritilgan ma'lumotlarim saqlanib qoladimi?",
    a: "Ha! Barcha ma'lumotlaringiz brauzeringizning xavfsiz xotirasida (localStorage) avtomatik saqlanadi. Shuningdek, 'Zaxira' tugmasi orqali o'z CV faylingizni kompyuteringizga saqlab olishingiz mumkin.",
  },
  {
    q: "Mobil telefonda ham CV yaratsa bo'ladimi?",
    a: "Albatta! Sayt barcha smartfon va planshetlar ekraniga to'liq moslashgan.",
  },
];

const testimonials = [
  {
    name: "Sanjar Qodirov",
    role: "Senior Backend Developer",
    company: "Fintech Startup",
    text: "IT shablonlari va loyihalar bo'limi juda ajoyib ishlangan. CV imni yangilab, chet el kompaniyasiga topshirdim va 3 kun ichida interviewga chaqirishdi!",
    rating: 5,
  },
  {
    name: "Dilnoza Rahimova",
    role: "Product Designer",
    company: "Marketing Agency",
    text: "Kreativ shablonlar sifati meni hayron qoldirdi. Jonli split-screen ko'rinishi sababli har bir shrift va rangni o'zimga moslab oldim. Rahmat!",
    rating: 5,
  },
  {
    name: "Alisher Ergashev",
    role: "Bosh Buxgalter",
    company: "Savdo Xoldingi",
    text: "Word da soatlab jadvallarni to'g'rilab o'tirardim. Bu yerda 7 daqiqada professional korporativ CV tayyor bo'ldi. Sifatiga gap yo'q.",
    rating: 5,
  },
];

const stats = [
  { value: "50,000+", label: "Yaratilgan CV lar" },
  { value: "1,000+", label: "Zamonaviy Shablon" },
  { value: "99%", label: "ATS Moslik Darajasi" },
  { value: "4.9 / 5", label: "Foydalanuvchilar Bahosi" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  useSEO();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [catalogSearch, setCatalogSearch] = useState("");
  const [isRecommenderOpen, setIsRecommenderOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredCatalog = useMemo(() => {
    return ALL_CATALOG_TEMPLATES.filter((t) => {
      const matchCat =
        selectedCategory === "all" || t.category === selectedCategory;
      const matchSearch =
        catalogSearch === "" ||
        t.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
        t.description.toLowerCase().includes(catalogSearch.toLowerCase());
      return matchCat && matchSearch;
    }).slice(0, 12);
  }, [selectedCategory, catalogSearch]);

  const handleStartWithTemplate = (templateId: string) => {
    // Tanlangan shablonni localStorage ga yozish
    try {
      const saved = localStorage.getItem("cv-builder-data");
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.template = templateId;
        localStorage.setItem("cv-builder-data", JSON.stringify(parsed));
      }
    } catch {}
    navigate("/builder");
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Smart Tavsiya Modali */}
      <SmartRecommenderModal
        isOpen={isRecommenderOpen}
        onClose={() => setIsRecommenderOpen(false)}
        onSelectTemplate={handleStartWithTemplate}
        currentTemplateId="t001"
      />

      {/* ─── Navbar ──────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-card/85 backdrop-blur-md border-b border-border shadow-sm">
        <nav
          className="container-narrow flex items-center justify-between h-16 px-4 sm:px-6 max-w-6xl mx-auto"
          aria-label="Asosiy navigatsiya"
        >
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight">
                CVBuilder<span className="text-primary">.uz</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                1000+ Shablon
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#templates" className="hover:text-foreground transition-colors">
              Shablonlar
            </a>
            <a href="#features" className="hover:text-foreground transition-colors">
              Imkoniyatlar
            </a>
            <a href="#comparison" className="hover:text-foreground transition-colors">
              Taqqoslash
            </a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">
              Fikrlar
            </a>
            <a href="#faq" className="hover:text-foreground transition-colors">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRecommenderOpen(true)}
              className="text-xs h-9 hidden sm:flex items-center gap-1.5 border-primary/30 text-primary hover:bg-primary/5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Tanlash</span>
            </Button>

            <Button
              onClick={() => navigate("/builder")}
              size="sm"
              className="gradient-primary text-white h-9 px-4 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <span>CV Yaratish</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
            
            <div className="flex items-center gap-1 ml-2 border-l border-border pl-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ─── Hero Sektsiya ──────────────────────────────── */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 px-4">
          {/* Orqa fon nur effekti */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-6 border border-primary/20 shadow-sm">
                <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" style={{ animationDuration: '4s' }} />
                <span>1000+ Professional Shablonlar • 100% Bepul • ATS 99%</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.12] tracking-tight mb-6 text-foreground">
                {t('hero.title')}
              </h1>

              <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                {t('hero.description')}
              </p>

              {/* Asosiy tugmalar guruhi */}
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center mb-12 max-w-lg mx-auto">
                <Button
                  size="lg"
                  className="gradient-primary text-white text-base h-13 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all font-bold group"
                  onClick={() => navigate("/builder")}
                >
                  <span>{t('hero.cta')}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="text-base h-13 px-6 rounded-xl border-2 hover:bg-muted font-semibold gap-2"
                  onClick={() => setIsRecommenderOpen(true)}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Sohamga mos shablon topish</span>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs sm:text-sm text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> 100% Bepul
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Ro'yxatdan o'tmasdan
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> ATS-friendly 99%
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> PDF & Word (DOCX)
                </span>
              </div>
            </motion.div>

            {/* Statistika ko'rsatkichlari */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass-card p-4 sm:p-5 text-center border hover:border-primary/40 transition-colors"
                >
                  <p className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── 1000+ Shablonlar Vitrinasi ─────────────────── */}
        <section id="templates" className="py-20 px-4 bg-muted/20 border-y border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Katalog & Vitrina
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight">
                1000+ Professional Shablonlar
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl mx-auto">
                Barcha sohalar uchun maxsus ishlab chiqilgan, xalqaro standartlarga mos dizaynlar
              </p>
            </div>

            {/* Qidiruv va Toifa filtrlari */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Kategoriya tablari */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
                  {CATEGORIES.map((cat) => {
                    const isActive = selectedCategory === cat.key;
                    return (
                      <button
                        key={cat.key}
                        onClick={() => setSelectedCategory(cat.key)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Qidiruv input */}
                <div className="w-full sm:w-64 flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-1.5">
                  <Search className="w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Shablon qidirish..."
                    className="bg-transparent text-xs sm:text-sm outline-none w-full placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Shablon kartalari gridi */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredCatalog.map((item) => (
                <div
                  key={item.id}
                  className="glass-card overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col justify-between border"
                >
                  <div className="p-3 bg-muted/40 aspect-[3/4] relative overflow-hidden flex items-center justify-center">
                    {/* Badge */}
                    {item.badge && (
                      <span className="absolute top-2.5 left-2.5 z-10 text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground shadow">
                        {item.badge}
                      </span>
                    )}

                    {/* Haqiqiy dizaynli SVG maket */}
                    <div className="w-full h-full rounded-lg overflow-hidden shadow-sm border border-gray-100 group-hover:scale-[1.03] transition-transform duration-300 bg-white">
                      <TemplatePreview tKey={item.id} accent="#2563eb" />
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2">
                    <div>
                      <h4 className="font-bold text-sm text-foreground truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {item.description}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      className="w-full text-xs h-8 gradient-primary text-white font-medium"
                      onClick={() => handleStartWithTemplate(item.id)}
                    >
                      Shu shablon bilan boshlash
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/builder")}
                className="font-semibold text-sm h-11 px-8 rounded-xl border-2"
              >
                <span>Barcha 1000+ shablonlarni ko'rish</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* ─── Qanday ishlaydi? ───────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Oddiy va Tezkor
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight">
                Qanday ishlaydi?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2">
                Atigi 3 ta bosqichda tayyor professional rezyumega ega bo'ling
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="glass-card p-6 text-center relative border hover:border-primary/40 transition-all group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 gradient-primary rounded-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform text-white">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-extrabold text-primary mb-2 tracking-widest">
                    BOSQICH {step.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Imkoniyatlar (Features) ─────────────────────── */}
        <section id="features" className="py-20 px-4 bg-muted/20 border-y border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Afzalliklar
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight">
                Nima uchun aynan CVBuilder.uz?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl mx-auto">
                Oddiy matn muharrirlaridan farqli ravishda, platformamiz sizni suhbatga chaqirilish imkoniyatingizni oshiradi
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="glass-card p-6 border hover:border-primary/40 transition-all space-y-3"
                >
                  <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center ${f.color}`}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-foreground">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Taqqoslash Jadvali (Comparison) ─────────────── */}
        <section id="comparison" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Taqqoslash
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight">
                CVBuilder.uz va Boshqa Usullar
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2">
                Nima uchun minglab nomzodlar Word yoki Canva o'rniga CVBuilder.uz ni tanlaydi?
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <th className="p-4">Xususiyat</th>
                      <th className="p-4 text-center text-primary font-extrabold">CVBuilder.uz</th>
                      <th className="p-4 text-center">MS Word</th>
                      <th className="p-4 text-center">Oddiy Canva</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {comparisonData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-muted/10 transition-colors">
                        <td className="p-4 font-medium text-foreground">{item.feature}</td>
                        <td className="p-4 text-center">
                          <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                        </td>
                        <td className="p-4 text-center">
                          {item.word ? (
                            <CheckCircle className="w-4 h-4 text-muted-foreground mx-auto" />
                          ) : (
                            <span className="text-muted-foreground text-xs font-bold">—</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {item.canva ? (
                            <CheckCircle className="w-4 h-4 text-muted-foreground mx-auto" />
                          ) : (
                            <span className="text-muted-foreground text-xs font-bold">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Foydalanuvchilar Fikrlari ──────────────────── */}
        <section id="testimonials" className="py-20 px-4 bg-muted/20 border-y border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Haqiqiy Natijalar
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight">
                Foydalanuvchilar Nima Deydi?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2">
                O'zbekiston bo'ylab muvaffaqiyatli ishga joylashgan mutaxassislar fikrlari
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="glass-card p-6 border flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center gap-1 mb-3 text-amber-500">
                      {[...Array(t.rating)].map((_, r) => (
                        <Star key={r} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/90 italic leading-relaxed mb-4">
                      "{t.text}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full gradient-primary text-white flex items-center justify-center font-bold text-xs">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-foreground">{t.name}</p>
                      <p className="text-[11px] text-muted-foreground">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ────────────────────────────────────────── */}
        <section id="faq" className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Savol-Javob
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight">
                Tez-tez Beriladigan Savollar
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="glass-card border rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Yakuniy CTA Banner ─────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto rounded-3xl gradient-primary p-8 sm:p-14 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Karyerangizdagi yangi bosqichni bugun boshlang
              </h2>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed">
                5 daqiqa vaqtingizni ajrating va 1000+ zamonaviy shablonlar bilan professional CV yarating.
                100% bepul va ro'yxatdan o'tishsiz!
              </p>
              <div className="pt-2">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 text-base font-bold h-13 px-8 rounded-xl shadow-xl hover:scale-105 transition-all"
                  onClick={() => navigate("/builder")}
                >
                  🚀 Bepul CV Yaratish
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-border py-12 px-4 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base">
                CVBuilder<span className="text-primary">.uz</span>
              </span>
            </a>

            <div className="flex flex-wrap gap-6 text-xs sm:text-sm text-muted-foreground font-medium">
              <a href="#templates" className="hover:text-foreground transition-colors">
                Shablonlar (1000+)
              </a>
              <a href="#features" className="hover:text-foreground transition-colors">
                Imkoniyatlar
              </a>
              <a href="#comparison" className="hover:text-foreground transition-colors">
                Taqqoslash
              </a>
              <a href="#faq" className="hover:text-foreground transition-colors">
                FAQ
              </a>
              <a href="/builder" className="hover:text-foreground transition-colors">
                CV Yaratish
              </a>
            </div>
          </div>

          <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground space-y-2">
            <p className="max-w-3xl mx-auto leading-relaxed">
              CVBuilder.uz — O'zbekistondagi 1000+ professional shablonga ega bepul online CV platformasi.
              ATS standartlariga mos, PDF va Word formatida yuklab olish. Barcha huquqlar himoyalangan.
            </p>
            <p>© 2026 CVBuilder.uz</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { motion } from "framer-motion";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// ─── SEO Head hook ─────────────────────────────────────────
function useSEO() {
  useEffect(() => {
    // Title
    document.title =
      "CVBuilder.uz — Bepul Online CV Yaratish | Professional Resume";

    // Meta tags helper
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
      "O'zbekistondagi eng yaxshi bepul CV yaratish sayti. 5 daqiqada professional CV yozing, PDF yuklab oling. Ro'yxatdan o'tmasdan, 100+ shablon, ATS-friendly!",
    );
    setMeta(
      "keywords",
      "cv yaratish, resume yaratish, cv shablon, online cv, bepul cv, o'zbek cv, rezyume yaratish, ish uchun cv, professional cv, pdf cv, ats cv",
    );
    setMeta("og:title", "CVBuilder.uz — Bepul Online CV Yaratish", true);
    setMeta(
      "og:description",
      "5 daqiqada professional CV yozing. 100+ shablon, PDF/DOCX yuklab oling. Bepul!",
      true,
    );
    setMeta("og:url", "https://cvbuilder.uz/", true);
    setMeta("og:image", "https://cvbuilder.uz/og-image.jpg", true);
    setMeta("twitter:title", "CVBuilder.uz — Bepul Online CV Yaratish");
    setMeta("twitter:description", "5 daqiqada professional CV yozing. Bepul!");

    // Canonical
    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://cvbuilder.uz/";
  }, []);
}

// ─── Data ──────────────────────────────────────────────────
const steps = [
  {
    icon: FileText,
    title: "Ma'lumot kiriting",
    desc: "Ism, telefon, email va ish tajribangiznii kiriting. Faqat 3 daqiqa ketadi.",
    step: "01",
  },
  {
    icon: Sparkles,
    title: "Dizayn tanlang",
    desc: "100+ professional shablondan o'zingizga mos dizaynni tanlang.",
    step: "02",
  },
  {
    icon: Download,
    title: "Yuklab oling",
    desc: "PDF, DOCX, PNG yoki SVG formatida bir bosish bilan yuklab oling.",
    step: "03",
  },
];

const features = [
  {
    icon: CheckCircle,
    title: "ATS-friendly formatlar",
    desc: "Barcha yirik kompaniyalar Applicant Tracking System tizimiga 100% mos CV shablonlar.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Globe,
    title: "O'zbek, Rus, Ingliz tilida",
    desc: "CV ni istalgan tilda tayyorlang. Xalqaro ish o'rinlari uchun ham mos.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Zap,
    title: "5 daqiqada tayyor",
    desc: "Murakkab tahrirlovchi dasturlarni o'rganishga vaqt yo'qotmang. Tez va qulay.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: Shield,
    title: "Ma'lumotlar xavfsiz",
    desc: "Sizning ma'lumotlaringiz faqat brauzeringizda saqlanadi. Server ga yuborilmaydi.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Download,
    title: "7 xil format",
    desc: "PDF, DOCX, PNG, JPG, SVG formatida yuklab oling yoki link orqali ulashing.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    icon: Users,
    title: "10,000+ foydalanuvchi",
    desc: "O'zbekiston bo'ylab minglab odamlar CVBuilder.uz orqali ish topdi.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
];

const faqs = [
  {
    q: "CVBuilder.uz bepulmi?",
    a: "Ha, to'liq bepul. Ro'yxatdan o'tmasdan ham CV yaratib, barcha formatlarda yuklab olishingiz mumkin.",
  },
  {
    q: "CV qancha vaqtda tayyorlanadi?",
    a: "Odatda 5 daqiqa ichida professional CV tayyor bo'ladi. Ma'lumotlaringizni kiriting, shablon tanlang va yuklab oling.",
  },
  {
    q: "Qanday formatlarda yuklab olsa bo'ladi?",
    a: "PDF, DOCX (Word), PNG, JPG, SVG formatlarida yuklab olish mumkin. Shuningdek print va link orqali ulashish ham mavjud.",
  },
  {
    q: "ATS nima va nega muhim?",
    a: "ATS (Applicant Tracking System) — kompaniyalar CV lar filtrlash uchun ishlatiladigan dastur. CVBuilder.uz shablonlari to'liq ATS mos, ya'ni CV ingiz HR ga yetib boradi.",
  },
  {
    q: "CV ni keyinroq tahrirlash mumkinmi?",
    a: "Ha, CV ma'lumotlaringiz brauzeringizda saqlanadi. Istalgan vaqtda qaytib kelib tahrirlashingiz mumkin.",
  },
];

const testimonials = [
  {
    name: "Jasur Toshmatov",
    role: "Frontend Developer",
    text: "CVBuilder.uz orqali 10 daqiqada professional CV yaratdim. Ertasi kuni intervyuga taklif oldim!",
    rating: 5,
  },
  {
    name: "Nilufar Yusupova",
    role: "Marketing Mutaxassisi",
    text: "Juda qulay va chiroyli shablonlar. PDF sifati ajoyib. Do'stlarimga ham maslahat berdim.",
    rating: 5,
  },
  {
    name: "Bobur Rahimov",
    role: "Muhandis",
    text: "Oldin Word da CV yozardim. Endi CVBuilder.uz dan foydalanaman. Vaqt va kuch tejaldi.",
    rating: 5,
  },
];

const stats = [
  { value: "10,000+", label: "Yaratilgan CV lar" },
  { value: "100+", label: "Professional shablon" },
  { value: "5 min", label: "O'rtacha vaqt" },
  { value: "4.9★", label: "Foydalanuvchi bahosi" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  useSEO();

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Navbar ──────────────────────────────────────── */}
      <header>
        <nav
          className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border"
          aria-label="Asosiy navigatsiya"
        >
          <div className="container-narrow flex items-center justify-between h-16 px-4 sm:px-6 max-w-6xl mx-auto">
            <a
              href="/"
              className="flex items-center gap-2"
              aria-label="CVBuilder.uz bosh sahifa"
            >
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center bg-green-600">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                CVBuilder<span className="text-green-600">.uz</span>
              </span>
            </a>
            <div className="flex items-center gap-3">
              <a
                href="#faq"
                className="text-sm text-muted-foreground hover:text-foreground hidden sm:block transition-colors"
              >
                Savollar
              </a>
              <Button
                onClick={() => navigate("/builder")}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                CV Yaratish — Bepul
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ─── Hero ──────────────────────────────────────── */}
        <section className="py-16 sm:py-24 px-4" aria-labelledby="hero-heading">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-6 border border-green-100">
                <Sparkles className="w-4 h-4" />
                <span>Bepul • Ro'yxatdan o'tmasdan • 5 daqiqada</span>
              </div>

              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-foreground"
              >
                Online CV Yaratish —{" "}
                <span className="text-green-600">Bepul va Tez</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                O'zbekistondagi eng qulay <strong>CV yaratish sayti</strong>.
                100+ professional shablon, ATS-friendly formatlar, PDF va DOCX
                yuklash. Ro'yxatdan o'tmasdan bepul foydalaning!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg"
                  onClick={() => navigate("/builder")}
                  aria-label="CV yaratishni boshlash"
                >
                  🚀 CV Yaratishni Boshlash
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-xl"
                  onClick={() =>
                    document
                      .getElementById("templates")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Shablonlarni Ko'rish
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                {[
                  "✅ To'liq bepul",
                  "🔒 Ma'lumotlar xavfsiz",
                  "⚡ 5 daqiqada tayyor",
                  "📄 PDF, DOCX, PNG",
                ].map((badge) => (
                  <span key={badge} className="font-medium">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-card border border-border rounded-xl p-4"
                >
                  <p className="text-2xl font-extrabold text-green-600">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CV preview mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12"
              aria-hidden="true"
            >
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto shadow-xl">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { bg: "bg-green-500", sidebar: false },
                    { bg: "bg-blue-600", sidebar: true },
                    { bg: "bg-slate-800", sidebar: false },
                  ].map((cv, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg overflow-hidden aspect-[3/4] flex flex-col shadow-sm border border-gray-100"
                    >
                      <div
                        className={`${cv.bg} h-14 flex items-center px-2 gap-2`}
                      >
                        <div className="w-7 h-7 rounded-full bg-white/30" />
                        <div className="flex-1">
                          <div className="h-1.5 bg-white/60 rounded mb-1 w-3/4" />
                          <div className="h-1 bg-white/40 rounded w-1/2" />
                        </div>
                      </div>
                      <div className="flex-1 p-2 space-y-1.5">
                        <div className="h-1.5 bg-gray-200 rounded w-1/3" />
                        <div className="h-1 bg-gray-100 rounded w-full" />
                        <div className="h-1 bg-gray-100 rounded w-4/5" />
                        <div className="h-1.5 bg-gray-200 rounded w-1/3 mt-2" />
                        <div className="h-1 bg-gray-100 rounded w-full" />
                        <div className="h-1 bg-gray-100 rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  100+ professional CV shablonlardan birini tanlang
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── How it Works ──────────────────────────────── */}
        <section
          className="py-16 bg-slate-50 px-4"
          aria-labelledby="how-heading"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="how-heading"
                className="text-3xl sm:text-4xl font-bold mb-4"
              >
                Qanday ishlaydi?
              </h2>
              <p className="text-muted-foreground text-lg">
                3 ta oddiy qadam bilan professional CV yarating
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center relative"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4 shadow-lg">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-xs font-bold text-green-600 mb-2 tracking-widest">
                    QADAM {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Templates ─────────────────────────────────── */}
        <section
          id="templates"
          className="py-16 px-4"
          aria-labelledby="templates-heading"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="templates-heading"
                className="text-3xl sm:text-4xl font-bold mb-4"
              >
                Professional CV Shablonlar
              </h2>
              <p className="text-muted-foreground text-lg">
                HR mutaxassislari tomonidan tavsiya etilgan, ATS-friendly
                dizaynlar
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { name: "Minimal", color: "bg-slate-700", accent: "#64748b" },
                { name: "Modern", color: "bg-green-600", accent: "#16a34a" },
                { name: "Classic", color: "bg-blue-700", accent: "#1d4ed8" },
                { name: "Dark Pro", color: "bg-gray-900", accent: "#374151" },
              ].map((t, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group text-left"
                  onClick={() => navigate("/builder")}
                  aria-label={`${t.name} CV shabloni — bosing va yarating`}
                >
                  <div className="aspect-[3/4] bg-white p-3 flex flex-col">
                    <div
                      className={`${t.color} rounded-lg p-2 mb-2 flex items-center gap-1.5`}
                    >
                      <div className="w-5 h-5 rounded-full bg-white/30" />
                      <div className="flex-1">
                        <div className="h-1 bg-white/60 rounded mb-1" />
                        <div className="h-0.5 bg-white/40 rounded w-2/3" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="h-1 bg-gray-200 rounded w-2/3" />
                      <div className="h-0.5 bg-gray-100 rounded" />
                      <div className="h-0.5 bg-gray-100 rounded w-4/5" />
                      <div className="h-1 bg-gray-200 rounded w-2/3 mt-1.5" />
                      <div className="h-0.5 bg-gray-100 rounded" />
                      <div className="h-0.5 bg-gray-100 rounded w-3/4" />
                    </div>
                  </div>
                  <div className="px-3 py-2 border-t border-border">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-green-600 font-medium">
                      Bepul ✓
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button
                size="lg"
                onClick={() => navigate("/builder")}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Barcha 100+ shablonni ko'rish
              </Button>
            </div>
          </div>
        </section>

        {/* ─── Features ──────────────────────────────────── */}
        <section
          className="py-16 bg-slate-50 px-4"
          aria-labelledby="features-heading"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="features-heading"
                className="text-3xl sm:text-4xl font-bold mb-4"
              >
                Nega CVBuilder.uz?
              </h2>
              <p className="text-muted-foreground text-lg">
                O'zbekistondagi eng yaxshi CV yaratish xizmatini tanlang
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <f.icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Testimonials ──────────────────────────────── */}
        <section className="py-16 px-4" aria-labelledby="reviews-heading">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="reviews-heading" className="text-3xl font-bold mb-4">
                Foydalanuvchilar fikri
              </h2>
              <p className="text-muted-foreground">
                10,000+ dan ortiq foydalanuvchi bizga ishonadi
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6"
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  <div
                    className="flex gap-0.5 mb-3"
                    aria-label={`${t.rating} yulduz`}
                  >
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p
                    className="text-sm text-muted-foreground mb-4 leading-relaxed"
                    itemProp="reviewBody"
                  >
                    "{t.text}"
                  </p>
                  <div itemScope itemType="https://schema.org/Person">
                    <p className="font-semibold text-sm" itemProp="name">
                      {t.name}
                    </p>
                    <p
                      className="text-xs text-muted-foreground"
                      itemProp="jobTitle"
                    >
                      {t.role}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ───────────────────────────────────────── */}
        <section
          id="faq"
          className="py-16 bg-slate-50 px-4"
          aria-labelledby="faq-heading"
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="faq-heading" className="text-3xl font-bold mb-4">
                Ko'p so'raladigan savollar
              </h2>
              <p className="text-muted-foreground">
                CVBuilder.uz haqida qisqacha javoblar
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-xl overflow-hidden group"
                >
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-sm hover:bg-slate-50 transition-colors list-none">
                    <span>{faq.q}</span>
                    <span className="text-green-600 text-xl font-light ml-4 flex-shrink-0">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ───────────────────────────────────────── */}
        <section className="py-16 px-4" aria-labelledby="cta-heading">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-green-600 rounded-2xl p-10 sm:p-14 text-center text-white"
            >
              <h2
                id="cta-heading"
                className="text-3xl sm:text-4xl font-bold mb-4"
              >
                Hoziroq Boshlang!
              </h2>
              <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
                Professional CV yarating va orzuingizdagi ishga ega bo'ling.
                Bepul, tez, oson.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-6 rounded-xl bg-white text-green-700 hover:bg-green-50 font-bold shadow-lg"
                onClick={() => navigate("/builder")}
              >
                ✨ CV Yaratish — Bepul
              </Button>
              <p className="text-green-200 text-sm mt-4">
                Ro'yxatdan o'tmasdan • Kredit karta kerak emas
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ─── Footer ────────────────────────────────────── */}
      <footer className="border-t border-border py-10 px-4" aria-label="Footer">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <a
              href="/"
              className="flex items-center gap-2"
              aria-label="CVBuilder.uz"
            >
              <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold">
                CVBuilder<span className="text-green-600">.uz</span>
              </span>
            </a>
            <nav aria-label="Footer navigatsiya">
              <ul className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <li>
                  <a
                    href="/"
                    className="hover:text-foreground transition-colors"
                  >
                    Bosh sahifa
                  </a>
                </li>
                <li>
                  <a
                    href="/builder"
                    className="hover:text-foreground transition-colors"
                  >
                    CV Yaratish
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="hover:text-foreground transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#templates"
                    className="hover:text-foreground transition-colors"
                  >
                    Shablonlar
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* SEO keywords as natural text */}
          <div className="border-t border-border pt-6 text-center">
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto mb-3 leading-relaxed">
              CVBuilder.uz — O'zbekistondagi eng yaxshi bepul online CV yaratish
              platformasi. Professional resume shablonlar, ATS-friendly
              formatlar, PDF va DOCX yuklab olish. O'zbek, Rus va Ingliz
              tillarida CV yozing.
            </p>
            <p className="text-xs text-muted-foreground">
              © 2026 CVBuilder.uz — Barcha huquqlar himoyalangan
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

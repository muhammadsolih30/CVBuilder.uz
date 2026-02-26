import { motion } from 'framer-motion';
import { FileText, Sparkles, Download, CheckCircle, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const steps = [
  { icon: FileText, title: "Ma'lumot kiriting", desc: "Shaxsiy ma'lumotlaringizni kiriting" },
  { icon: Sparkles, title: "Dizayn tanlang", desc: "Professional shablonlardan birini tanlang" },
  { icon: Download, title: "PDF yuklab oling", desc: "Tayyor CV ni bir bosishda yuklab oling" },
];

const features = [
  { icon: CheckCircle, title: "ATS-friendly", desc: "Barcha kompaniyalar tizimiga mos" },
  { icon: Globe, title: "O'zbek tiliga mos", desc: "O'zbek va ingliz tillarida" },
  { icon: Zap, title: "5 daqiqada tayyor", desc: "Tez va qulay interfeys" },
];

const templates = [
  { name: 'Minimal', style: 'minimal' as const, color: 'bg-card' },
  { name: 'Modern', style: 'modern' as const, color: 'bg-primary/5' },
  { name: 'Classic', style: 'classic' as const, color: 'bg-secondary' },
  { name: 'Dark Pro', style: 'dark' as const, color: 'bg-foreground/5' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container-narrow flex items-center justify-between h-16 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">CVBuilder<span className="text-gradient">.uz</span></span>
          </div>
          <Button onClick={() => navigate('/builder')} size="sm">
            CV yaratish
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Bepul • Ro'yxatdan o'tmasdan
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              5 daqiqada professional
              <br />
              <span className="text-gradient">CV yarating</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Ro'yxatdan o'tmasdan, bepul yuklab oling. ATS-friendly shablonlar bilan ish beruvchilarni hayratda qoldiring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow" onClick={() => navigate('/builder')}>
                CV yaratishni boshlash
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl" onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}>
                Shablonlarni ko'rish
              </Button>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="glass-card p-6 sm:p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {/* Fake CV preview cards */}
                <div className="bg-card border border-border rounded-lg p-4 aspect-[3/4] flex flex-col">
                  <div className="w-12 h-12 rounded-full bg-primary/20 mb-3" />
                  <div className="h-3 bg-foreground/10 rounded mb-2 w-3/4" />
                  <div className="h-2 bg-foreground/5 rounded mb-1.5 w-full" />
                  <div className="h-2 bg-foreground/5 rounded mb-1.5 w-5/6" />
                  <div className="h-2 bg-foreground/5 rounded mb-3 w-4/6" />
                  <div className="h-2 bg-primary/20 rounded mb-1.5 w-full" />
                  <div className="h-2 bg-foreground/5 rounded mb-1.5 w-full" />
                  <div className="h-2 bg-foreground/5 rounded w-3/4" />
                  <div className="flex-1" />
                  <div className="h-2 bg-foreground/5 rounded w-1/2" />
                </div>
                <div className="bg-card border border-border rounded-lg overflow-hidden aspect-[3/4] flex">
                  <div className="w-1/3 bg-primary/10 p-3 flex flex-col gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20" />
                    <div className="h-2 bg-primary/15 rounded w-full" />
                    <div className="h-2 bg-primary/15 rounded w-3/4" />
                    <div className="h-2 bg-primary/15 rounded w-5/6" />
                  </div>
                  <div className="flex-1 p-3 flex flex-col gap-2">
                    <div className="h-3 bg-foreground/10 rounded w-3/4" />
                    <div className="h-2 bg-foreground/5 rounded w-full" />
                    <div className="h-2 bg-foreground/5 rounded w-5/6" />
                    <div className="h-2 bg-foreground/5 rounded w-4/6" />
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 aspect-[3/4] flex flex-col">
                  <div className="h-4 bg-foreground/10 rounded mb-1 w-2/3" />
                  <div className="h-2 bg-foreground/5 rounded mb-3 w-1/2" />
                  <div className="h-px bg-border mb-3" />
                  <div className="h-2 bg-accent/20 rounded mb-2 w-1/3" />
                  <div className="h-2 bg-foreground/5 rounded mb-1.5 w-full" />
                  <div className="h-2 bg-foreground/5 rounded mb-1.5 w-5/6" />
                  <div className="h-2 bg-foreground/5 rounded mb-3 w-4/6" />
                  <div className="h-2 bg-accent/20 rounded mb-2 w-1/3" />
                  <div className="h-2 bg-foreground/5 rounded mb-1.5 w-full" />
                  <div className="h-2 bg-foreground/5 rounded w-3/4" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section-padding bg-secondary/50">
        <div className="container-narrow px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Qanday ishlaydi?</h2>
            <p className="text-muted-foreground text-lg">3 oddiy qadam bilan professional CV yarating</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Qadam {i + 1}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="section-padding">
        <div className="container-narrow px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Professional shablonlar</h2>
            <p className="text-muted-foreground text-lg">HR mutaxassislari tomonidan tavsiya etilgan dizaynlar</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card-hover cursor-pointer group"
                onClick={() => navigate('/builder')}
              >
                <div className={`aspect-[3/4] ${t.color} rounded-t-xl flex items-center justify-center`}>
                  <div className="w-3/4 h-5/6 bg-card rounded-lg shadow-sm p-3 flex flex-col gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-primary/15" />
                    <div className="h-2 bg-foreground/10 rounded w-2/3" />
                    <div className="h-1.5 bg-foreground/5 rounded w-full" />
                    <div className="h-1.5 bg-foreground/5 rounded w-4/5" />
                    <div className="flex-1" />
                    <div className="h-1.5 bg-foreground/5 rounded w-1/2" />
                  </div>
                </div>
                <div className="p-4 text-center">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">Bepul</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-secondary/50">
        <div className="container-narrow px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Nega aynan biz?</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <f.icon className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card gradient-primary p-10 sm:p-14 rounded-2xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Hoziroq boshlang!
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Professional CV yarating va orzuingizdagi ishga ega bo'ling
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 rounded-xl"
              onClick={() => navigate('/builder')}
            >
              CV yaratish — Bepul
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container-narrow px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 gradient-primary rounded flex items-center justify-center">
              <FileText className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm">CVBuilder.uz</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Barcha huquqlar himoyalangan</p>
        </div>
      </footer>
    </div>
  );
}

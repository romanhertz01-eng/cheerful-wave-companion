
import { useParams, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Play, Heart, Eye, ZoomIn, Scissors, Wand2, Package, Eraser, RefreshCw, Brush, type LucideIcon } from "lucide-react";
import { ModelGlyph } from "@/components/ui/era/ModelGlyph";
import { getToolPageData } from "@/data/toolPages";
import { FAQ, toolPageItems } from "@/components/shared/FAQ";
import { Footer } from "@/components/shared/Footer";
import { ToolWorkspace } from "@/components/tool/ToolWorkspace";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const imageTools: { Icon: LucideIcon; label: string }[] = [
  { Icon: ZoomIn,    label: "Масштабирование изображений" },
  { Icon: Scissors,  label: "Удаление фона" },
  { Icon: Wand2,     label: "Генерация волос с ИИ" },
  { Icon: Package,   label: "Распаковать изображения" },
  { Icon: Eraser,    label: "Удалить объект" },
  { Icon: RefreshCw, label: "Фото-Обмен лицами" },
  { Icon: Brush,     label: "ИИ Ластик" },
];



const communityWorks = [
  { author: "Алексей", image: "/community/01.jpg", likes: 234, views: 1200 },
  { author: "Мария",   image: "/community/02.jpg", likes: 187, views: 890 },
  { author: "Дмитрий", image: "/community/03.jpg", likes: 312, views: 1500 },
  { author: "Анна",    image: "/community/04.jpg", likes: 156, views: 720 },
  { author: "Иван",    image: "/community/05.jpg", likes: 278, views: 1100 },
  { author: "Ольга",   image: "/community/06.jpg", likes: 198, views: 950 },
  { author: "Сергей",  image: "/community/07.jpg", likes: 342, views: 1800 },
  { author: "Елена",   image: "/community/08.jpg", likes: 145, views: 670 },
];

const modelCards = [
  { name: "Seedream 5.0 Lite", badge: "NEW", desc: "Поиск в интернете в реальном времени...", image: "/models/01.jpg" },
  { name: "Google Nano Banana 2", badge: "NEW", desc: "Более быстрое создание высококачественных из...", image: "/models/02.jpg" },
  { name: "Grok Imagine", desc: "Проработанные персонажи и смелая стилизация...", image: "/models/03.jpg" },
  { name: "Kling V3 Omni", badge: "NEW", desc: "Высококачественные изображения с безупречной...", image: "/models/04.jpg" },
  { name: "Kling 3.0", badge: "NEW", desc: "Целостные раскадровки с ультрадетализирован...", image: "/models/05.jpg" },
  { name: "GPT Image 1.5", desc: "Безупречная проработка персонажей, освещение...", image: "/models/06.jpg" },
  { name: "Google Nano Banana Pro", desc: "Самая сильная модель, когда-либо созданная...", image: "/models/01.jpg" },
  { name: "Google Nano Banana", desc: "Усовершенствованный рендеринг текста и пейзаж...", image: "/models/02.jpg" },
  { name: "Kling 01", desc: "Привязка к нескольким изображениям и расшир...", image: "/models/03.jpg" },
];

const ToolPage = () => {
  const { slug } = useParams({ strict: false }) as { slug?: string };
  const data = slug ? getToolPageData(slug) : undefined;

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4">
        <h1 className="text-3xl font-bold">Модель не найдена</h1>
        <p className="text-muted-foreground">Запрашиваемая модель не существует в каталоге</p>
        <Link to="/" className="px-6 py-3 rounded-button gradient-accent text-white font-semibold hover:opacity-90 transition-opacity">
          На главную
        </Link>
      </div>
    );
  }

  const targetPage = data.category === "video" ? "/video" : data.category === "audio" ? "/audio" : "/design";

  return (
    <div className="min-w-0">
      {/* Hero with prompt bar */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(to bottom, hsl(var(--background)), hsl(var(--card)))" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(232,84,32,0.15) 0%, rgba(255,122,61,0.05) 40%, transparent 70%)" }} />
        <div className={cn("relative max-w-4xl mx-auto px-4", data.tool ? "pt-8 pb-5 md:pt-10 md:pb-6" : "pt-16 pb-14 md:pt-20 md:pb-16")}>
          <nav className={cn("flex items-center gap-1.5 text-[13px] text-muted-foreground", data.tool ? "mb-0" : "mb-8")}>
            <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/toolkit" className="hover:text-foreground transition-colors">Инструменты</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground/70">{data.modelName}</span>
          </nav>

          {!data.tool && (
            <>
              <h1 className="text-[28px] md:text-[44px] font-bold leading-[1.1] tracking-tight mb-5">{data.heroTitle}</h1>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-[640px] mb-10">{data.heroDescription}</p>

              {/* Prompt bar */}
              <div className="bg-card border border-border rounded-2xl p-5 md:p-6 max-w-2xl">
                <div className="flex gap-2 mb-4">
                  <span className="px-4 py-1.5 rounded-full gradient-accent text-white text-sm font-medium">Текст в изображение</span>
                  <span className="px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors border border-border">Изображение в изображение</span>
                </div>
                <input readOnly placeholder="Введите текст запроса для генерации" className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground mb-4 outline-none" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground">{data.modelName}</span>
                  <span className="px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground">4:3</span>
                  <span className="px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground">×1</span>
                  <Link to={targetPage as any} className="ml-auto px-5 py-2 rounded-xl gradient-accent text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                    Создать
                  </Link>
                </div>
                <p className="text-[11px] text-muted-foreground mt-3">1 изображение создаётся, фон, цвет и стиль из настроенных</p>
              </div>
            </>
          )}
        </div>
      </section>

      {data.tool && <ToolWorkspace data={data} />}

      {/* How it works */}
      {data.tool && data.howItWorks && (
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-[32px] font-bold mb-8 text-center">
            {data.howItWorks.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.howItWorks.steps.map((step, i) => (
              <div
                key={i}
                className="bg-white/[0.04] border border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.4)] rounded-xl p-6 hover:border-primary/40 hover:bg-white/[0.06] transition-colors"
              >
                <span className="gradient-accent-text font-bold text-sm mb-2 block">Шаг {i + 1}</span>
                <h4 className="font-semibold mb-1">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="gradient-accent text-white rounded-full px-8 py-3 font-semibold hover:opacity-90 transition-opacity"
            >
              Оживить фото
            </button>
          </div>
        </section>
      )}

      {/* Community gallery */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl md:text-2xl font-bold mb-6">Изучите другие источники вдохновения от сообщества ERA2</h2>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {communityWorks.map((w) => (
            <div key={w.author} className="break-inside-avoid rounded-xl border border-white/10 bg-white/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.4)] relative overflow-hidden cursor-pointer hover:scale-[1.02] hover:border-primary/40 hover:bg-white/[0.06] transition-all group">
              <img src={w.image} alt={w.author} loading="lazy" className="w-full h-auto block object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between">
                <span className="text-white text-[11px]">{w.author}</span>
                <div className="flex items-center gap-2 text-white/70 text-[10px]">
                  <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" /> {w.likes}</span>
                  <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {w.views}</span>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="gradient-accent text-white text-[10px] px-3 py-1.5 rounded-full font-medium">Создать похожее</span>
              </div>
            </div>
          ))}
        </div>
        <Link to={targetPage} className="inline-flex items-center gap-1 mt-4 text-sm text-primary hover:underline">
          Генерировать больше →
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-[32px] font-bold mb-8 text-center">
          Основные возможности {data.modelName}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.features.map((f, i) => (
            <div
              key={i}
              className="bg-white/[0.04] border border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.4)] rounded-xl p-5 flex flex-col gap-3 hover:border-primary/40 hover:bg-white/[0.06] transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xl shrink-0">
                {f.icon}
              </div>
              <div>
                <h4 className="font-semibold mb-1">{f.title}</h4>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video tutorial — только для лендингов моделей изображений */}
      {!data.tool && data.category === "image" && (
      <section className="bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-[32px] font-bold mb-8">Как работает генератор текста в изображение ERA2</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-video rounded-xl bg-muted border border-border relative overflow-hidden cursor-pointer group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={28} className="text-white ml-1" fill="white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-sm text-foreground font-medium">How to Convert Text to Image with ERA2</p>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { num: "1", title: "Введите текстовую подсказку", desc: "Опишите изображение которое хотите создать максимально детально." },
                { num: "2", title: "Создайте изображение", desc: "Создайте своё изображение с помощью нашей ИИ и параметров искусственного интеллекта." },
                { num: "3", title: "Загрузите результат", desc: "Загрузите готовое изображение и используйте его как угодно." },
              ].map((s) => (
                <div key={s.num} className="flex gap-4">
                  <span className="text-2xl font-bold gradient-accent-text shrink-0">{s.num}</span>
                  <div>
                    <h4 className="font-semibold mb-1">{s.title}</h4>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Model cards */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-xl font-bold mb-6">Модели</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modelCards.map((m) => (
            <div key={m.name} className="bg-white/[0.04] border border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.4)] rounded-xl overflow-hidden hover:border-primary/40 hover:bg-white/[0.06] transition-colors cursor-pointer">
              <img src={m.image} alt={m.name} loading="lazy" className="w-full h-[72px] object-cover" />
              <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ModelGlyph name={m.name} size={32} />
                <span className="font-semibold text-sm">{m.name}</span>
                {m.badge && <span className="text-[9px] gradient-accent text-white px-1.5 py-0.5 rounded-full font-bold">{m.badge}</span>}
              </div>
              <p className="text-xs text-muted-foreground">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image tools */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Инструменты изображения</h2>
          <Link to="/toolkit" className="text-sm text-primary hover:underline">Создавайте больше →</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {imageTools.map((t) => (
            <div key={t.label} className="shrink-0 w-[180px] h-[120px] border border-white/10 bg-white/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.4)] rounded-xl flex flex-col items-center justify-center gap-3 hover:border-primary/40 hover:bg-white/[0.06] transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-[8px] flex items-center justify-center" style={{ background: "rgba(232, 84, 32, 0.1)", border: "1px solid rgba(232, 84, 32, 0.18)" }}>
                <t.Icon size={20} strokeWidth={1.75} style={{ color: "hsl(var(--primary))" }} />
              </div>
              <span className="text-[13px] text-center px-3 leading-tight">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced CTA — только для лендингов моделей изображений */}
      {!data.tool && data.category === "image" && (
      <section className="max-w-3xl mx-auto px-4 py-16 md:py-20 text-center">
        <h2 className="text-[24px] md:text-[32px] font-bold mb-4 leading-tight">
          Превращайте слова в нечто удивительное с нашим ИИ-генератором изображений.
        </h2>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8 max-w-[600px] mx-auto">
          Генератор изображений на основе текста ERA2 создаёт реалистичные изображения строго следуя любой заданной подсказке.
        </p>
        <Link
          to={targetPage as any}
          className="inline-flex items-center justify-center w-full max-w-[600px] px-8 py-4 rounded-full border-2 border-border text-base font-semibold hover:border-primary transition-colors"
        >
          Попробуйте наш генератор изображений на основе ИИ
        </Link>
        <div className="mt-8 max-w-[400px] mx-auto aspect-[4/3] rounded-xl border border-border" style={{ background: "linear-gradient(135deg, #1a1030, #0f1a2e)" }} />
      </section>
      )}

      <FAQ items={toolPageItems} />
      <Footer />
    </div>
  );
};

export default ToolPage;

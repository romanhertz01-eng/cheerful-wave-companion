
import { Link, getRouteApi } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ModelGlyph } from "@/components/ui/era/ModelGlyph";
import { getRelatedTools, type ToolPageData } from "@/data/toolPages";
import { plans } from "@/data/plans";
import { FAQ, toolPageItems } from "@/components/shared/FAQ";
import { Footer } from "@/components/shared/Footer";
import { ToolWorkspace } from "@/components/tool/ToolWorkspace";
import { AuthCTALink } from "@/components/auth/AuthCTALink";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const toolRouteApi = getRouteApi("/tools/$slug");

const ToolPage = () => {
  const { data } = toolRouteApi.useLoaderData() as { data: ToolPageData };
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  useEffect(() => {
    if (!data.tool) return;
    const el = workspaceRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowFloatingBar(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -80% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [data.tool, data.slug]);

  const scrollToWorkspace = () => {
    workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const targetPage = data.category === "video" ? "/video" : data.category === "audio" ? "/audio" : "/design";

  const faqForLd = data.faqItems ?? toolPageItems;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqForLd.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: "https://cheerful-wave-companion.lovable.app/" },
      { "@type": "ListItem", position: 2, name: "Инструменты", item: "https://cheerful-wave-companion.lovable.app/studios" },
      { "@type": "ListItem", position: 3, name: data.heroTitle, item: `https://cheerful-wave-companion.lovable.app/tools/${data.slug}` },
    ],
  };
  const related = getRelatedTools(data.slug);
  const showRelated = related.length >= 3;

  const minPaidPrice = Math.min(
    ...plans
      .map((p) => p.monthPrice)
      .filter((v): v is number => typeof v === "number" && v > 0)
  );
  const softwareAppLd = data.tool
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: `${data.modelName} в ERA2`,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        url: `https://cheerful-wave-companion.lovable.app/tools/${data.slug}`,
        offers: {
          "@type": "Offer",
          price: minPaidPrice,
          priceCurrency: "RUB",
          description: "Доступ в составе подписки ERA2",
        },
      }
    : null;
  const howToLd = data.tool && data.howItWorks
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: data.howItWorks.title,
        step: data.howItWorks.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.desc,
        })),
      }
    : null;

  return (
    <div className="min-w-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {softwareAppLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }}
        />
      )}
      {howToLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
        />
      )}
      {/* Hero with prompt bar */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(to bottom, hsl(var(--background)), hsl(var(--card)))" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(232,84,32,0.15) 0%, rgba(255,122,61,0.05) 40%, transparent 70%)" }} />
        <div className={cn("relative max-w-4xl mx-auto px-4", data.tool ? "pt-8 pb-5 md:pt-10 md:pb-6" : "pt-16 pb-14 md:pt-20 md:pb-16")}>
          <nav className={cn("flex items-center gap-1.5 text-[13px] text-muted-foreground", data.tool ? "mb-0" : "mb-8")}>
            <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/studios" className="hover:text-foreground transition-colors">Инструменты</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground/70">{data.heroTitle}</span>
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

      {data.tool && (
        <div ref={workspaceRef}>
          <ToolWorkspace data={data} />
        </div>
      )}

      {/* Intro (tool pages) */}
      {data.tool && data.intro && (
        <section className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl md:text-[32px] font-bold mb-4">{data.intro.heading}</h2>
          <p className="text-muted-foreground leading-relaxed">{data.intro.text}</p>
        </section>
      )}

      {/* Model chips (tool pages) */}
      {data.tool && data.modelChips && (
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-[32px] font-bold mb-3 text-center">{data.modelChips.heading}</h2>
          {data.modelChips.sub && (
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">{data.modelChips.sub}</p>
          )}
          <div className="flex flex-wrap justify-center gap-3">
            {data.modelChips.models.map((name) => (
              <div
                key={name}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium hover:border-primary/40 transition-colors"
              >
                <ModelGlyph name={name} size={20} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Examples (tool pages) */}
      {data.tool && data.examples && (
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-[32px] font-bold mb-8 text-center">{data.examples.heading}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {data.examples.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${data.examples!.heading} — ${i + 1}`}
                loading="lazy"
                className="w-full aspect-square object-cover rounded-xl border border-white/10"
              />
            ))}
          </div>
        </section>
      )}

      {/* Feature blocks (tool pages) */}
      {data.tool && data.featureBlocks && (
        <section className="max-w-5xl mx-auto px-4 py-12 flex flex-col gap-16">
          {data.featureBlocks.map((b, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col gap-6 md:gap-12 items-center",
                b.image && (i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse")
              )}
            >
              {b.image && (
                <div className="md:w-1/2 w-full rounded-2xl border border-border overflow-hidden aspect-[4/3]">
                  <img src={b.image} alt={b.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
              )}
              <div className={cn("w-full", b.image ? "md:w-1/2" : "max-w-3xl text-center mx-auto")}>
                <h3 className="text-2xl md:text-[28px] font-bold mb-3">{b.title}</h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">{b.desc}</p>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="gradient-accent text-white rounded-full px-6 py-2.5 font-semibold hover:opacity-90 transition-opacity"
                >
                  {b.cta}
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Use cases (tool pages) */}
      {data.tool && data.useCases && (
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-[32px] font-bold mb-8 text-center">{data.useCases.heading}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.useCases.items.map((it, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.04] shadow-sm p-5 hover:border-primary/40 hover:bg-white/[0.06] transition-colors"
              >
                <h4 className="font-semibold mb-1">{it.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

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
                className="bg-card border border-border shadow-sm rounded-xl p-6 hover:border-primary/40 hover:bg-muted/50 transition-colors"
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
              {data.howItWorks.cta ?? data.finalCta?.button ?? "Попробовать"}
            </button>
          </div>
        </section>
      )}

      {/* Specs (tool pages) */}
      {data.tool && data.specs && (
        <section className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-[32px] font-bold mb-8 text-center">{data.specs.heading}</h2>
          <div className="flex flex-col">
            {data.specs.items.map((it, i) => (
              <div key={i} className="flex justify-between py-3 border-b border-border/60 gap-4">
                <span className="text-muted-foreground">{it.label}</span>
                <span className="font-medium text-right">{it.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features (model landings only) */}
      {!data.tool && (
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-[32px] font-bold mb-8 text-center">
          Основные возможности {data.modelName}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.features.map((f, i) => (
            <div
              key={i}
              className="bg-card border border-border shadow-sm rounded-xl p-5 flex flex-col gap-3 hover:border-primary/40 hover:bg-muted/50 transition-colors"
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
      )}

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

      {/* Tips (tool pages) */}
      {data.tool && data.tips && (
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-[32px] font-bold mb-8 text-center">{data.tips.heading}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {data.tips.items.map((it, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/[0.04] shadow-sm p-5 hover:border-primary/40 hover:bg-white/[0.06] transition-colors"
              >
                <h4 className="font-semibold mb-1">{it.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Big stat (tool pages) */}
      {data.tool && data.bigStat && (
        <section className="px-4 py-16 md:py-24 text-center">
          <div className="text-[56px] md:text-[88px] font-bold gradient-accent-text leading-none">{data.bigStat.value}</div>
          <div className="text-xl md:text-2xl font-bold mt-3">{data.bigStat.label}</div>
          {data.bigStat.sub && (
            <p className="text-muted-foreground mt-2 max-w-[560px] mx-auto">{data.bigStat.sub}</p>
          )}
          {data.bigStat.button && (
            <AuthCTALink
              to={targetPage}
              className="inline-block gradient-accent text-white rounded-full px-8 py-3.5 font-semibold mt-8 hover:opacity-90 transition-opacity"
            >
              {data.bigStat.button}
            </AuthCTALink>
          )}
        </section>
      )}

      {data.comparisonTable && (
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-[32px] font-bold mb-8 text-center">{data.comparisonTable.heading}</h2>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 pr-4 font-normal text-muted-foreground w-1/4"></th>
                  {data.comparisonTable.columns.map((c, i) => (
                    <th
                      key={c}
                      className={
                        "text-left py-3 px-4 font-semibold " +
                        (i === 0 ? "bg-white/[0.04] rounded-t-lg" : "")
                      }
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.comparisonTable.rows.map((row, ri) => (
                  <tr key={ri} className="border-t border-border/60">
                    <td className="py-3 pr-4 text-muted-foreground align-top">{row.label}</td>
                    {row.values.map((v, vi) => (
                      <td
                        key={vi}
                        className={
                          "py-3 px-4 align-top " +
                          (vi === 0 ? "bg-white/[0.04] font-medium" : "")
                        }
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {showRelated && (
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-[32px] font-bold mb-8 text-center">Похожие инструменты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/tools/$slug"
                params={{ slug: r.slug }}
                className="rounded-xl border border-white/10 bg-white/[0.04] shadow-sm p-5 hover:border-primary/40 hover:bg-white/[0.06] transition-colors"
              >
                <h3 className="font-semibold mb-1">{r.heroTitle}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {r.heroDescription.length > 90 ? `${r.heroDescription.slice(0, 90).trimEnd()}…` : r.heroDescription}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <FAQ items={data.faqItems ?? toolPageItems} />

      {/* Final CTA (tool pages) */}
      {data.tool && data.finalCta && (
        <section className="max-w-3xl mx-auto px-4 py-16 md:py-20 text-center">
          <h2 className="text-[24px] md:text-[32px] font-bold mb-4 leading-tight">{data.finalCta.title}</h2>
          <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-[600px] mx-auto">{data.finalCta.subtitle}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="gradient-accent text-white rounded-full px-8 py-3.5 font-semibold hover:opacity-90 transition-opacity"
          >
            {data.finalCta.button}
          </button>
        </section>
      )}

      <Footer />

      {data.tool && (
        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur transition-all duration-300",
            showFloatingBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
          )}
          aria-hidden={!showFloatingBar}
        >
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
            <span className="hidden md:block flex-1 truncate text-sm text-muted-foreground">
              {data.tool.textPlaceholder ?? "Опишите задачу…"}
            </span>
            <span className="md:hidden flex-1" />
            <span className="border border-border rounded-full px-3 py-1 text-xs text-muted-foreground whitespace-nowrap">
              {data.modelName}
            </span>
            <button
              type="button"
              onClick={scrollToWorkspace}
              className="gradient-accent text-white rounded-full px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Генерировать
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolPage;

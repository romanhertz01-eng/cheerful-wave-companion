import { useState, useEffect } from "react";
import { Check, ChevronDown, Users, Copy, Infinity as InfinityIcon, X, ArrowRight } from "lucide-react";
import { useCopyToast } from "@/components/shared/CopyToast";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/shared/Footer";
import { motion } from "framer-motion";
import { plans, creditPacks } from "@/data/plans";
import { PlanComparisonModal } from "@/components/pricing/PlanComparisonModal";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

type Period = "year" | "month";

const fmtRub = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

const faqItems = [
  {
    q: "Что такое кредиты?",
    a: "Каждая генерация стоит фиксированное число кредитов. Текст: от 3 cr, изображения: 20–380 cr, видео: от 105 cr, аудио: 5–400 cr. Кредиты не сгорают и переносятся, тратятся при активной подписке.",
  },
  {
    q: "Можно ли перейти на другой план?",
    a: "Да, в любой момент. Остаток кредитов переносится.",
  },
  {
    q: "Что будет когда кредиты закончатся?",
    a: "Можно докупить пакет кредитов или дождаться обновления в начале месяца.",
  },
  {
    q: "Есть ли API?",
    a: "Да, на планах Про и Бизнес. Документация в личном кабинете.",
  },
];

const PricingPage = () => {
  const [period, setPeriod] = useState<Period>("month");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [compareOpen, setCompareOpen] = useState(false);
  const copy = useCopyToast();

  useEffect(() => { document.title = "ERA2 — Тарифы"; }, []);

  return (
    <div className="min-w-0">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(232,84,32,0.12) 0%, rgba(255,122,61,0.04) 40%, transparent 70%)" }} />
        <motion.div className="relative max-w-4xl mx-auto text-center px-4 pt-16 pb-10 md:pt-20" initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[2px] text-primary font-semibold mb-4">Тарифы</motion.p>
          <motion.h1 variants={fadeUp} className="text-[32px] md:text-[44px] font-bold mb-4">Простые тарифы для каждого</motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground mb-8">Одна подписка — доступ ко всем 90+ нейросетям. Начните бесплатно.</motion.p>

          {/* Period toggle + compare */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="inline-flex rounded-full border border-[hsl(var(--border))] p-1">
              <button
                onClick={() => setPeriod("month")}
                className={cn("px-6 py-2 rounded-full text-sm font-medium transition-colors", period === "month" ? "gradient-accent text-white" : "text-muted-foreground hover:text-foreground")}
              >
                Месяц
              </button>
              <button
                onClick={() => setPeriod("year")}
                className={cn("px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2", period === "year" ? "gradient-accent text-white" : "text-muted-foreground hover:text-foreground")}
              >
                Год
                <span className="font-mono tabular-nums text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-bold">−15%</span>
              </button>
            </div>
            <button
              onClick={() => setCompareOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
            >
              Сравнить все тарифы
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Plan cards */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {plans.map((plan) => {
            const isEnterprise = !!plan.enterprise;
            const isHighlight = !!plan.highlight;
            const showYear = period === "year" && plan.monthPrice !== null && plan.yearPricePerMonth !== null;
            const priceMain =
              plan.priceLabel
                ? plan.priceLabel
                : showYear
                ? `${fmtRub(plan.yearPricePerMonth as number)}/мес`
                : plan.monthPrice === 0
                ? "0 ₽"
                : `${fmtRub(plan.monthPrice as number)}/мес`;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "relative rounded-2xl p-5 text-left flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.4)]",
                  isEnterprise
                    ? "border"
                    : "bg-white/[0.04] border border-white/10",
                  isHighlight && "border-primary shadow-[0_0_40px_-10px_rgba(232,84,32,0.55)]"
                )}
                style={
                  isEnterprise
                    ? {
                        background:
                          "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(232,84,32,0.22) 0%, rgba(232,84,32,0.06) 50%, transparent 100%), rgba(255,255,255,0.03)",
                        borderColor: "rgba(232,84,32,0.35)",
                      }
                    : undefined
                }
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-5">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                        plan.badge.tone === "free" && "bg-emerald-500/15 text-emerald-400",
                        plan.badge.tone === "accent" && "bg-primary text-white",
                        plan.badge.tone === "muted" && "bg-white/10 text-foreground"
                      )}
                    >
                      {plan.badge.text}
                    </span>
                  </div>
                )}

                <h3 className="text-lg font-bold mb-3 tracking-tight">{plan.name}</h3>

                <div className="mb-3">
                  <div className="text-[22px] font-bold font-mono tabular-nums tracking-tight leading-tight">
                    {priceMain}
                  </div>
                  {showYear && plan.monthPrice !== 0 && (
                    <div className="text-xs text-muted-foreground font-mono line-through mt-1">
                      {fmtRub(plan.monthPrice as number)}/мес
                    </div>
                  )}
                </div>

                <div className="mb-4 pb-4 border-b border-white/10">
                  <div className="text-lg font-bold text-foreground">
                    {plan.credits}
                    {!isEnterprise && plan.id !== "start" && (
                      <span className="text-xs text-muted-foreground font-normal ml-1">кредитов</span>
                    )}
                  </div>
                  {plan.creditsNote && (
                    <div className="text-xs text-muted-foreground font-mono">{plan.creditsNote}</div>
                  )}
                </div>

                <ul className="space-y-2 mb-5 flex-1">
                  {plan.features.map((f) => {
                    const Icon = f.negative ? X : f.unlimited ? InfinityIcon : Check;
                    return (
                      <li key={f.text} className="flex items-start gap-2 text-[13px] leading-snug">
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 mt-0.5",
                            f.negative ? "text-muted-foreground" : "text-primary"
                          )}
                        />
                        <span className={cn(f.negative && "text-muted-foreground")}>{f.text}</span>
                      </li>
                    );
                  })}
                </ul>

                <button
                  className={cn(
                    "w-full py-2.5 rounded-full text-sm font-semibold transition-all",
                    isHighlight || isEnterprise
                      ? "gradient-accent text-white hover:opacity-90"
                      : "border border-white/15 text-foreground hover:bg-white/[0.06]"
                  )}
                >
                  {plan.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Trust block */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            Оплата через ЮKassa · Карты РФ · СБП · Рассрочка · Возврат в течение 3 дней · Отмена подписки в любой момент
          </p>
        </div>
      </section>

      {/* Credit packs */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Докупка кредитов</h2>
          <p className="text-sm text-muted-foreground">
            Докупка доступна при активной подписке. Кредиты не сгорают и переносятся.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {creditPacks.map((p) => (
            <div
              key={p.id}
              className="bg-white/[0.04] border border-white/10 rounded-xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.4)] flex items-center justify-between"
            >
              <div>
                <div className="text-sm text-muted-foreground">{p.name}</div>
                <div className="text-lg font-bold font-mono tabular-nums">
                  {p.credits.toLocaleString("ru-RU")} cr
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono tabular-nums font-bold">{fmtRub(p.price)}</div>
                <button className="text-xs text-primary hover:underline mt-1">Купить</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Частые вопросы</h2>
        <div className="divide-y divide-border border-y border-border">
          {faqItems.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left font-medium text-foreground hover:text-primary transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 ml-4 text-muted-foreground transition-transform duration-200",
                    openFaq === i && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openFaq === i ? "max-h-40 pb-4" : "max-h-0"
                )}
              >
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Реферальный баннер */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div
          className="relative overflow-hidden rounded-[24px] p-8 md:p-12 text-center"
          style={{
            background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(232,84,32,0.18) 0%, rgba(255,122,61,0.06) 40%, transparent 75%), hsl(var(--card))",
            border: "1px solid rgba(232,84,32,0.2)",
          }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ background: "rgba(232,84,32,0.12)" }}>
            <Users className="h-5 w-5" style={{ color: "hsl(var(--primary))" }} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
            Приведи друга — получи 100 кредитов
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">
            За каждого друга, который зарегистрируется по вашей ссылке, вы оба получите по 100 бесплатных кредитов. Без ограничений на количество приглашений.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
            <div className="px-4 py-2.5 rounded-full font-mono text-sm text-foreground" style={{ background: "hsl(var(--secondary))", border: "1px solid hsl(var(--border))" }}>
              era2.ai/ref/user123
            </div>
            <button
              onClick={() => copy("https://era2.ai/ref/user123", "Реферальная ссылка скопирована")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white gradient-accent shadow-[0_10px_30px_-10px_rgba(232,84,32,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] hover:opacity-90 transition-opacity"
            >
              <Copy className="h-4 w-4" />
              Копировать
            </button>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            Уже пригласили: 0 друзей · Заработано: 0 кредитов
          </p>
        </div>
      </section>

      <Footer />
      <PlanComparisonModal open={compareOpen} onClose={() => setCompareOpen(false)} />
    </div>
  );
};

export default PricingPage;

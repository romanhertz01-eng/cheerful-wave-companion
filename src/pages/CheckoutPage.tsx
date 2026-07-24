import { useMemo, useState } from "react";
import { Link, useSearch, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { plans } from "@/data/plans";

type PeriodId = "1m" | "3m" | "6m" | "12m";

const PERIODS: { id: PeriodId; months: number; label: string; discount: number; badge?: string }[] = [
  { id: "1m", months: 1, label: "1 месяц", discount: 0 },
  { id: "3m", months: 3, label: "3 месяца", discount: 0.05, badge: "−5%" },
  { id: "6m", months: 6, label: "6 месяцев", discount: 0.10, badge: "−10%" },
  { id: "12m", months: 12, label: "1 год", discount: 0.15, badge: "−15%" },
];

const EMAIL = "romanhertz01@gmail.com";
const LEGAL = 'ООО «ЭРА2»';

const fmtRub = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function fmtDate(d: Date) {
  const months = [
    "января","февраля","марта","апреля","мая","июня",
    "июля","августа","сентября","октября","ноября","декабря"
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

const btnSecondary =
  "inline-flex items-center justify-center h-9 px-3.5 rounded-lg text-[13px] font-medium border border-white/15 text-foreground hover:bg-white/[0.06] transition-colors";

export default function CheckoutPage() {
  const search = useSearch({ strict: false }) as { plan?: string; period?: string };
  const navigate = useNavigate();
  const planId = search?.plan ?? "pro";
  const plan = plans.find((p) => p.id === planId && !p.enterprise) ?? plans.find((p) => p.id === "pro")!;

  const [period, setPeriod] = useState<PeriodId>(
    (["1m", "3m", "6m", "12m"].includes(search?.period ?? "") ? (search!.period as PeriodId) : "1m")
  );
  const [agreed, setAgreed] = useState(false);
  const [promo, setPromo] = useState("");
  const [isGift, setIsGift] = useState(false);
  const [giftEmail, setGiftEmail] = useState("");

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const giftEmailValid = isValidEmail(giftEmail);

  const monthPrice = plan.monthPrice ?? 0;

  const rows = useMemo(
    () =>
      PERIODS.map((p) => ({
        ...p,
        total: Math.round(monthPrice * p.months * (1 - p.discount)),
        base: monthPrice * p.months,
      })),
    [monthPrice]
  );

  const selected = rows.find((r) => r.id === period)!;
  const nextBilling = fmtDate(addMonths(new Date(), selected.months));
  const periodWord = selected.months === 1 ? "месяц" : selected.months === 12 ? "год" : `${selected.months} мес.`;

  const handlePay = () => {
    if (!agreed) return;
    if (isGift && !giftEmailValid) return;
    toast("Переход к оплате", { description: `${plan.name} · ${selected.label} · ${fmtRub(selected.total)}` });
  };

  return (
    <div className="min-h-[calc(100vh-var(--header-height,64px))]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[2px] text-muted-foreground font-semibold">Чекаут</p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mt-1">Оформление подписки</h1>
          </div>
          <button
            onClick={() => navigate({ to: "/pricing" })}
            className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Сменить тариф
          </button>
        </div>

        <div className="grid md:grid-cols-[1fr_1.05fr] gap-5">
          {/* LEFT: Order summary */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="text-[13px] text-muted-foreground">Ваш план</div>
            <div className="text-3xl md:text-[32px] font-semibold mt-1">{plan.name}</div>

            <div className="mt-5 space-y-2.5 text-[13px]">
              <Row
                label={isGift ? "Получатель" : "Аккаунт"}
                value={isGift ? (giftEmail.trim() || "— укажите email —") : EMAIL}
              />
              <Row label="Кредитов в месяц" value={`${plan.credits}`} />
              {selected.discount > 0 && (
                <Row label="Скидка" value={`${Math.round(selected.discount * 100)} %`} />
              )}
              <Row label="Период" value={selected.label} />
            </div>

            <div className="my-5 h-px bg-white/10" />

            <div className="text-[13px] text-muted-foreground">К оплате</div>
            <div className="flex items-baseline gap-3 mt-1">
              <div className="text-3xl md:text-[34px] font-semibold tabular-nums">
                {fmtRub(selected.total)}
              </div>
              {selected.discount > 0 && (
                <div className="text-sm text-muted-foreground line-through tabular-nums">
                  {fmtRub(selected.base)}
                </div>
              )}
            </div>
            <div className="text-xs text-muted-foreground mt-2 tabular-nums">
              {isGift
                ? `Подписка активна до ${nextBilling} · без автопродления`
                : `Следующее списание: ${nextBilling} · ${fmtRub(selected.total)}`}
            </div>

            <div className="mt-5">
              <div className="text-[13px] text-muted-foreground mb-2">Промокод</div>
              <div className="flex items-center gap-2">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Введите промокод"
                  className="flex-1 h-9 px-3 rounded-lg text-[13px] bg-white/[0.04] border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 placeholder:text-muted-foreground"
                />
                <button
                  className={btnSecondary}
                  onClick={() => toast("Промокод не найден (демо)")}
                >
                  Применить
                </button>
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-white/10">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[13px] text-foreground">Подарить подписку другу</div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isGift}
                  onClick={() => setIsGift((v) => !v)}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors",
                    isGift ? "bg-white/[0.25]" : "bg-white/[0.10]"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                      isGift ? "translate-x-[22px]" : "translate-x-0.5"
                    )}
                  />
                </button>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Вы оплачиваете — подписка активируется на аккаунте друга
              </p>
              {isGift && (
                <div className="mt-3 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                  <input
                    type="email"
                    value={giftEmail}
                    onChange={(e) => setGiftEmail(e.target.value)}
                    placeholder="Email друга"
                    className="w-full h-10 px-3 rounded-lg text-[13px] bg-white/[0.04] border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 placeholder:text-muted-foreground"
                  />
                  <p className="text-xs text-muted-foreground">
                    Отправим письмо с активацией на этот адрес
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Period + payment */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-[15px] font-semibold">Период оплаты</h2>
              <div className="mt-3 space-y-2">
                {rows.map((r) => {
                  const active = period === r.id;
                  return (
                    <label
                      key={r.id}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors",
                        active
                          ? "border-white/25 bg-white/[0.06]"
                          : "border-white/10 hover:bg-white/[0.03]"
                      )}
                    >
                      <span
                        className={cn(
                          "h-4 w-4 rounded-full border flex items-center justify-center shrink-0",
                          active ? "border-foreground" : "border-white/25"
                        )}
                      >
                        {active && <span className="h-2 w-2 rounded-full bg-foreground" />}
                      </span>
                      <span className="flex-1 text-[13px] text-foreground">{r.label}</span>
                      {r.badge && (
                        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {r.badge}
                        </span>
                      )}
                      <span className="text-[13px] tabular-nums text-foreground">
                        {fmtRub(r.total)}
                      </span>
                      <input
                        type="radio"
                        name="period"
                        className="sr-only"
                        checked={active}
                        onChange={() => setPeriod(r.id)}
                      />
                    </label>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Чем длиннее период — тем ниже цена месяца. Списание раз в выбранный период.
              </p>

              <label className="mt-5 flex items-start gap-3 cursor-pointer text-[12px] leading-[1.5] text-muted-foreground">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/25 bg-white/[0.04] accent-primary"
                />
                <span>
                  Я принимаю условия{" "}
                  <a href="#" className="text-foreground underline underline-offset-2">оферты</a>
                  {" "}и{" "}
                  <a href="#" className="text-foreground underline underline-offset-2">политики конфиденциальности</a>
                  {isGift
                    ? `. Это разовый платёж ${fmtRub(selected.total)} за подписку «${plan.name}» на ${selected.label.toLowerCase()} для указанного получателя. Автопродление не подключается.`
                    : ` и разрешаю ${LEGAL} списывать ${fmtRub(selected.total)} раз в ${periodWord} с привязанной карты в счёт подписки «${plan.name}». Отменить автопродление можно в любой момент в разделе Аккаунт.`}
                </span>
              </label>

              <button
                onClick={handlePay}
                disabled={!agreed || (isGift && !giftEmailValid)}
                className={cn(
                  "mt-5 w-full h-11 rounded-xl text-[14px] font-semibold text-white bg-gradient-to-r from-[#E85420] to-[#ff7a3d] transition-opacity",
                  !agreed || (isGift && !giftEmailValid) ? "opacity-50 cursor-not-allowed" : "hover:opacity-95"
                )}
              >
                {isGift ? "Подарить" : "Оплатить"} {fmtRub(selected.total)}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                {["Visa", "Mastercard", "МИР", "СБП", "SberPay", "ЮMoney"].map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center h-7 px-2.5 rounded-md border border-white/10 bg-white/[0.04] text-[11px] font-semibold text-muted-foreground tracking-wide"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div className="mt-3 text-center text-xs text-muted-foreground">
                Способ оплаты выберете на защищённой странице ЮKassa · Возврат в течение 3 дней
              </div>
            </div>

            <div className="text-center">
              <Link to="/pricing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                ← Вернуться к тарифам
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground tabular-nums truncate">{value}</span>
    </div>
  );
}
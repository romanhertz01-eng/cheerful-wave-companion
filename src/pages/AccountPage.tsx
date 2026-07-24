import { useEffect, useState } from "react";
import { CreditCard, X } from "lucide-react";

type SubStatus = "active" | "cancelled" | "none";
type Card = { brand: string; last4: string; exp: string } | null;

const PLAN_NAME = "Про";
const NEXT_BILLING = "22 августа 2026";
const PRICE = "1 490 ₽";
const CREDITS_USED = 6240;
const CREDITS_TOTAL = 8000;

const HISTORY = [
  { date: "22.07.2026", desc: "Списание за подписку «Про»", amount: "−1 490 ₽" },
  { date: "22.07.2026", desc: "Начисление кредитов", amount: "+8 000 кредитов" },
  { date: "10.07.2026", desc: "Докупка кредитов", amount: "+5 000 кредитов" },
  { date: "22.06.2026", desc: "Списание за подписку «Про»", amount: "−1 490 ₽" },
];

function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#1a1614] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="text-lg font-semibold pr-8">{title}</h3>
        <div className="mt-3 text-sm text-muted-foreground leading-relaxed">{children}</div>
        <div className="mt-6 flex items-center justify-end gap-2">{footer}</div>
      </div>
    </div>
  );
}

const btnSecondary =
  "inline-flex items-center justify-center h-9 px-3.5 rounded-lg text-[13px] font-medium border border-white/15 text-foreground hover:bg-white/[0.06] transition-colors";
const btnDestructive =
  "inline-flex items-center justify-center h-9 px-3.5 rounded-lg text-[13px] font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors";
const btnAccent =
  "inline-flex items-center justify-center h-9 px-3.5 rounded-lg text-[13px] font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors";

const card = "rounded-2xl border border-white/10 bg-white/[0.04] p-5";

export default function AccountPage() {
  const [subscription, setSubscription] = useState<SubStatus>("active");
  const [card1, setCard1] = useState<Card>({ brand: "Visa", last4: "4242", exp: "09/28" });
  const [cancelOpen, setCancelOpen] = useState(false);
  const [detachOpen, setDetachOpen] = useState(false);

  const statusBadge =
    subscription === "active" ? (
      <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
        Активна
      </span>
    ) : subscription === "cancelled" ? (
      <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
        Отменена
      </span>
    ) : (
      <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
        Не активна
      </span>
    );

  return (
    <div className="min-h-[calc(100vh-var(--header-height,64px))]">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Аккаунт</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Управление подпиской, картой и историей платежей
          </p>
        </div>

        {/* Subscription */}
        <div className={card}>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Подписка</h2>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[15px] font-medium text-foreground">План «{PLAN_NAME}»</span>
                {statusBadge}
              </div>
              {subscription === "active" && (
                <div className="mt-3 space-y-1 text-[13px] text-muted-foreground">
                  <div>
                    Следующее списание:{" "}
                    <span className="text-foreground tabular-nums">{NEXT_BILLING} · {PRICE}</span>
                  </div>
                  <div>
                    Кредиты:{" "}
                    <span className="text-foreground tabular-nums">
                      {CREDITS_USED.toLocaleString("ru-RU")} из {CREDITS_TOTAL.toLocaleString("ru-RU")}
                    </span>
                  </div>
                </div>
              )}
              {subscription === "cancelled" && (
                <div className="mt-3 text-[13px] text-muted-foreground">
                  <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.05] px-2 py-1">
                    Активна до <span className="ml-1 text-foreground">{NEXT_BILLING}</span>
                  </span>
                </div>
              )}
              {subscription === "none" && (
                <div className="mt-3 text-[13px] text-muted-foreground">
                  Активной подписки нет.
                </div>
              )}
            </div>
            <div className="shrink-0">
              {subscription === "active" && (
                <button className={btnSecondary} onClick={() => setCancelOpen(true)}>
                  Отменить подписку
                </button>
              )}
              {subscription === "cancelled" && (
                <button className={btnSecondary} onClick={() => setSubscription("active")}>
                  Возобновить подписку
                </button>
              )}
              {subscription === "none" && (
                <a href="/pricing" className={btnAccent}>Выбрать план</a>
              )}
            </div>
          </div>
        </div>

        {/* Payment method */}
        <div className={card}>
          <h2 className="text-lg font-semibold">Способ оплаты</h2>
          {card1 ? (
            <div className="mt-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-12 items-center justify-center rounded-md border border-white/10 bg-white/[0.06]">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </span>
                <div className="text-[13px]">
                  <div className="text-foreground tabular-nums">
                    {card1.brand} •••• {card1.last4}
                  </div>
                  <div className="text-muted-foreground tabular-nums">до {card1.exp}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className={btnSecondary}>Заменить карту</button>
                <button className={btnSecondary} onClick={() => setDetachOpen(true)}>
                  Отвязать
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-3 flex items-center justify-between gap-4">
              <div className="text-[13px] text-muted-foreground">Карта не привязана</div>
              <button
                className={btnSecondary}
                onClick={() => setCard1({ brand: "Visa", last4: "4242", exp: "09/28" })}
              >
                Привязать карту
              </button>
            </div>
          )}
        </div>

        {/* History */}
        <div className={card}>
          <h2 className="text-lg font-semibold">История начислений</h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-white/[0.03] text-muted-foreground">
                  <th className="px-4 py-2.5 text-left font-medium">Дата</th>
                  <th className="px-4 py-2.5 text-left font-medium">Описание</th>
                  <th className="px-4 py-2.5 text-right font-medium">Сумма</th>
                </tr>
              </thead>
              <tbody>
                {HISTORY.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-white/[0.06] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3 tabular-nums text-muted-foreground">{row.date}</td>
                    <td className="px-4 py-3 text-foreground">{row.desc}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-foreground">
                      {row.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title="Отменить подписку?"
        footer={
          <>
            <button className={btnSecondary} onClick={() => setCancelOpen(false)}>
              Оставить подписку
            </button>
            <button
              className={btnDestructive}
              onClick={() => {
                setSubscription("cancelled");
                setCancelOpen(false);
              }}
            >
              Отменить подписку
            </button>
          </>
        }
      >
        Подписка останется активной до {NEXT_BILLING} — до этой даты доступ ко всем моделям
        сохраняется. Кредиты не сгорают и останутся на счёте. Автоматическое продление будет
        отключено.
      </Modal>

      <Modal
        open={detachOpen}
        onClose={() => setDetachOpen(false)}
        title="Отвязать карту?"
        footer={
          <>
            <button className={btnSecondary} onClick={() => setDetachOpen(false)}>
              Отмена
            </button>
            <button
              className={btnDestructive}
              onClick={() => {
                setCard1(null);
                if (subscription === "active") setSubscription("cancelled");
                setDetachOpen(false);
              }}
            >
              Отвязать
            </button>
          </>
        }
      >
        Карта {card1 ? `•••• ${card1.last4}` : ""} будет удалена. Автопродление подписки
        отключится — доступ сохранится до конца оплаченного периода.
      </Modal>
    </div>
  );
}
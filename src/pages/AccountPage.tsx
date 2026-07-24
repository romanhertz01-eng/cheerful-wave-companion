import { useEffect, useState } from "react";
import { CreditCard, X, Zap, Mail, Copy, Check, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

type SubStatus = "active" | "cancelled" | "none";
type Card = { brand: string; last4: string; exp: string } | null;

const PLAN_NAME = "Про";
const PLAN_BADGE: "PRO" | "FREE" = "PRO";
const NEXT_BILLING = "22 августа 2026";
const PRICE = "1 490 ₽";
const CREDITS_USED = 6240;
const CREDITS_TOTAL = 8000;
const EMAIL = "roman2024gerts@gmail.com";
const DISPLAY_NAME = "Роман Г.";
const REF_LINK = "https://era2.ai/?ref=USER123";

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
  const { userName } = useAuth();
  const [subscription, setSubscription] = useState<SubStatus>("active");
  const [card1, setCard1] = useState<Card>({ brand: "Visa", last4: "4242", exp: "09/28" });
  const [cancelOpen, setCancelOpen] = useState(false);
  const [detachOpen, setDetachOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [promo, setPromo] = useState("");
  const [cert, setCert] = useState("");
  const [copied, setCopied] = useState(false);

  const initial = (userName || DISPLAY_NAME).charAt(0).toUpperCase();
  const balancePct = Math.min(100, Math.round((CREDITS_USED / CREDITS_TOTAL) * 100));

  const handleCopyRef = () => {
    navigator.clipboard.writeText(REF_LINK);
    setCopied(true);
    toast.success("Ссылка скопирована");
    setTimeout(() => setCopied(false), 2000);
  };

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
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-br from-[#E85420] via-[#ff7a3d] to-[#ffb27a] shrink-0">
              <div className="w-full h-full rounded-full bg-[#1a1614] flex items-center justify-center text-xl font-semibold text-foreground">
                {initial}
              </div>
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight truncate">{DISPLAY_NAME}</h1>
              <p className="text-sm text-muted-foreground truncate">{EMAIL}</p>
            </div>
          </div>
          <span
            className={
              PLAN_BADGE === "PRO"
                ? "inline-flex items-center rounded-full border border-[#E85420]/40 bg-[#E85420]/10 px-3 py-1 text-xs font-semibold text-[#ff9a6a]"
                : "inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-muted-foreground"
            }
          >
            {PLAN_BADGE === "PRO" ? "Про" : "Free"}
          </span>
        </div>

        {/* Balance */}
        <div className={card}>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <Zap className="h-4 w-4 text-[#ff9a6a]" />
                Текущий баланс
              </div>
              <div className="mt-2 text-3xl md:text-[32px] font-semibold tabular-nums">
                {CREDITS_USED.toLocaleString("ru-RU")} / {CREDITS_TOTAL.toLocaleString("ru-RU")}{" "}
                <span className="text-base font-normal text-muted-foreground">кредитов</span>
              </div>
              <div className="mt-3 h-1.5 w-full max-w-md bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#E85420] to-[#ff7a3d] rounded-full"
                  style={{ width: `${balancePct}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-2">Хватит на ~12 генераций</div>
            </div>
            <Link
              to="/pricing"
              hash="credit-packs"
              className="inline-flex items-center justify-center h-10 px-5 rounded-lg text-[13px] font-semibold text-white bg-gradient-to-r from-[#E85420] to-[#ff7a3d] hover:opacity-95 transition-opacity"
            >
              Пополнить
            </Link>
          </div>
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

        {/* 2x2 grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Auth method */}
          <div className={card}>
            <h3 className="text-[15px] font-semibold">Способ входа</h3>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.06]">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </span>
              <div className="text-[13px]">
                <div className="text-foreground">Email</div>
                <div className="text-muted-foreground truncate">{EMAIL}</div>
              </div>
            </div>
          </div>

          {/* Promo */}
          <div className={card}>
            <h3 className="text-[15px] font-semibold">Промокод</h3>
            <div className="mt-3 flex items-center gap-2">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Введите промокод"
                className="flex-1 h-9 px-3 rounded-lg text-[13px] bg-white/[0.04] border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 placeholder:text-muted-foreground"
              />
              <button
                className={btnSecondary}
                onClick={() => toast("Проверка промокода недоступна в демо")}
              >
                Применить
              </button>
            </div>
          </div>

          {/* Certificate */}
          <div className={card}>
            <h3 className="text-[15px] font-semibold">Сертификат</h3>
            <div className="mt-3 flex items-center gap-2">
              <input
                value={cert}
                onChange={(e) => setCert(e.target.value)}
                placeholder="Код сертификата"
                className="flex-1 h-9 px-3 rounded-lg text-[13px] bg-white/[0.04] border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 placeholder:text-muted-foreground"
              />
              <button
                className={btnSecondary}
                onClick={() => toast("Активация сертификата недоступна в демо")}
              >
                Активировать
              </button>
            </div>
          </div>

          {/* Referral */}
          <div className={card}>
            <h3 className="text-[15px] font-semibold">Реферальная программа</h3>
            <div className="mt-2 text-[13px] text-muted-foreground tabular-nums">
              Приглашено: <span className="text-foreground">0</span> · Начислено:{" "}
              <span className="text-foreground">0</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input
                readOnly
                value={REF_LINK}
                className="flex-1 h-9 px-3 rounded-lg text-[12px] bg-white/[0.04] border border-white/10 text-foreground truncate focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              />
              <button className={btnSecondary} onClick={handleCopyRef}>
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span className="ml-1.5">Копировать</span>
              </button>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              По 100 кредитов вам и другу, когда друг оформит первую подписку
            </div>
          </div>
        </div>

        {/* Delete account */}
        <div className="rounded-2xl border border-white/10 p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold">Удаление аккаунта</h3>
              <p className="mt-1 text-[13px] text-muted-foreground">
                Аккаунт и все генерации будут удалены без возможности восстановления
              </p>
            </div>
            <button
              onClick={() => setDeleteOpen(true)}
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[13px] font-medium border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Удалить аккаунт
            </button>
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

      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Удалить аккаунт?"
        footer={
          <>
            <button className={btnSecondary} onClick={() => setDeleteOpen(false)}>
              Отмена
            </button>
            <button
              className={btnDestructive}
              onClick={() => {
                setDeleteOpen(false);
                toast.success("Заявка на удаление отправлена (демо)");
              }}
            >
              Удалить аккаунт
            </button>
          </>
        }
      >
        Это действие необратимо. Все генерации, история и остаток кредитов будут удалены.
      </Modal>
    </div>
  );
}
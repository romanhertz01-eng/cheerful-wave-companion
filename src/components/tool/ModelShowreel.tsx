import { useEffect, useState } from "react";

type ShowreelItem = { image: string; prompt?: string; label?: string };

interface ModelShowreelProps {
  heading: string;
  sub?: string;
  items: ShowreelItem[];
}

export function ModelShowreel({ heading, sub, items }: ModelShowreelProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, [activeIdx]);

  if (!items.length) return null;
  const active = items[activeIdx];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-[32px] font-bold text-center">{heading}</h2>
      {sub && (
        <p className="mt-3 text-sm text-muted-foreground text-center max-w-2xl mx-auto">
          {sub}
        </p>
      )}

      <div className="mt-8 aspect-[2/1] w-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
        <img
          key={activeIdx}
          src={active.image}
          alt={active.label ?? heading}
          loading={activeIdx === 0 ? "eager" : "lazy"}
          className={
            "w-full h-full object-cover transition-opacity duration-300 " +
            (visible ? "opacity-100" : "opacity-0")
          }
        />
      </div>

      <div className="mt-4 flex justify-center">
        <div className="inline-flex items-center gap-2 p-2 rounded-full border border-white/10 bg-white/[0.04]">
          {items.map((it, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIdx(i)}
                aria-label={`Пример ${i + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={
                  "overflow-hidden transition-all duration-300 shrink-0 " +
                  (isActive
                    ? "w-[72px] h-10 rounded-xl ring-2 ring-primary"
                    : "w-10 h-10 rounded-full opacity-60 hover:opacity-100")
                }
              >
                <img src={it.image} alt="" className="object-cover w-full h-full" />
              </button>
            );
          })}
        </div>
      </div>

      {active.prompt && (
        <div className="mt-5 max-w-3xl mx-auto rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
          {active.label && (
            <div className="font-semibold text-base mb-1">{active.label}</div>
          )}
          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
            Промпт
          </div>
          <p className="text-sm leading-relaxed">{active.prompt}</p>
        </div>
      )}
    </section>
  );
}

export default ModelShowreel;
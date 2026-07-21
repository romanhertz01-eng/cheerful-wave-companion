import { useMemo, useState } from "react";
import { X, Search, Download, Infinity as InfinityIcon, Video, Image as ImageIcon, Music, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { comparisonGroups, comparisonTiers, type ComparisonValue, type ComparisonGroup } from "@/data/planComparison";

const groupIcons: Record<ComparisonGroup["id"], typeof Video> = {
  video: Video,
  image: ImageIcon,
  audio: Music,
  text: Type,
};

const INITIAL_VISIBLE = 3;

function ValueCell({ value }: { value: ComparisonValue }) {
  if (value === "unlimited") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
        style={{ background: "rgba(232,84,32,0.15)", color: "hsl(var(--primary))" }}
      >
        <InfinityIcon className="h-3.5 w-3.5" />
        Безлимит
      </span>
    );
  }
  if (value === null) {
    return <span className="text-muted-foreground text-xs">—</span>;
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono tabular-nums bg-white/[0.06] border border-white/10">
      {value} ген.
    </span>
  );
}

export function PlanComparisonModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return comparisonGroups
      .map((g) => ({
        ...g,
        rows: q ? g.rows.filter((r) => r.model.toLowerCase().includes(q)) : g.rows,
      }))
      .filter((g) => g.rows.length > 0);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl bg-[#0d0d0f] border border-white/10 md:my-8 md:rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-lg md:text-xl font-bold">Сравнение тарифов</h2>
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
              title="Скачать PDF (скоро)"
              disabled
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-white/10">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по моделям…"
              className="w-full pl-9 pr-3 py-2 bg-white/[0.04] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>

        {/* Sticky column header */}
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm border-collapse">
            <thead className="sticky top-0 z-10 bg-[#0d0d0f]">
              <tr className="border-b border-white/10">
                <th className="text-left font-semibold px-6 py-3 min-w-[240px]">Тариф</th>
                {comparisonTiers.map((t) => (
                  <th
                    key={t.id}
                    className="text-center font-bold px-4 py-3 min-w-[130px]"
                    style={{ color: "hsl(var(--primary))" }}
                  >
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-muted-foreground">
                    Ничего не найдено
                  </td>
                </tr>
              )}
              {filtered.map((group) => {
                const Icon = groupIcons[group.id];
                const isExpanded = expanded[group.id] ?? false;
                const visible = isExpanded ? group.rows : group.rows.slice(0, INITIAL_VISIBLE);
                const hasMore = group.rows.length > INITIAL_VISIBLE;
                return (
                  <>
                    <tr key={`h-${group.id}`} className="bg-white/[0.02]">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="flex items-center gap-2 text-base md:text-lg font-bold">
                          <Icon className="h-5 w-5" style={{ color: "hsl(var(--primary))" }} />
                          {group.title}
                        </div>
                      </td>
                    </tr>
                    {visible.map((row) => (
                      <tr
                        key={`${group.id}-${row.model}`}
                        className="border-b border-white/[0.06] hover:bg-white/[0.02]"
                      >
                        <td className="px-6 py-3">
                          <div className="font-medium">{row.model}</div>
                          <div className="text-xs text-muted-foreground">{row.unit}</div>
                        </td>
                        {comparisonTiers.map((t) => (
                          <td key={t.id} className="text-center px-4 py-3">
                            <ValueCell value={row.values[t.id]} />
                          </td>
                        ))}
                      </tr>
                    ))}
                    {hasMore && (
                      <tr key={`m-${group.id}`}>
                        <td colSpan={5} className="px-6 py-2">
                          <button
                            onClick={() => setExpanded((s) => ({ ...s, [group.id]: !isExpanded }))}
                            className={cn(
                              "text-xs font-semibold text-primary hover:opacity-80 transition-opacity"
                            )}
                          >
                            {isExpanded ? "Скрыть" : `Показать ещё (${group.rows.length - INITIAL_VISIBLE})`}
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Upload, Play, Loader2, ChevronDown, Check, Play as PlayIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToolPageData } from "@/data/toolPages";

type Status = "idle" | "loading" | "done";

export function ToolWorkspace({ data }: { data: ToolPageData }) {
  const tool = data.tool!;
  if (tool.layout === "row") {
    return <RowWorkspace data={data} />;
  }
  const demoImage = tool.demoImage ?? "/examples/ozhivit-preview.jpg";
  const demoCaption = tool.demoCaption ?? "Пример результата";
  const isVideo = data.category === "video";
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [motion, setMotion] = useState(50);
  const [duration, setDuration] = useState<5 | 10>(5);
  const [status, setStatus] = useState<Status>("idle");
  const [selectedType, setSelectedType] = useState(0);
  const [selectIdx, setSelectIdx] = useState<number[]>(
    () => tool.selects?.map((s) => s.defaultIndex ?? 0) ?? []
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const has = tool.bricks.includes.bind(tool.bricks);

  const onFile = (f: File | null) => {
    if (!f) return;
    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setStatus("idle");
  };

  const onGenerate = () => {
    if (!file) return;
    setStatus("loading");
    setTimeout(() => setStatus("done"), 1800);
  };

  return (
    <section className="border-y border-border" style={{ background: "hsl(var(--card))" }}>
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-5 md:grid-cols-[320px_1fr] md:grid-rows-[min-content] items-start">
        {/* LEFT PANEL */}
        <div className="rounded-2xl border border-border bg-background/60 p-3 flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <Link to="/toolkit" className="p-1.5 rounded-md hover:bg-muted transition-colors">
              <ArrowLeft size={16} />
            </Link>
            <span className="font-semibold text-sm">{data.heroTitle}</span>
          </div>

          {has("type-preset") && tool.types && (
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Тип</label>
              <div className="grid grid-cols-3 gap-2">
                {tool.types.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedType(i)}
                    className={cn(
                      "relative h-[72px] rounded-lg overflow-hidden border-2 transition-colors",
                      i === selectedType ? "border-primary" : "border-transparent"
                    )}
                  >
                    <img src={t.image} alt={t.label} className="absolute inset-0 w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent text-white text-[10px] font-medium px-1.5 py-1 text-center leading-tight">
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {has("upload-1") && (
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Изображение</label>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  onFile(e.dataTransfer.files?.[0] ?? null);
                }}
                className="w-full h-[120px] rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-1.5 text-center px-3 overflow-hidden relative"
              >
                {preview ? (
                  <img src={preview} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload size={20} className="text-muted-foreground" />
                    <span className="text-sm">Загрузите фото или перетащите сюда</span>
                    <span className="text-[11px] text-muted-foreground">JPEG, PNG, WEBP</span>
                  </>
                )}
              </button>
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => onFile(e.target.files?.[0] ?? null)}
              />
              <p className="text-[11px] text-muted-foreground mt-1.5">Загрузите одно фото с одним или несколькими людьми — крупный план лиц, чёткое изображение.</p>
            </div>
          )}

          {has("model") && (
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Модель</label>
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-border bg-muted/40 text-sm"
              >
                <span className="font-medium">{tool.modelName}</span>
                <ChevronDown size={14} className="text-muted-foreground" />
              </button>
            </div>
          )}

          {has("slider-motion") && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-muted-foreground">Движение</label>
                <span className="text-xs font-medium">{motion}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={motion}
                onChange={(e) => setMotion(Number(e.target.value))}
                className="w-full accent-[#E85420]"
              />
            </div>
          )}

          {has("duration") && (
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Длительность</label>
              <div className="grid grid-cols-2 gap-2">
                {([5, 10] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium border transition-colors",
                      duration === d
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {d}с
                  </button>
                ))}
              </div>
            </div>
          )}

          {has("select") && tool.selects && tool.selects.length > 0 && (
            <div className="flex flex-col gap-3">
              {tool.selects.map((sel, si) => (
                <div key={si}>
                  <label className="text-xs text-muted-foreground mb-1 block">{sel.label}</label>
                  <div className="grid grid-cols-3 gap-2">
                    {sel.options.map((opt, oi) => {
                      const active = (selectIdx[si] ?? sel.defaultIndex ?? 0) === oi;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setSelectIdx((prev) => {
                              const next = [...prev];
                              next[si] = oi;
                              return next;
                            })
                          }
                          className={cn(
                            "px-3 py-2 rounded-lg text-sm font-medium border transition-colors",
                            active
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {has("generate") && (
            <div className="pt-1 border-t border-border">
              <p className="text-[11px] text-muted-foreground mb-2">
                {tool.types
                  ? `Требуется кредитов: ${tool.types[selectedType].credits}`
                  : `модель: ${tool.modelName} · ${tool.credits} кредитов`}
              </p>
              <button
                type="button"
                disabled={!file || status === "loading"}
                onClick={onGenerate}
                className="w-full h-10 rounded-lg font-semibold text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 flex items-center justify-center gap-2"
                style={{ background: "#E85420" }}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Генерация...
                  </>
                ) : (
                  "Генерировать"
                )}
              </button>
            </div>
          )}
        </div>

        {/* RIGHT PREVIEW */}
        <div className="flex flex-col gap-3">
          <div className="shrink-0">
            <h2 className="text-xl md:text-2xl font-bold leading-tight">{data.heroTitle}</h2>
            <p className="text-sm text-muted-foreground mt-1.5">{data.heroDescription}</p>
          </div>

          <div className="w-full aspect-[4/3] rounded-2xl border border-border bg-background/60 overflow-hidden relative flex items-center justify-center">
            {status === "loading" && (
              <div className="absolute inset-0 animate-pulse bg-muted/40 flex items-center justify-center z-20">
                <Loader2 size={32} className="animate-spin text-primary" />
              </div>
            )}

            <img
              src={preview || demoImage}
              alt="result"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {status === "done" && isVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                  <Play size={26} className="ml-1 text-black" fill="black" />
                </div>
              </div>
            )}

            {status === "idle" && !preview && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/25 z-10">
                {isVideo && (
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <Play size={22} className="ml-0.5 text-black" fill="black" />
                  </div>
                )}
                <span className="text-xs text-white/90 font-medium">{isVideo ? "Пример результата" : demoCaption}</span>
                {isVideo && <span className="text-[10px] text-white/70">фото → видео</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToolWorkspace;

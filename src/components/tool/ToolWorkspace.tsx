import { useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Upload, Play, Loader2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { aiVideo } from "@/data/placeholderImages";
import type { ToolPageData } from "@/data/toolPages";

type Status = "idle" | "loading" | "done";

const DEMO_PREVIEW = aiVideo[1];

export function ToolWorkspace({ data }: { data: ToolPageData }) {
  const tool = data.tool!;
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [motion, setMotion] = useState(50);
  const [duration, setDuration] = useState<5 | 10>(5);
  const [status, setStatus] = useState<Status>("idle");
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
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-[360px_1fr] md:grid-rows-[min-content]">
        {/* LEFT PANEL */}
        <div className="rounded-2xl border border-border bg-background/60 p-3 flex flex-col gap-3 h-full">
          <div className="flex items-center gap-2">
            <Link to="/toolkit" className="p-1.5 rounded-md hover:bg-muted transition-colors">
              <ArrowLeft size={16} />
            </Link>
            <span className="font-semibold text-sm">{data.modelName}</span>
          </div>

          {has("upload-1") && (
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Изображение</label>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  onFile(e.dataTransfer.files?.[0] ?? null);
                }}
                className="h-[160px] aspect-[4/3] mx-auto rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-1.5 text-center px-3 overflow-hidden relative"
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
            </div>
          )}

          {has("model") && (
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Модель</label>
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
              <div className="flex items-center justify-between mb-1.5">
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
              <label className="text-xs text-muted-foreground mb-1.5 block">Длительность</label>
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

          {has("generate") && (
            <div className="pt-1 border-t border-border mt-auto">
              <p className="text-[11px] text-muted-foreground mb-2">
                модель: {tool.modelName} · {tool.credits} кредитов
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
        <div className="flex flex-col gap-3 h-full min-h-0 overflow-hidden">
          <div className="shrink-0">
            <h2 className="text-xl md:text-2xl font-bold leading-tight">{data.heroTitle}</h2>
            <p className="text-sm text-muted-foreground mt-1.5">{data.heroDescription}</p>
          </div>

          <div className="flex-1 min-h-0 rounded-2xl border border-border bg-background/60 overflow-hidden relative flex items-center justify-center">
            {status === "loading" && (
              <div className="absolute inset-0 animate-pulse bg-muted/40 flex items-center justify-center z-20">
                <Loader2 size={32} className="animate-spin text-primary" />
              </div>
            )}

            <img
              src={preview || DEMO_PREVIEW}
              alt="result"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {status === "done" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                  <Play size={26} className="ml-1 text-black" fill="black" />
                </div>
              </div>
            )}

            {status === "idle" && !preview && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/25 z-10">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                  <Play size={22} className="ml-0.5 text-black" fill="black" />
                </div>
                <span className="text-xs text-white/90 font-medium">Пример результата</span>
              </div>
            )}
          </div>

          <div className="shrink-0">
            <p className="text-xs text-muted-foreground mb-1.5">История</p>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-lg border border-dashed border-border bg-background/40"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToolWorkspace;

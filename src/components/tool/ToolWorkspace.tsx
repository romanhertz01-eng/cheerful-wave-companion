import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Upload, Play, Loader2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToolPageData } from "@/data/toolPages";

type Status = "idle" | "loading" | "done";

export function ToolWorkspace({ data }: { data: ToolPageData }) {
  const tool = data.tool!;
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [motion, setMotion] = useState(50);
  const [duration, setDuration] = useState<5 | 10>(5);
  const [status, setStatus] = useState<Status>("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const has = tool.bricks.includes.bind(tool.bricks);

  const onFile = (f: File | null) => {
    if (!f) return;
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
      <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-[360px_1fr]">
        {/* LEFT PANEL */}
        <div className="rounded-2xl border border-border bg-background/60 p-4 flex flex-col gap-5 h-fit">
          <div className="flex items-center gap-2">
            <Link to="/toolkit" className="p-1.5 rounded-md hover:bg-muted transition-colors">
              <ArrowLeft size={16} />
            </Link>
            <span className="font-semibold text-sm">{data.modelName}</span>
          </div>

          {has("upload-1") && (
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Изображение</label>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  onFile(e.dataTransfer.files?.[0] ?? null);
                }}
                className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 text-center px-3 overflow-hidden"
              >
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload size={22} className="text-muted-foreground" />
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
              <label className="text-xs text-muted-foreground mb-2 block">Модель</label>
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-border bg-muted/40 text-sm"
              >
                <span className="font-medium">{tool.modelName}</span>
                <ChevronDown size={14} className="text-muted-foreground" />
              </button>
            </div>
          )}

          {has("slider-motion") && (
            <div>
              <div className="flex items-center justify-between mb-2">
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
              <label className="text-xs text-muted-foreground mb-2 block">Длительность</label>
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
            <div className="pt-1 border-t border-border">
              <p className="text-[11px] text-muted-foreground mb-2">
                модель: {tool.modelName} · {tool.credits} кредитов
              </p>
              <button
                type="button"
                disabled={!file || status === "loading"}
                onClick={onGenerate}
                className="w-full h-11 rounded-lg font-semibold text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 flex items-center justify-center gap-2"
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
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold leading-tight">{data.heroTitle}</h2>
            <p className="text-sm text-muted-foreground mt-1.5">{data.heroDescription}</p>
          </div>

          <div className="rounded-2xl border border-border bg-background/60 aspect-video overflow-hidden relative flex items-center justify-center">
            {status === "loading" && (
              <div className="absolute inset-0 animate-pulse bg-muted/40 flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-primary" />
              </div>
            )}
            {status === "done" && preview && (
              <div className="relative w-full h-full">
                <img src={preview} alt="result" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play size={26} className="ml-1 text-black" fill="black" />
                  </div>
                </div>
              </div>
            )}
            {status === "idle" && (
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center">
                  <Play size={22} className="ml-0.5" />
                </div>
                <span className="text-sm">Результат появится здесь</span>
              </div>
            )}
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">История</p>
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-video rounded-lg border border-dashed border-border bg-background/40"
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
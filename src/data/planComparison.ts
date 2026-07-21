export type ComparisonValue = number | "unlimited" | null;

export type ComparisonRow = {
  model: string;
  unit: string; // e.g. "1K", "клип 5с, 720p"
  costCr: number | null; // null when unlimited-only
  values: { basic: ComparisonValue; pro: ComparisonValue; max: ComparisonValue; ultra: ComparisonValue };
  icon?: string;
};

export type ComparisonGroup = {
  id: "video" | "image" | "audio" | "text";
  title: string;
  rows: ComparisonRow[];
};

// ген = floor(кредиты_тарифа / цена_модели_cr)
// Кредиты тарифов: Базовый 3000 / Про 8000 / Макс 24000 / Ультра 70000
export const comparisonGroups: ComparisonGroup[] = [
  {
    id: "video",
    title: "Видео",
    rows: [
      {
        model: "Kling 3.0",
        unit: "клип 5с, 720p",
        costCr: 575,
        values: { basic: 5, pro: 13, max: 41, ultra: 121 },
      },
    ],
  },
  {
    id: "image",
    title: "Изображения",
    rows: [
      { model: "Nano Banana 2", unit: "1K", costCr: 45, values: { basic: 66, pro: 177, max: 533, ultra: 1555 } },
      { model: "GPT Image 2", unit: "1K", costCr: 35, values: { basic: 85, pro: 228, max: 685, ultra: 2000 } },
      { model: "Seedream 5 Pro", unit: "1K", costCr: 40, values: { basic: 75, pro: 200, max: 600, ultra: 1750 } },
      { model: "Flux-2 Pro", unit: "1K", costCr: 40, values: { basic: 75, pro: 200, max: 600, ultra: 1750 } },
    ],
  },
  {
    id: "audio",
    title: "Аудио",
    rows: [
      { model: "Suno", unit: "трек", costCr: 80, values: { basic: 37, pro: 100, max: 300, ultra: 875 } },
      { model: "ElevenLabs TTS", unit: "1000 зн.", costCr: 95, values: { basic: 31, pro: 84, max: 252, ultra: 736 } },
    ],
  },
  {
    id: "text",
    title: "Текст",
    rows: [
      {
        model: "DeepSeek V4-Flash",
        unit: "чат",
        costCr: null,
        values: { basic: "unlimited", pro: "unlimited", max: "unlimited", ultra: "unlimited" },
      },
      {
        model: "Claude Opus (4.5+)",
        unit: "чат",
        costCr: null,
        values: { basic: null, pro: null, max: null, ultra: "unlimited" },
      },
    ],
  },
  // TODO: дозаполнить из прайс-листов v3.2
];

export const comparisonTiers = [
  { id: "basic", name: "Базовый" },
  { id: "pro", name: "Про" },
  { id: "max", name: "Макс" },
  { id: "ultra", name: "Ультра" },
] as const;
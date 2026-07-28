export type ModelCategory = "text" | "image" | "video" | "audio";

export interface SubModel {
  id: string;
  name: string;
  credits: number;
  isNew?: boolean;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  category: ModelCategory;
  subModels?: SubModel[];
  credits: number;
  description: string;
  icon: string;
  isNew?: boolean;
  slug: string;
}

export const models: AIModel[] = [
  // === TEXT ===
  {
    id: "chatgpt",
    name: "ChatGPT",
    provider: "OpenAI",
    category: "text",
    credits: 1,
    description: "Семейство моделей GPT от OpenAI для генерации текста, кода и анализа данных.",
    icon: "🤖",
    slug: "chatgpt",
    subModels: [
      { id: "gpt-5-6-luna", name: "GPT-5.6 Luna", credits: 4 },
      { id: "gpt-5-2", name: "GPT 5.2", credits: 6 },
      { id: "gpt-5-4", name: "GPT 5.4", credits: 10 },
      { id: "gpt-5-6-terra", name: "GPT-5.6 Terra", credits: 10 },
      { id: "gpt-5-5", name: "GPT 5.5", credits: 18 },
      { id: "gpt-5-6-sol", name: "GPT-5.6 Sol", credits: 18, isNew: true },
    ],
  },
  {
    id: "claude",
    name: "Claude",
    provider: "Anthropic",
    category: "text",
    credits: 1,
    description: "Модели Anthropic Claude для безопасной генерации текста и анализа документов.",
    icon: "🧠",
    slug: "claude",
    subModels: [
      { id: "claude-haiku-4-5", name: "Haiku 4.5", credits: 3 },
      { id: "claude-sonnet-4-6", name: "Sonnet 4.6", credits: 10 },
      { id: "claude-sonnet-5", name: "Sonnet 5", credits: 10, isNew: true },
      { id: "claude-opus-4-7", name: "Opus 4.7", credits: 18 },
      { id: "claude-opus-4-8", name: "Opus 4.8", credits: 20 },
      { id: "claude-fable-5", name: "Fable 5", credits: 40, isNew: true },
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    provider: "Google",
    category: "text",
    credits: 1,
    description: "Мультимодальные модели Google для текста, кода и анализа изображений.",
    icon: "💎",
    slug: "gemini",
    subModels: [
      { id: "gemini-2-5-flash", name: "Gemini 2.5 Flash", credits: 3 },
      { id: "gemini-3-flash", name: "Gemini 3 Flash", credits: 3 },
      { id: "gemini-3-5-flash", name: "Gemini 3.5 Flash", credits: 6, isNew: true },
      { id: "gemini-2-5-pro", name: "Gemini 2.5 Pro", credits: 6 },
      { id: "gemini-3-pro", name: "Gemini 3 Pro", credits: 6 },
      { id: "gemini-3-1-pro", name: "Gemini 3.1 Pro", credits: 6, isNew: true },
    ],
  },
  {
    id: "grok",
    name: "Grok",
    provider: "xAI",
    category: "text",
    credits: 2,
    description: "Модели Grok от xAI для рассуждений, поиска и генерации текста.",
    icon: "⚡",
    slug: "grok",
    subModels: [
      { id: "grok-4-3", name: "Grok 4.3", credits: 7 },
      { id: "grok-4-5", name: "Grok 4.5", credits: 13, isNew: true },
    ],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    provider: "DeepSeek",
    category: "text",
    credits: 1,
    description: "Открытые модели DeepSeek для генерации текста и сложных рассуждений.",
    icon: "🔍",
    slug: "deepseek",
    subModels: [
      { id: "deepseek-v4-flash", name: "DeepSeek V4-Flash", credits: 3 },
      { id: "deepseek-v4-pro", name: "DeepSeek V4-Pro", credits: 10 },
    ],
  },
  {
    id: "perplexity",
    name: "Perplexity",
    provider: "Perplexity",
    category: "text",
    credits: 3,
    description: "Модели Perplexity для поиска и анализа информации в реальном времени.",
    icon: "🌐",
    slug: "perplexity",
    subModels: [
      { id: "sonar", name: "Perplexity Sonar", credits: 15 },
      { id: "sonar-pro", name: "Perplexity Sonar Pro", credits: 35 },
      { id: "sonar-reasoning-pro", name: "Sonar Reasoning Pro", credits: 25 },
      { id: "sonar-deep-research", name: "Sonar Deep Research", credits: 150 },
    ],
  },
  {
    id: "qwen",
    name: "Qwen",
    provider: "Alibaba",
    category: "text",
    credits: 1,
    description: "Модели Qwen от Alibaba для многоязычной генерации текста и рассуждений.",
    icon: "🔮",
    slug: "qwen",
    subModels: [
      { id: "qwen-3-6-flash", name: "Qwen 3.6 Flash", credits: 3 },
      { id: "qwen-3-7-plus", name: "Qwen 3.7 Plus", credits: 3 },
      { id: "qwen-3-7-max", name: "Qwen 3.7 Max", credits: 18, isNew: true },
    ],
  },

  // === IMAGE ===
  {
    id: "gpt-image-1.5",
    name: "GPT Image 1.5",
    provider: "OpenAI",
    category: "image",
    credits: 40,
    description: "Продвинутая модель генерации изображений от OpenAI с высоким качеством.",
    icon: "🎨",
    slug: "gpt-image-1-5",
  },
  {
    id: "gpt-image-1-mini",
    name: "GPT Image 1 mini",
    provider: "OpenAI",
    category: "image",
    credits: 5,
    description: "Быстрая и экономичная генерация изображений от OpenAI.",
    icon: "🖼",
    slug: "gpt-image-1-mini",
  },
  {
    id: "nano-banana",
    name: "Nano Banana",
    provider: "Google",
    category: "image",
    credits: 300,
    description: "Генерация изображений от Google с фотореалистичным качеством.",
    icon: "🍌",
    slug: "nano-banana",
    subModels: [
      { id: "nano-banana-2", name: "Nano Banana 2", credits: 300, isNew: true },
      { id: "nano-banana-pro", name: "Nano Banana Pro", credits: 300 },
    ],
  },
  {
    id: "midjourney",
    name: "Midjourney",
    provider: "Midjourney",
    category: "image",
    credits: 80,
    description: "Легендарный генератор изображений для художественных и креативных работ.",
    icon: "⛵",
    slug: "midjourney",
  },
  {
    id: "seedream",
    name: "Seedream 5.0 Lite",
    provider: "ByteDance",
    category: "image",
    credits: 2,
    description: "Новая модель генерации изображений от ByteDance.",
    icon: "🌱",
    slug: "seedream",
    isNew: true,
  },
  {
    id: "kling-image",
    name: "Kling Image",
    provider: "Kuaishou",
    category: "image",
    credits: 25,
    description: "Генерация изображений от Kuaishou с кинематографическим стилем.",
    icon: "🎬",
    slug: "kling-image",
    subModels: [
      { id: "kling-v3-omni", name: "Kling V3 Omni", credits: 25, isNew: true },
    ],
  },
  {
    id: "grok-imagine",
    name: "Grok Imagine",
    provider: "xAI",
    category: "image",
    credits: 20,
    description: "Генерация изображений от xAI на базе Grok.",
    icon: "⚡",
    slug: "grok-imagine",
  },

  // === VIDEO ===
  {
    id: "veo-3",
    name: "Veo 3",
    provider: "Google",
    category: "video",
    credits: 120,
    description: "Генерация видео от Google с кинематографическим качеством.",
    icon: "🎥",
    slug: "veo-3",
  },
  {
    id: "sora-2",
    name: "Sora 2",
    provider: "OpenAI",
    category: "video",
    credits: 480,
    description: "Продвинутая модель генерации видео от OpenAI.",
    icon: "🌀",
    slug: "sora-2",
    subModels: [
      { id: "sora-2-base", name: "Sora 2", credits: 480 },
      { id: "sora-2-pro", name: "Sora 2 Pro", credits: 1440 },
    ],
  },
  {
    id: "kling-video",
    name: "Kling Video",
    provider: "Kuaishou",
    category: "video",
    credits: 75,
    description: "Генерация видео с режимами Text to Video, Image to Video, Keyframes, Elements.",
    icon: "🎞",
    slug: "kling-video",
    subModels: [
      { id: "kling-3.0", name: "Kling 3.0", credits: 75 },
      { id: "kling-2.5-turbo", name: "Kling 2.5 Turbo", credits: 30 },
    ],
  },
  {
    id: "seedance",
    name: "Seedance",
    provider: "ByteDance",
    category: "video",
    credits: 48,
    description: "Генерация танцевальных и динамичных видео от ByteDance.",
    icon: "💃",
    slug: "seedance",
    subModels: [
      { id: "seedance-2.0", name: "Seedance 2.0", credits: 48, isNew: true },
      { id: "seedance-1.0", name: "Seedance 1.0", credits: 60 },
    ],
  },
  {
    id: "wan-ai",
    name: "Wan AI",
    provider: "Alibaba",
    category: "video",
    credits: 30,
    description: "Модель генерации видео от Alibaba.",
    icon: "🌊",
    slug: "wan-ai",
  },

  // === AUDIO ===
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    provider: "ElevenLabs",
    category: "audio",
    credits: 60,
    description: "Передовой синтез речи с естественным звучанием и клонированием голоса.",
    icon: "🎙",
    slug: "elevenlabs",
    subModels: [
      { id: "el-voiceover", name: "Озвучка текста", credits: 60 },
      { id: "el-ads", name: "Рекламные ролики", credits: 80 },
      { id: "el-podcast", name: "Подкасты", credits: 100 },
      { id: "el-localization", name: "Локализация", credits: 120 },
    ],
  },
  {
    id: "suno",
    name: "Suno",
    provider: "Suno",
    category: "audio",
    credits: 30,
    description: "Генерация музыки и песен по текстовому описанию.",
    icon: "🎵",
    slug: "suno",
    subModels: [
      { id: "suno-song", name: "Песня с вокалом", credits: 30 },
      { id: "suno-instrumental", name: "Инструментал", credits: 25 },
      { id: "suno-jingle", name: "Джингл / реклама", credits: 20 },
      { id: "suno-extended", name: "Расширенный трек", credits: 50 },
    ],
  },
];

export function getModelsByCategory(category: ModelCategory): AIModel[] {
  return models.filter((m) => m.category === category);
}

export function getModelBySlug(slug: string): AIModel | undefined {
  return models.find((m) => m.slug === slug);
}

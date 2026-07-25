import type { SeoPage } from '../types';

export const aiVideoPage: SeoPage = {
  id: 'ai-video',
  slug: '/ai/video',
  pageKind: 'category',
  status: 'draft',
  uniqueValue:
    'Обзор всех видео-нейросетей ЭРА2 в одном месте: какие задачи решают, какие модели доступны, как выбрать.',
  searchIntent: 'commercial',
  seo: {
    title: 'Нейросети для видео — генерация и обработка видео ИИ | ERA2.ai',
    description:
      'Создавайте и обрабатывайте видео нейросетями: текст в видео, оживить фото, ИИ-аватар, апскейл. Kling, Veo, Runway, Sora и другие — единая подписка, оплата в рублях.',
    canonical: 'https://era2.ai/ai/video',
    robots: 'index,follow',
  },
  breadcrumbs: [
    { label: 'Главная', href: '/' },
    { label: 'Видео', href: '/ai/video' },
  ],
  blocks: [
    {
      type: 'hero',
      enabled: true,
      order: 1,
      data: {
        h1: 'Нейросети для видео',
        subtitle:
          'Создавайте видео из текста и фото, оживляйте снимки, улучшайте качество — Kling, Veo, Sora, Seedance и другие модели в единой подписке, оплата в рублях.',
        primaryCta: 'Создать видео',
        ctaHref: '/video',
      },
    },
    { type: 'toolGrid', enabled: true, order: 2 },
    { type: 'modelGrid', enabled: true, order: 3 },
    {
      type: 'scenarioChips',
      enabled: true,
      order: 4,
      data: {
        heading: 'Что можно сделать',
        items: [
          { title: 'Оживить фото', description: 'Превратите статичный снимок в короткое видео' },
          { title: 'Видео из текста', description: 'Сгенерируйте ролик по текстовому описанию' },
          { title: 'ИИ-аватар', description: 'Говорящий аватар из фото и озвучки' },
          { title: 'Апскейл видео', description: 'Улучшите качество и разрешение' },
          { title: 'Видео для Ozon и WB', description: 'Готовые ролики для карточек товара' },
          { title: 'Синхрон губ', description: 'Синхронизация артикуляции с озвучкой' },
        ],
      },
    },
    {
      type: 'gallery',
      enabled: true,
      order: 5,
      data: { title: 'Работы сообщества', type: 'video', count: 8 },
    },
    { type: 'howItWorks', enabled: true, order: 6 },
    {
      type: 'editorial',
      enabled: true,
      order: 7,
      data: {
        heading: 'Видео-нейросети без VPN и зарубежных карт',
        text: 'ЭРА2 объединяет лучшие модели генерации видео в одном сервисе: Kling, Veo, Sora, Seedance, Hailuo и другие. Не нужно регистрироваться в десяти сервисах и платить в валюте — одна подписка в рублях открывает все инструменты: от оживления фото до готовых роликов для маркетплейсов.',
      },
    },
    { type: 'faq', enabled: true, order: 8 },
    { type: 'relatedLinks', enabled: true, order: 9 },
    {
      type: 'finalCta',
      enabled: true,
      order: 10,
      data: {
        title: 'Попробуйте видео-нейросети ЭРА2',
        subtitle: 'Создайте первое видео за минуту — без VPN, оплата в рублях.',
        button: 'Начать бесплатно',
        href: '/video',
      },
    },
  ],
};
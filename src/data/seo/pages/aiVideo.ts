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
    { type: 'hero', enabled: true, order: 1 },
    { type: 'toolGrid', enabled: true, order: 2 },
    { type: 'modelGrid', enabled: true, order: 3 },
    { type: 'scenarioChips', enabled: true, order: 4 },
    { type: 'gallery', enabled: true, order: 5 },
    { type: 'howItWorks', enabled: true, order: 6 },
    { type: 'editorial', enabled: true, order: 7 },
    { type: 'faq', enabled: true, order: 8 },
    { type: 'relatedLinks', enabled: true, order: 9 },
    { type: 'finalCta', enabled: true, order: 10 },
  ],
};
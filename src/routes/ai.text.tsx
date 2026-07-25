import { createFileRoute } from '@tanstack/react-router';
import { SeoRenderer } from '@/components/seo/SeoPage';
import { aiTextPage } from '@/data/seo/pages/aiText';

export const Route = createFileRoute('/ai/text')({
  component: () => <SeoRenderer def={aiTextPage} />,
  head: () => ({
    meta: [
      { title: aiTextPage.seo.title },
      { name: 'description', content: aiTextPage.seo.description },
      { name: 'robots', content: aiTextPage.seo.robots },
      { property: 'og:title', content: aiTextPage.seo.title },
      { property: 'og:description', content: aiTextPage.seo.description },
      { property: 'og:url', content: aiTextPage.seo.canonical },
      { property: 'og:image', content: 'https://era2.ai/og-image.png' },
    ],
    links: [{ rel: 'canonical', href: aiTextPage.seo.canonical }],
  }),
});
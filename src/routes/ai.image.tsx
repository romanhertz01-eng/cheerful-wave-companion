import { createFileRoute } from '@tanstack/react-router';
import { SeoRenderer } from '@/components/seo/SeoPage';
import { aiImagePage } from '@/data/seo/pages/aiImage';

export const Route = createFileRoute('/ai/image')({
  component: () => <SeoRenderer def={aiImagePage} />,
  head: () => ({
    meta: [
      { title: aiImagePage.seo.title },
      { name: 'description', content: aiImagePage.seo.description },
      { name: 'robots', content: aiImagePage.seo.robots },
    ],
    links: [{ rel: 'canonical', href: aiImagePage.seo.canonical }],
  }),
});
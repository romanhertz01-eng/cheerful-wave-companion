import { createFileRoute } from '@tanstack/react-router';
import { SeoRenderer } from '@/components/seo/SeoPage';
import { aiVideoPage } from '@/data/seo/pages/aiVideo';

export const Route = createFileRoute('/ai/video')({
  component: () => <SeoRenderer def={aiVideoPage} />,
  head: () => ({
    meta: [
      { title: aiVideoPage.seo.title },
      { name: 'description', content: aiVideoPage.seo.description },
      { name: 'robots', content: aiVideoPage.seo.robots },
    ],
    links: [{ rel: 'canonical', href: aiVideoPage.seo.canonical }],
  }),
});
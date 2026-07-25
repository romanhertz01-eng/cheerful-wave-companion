import { createFileRoute } from '@tanstack/react-router';
import { SeoRenderer } from '@/components/seo/SeoPage';
import { aiAudioPage } from '@/data/seo/pages/aiAudio';

export const Route = createFileRoute('/ai/audio')({
  component: () => <SeoRenderer def={aiAudioPage} />,
  head: () => ({
    meta: [
      { title: aiAudioPage.seo.title },
      { name: 'description', content: aiAudioPage.seo.description },
      { name: 'robots', content: aiAudioPage.seo.robots },
    ],
    links: [{ rel: 'canonical', href: aiAudioPage.seo.canonical }],
  }),
});
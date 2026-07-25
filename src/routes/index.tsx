import { createFileRoute } from '@tanstack/react-router';
import { SeoRenderer } from '@/components/seo/SeoPage';
import { resolveRobots } from '@/data/seo/robots';
import { homePage } from '@/data/seo/pages/home';

export const Route = createFileRoute('/')({
  component: () => <SeoRenderer def={homePage} />,
  head: () => ({
    meta: [
      { title: homePage.seo.title },
      { name: 'description', content: homePage.seo.description },
      { name: 'robots', content: resolveRobots(homePage) },
      { property: 'og:title', content: homePage.seo.title },
      { property: 'og:description', content: homePage.seo.description },
      { property: 'og:url', content: homePage.seo.canonical },
      { property: 'og:image', content: 'https://cheerful-wave-companion.lovable.app/og-image.png' },
    ],
    links: [{ rel: 'canonical', href: homePage.seo.canonical }],
  }),
});

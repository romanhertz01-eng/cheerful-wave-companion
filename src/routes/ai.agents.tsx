import { createFileRoute } from '@tanstack/react-router';
import { SeoRenderer } from '@/components/seo/SeoPage';
import { aiAgentsPage } from '@/data/seo/pages/aiAgents';

export const Route = createFileRoute('/ai/agents')({
  component: () => <SeoRenderer def={aiAgentsPage} />,
  head: () => ({
    meta: [
      { title: aiAgentsPage.seo.title },
      { name: 'description', content: aiAgentsPage.seo.description },
      { name: 'robots', content: aiAgentsPage.seo.robots },
    ],
    links: [{ rel: 'canonical', href: aiAgentsPage.seo.canonical }],
  }),
});
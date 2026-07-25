import { createFileRoute } from "@tanstack/react-router";
import PricingPage from "@/pages/PricingPage";

const TITLE = "Тарифы на нейросети — от 790 ₽ в месяц | ERA2.ai";
const DESCRIPTION =
  "Единая подписка на 90+ нейросетей: ChatGPT, Midjourney, Sora и другие. Тарифы от 790 ₽/мес, оплата российскими картами и СБП, 150 кредитов бесплатно при регистрации.";
const CANONICAL = "https://era2.ai/pricing";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: "https://era2.ai/og-image.png" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
  }),
});

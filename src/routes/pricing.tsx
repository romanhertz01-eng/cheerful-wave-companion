import { createFileRoute } from "@tanstack/react-router";
import PricingPage from "@/pages/PricingPage";
import { plans } from "@/data/plans";

const TITLE = "Тарифы на нейросети — от 790 ₽ в месяц | ERA2.ai";
const DESCRIPTION =
  "Единая подписка на 90+ нейросетей: ChatGPT, Kling, Sora и другие. Тарифы от 790 ₽/мес, оплата российскими картами и СБП, 150 кредитов бесплатно при регистрации.";
const CANONICAL = "https://cheerful-wave-companion.lovable.app/pricing";

const softwareApplicationLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ERA2",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: CANONICAL,
  offers: plans
    .filter((p) => p.monthPrice !== null && p.monthPrice > 0)
    .map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: String(p.monthPrice),
      priceCurrency: "RUB",
      url: CANONICAL,
    })),
});

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
      { property: "og:image", content: "https://cheerful-wave-companion.lovable.app/og-image.png" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: softwareApplicationLd,
      },
    ],
  }),
});

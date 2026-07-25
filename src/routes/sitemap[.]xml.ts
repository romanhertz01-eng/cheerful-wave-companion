import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { toolPages } from "@/data/toolPages";
import { guides } from "@/data/seo/guides";
import { homePage } from "@/data/seo/pages/home";
import { aiImagePage } from "@/data/seo/pages/aiImage";
import { aiVideoPage } from "@/data/seo/pages/aiVideo";
import { aiAudioPage } from "@/data/seo/pages/aiAudio";
import { aiTextPage } from "@/data/seo/pages/aiText";
import { aiAgentsPage } from "@/data/seo/pages/aiAgents";

const BASE_URL = "https://cheerful-wave-companion.lovable.app";

type Entry = { path: string; lastmod?: string };

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: Entry[] = [];

        entries.push({ path: "/", lastmod: homePage.updatedAt });
        entries.push({ path: "/pricing" });
        entries.push({ path: "/studios" });
        entries.push({ path: "/guides" });

        for (const page of [aiImagePage, aiVideoPage, aiAudioPage, aiTextPage, aiAgentsPage]) {
          if (page.status === "published") {
            entries.push({ path: page.slug, lastmod: page.updatedAt });
          }
        }

        for (const tool of toolPages) {
          if (tool.status === "draft") continue;
          entries.push({ path: `/tools/${tool.slug}`, lastmod: tool.updatedAt });
        }

        for (const [slug, guide] of Object.entries(guides)) {
          if (guide.status !== "published") continue;
          entries.push({ path: `/guides/${slug}`, lastmod: guide.updatedAt });
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
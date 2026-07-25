export type BlockType =
  | 'hero'
  | 'heroGenerator'
  | 'interactiveDemo'
  | 'beforeAfter'
  | 'gallery'
  | 'modelGrid'
  | 'toolGrid'
  | 'scenarioChips'
  | 'howItWorks'
  | 'capabilities'
  | 'specs'
  | 'pricingStrip'
  | 'comparisonTable'
  | 'editorial'
  | 'faq'
  | 'relatedLinks'
  | 'breadcrumbs'
  | 'finalCta';

export type SeoBlock = {
  type: BlockType;
  enabled: boolean;
  order: number;
  data?: Record<string, unknown>;
};

export type SeoPage = {
  id: string;
  slug: string;
  pageKind: 'category' | 'generator' | 'tool' | 'model' | 'audience' | 'pricing';
  status: 'draft' | 'published' | 'noindex';
  uniqueValue: string;
  searchIntent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  seo: {
    title: string;
    description: string;
    canonical: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    robots?: string;
  };
  breadcrumbs: { label: string; href: string }[];
  blocks: SeoBlock[];
};
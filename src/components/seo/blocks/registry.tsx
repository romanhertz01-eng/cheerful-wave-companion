import type { ComponentType } from 'react';
import type { BlockType } from '@/data/seo/types';
import { BlockPlaceholder } from './BlockPlaceholder';
import { HeroBlock } from './HeroBlock';
import { GalleryBlock } from './GalleryBlock';
import { ScenarioChipsBlock } from './ScenarioChipsBlock';
import { HowItWorksBlock } from './HowItWorksBlock';
import { EditorialBlock } from './EditorialBlock';
import { FaqBlock } from './FaqBlock';
import { FinalCtaBlock } from './FinalCtaBlock';
import { ToolGridBlock } from './ToolGridBlock';
import { ModelGridBlock } from './ModelGridBlock';
import { RelatedLinksBlock } from './RelatedLinksBlock';

const P: ComponentType<any> = BlockPlaceholder;

export const blockRegistry: Record<BlockType, ComponentType<any>> = {
  hero: HeroBlock,
  interactiveDemo: P,
  beforeAfter: P,
  gallery: GalleryBlock,
  modelGrid: ModelGridBlock,
  toolGrid: ToolGridBlock,
  scenarioChips: ScenarioChipsBlock,
  howItWorks: HowItWorksBlock,
  capabilities: P,
  specs: P,
  pricingStrip: P,
  comparisonTable: P,
  editorial: EditorialBlock,
  faq: FaqBlock,
  relatedLinks: RelatedLinksBlock,
  breadcrumbs: P,
  finalCta: FinalCtaBlock,
};
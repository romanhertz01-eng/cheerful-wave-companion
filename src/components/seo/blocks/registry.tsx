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

const P: ComponentType<any> = BlockPlaceholder;

export const blockRegistry: Record<BlockType, ComponentType<any>> = {
  hero: HeroBlock,
  interactiveDemo: P,
  beforeAfter: P,
  gallery: GalleryBlock,
  modelGrid: P,
  toolGrid: P,
  scenarioChips: ScenarioChipsBlock,
  howItWorks: HowItWorksBlock,
  capabilities: P,
  specs: P,
  pricingStrip: P,
  comparisonTable: P,
  editorial: EditorialBlock,
  faq: FaqBlock,
  relatedLinks: P,
  breadcrumbs: P,
  finalCta: FinalCtaBlock,
};
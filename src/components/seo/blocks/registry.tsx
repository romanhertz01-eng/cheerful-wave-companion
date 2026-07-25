import type { ComponentType } from 'react';
import type { BlockType } from '@/data/seo/types';
import { BlockPlaceholder } from './BlockPlaceholder';

const P: ComponentType<any> = BlockPlaceholder;

export const blockRegistry: Record<BlockType, ComponentType<any>> = {
  hero: P,
  interactiveDemo: P,
  beforeAfter: P,
  gallery: P,
  modelGrid: P,
  toolGrid: P,
  scenarioChips: P,
  howItWorks: P,
  capabilities: P,
  specs: P,
  pricingStrip: P,
  comparisonTable: P,
  editorial: P,
  faq: P,
  relatedLinks: P,
  breadcrumbs: P,
  finalCta: P,
};
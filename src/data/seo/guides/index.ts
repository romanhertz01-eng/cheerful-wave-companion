import type { SeoPage } from '../types';
import { kakOzhivitStaroeFotoGuide } from './kakOzhivitStaroeFoto';
import { nejrosetiBezVpnGuide } from './nejrosetiBezVpn';

export const guides: Record<string, SeoPage> = {
  'kak-ozhivit-staroe-foto': kakOzhivitStaroeFotoGuide,
  'nejroseti-bez-vpn': nejrosetiBezVpnGuide,
};
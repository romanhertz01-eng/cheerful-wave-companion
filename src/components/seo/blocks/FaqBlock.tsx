import { FAQ, toolPageItems } from "@/components/shared/FAQ";

interface FaqItem { q: string; a: string }
interface FaqBlockProps {
  items?: FaqItem[];
  title?: string;
  subtitle?: string;
}

export function FaqBlock({ items, title, subtitle }: FaqBlockProps) {
  return <FAQ items={items ?? toolPageItems} title={title} subtitle={subtitle} />;
}
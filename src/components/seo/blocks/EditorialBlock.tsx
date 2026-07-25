import { SeoEditorialBlock } from "../SeoEditorialBlock";

interface EditorialBlockProps {
  heading: string;
  text: string;
  cta?: { label: string; href: string };
}

export function EditorialBlock({ heading, text, cta }: EditorialBlockProps) {
  return (
    <SeoEditorialBlock
      heading={heading}
      text={text}
      ctaLabel={cta?.label ?? "Начать бесплатно"}
      ctaLink={cta?.href ?? "/"}
    />
  );
}
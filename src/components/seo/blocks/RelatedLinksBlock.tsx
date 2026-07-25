import { Link } from "@tanstack/react-router";

interface RelatedLink {
  label: string;
  href: string;
}

interface RelatedLinksBlockProps {
  heading: string;
  links: RelatedLink[];
}

export function RelatedLinksBlock({ heading, links }: RelatedLinksBlockProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-xl font-bold mb-4">{heading}</h2>
      <div className="flex flex-wrap gap-3">
        {links.map((l) => (
          <Link
            key={l.href}
            to={l.href}
            className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { SeoPage } from '@/data/seo/types';
import { blockRegistry } from './blocks/registry';

export function SeoRenderer({ def }: { def: SeoPage }) {
  const blocks = def.blocks.filter((b) => b.enabled).sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <Breadcrumb>
          <BreadcrumbList>
            {def.breadcrumbs.map((crumb, i) => {
              const isLast = i === def.breadcrumbs.length - 1;
              return (
                <span key={crumb.href} className="contents">
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </span>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {blocks.map((b) => {
        const C = blockRegistry[b.type];
        return <C key={b.order} type={b.type} {...(b.data || {})} />;
      })}
    </>
  );
}
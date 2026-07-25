import { ScenariosGrid } from "../ScenariosGrid";

type ScenarioItem =
  | string
  | { icon?: string; title: string; description?: string };

interface ScenarioChipsBlockProps {
  heading: string;
  items: ScenarioItem[];
  images?: string[];
}

export function ScenarioChipsBlock({ heading, items, images }: ScenarioChipsBlockProps) {
  const normalized = items.map((it) =>
    typeof it === "string"
      ? { title: it, description: "" }
      : { icon: it.icon, title: it.title, description: it.description ?? "" }
  );
  return <ScenariosGrid heading={heading} items={normalized} images={images} />;
}
import { CommunityGallery } from "../CommunityGallery";

interface GalleryBlockProps {
  title?: string;
  count?: number;
  type?: "image" | "video";
}

export function GalleryBlock({ title = "Работы сообщества", count, type }: GalleryBlockProps) {
  return <CommunityGallery title={title} count={count} type={type} />;
}
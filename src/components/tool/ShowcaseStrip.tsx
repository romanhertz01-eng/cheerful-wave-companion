interface ShowcaseStripProps {
  images: string[];
}

export function ShowcaseStrip({ images }: ShowcaseStripProps) {
  if (!images.length) return null;
  return (
    <section className="py-8 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="no-scrollbar flex gap-3 overflow-x-auto snap-x px-4">
        {images.map((src, i) => (
          <div
            key={i}
            className="shrink-0 h-[220px] md:h-[300px] aspect-[3/4] rounded-xl overflow-hidden border border-white/10 snap-start"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ShowcaseStrip;
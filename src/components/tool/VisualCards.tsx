interface VisualCard {
  title: string;
  desc?: string;
  image: string;
}

interface VisualCardsProps {
  heading: string;
  sub?: string;
  cards: VisualCard[];
}

export function VisualCards({ heading, sub, cards }: VisualCardsProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-[32px] font-bold text-center">{heading}</h2>
      {sub && (
        <p className="mt-3 text-sm text-muted-foreground text-center max-w-2xl mx-auto">
          {sub}
        </p>
      )}

      <div className="mt-8 flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory md:overflow-visible md:snap-none -mx-4 px-4 md:mx-0 md:px-0">
        {cards.map((card) => (
          <article
            key={card.title}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 min-w-[75%] snap-center md:min-w-0"
          >
            <img
              src={card.image}
              alt={card.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-5">
              <h3 className="uppercase font-bold text-lg md:text-xl leading-tight text-white">
                {card.title}
              </h3>
              {card.desc && (
                <p className="text-sm text-white/70 mt-2 line-clamp-2">{card.desc}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default VisualCards;
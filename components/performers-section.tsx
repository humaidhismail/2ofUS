"use client";

type Performer = { name: string; image: string };

const performers: Performer[] = [
  { name: "Performer 1", image: "/P1.jpeg" },
  { name: "Performer 4", image: "/P4.jpeg" },
  { name: "Performer 5", image: "/P5.jpeg" },
  { name: "Performer 6", image: "/P6.jpeg" },
  { name: "Performer 7", image: "/P7.jpeg" },
  { name: "Performer 8", image: "/P8.jpeg" },
  { name: "Performer 9", image: "/P9.jpeg" },
];

export function PerformersSection() {
  // duplicate to create seamless marquee
  const duplicatedPerformers = [...performers, ...performers];

  return (
    <section
      className="relative pt-8 sm:pt-10 md:pt-12 pb-14 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
      aria-label="Performers"
    >
      {/* soft background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Header (tighter spacing) */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span
              className="bg-gradient-to-r from-magenta-400 via-cyan-400 to-gold-400 bg-clip-text text-transparent inline-block animate-gradientShift"
              style={{ backgroundSize: "200% 200%" }}
            >
              In the Spotlight
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Experience an unforgettable night with these incredible artists
          </p>
        </div>

        {/* Scrolling row */}
        <div className="relative">
          <div className="flex gap-4 sm:gap-6 animate-scrollLeft hover:[animation-play-state:paused]">
            {duplicatedPerformers.map((performer, index) => (
              <div
                key={`${performer.name}-${index}`}
                className="group relative rounded-2xl overflow-hidden border-2 border-border/50 hover:border-magenta-500 transition-all duration-500 hover:scale-105 flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px]"
              >
                {/* glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-magenta-500/0 via-cyan-500/0 to-gold-500/0 group-hover:from-magenta-500/30 group-hover:via-cyan-500/30 group-hover:to-gold-500/30 transition-all duration-500 blur-xl z-10 pointer-events-none" />

                {/* Portrait */}
                <div className="relative aspect-[3/4]">
                  <img
                    src={performer.image || "/placeholder.svg"}
                    alt={performer.name}
                    className="w-full h-full object-cover"
                  />
                  {/* bottom gradient for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80" />

                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20">
                    <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-magenta-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                      {performer.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        :global(.animate-gradientShift) {
          animation: gradientShift 6s linear infinite;
        }
        :global(.animate-scrollLeft) {
          animation: scrollLeft 30s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}

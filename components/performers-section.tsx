"use client"

const performers = [
  { name: "The Neon Waves", image: "/rock-band-performing-with-neon-lights.jpg" },
  { name: "Luna Eclipse", image: "/female-singer-with-cosmic-stage-lighting.jpg" },
  { name: "Cosmic Beats", image: "/dj-with-neon-turntables-and-lights.jpg" },
  { name: "Stellar Rhythm", image: "/alternative-rock-band-with-purple-stage-lights.jpg" },
  { name: "Electric Dreams", image: "/electric-rock-band-neon-stage.jpg" },
  { name: "Midnight Pulse", image: "/female-dj-purple-lights.jpg" },
]

export function PerformersSection() {
  const duplicatedPerformers = [...performers, ...performers]

  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-magenta-400 via-cyan-400 to-gold-400 bg-clip-text text-transparent">
            Tonight's Lineup
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Experience an unforgettable night with these incredible artists
          </p>
        </div>

        <div className="relative">
          {/* Scrolling container (edge fades removed) */}
          <div className="flex gap-4 sm:gap-6 animate-[scroll-left_30s_linear_infinite] hover:[animation-play-state:paused]">
            {duplicatedPerformers.map((performer, index) => (
              <div
                key={`${performer.name}-${index}`}
                className="group relative rounded-2xl overflow-hidden border-2 border-border/50 hover:border-magenta-500 transition-all duration-500 hover:scale-105 flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px]"
              >
                {/* Neon glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-magenta-500/0 via-cyan-500/0 to-gold-500/0 group-hover:from-magenta-500/30 group-hover:via-cyan-500/30 group-hover:to-gold-500/30 transition-all duration-500 blur-xl z-10 pointer-events-none" />

                {/* Portrait Image */}
                <div className="relative aspect-[3/4]">
                  <img
                    src={performer.image || "/placeholder.svg"}
                    alt={performer.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient overlay at bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80" />

                  {/* Performer name at bottom */}
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
    </section>
  )
}

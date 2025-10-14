"use client";

import Image from "next/image";

export function SponsorsSection() {
  const sponsors = [
    { name: "Maldives Sunny Side", logo: "/images/logo-maldives-sunny-side.jpg" },
    { name: "SSTV", logo: "/images/logo-sstv.jpg" },
    { name: "Me2 Films", logo: "/images/logo-me2-films.jpg" },
    { name: "Male City Council", logo: "/images/logo-male-city-council.jpg" },
    { name: "Maldives Centre", logo: "/images/logo-maldives-centre.jpg" },
    { name: "Island Perfume", logo: "/images/logo-island-perfume.jpg" },
    { name: "Azidon", logo: "/images/logo-azidon.jpg" },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-electric-purple/20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-electric-purple/10 via-transparent to-neon-magenta/10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-muted-grey"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            In Association With
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-electric-purple to-transparent mx-auto mt-4" />
        </div>

        {/* Centered logos (2 rows auto-centered) */}
        <div className="flex flex-wrap justify-center gap-x-14 gap-y-14 text-center">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="relative group flex flex-col items-center justify-center transition-transform duration-300 hover:scale-110"
            >
              {/* Neon hover glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-electric-blue/0 via-electric-purple/0 to-neon-magenta/0 group-hover:from-electric-blue/25 group-hover:via-electric-purple/25 group-hover:to-neon-magenta/25 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Logo */}
              <Image
                src={sponsor.logo || "/placeholder.svg"}
                alt={`${sponsor.name} logo`}
                width={180}  // Increased from 150
                height={100} // Increased from 80
                className="
                  h-14 sm:h-16 md:h-20 w-auto object-contain
                  opacity-85 grayscale group-hover:grayscale-0 group-hover:opacity-100
                  transition-all duration-300 relative z-10
                "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

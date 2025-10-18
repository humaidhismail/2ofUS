"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

/** Smart logo that tries multiple extensions, then shows a small placeholder */
function SmartLogo({
  basePath, // e.g. "/s1"
  alt,
}: {
  basePath: string;
  alt: string;
}) {
  const candidates = useMemo(
    () => [
      `${basePath}.png`,
      `${basePath}.PNG`,
      `${basePath}.jpg`,
      `${basePath}.jpeg`,
      `${basePath}.webp`,
    ],
    [basePath]
  );
  const [i, setI] = useState(0);
  const src = candidates[i];

  const onError = () => {
    if (i < candidates.length - 1) setI((n) => n + 1);
    else setI(candidates.length); // trigger placeholder
  };

  if (i >= candidates.length) {
    return (
      <div className="h-14 sm:h-16 md:h-20 w-[220px] rounded-xl border border-dashed border-white/30 text-white/60 text-xs flex items-center justify-center">
        {alt}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={220}
      height={110}
      sizes="(max-width:640px) 140px, (max-width:1024px) 180px, 220px"
      onError={onError}
      className="h-14 sm:h-16 md:h-20 w-auto object-contain opacity-85 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 relative z-10 [filter:drop-shadow(0_0_0.5rem_rgba(255,255,255,0.12))]"
    />
  );
}

export function SponsorsSection() {
  // s1..s15 with your alt names
  const sponsors = [
    { base: "/s14", name: "Maldives Sunny Side" },
    { base: "/s13", name: "SSTV" },
    { base: "/s10", name: "Me2 Films" },
    { base: "/s2",  name: "Malé City Council" },
    { base: "/s9",  name: "Maldives Centre" },
    { base: "/s6",  name: "Island Perfume" },
    { base: "/s1",  name: "Azidon" },
    { base: "/s3",  name: "Crepe Runner" },
    { base: "/s4",  name: "HIH" },
    { base: "/s5",  name: "ICCR" },
    { base: "/s7",  name: "Maagiri" },
    { base: "/s8",  name: "Madifushi" },
    { base: "/s11", name: "N9" },
    { base: "/s12", name: "Phat Katz" },
    { base: "/s15", name: "Volt" },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-electric-purple/20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-electric-purple/10 via-transparent to-neon-magenta/10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider gradient-text"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            In Association With
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-electric-purple to-transparent mx-auto mt-4" />
        </div>

        {/* Logos grid (forces all to render, wraps nicely) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-12 gap-y-12 text-center">
          {sponsors.map((s) => (
            <div
              key={s.base}
              className="relative group flex flex-col items-center justify-center transition-transform duration-300 hover:scale-110"
              title={s.name}
            >
              {/* Neon hover glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-electric-blue/0 via-electric-purple/0 to-neon-magenta/0 group-hover:from-electric-blue/25 group-hover:via-electric-purple/25 group-hover:to-neon-magenta/25 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Smart Logo */}
              <SmartLogo basePath={s.base} alt={`${s.name} logo`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

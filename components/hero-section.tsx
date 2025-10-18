"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatedLogo } from "@/components/animated-logo";

/** Tries several extensions; shows a small text placeholder if nothing loads. */
function SmartLogo({
  basePath,
  alt,
  heightClass = "h-10 sm:h-12 md:h-14",
}: {
  basePath: string; // e.g. "/s1"
  alt: string;
  heightClass?: string;
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
    if (i < candidates.length - 1) {
      setI((n) => n + 1);
    } else {
      setI(candidates.length);
    }
  };

  if (i >= candidates.length) {
    return (
      <div className={`${heightClass} w-[140px] sm:w-[170px] md:w-[200px] rounded-lg border border-dashed border-white/30 text-white/60 text-[10px] sm:text-xs flex items-center justify-center`}>
        {alt}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={300}
      height={120}
      onError={onError}
      sizes="(max-width:640px) 140px, (max-width:1024px) 180px, 220px"
      className={`${heightClass} w-auto object-contain grayscale opacity-90 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100`}
      priority={false}
    />
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // s1..s15 with your alt names
  const sponsors = [
    { base: "/s1",  name: "Azidon" },
    { base: "/s2",  name: "Malé City Council" },
    { base: "/s3",  name: "Crepe Runner" },
    { base: "/s4",  name: "HIH" },
    { base: "/s5",  name: "ICCR" },
    { base: "/s6",  name: "Island Perfume" },
    { base: "/s7",  name: "Maagiri" },
    { base: "/s8",  name: "Madifushi" },
    { base: "/s9",  name: "Maldives Centre" },
    { base: "/s10", name: "Me2" },
    { base: "/s11", name: "N9" },
    { base: "/s12", name: "Phat Katz" },
    { base: "/s13", name: "SSTV" },
    { base: "/s14", name: "Maldives Sunny Side" },
    { base: "/s15", name: "Volt" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background with motion blur effects */}
      <div className="absolute inset-0 bg-black">
        <Image
          src="/testdskbg.png"
          alt="Cosmic Background Desktop"
          fill
          className="hidden md:block object-cover opacity-60"
          priority
          quality={100}
        />
        <Image
          src="/mobilebg.png"
          alt="Cosmic Background Mobile"
          fill
          className="block md:hidden object-cover opacity-70"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-blue-500/20" />
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/20 via-transparent to-purple-500/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-5xl mx-auto">
            {/* Top logo */}
            <div className="flex justify-center">
              <Image
                src="/toplogo.png"
                alt="Dream Beyond Borders - Concierge Group Maldives Presents"
                width={800}
                height={400}
                className="w-full max-w-2xl h-auto"
                priority
              />
            </div>

            {/* Animated logo + show details overlap */}
            <div className="relative">
              <div className="relative z-10">
                <AnimatedLogo />
              </div>
              <div className="relative z-20 -mt-32 sm:-mt-40 md:-mt-48 flex justify-center">
                <Image
                  src="/images/show-details.png"
                  alt="7th NOV 2025 LIVE in Kuala Lumpur"
                  width={1000}
                  height={1000}
                  className="w-full max-w-3xl h-auto"
                  priority
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-8 sm:pt-12 pb-12 sm:pb-16 px-4">
              <Link href="/details" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#FF00FF] hover:bg-[#FF00FF]/90 text-white font-bold text-sm sm:text-base px-8 sm:px-12 py-5 sm:py-6 rounded-full shadow-[0_0_30px_rgba(255,0,255,0.6)] transition-all duration-300 hover:scale-105 uppercase tracking-wide"
                >
                  BOOK TICKETS
                </Button>
              </Link>
              <Link href="/details" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-bold text-sm sm:text-base px-8 sm:px-12 py-5 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 uppercase tracking-wide bg-transparent"
                >
                  SHOW DETAILS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling “Limited Tickets” banner — LEFT ➜ RIGHT */}
      <div className="relative z-20 bg-pink-500 py-2 overflow-hidden">
        <div className="tickets-marquee whitespace-nowrap">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="inline-block mx-8 text-white font-bold text-sm uppercase tracking-wider"
            >
              Limited Tickets
            </span>
          ))}
        </div>
      </div>

      {/* Scrolling sponsors bar (s1..s15, seamless + smooth) */}
      <div className="relative z-20 bg-black/90 py-4 border-t border-cyan-400/30 overflow-hidden">
        <div className="marquee-track">
          <div className="marquee-seq">
            {sponsors.map((s) => (
              <div key={`seq1-${s.base}`} className="group flex-shrink-0 mx-6" title={s.name}>
                <SmartLogo basePath={s.base} alt={`${s.name} logo`} />
              </div>
            ))}
          </div>
          <div className="marquee-seq" aria-hidden="true">
            {sponsors.map((s) => (
              <div key={`seq2-${s.base}`} className="group flex-shrink-0 mx-6" title={s.name}>
                <SmartLogo basePath={s.base} alt={`${s.name} logo`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Local CSS: sponsors marquee + LTR tickets banner */}
      <style jsx>{`
        /* Sponsors marquee (leftward for seamless loop) */
        .marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: sponsorsMarquee 28s linear infinite;
        }
        .marquee-seq {
          display: flex;
          align-items: center;
        }
        @keyframes sponsorsMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Limited Tickets: LEFT -> RIGHT */
        .tickets-marquee {
          display: inline-flex;
          will-change: transform;
          animation: ticketsLTR 50s linear infinite; /* adjust speed here */
        }
        @keyframes ticketsLTR {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </section>
  );
}

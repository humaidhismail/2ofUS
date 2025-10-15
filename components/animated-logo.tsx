"use client"

import Image from "next/image"

export function AnimatedLogo() {
  return (
    <div className="relative flex items-center justify-center mb-8 h-32 md:h-40 lg:h-48">
      {/* All letters start from center and zoom out to their positions */}

      {/* Letter 1 - zooms to far left */}
      <div className="absolute animate-slide-left-1 w-16 h-20 md:w-24 md:h-32 lg:w-32 lg:h-40">
        <Image src="/1.png" alt="2" fill className="object-contain" priority />
      </div>

      {/* Letter 2 - zooms to left */}
      <div className="absolute animate-slide-left-2 w-16 h-20 md:w-24 md:h-32 lg:w-32 lg:h-40">
        <Image src="/2.png" alt="0" fill className="object-contain" priority />
      </div>

      {/* Letter 3 - stays in center */}
      <div className="absolute animate-slide-right-1 w-16 h-20 md:w-24 md:h-32 lg:w-32 lg:h-40">
        <Image src="/3.png" alt="2" fill className="object-contain" priority />
      </div>

      {/* Letter 4 - zooms to right */}
      <div className="absolute animate-slide-right-2 w-16 h-20 md:w-24 md:h-32 lg:w-32 lg:h-40">
        <Image src="/4.png" alt="5" fill className="object-contain" priority />
      </div>

      {/* Letter 5 - zooms to far right */}
      <div className="absolute animate-slide-right-3 w-16 h-20 md:w-24 md:h-32 lg:w-32 lg:h-40">
        <Image src="/5.png" alt="" fill className="object-contain" priority />
      </div>
    </div>
  )
}

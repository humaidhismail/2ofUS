"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

/** Minimal TikTok glyph (inline SVG) to match Lucide’s look */
function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M14 4v9.5a3.75 3.75 0 1 1-3.75-3.75c.64 0 1.23.16 1.75.45V4h2z" />
      <path d="M14 7.5c1.4 1.7 3.2 2.6 5 2.8" />
    </svg>
  );
}

export function Footer() {
  const socialLinks = [
    {
      key: "facebook",
      icon: Facebook,
      href: "https://web.facebook.com/profile.php?id=61575947713964",
      label: "Facebook",
    },
    {
      key: "instagram",
      icon: Instagram,
      href: "https://www.instagram.com/2ofus.mv/?hl=en",
      label: "Instagram",
    },
    {
      key: "tiktok",
      icon: TikTokIcon,
      href: "https://www.tiktok.com/@2ofusmv?is_from_webapp=1&sender_device=pc",
      label: "TikTok",
    },
  ];

  return (
    <footer className="border-t border-electric-purple/20 py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3
              className="text-xl sm:text-2xl font-bold gradient-text uppercase"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              2OFUS
            </h3>
            <p className="text-muted-grey text-xs sm:text-sm mt-2">
              Dream Beyond Borders
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 sm:gap-4">
            {socialLinks.map(({ key, icon: Icon, href, label }) => (
              <Link
                key={key}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface border border-electric-purple/30 flex items-center justify-center text-muted-grey hover:text-neon-magenta hover:border-neon-magenta transition-all duration-300 hover:scale-110"
                title={label}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <p className="text-muted-grey text-xs sm:text-sm">
              Contact:{" "}
              <a href="mailto:2ofus.mv@gmail.com" className="underline">
                2ofus.mv@gmail.com
              </a>
            </p>
            <p className="text-muted-grey text-xs sm:text-sm mt-1">
              © 2025 All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

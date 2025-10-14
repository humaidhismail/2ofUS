import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

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
              Dream Beyond Borders
            </h3>
            <p className="text-muted-grey text-xs sm:text-sm mt-2">Live Concert Experience 2025</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 sm:gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface border border-electric-purple/30 flex items-center justify-center text-muted-grey hover:text-neon-magenta hover:border-neon-magenta transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              )
            })}
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <p className="text-muted-grey text-xs sm:text-sm">Contact: info@dreambeyondborders.com</p>
            <p className="text-muted-grey text-xs sm:text-sm mt-1">© 2025 All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

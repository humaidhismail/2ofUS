import { Calendar, MapPin, Users } from "lucide-react"
import { Card } from "@/components/ui/card"

export function ConcertInfo() {
  const details = [
    {
      icon: Calendar,
      label: "Date",
      value: "7th November 2025",
      color: "text-neon-magenta",
    },
    {
      icon: MapPin,
      label: "Venue",
      value: "Stage 1 Theatre, Petaling Jaya Performing Arts Centre",
      color: "text-electric-blue",
    },
    {
      icon: Users,
      label: "Capacity",
      value: "684 Seats",
      color: "text-hot-pink",
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto max-w-6xl">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10 sm:mb-12 md:mb-16 uppercase gradient-text"
          style={{ fontFamily: "var(--font-anton)" }}
        >
          Event Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {details.map((detail, index) => {
            const Icon = detail.icon
            return (
              <Card
                key={index}
                className="bg-surface border-electric-purple/30 p-6 hover:border-electric-purple transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`${detail.color} p-3 rounded-full bg-background/50`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-muted-grey text-sm uppercase tracking-wider mb-1">{detail.label}</p>
                    <p className="text-white font-bold text-lg">{detail.value}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* About section */}
        <div className="mt-12 sm:mt-16 bg-surface border border-electric-purple/30 rounded-lg p-6 sm:p-8 md:p-12">
          <h3
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-neon-magenta uppercase"
            style={{ fontFamily: "var(--font-anton)" }}
          >
            About the Show
          </h3>
          <p className="text-muted-grey text-base sm:text-lg leading-relaxed mb-4">
            Experience an unforgettable night of music as 2ofus brings you the most anticipated concert of 2025. Dream
            Beyond Borders is not just a concert—it's a journey through sound, light, and emotion.
          </p>
          <p className="text-muted-grey text-base sm:text-lg leading-relaxed">
            Join us for an electrifying performance featuring cutting-edge production, stunning visuals, and a setlist
            that will take you on a sonic adventure you'll never forget.
          </p>
        </div>
      </div>
    </section>
  )
}

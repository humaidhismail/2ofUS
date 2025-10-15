import { HeroSection } from "@/components/hero-section";
import { ConcertInfo } from "@/components/concert-info";
import { TicketCategories } from "@/components/ticket-categories";
import { SponsorsSection } from "@/components/sponsors-section";
import { Footer } from "@/components/footer";
import { PerformersSection } from "@/components/performers-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <HeroSection />
    

      {/* Concert Info */}
      <ConcertInfo />



      {/* Ticket Categories */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <TicketCategories />
      </section>
            {/* Performers */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <PerformersSection />
      </section>

      {/* Sponsors */}
      <SponsorsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import {
  Introduction,
  DealerStory,
  Process,
  Questions,
  QuoteSection,
} from "@/components/TransportStory";
export default function Home() {
  return (
    <div className="ark-redesign">
      <Hero />
      <Introduction />
      <div className="ark-trust-strip">
        <span>NATIONWIDE TRANSPORT</span>
        <b>•</b>
        <span>INSURED CARRIERS</span>
        <b>•</b>
        <span>OPEN &amp; ENCLOSED</span>
        <b>•</b>
        <span>DEDICATED SUPPORT</span>
      </div>
      <Services />
      <DealerStory />
      <Process />
      <div className="ark-testimonials">
        <Testimonials />
      </div>
      <Questions />
      <QuoteSection />
    </div>
  );
}

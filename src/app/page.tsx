import { Hero } from "@/components/Hero";
import { WhyChoose } from "@/components/WhyChoose";
import { Services } from "@/components/Services";
import { ForDealerships } from "@/components/ForDealerships";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChoose />
      <Services />
      <ForDealerships />
      <Testimonials />
    </>
  );
}

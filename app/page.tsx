import { buildJsonLd } from "@/lib/schema";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { Awareness } from "@/components/sections/Awareness";
import { Problem } from "@/components/sections/Problem";
import { Approach } from "@/components/sections/Approach";
import { LookFor } from "@/components/sections/LookFor";
import { Demo } from "@/components/sections/Demo";
import { System } from "@/components/sections/System";
import { Founder } from "@/components/sections/Founder";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }} />
      <Header />
      <main id="contenu">
        <Hero />
        <Awareness />
        <Problem />
        <Approach />
        <LookFor />
        <Demo />
        <System />
        <Founder />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

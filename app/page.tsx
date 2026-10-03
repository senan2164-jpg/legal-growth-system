import { buildJsonLd } from "@/lib/schema";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MobileCta } from "@/components/ui/MobileCta";
import { Hero } from "@/components/sections/Hero";
import { ClientJourney } from "@/components/sections/ClientJourney";
import { VisibilityDashboard } from "@/components/sections/VisibilityDashboard";
import { SearchIntelligence } from "@/components/sections/SearchIntelligence";
import { Competition } from "@/components/sections/Competition";
import { LegalGrowthSystem } from "@/components/sections/LegalGrowthSystem";
import { Specialties } from "@/components/sections/Specialties";
import { OpportunityMap } from "@/components/sections/OpportunityMap";
import { GrowthMethod } from "@/components/sections/GrowthMethod";
import { Role } from "@/components/sections/Role";
import { DemonstrationReport } from "@/components/sections/DemonstrationReport";
import { WhatWeLook } from "@/components/sections/WhatWeLook";
import { FounderSection } from "@/components/sections/FounderSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }} />
      <ScrollProgress />
      <Header />
      <main id="contenu">
        <Hero />
        <ClientJourney />
        <VisibilityDashboard />
        <SearchIntelligence />
        <Competition />
        <LegalGrowthSystem />
        <Specialties />
        <OpportunityMap />
        <GrowthMethod />
        <Role />
        <DemonstrationReport />
        <WhatWeLook />
        <FounderSection />
        <FinalCta />
        <Faq />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}

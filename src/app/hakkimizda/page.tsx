import type { Metadata } from "next";

import { AboutCTA } from "@/features/about/components/about-cta";
import { AboutElements } from "@/features/about/components/about-elements";
import { AboutHero } from "@/features/about/components/about-hero";
import { AboutJourney } from "@/features/about/components/about-journey";
import { AboutManifesto } from "@/features/about/components/about-manifesto";
import { AboutValues } from "@/features/about/components/about-values";
import { AboutVisual } from "@/features/about/components/about-visual";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Tasavvuf musikisini bugünün estetiğiyle yeniden yorumlayan Neyleyim topluluğunun hikâyesi.",
};

export default function HakkimizdaPage() {
  return (
    <main className="flex flex-1 flex-col">
      <AboutHero />
      <AboutManifesto />
      <AboutElements />
      <AboutVisual />
      <AboutValues />
      <AboutJourney />
      <AboutCTA />
    </main>
  );
}

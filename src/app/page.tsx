import { Hero } from "@/features/home/components/hero";
import { Instruments } from "@/features/home/components/instruments";
import { Manifesto } from "@/features/home/components/manifesto";
import { Memories } from "@/features/home/components/memories";
import { ProgramsPreview } from "@/features/home/components/programs-preview";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Manifesto />
      <Instruments />
      <ProgramsPreview />
      <Memories />
      {/* Anchor for navbar iletişim link — full section later */}
      <div id="iletisim" className="sr-only" tabIndex={-1} />
    </main>
  );
}

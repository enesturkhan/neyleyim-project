import { Hero } from "@/features/home/components/hero";
import { Manifesto } from "@/features/home/components/manifesto";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Manifesto />
      {/* Anchor for navbar iletişim link — full section later */}
      <div id="iletisim" className="sr-only" tabIndex={-1} />
    </main>
  );
}

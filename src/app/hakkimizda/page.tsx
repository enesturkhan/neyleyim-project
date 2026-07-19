import type { Metadata } from "next";

import { Container } from "@/components/layout";

export const metadata: Metadata = {
  title: "Hakkımızda",
};

export default function HakkimizdaPage() {
  return (
    <main className="flex flex-1 flex-col pt-[var(--navbar-height)]">
      <Container width="standard" className="py-20 md:py-28">
        <p className="label text-accent">Neyleyim</p>
        <h1 className="heading-lg mt-4 text-foreground">Hakkımızda</h1>
        <p className="body-lg mt-6 max-w-xl text-foreground-soft">
          Bu sayfa yakında tamamlanacak. Topluluğun hikâyesi burada yer
          alacak.
        </p>
      </Container>
    </main>
  );
}

import type { Metadata } from "next";

import { Container } from "@/components/layout";
import { Button, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tasarım Sistemi",
  description:
    "Neyleyim görsel dili — nefes, boşluk, ışık ve dinginlik üzerine kurulu dijital kimlik.",
};

const colors = [
  { name: "--background", value: "#F3F0E8", className: "bg-background border border-border" },
  { name: "--background-soft", value: "#E9E4D8", className: "bg-background-soft" },
  { name: "--surface", value: "#F8F5EE", className: "bg-surface border border-border" },
  { name: "--surface-muted", value: "#DDD5C6", className: "bg-surface-muted" },
  { name: "--foreground", value: "#252821", className: "bg-foreground" },
  { name: "--foreground-soft", value: "#555A50", className: "bg-foreground-soft" },
  { name: "--muted-foreground", value: "#74766F", className: "bg-muted-foreground" },
  { name: "--accent", value: "#9B8965", className: "bg-accent" },
  { name: "--accent-soft", value: "#CBBE9F", className: "bg-accent-soft" },
  { name: "--sage", value: "#A8AD9D", className: "bg-sage" },
  { name: "--dark-section", value: "#252821", className: "bg-dark-section" },
  {
    name: "--border",
    value: "rgba(37,40,33,0.14)",
    className: "bg-surface border-2 border-border",
  },
] as const;

const spacing = [
  { label: "4", px: 4 },
  { label: "8", px: 8 },
  { label: "12", px: 12 },
  { label: "16", px: 16 },
  { label: "24", px: 24 },
  { label: "32", px: 32 },
  { label: "48", px: 48 },
  { label: "64", px: 64 },
  { label: "96", px: 96 },
] as const;

export default function StyleGuidePage() {
  return (
    <main className="pb-24 md:pb-32">
      <header className="border-b border-border bg-background py-16 md:py-24">
        <Container width="wide" className="max-w-3xl space-y-6">
          <p className="label text-accent">Tasarım Sistemi</p>
          <h1 className="display-section text-foreground">
            Neyleyim görsel dili
          </h1>
          <p className="body-lg text-foreground-soft">
            Modern tasavvuf musikisini; nefes, boşluk, ışık ve dinginlik
            üzerinden anlatan sade bir dijital kimlik.
          </p>
        </Container>
      </header>

      {/* 01 Renkler */}
      <section
        className="border-b border-border bg-background py-16 md:py-24"
        aria-labelledby="renkler"
      >
        <Container width="wide" className="space-y-12">
          <div className="max-w-2xl space-y-4">
            <p className="label text-accent">01</p>
            <h2 id="renkler" className="heading-lg">
              Renkler
            </h2>
            <p className="body-md text-foreground-soft">
              Fildişi, taş, kum ve parşömen üzerine kurulu aydınlık bir palet.
              Zeytin ve bronz yalnızca vurgu için kullanılır; parlak altın yoktur.
            </p>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {colors.map((color) => (
              <li key={color.name} className="space-y-3">
                <div className={`aspect-[5/3] ${color.className}`} />
                <div className="space-y-1">
                  <p className="font-sans text-sm font-medium text-foreground">
                    {color.name}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {color.value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 02 Tipografi */}
      <section
        className="border-b border-border bg-background-soft py-16 md:py-24"
        aria-labelledby="tipografi"
      >
        <Container width="wide" className="space-y-14">
          <div className="max-w-2xl space-y-4">
            <p className="label text-accent">02</p>
            <h2 id="tipografi" className="heading-lg">
              Tipografi
            </h2>
            <p className="body-md text-foreground-soft">
              Instrument Serif duygusal başlıklar için; Geist gövde, etiket ve
              arayüz için. Her başlık abartılmaz; ritim nefes gibi ölçülüdür.
            </p>
          </div>

          <div className="space-y-12">
            <figure className="space-y-3 border-t border-border pt-8">
              <figcaption className="label text-muted-foreground">
                display-hero
              </figcaption>
              <p className="display-hero text-foreground">Neyleyim</p>
            </figure>

            <figure className="space-y-3 border-t border-border pt-8">
              <figcaption className="label text-muted-foreground">
                display-section
              </figcaption>
              <p className="display-section max-w-3xl text-foreground">
                Nefesten nağmeye
              </p>
            </figure>

            <figure className="space-y-3 border-t border-border pt-8">
              <figcaption className="label text-muted-foreground">
                heading-lg
              </figcaption>
              <p className="heading-lg max-w-2xl text-foreground">
                Ney, kudüm ve bendirin aynı nefeste buluşması
              </p>
            </figure>

            <div className="grid gap-10 border-t border-border pt-8 md:grid-cols-2">
              <figure className="space-y-3">
                <figcaption className="label text-muted-foreground">
                  heading-md
                </figcaption>
                <p className="heading-md text-foreground">
                  Dinleyiciyle paylaşılan sessizlik
                </p>
              </figure>
              <figure className="space-y-3">
                <figcaption className="label text-muted-foreground">
                  label
                </figcaption>
                <p className="label text-accent">Nefesin İzinde</p>
              </figure>
              <figure className="space-y-3 md:col-span-2">
                <figcaption className="label text-muted-foreground">
                  body-lg / body-md
                </figcaption>
                <p className="body-lg max-w-2xl text-foreground-soft">
                  Her icra, uzun bir nefes gibi akar: ölçülü, yankılı ve
                  tamamlanmamış — dinleyicide yer bırakacak kadar açık.
                </p>
                <p className="body-md mt-4 max-w-xl text-muted-foreground">
                  Geleneksel enstrümanlar çağdaş bir sahne düzeninde buluşur;
                  gösteriş değil, huzur aranır.
                </p>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      {/* 03 Boşluk ve yerleşim */}
      <section
        className="border-b border-border bg-background py-16 md:py-24"
        aria-labelledby="bosluk"
      >
        <Container width="standard" className="space-y-12">
          <div className="max-w-2xl space-y-4">
            <p className="label text-accent">03</p>
            <h2 id="bosluk" className="heading-lg">
              Boşluk ve yerleşim
            </h2>
            <p className="body-md text-foreground-soft">
              Geniş boşluk bir lüks değil, nefes alanıdır. İçerik ölçülü
              hizalanır; yarım sayfa boşluk bırakılmaz.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4 bg-surface p-8">
              <p className="label text-muted-foreground">Konteyner</p>
              <ul className="body-md space-y-2 text-foreground-soft">
                <li>Geniş: 1600px</li>
                <li>Standart: 1280px</li>
                <li>Kenar boşluğu: 20 / 32 / 64px</li>
              </ul>
            </div>
            <div className="space-y-5 bg-surface p-8">
              <p className="label text-muted-foreground">Ölçek</p>
              <ul className="space-y-3">
                {spacing.map((step) => (
                  <li key={step.label} className="flex items-center gap-4">
                    <span className="w-10 font-mono text-xs text-muted-foreground">
                      {step.label}
                    </span>
                    <span
                      className="h-2.5 bg-accent/70"
                      style={{ width: step.px }}
                      aria-hidden
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 04 Butonlar ve bağlantılar */}
      <section
        className="border-b border-border bg-background-soft py-16 md:py-24"
        aria-labelledby="butonlar"
      >
        <Container width="standard" className="space-y-12">
          <div className="max-w-2xl space-y-4">
            <p className="label text-accent">04</p>
            <h2 id="butonlar" className="heading-lg">
              Butonlar ve bağlantılar
            </h2>
            <p className="body-md text-foreground-soft">
              Sakin, sade ve net. Parıltı yok; abartılı büyüme yok.
            </p>
          </div>

          <div className="space-y-8 bg-surface p-8 md:p-10">
            <div className="max-w-lg space-y-3">
              <p className="heading-md text-foreground">
                Bir sonraki programa katılın
              </p>
              <p className="body-md text-foreground-soft">
                Takvimdeki icraları inceleyin ya da topluluğun hikâyesini
                okumaya başlayın.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button type="button">Programları Gör</Button>
              <Button type="button" variant="secondary">
                Hikâyemizi Keşfet
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 border-t border-border pt-6">
              <TextLink href="/about">Hikâyemizi Keşfet</TextLink>
              <TextLink href="/events">Programları Gör</TextLink>
            </div>
          </div>
        </Container>
      </section>

      {/* 05 Açık bölüm */}
      <section
        className="border-b border-border bg-background py-16 md:py-24"
        aria-labelledby="acik"
      >
        <Container width="wide" className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="space-y-5 lg:col-span-6">
            <p className="label text-accent">05</p>
            <h2 id="acik" className="display-section text-foreground">
              Açık bölüm
            </h2>
            <p className="body-lg max-w-md text-foreground-soft">
              Varsayılan zemin aydınlıktır. Metin okunaklı, yüzeyler sıcak ve
              sakin kalır — parşömen gibi.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            <div className="min-h-40 bg-surface p-6">
              <p className="label text-muted-foreground">surface</p>
              <p className="body-md mt-3 text-foreground-soft">
                İçerik için yumuşak düzlem
              </p>
            </div>
            <div className="min-h-40 bg-surface-muted p-6">
              <p className="label text-muted-foreground">surface-muted</p>
              <p className="body-md mt-3 text-foreground-soft">
                Taş ve kum dokusu
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 06 Koyu bölüm — tek kontrollü kontrast */}
      <section className="theme-dark py-16 md:py-24" aria-labelledby="koyu">
        <Container width="wide" className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="space-y-5 lg:col-span-7">
            <p className="label text-accent">06</p>
            <h2 id="koyu" className="display-section">
              Koyu bölüm
            </h2>
            <p className="body-lg max-w-xl text-foreground-soft">
              Derin zeytin yalnızca bilinçli kontrast için kullanılır. Saf siyah
              yoktur; sahne karanlığı sıcak ve ölçülüdür.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button type="button">Dinlemeye Başla</Button>
              <Button type="button" variant="secondary">
                Daha Fazla
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] w-full max-w-md border border-border bg-surface lg:ml-auto">
              <div className="flex h-full flex-col justify-between p-6">
                <p className="label text-muted-foreground">Kontrast yüzeyi</p>
                <p className="font-display text-2xl leading-snug tracking-[-0.02em]">
                  Nefesin izinde, ışığın kenarında
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

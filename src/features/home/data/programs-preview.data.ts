export type ProgramStatus = "upcoming" | "completed" | "cancelled";

export type ProgramPreviewItem = {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  image?: string;
  status: ProgramStatus;
};

export const programsPreviewIntro = {
  eyebrow: "YAKLAŞAN PROGRAMLAR",
  title: ["Sesi,", "sahnede", "hissedin."],
  lead: [
    "Neyleyim’in yaklaşan programlarını keşfedin;",
    "tasavvuf musikisinin nefes, ritim ve sözle",
    "buluştuğu gecelerde yerinizi alın.",
  ],
  cta: {
    label: "Tüm Programları Gör",
    href: "/programlar",
  },
} as const;

/** Temporary sample data — replaceable by Strapi later */
export const programsPreviewItems: ProgramPreviewItem[] = [
  {
    id: "prog-1",
    slug: "tasavvuf-musikisi-gecesi-sakarya",
    title: "Tasavvuf Musikisi Gecesi",
    shortDescription: "Ney, ritim ve sözün aynı gönülde buluştuğu bir gece.",
    date: "2026-08-14",
    time: "20:30",
    venue: "Sakarya Kültür Merkezi",
    city: "Sakarya",
    status: "upcoming",
  },
  {
    id: "prog-2",
    slug: "mesk-aksami-istanbul",
    title: "Meşk Akşamı",
    shortDescription: "Gelenekten sahnede nefes alan bir meşk yolculuğu.",
    date: "2026-08-22",
    time: "21:00",
    venue: "İstanbul Sahne",
    city: "İstanbul",
    status: "upcoming",
  },
  {
    id: "prog-3",
    slug: "nefes-ve-nagme-bursa",
    title: "Nefes ve Nağme",
    shortDescription: "Nefesten nağmeye uzanan sakin bir sahne akışı.",
    date: "2026-09-05",
    time: "20:00",
    venue: "Bursa Kültür Salonu",
    city: "Bursa",
    status: "upcoming",
  },
];

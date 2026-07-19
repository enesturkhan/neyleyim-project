export type MemoryAlignment = "left" | "right" | "center";

export type MemoryRatio = "4/5" | "16/10" | "1/1" | "3/4" | "5/3";

export type MemoryItem = {
  id: string;
  title?: string;
  location: string;
  year: string;
  /** Real photograph path — omit until assets arrive */
  image?: string;
  alt: string;
  ratio: MemoryRatio;
  alignment: MemoryAlignment;
  /** Desktop block width as a percentage of the content column */
  width: number;
  description?: string;
  /** Visual tone for CSS placeholders (1–5) */
  tone: 1 | 2 | 3 | 4 | 5;
};

export const memoriesIntro = {
  eyebrow: "ANLAR",
  title: ["Bazı geceler,", "yalnızca", "hatırlanır."],
  lead: [
    "Her sahne,",
    "aynı ezgiyi tekrar etmez.",
    "",
    "Her buluşma,",
    "başka bir hikâyeye dönüşür.",
  ],
} as const;

/** Temporary memory frames — replace `image` when photographs arrive */
export const memories: MemoryItem[] = [
  {
    id: "mem-1",
    title: "Tasavvuf Musikisi Gecesi",
    location: "Sakarya",
    year: "2026",
    alt: "Sakarya’da bir tasavvuf musikisi gecesinden anı",
    ratio: "4/5",
    alignment: "left",
    width: 70,
    description: "Işık ve nefesin ilk buluşması.",
    tone: 1,
  },
  {
    id: "mem-2",
    title: "Meşk Akşamı",
    location: "İstanbul",
    year: "2026",
    alt: "İstanbul’da bir meşk akşamından anı",
    ratio: "16/10",
    alignment: "right",
    width: 60,
    description: "Sözün yavaşça sahneye indiği an.",
    tone: 2,
  },
  {
    id: "mem-3",
    title: "Nefes ve Nağme",
    location: "Bursa",
    year: "2025",
    alt: "Bursa’da nefes ve nağme buluşmasından anı",
    ratio: "1/1",
    alignment: "center",
    width: 75,
    description: "Sessizliğin ritme dönüştüğü gece.",
    tone: 3,
  },
  {
    id: "mem-4",
    location: "Ankara",
    year: "2025",
    alt: "Ankara’da bir Neyleyim sahnesinden anı",
    ratio: "3/4",
    alignment: "left",
    width: 55,
    description: "Salonun kenarında kalan sıcak ışık.",
    tone: 4,
  },
  {
    id: "mem-5",
    title: "Yaz Buluşması",
    location: "İzmir",
    year: "2024",
    alt: "İzmir’de bir yaz buluşmasından anı",
    ratio: "5/3",
    alignment: "right",
    width: 72,
    description: "Akşamın sonunda kalan bir hatıra.",
    tone: 5,
  },
];

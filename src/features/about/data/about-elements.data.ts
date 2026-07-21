export type AboutElement = {
  id: string;
  title: string;
  description: readonly string[];
};

export const aboutElementsIntro = {
  eyebrow: "Nefesin Unsurları",
  title: ["Bir eser,", "yalnızca duyulan", "seslerden oluşmaz."],
  lead: [
    "Nefes, ses, ritim ve sessizlik;",
    "aynı duygunun farklı hâlleridir.",
  ],
} as const;

export const aboutElements: AboutElement[] = [
  {
    id: "nefes",
    title: "Nefes",
    description: [
      "Her şey, görünmeyen",
      "bir hareketle başlar.",
      "Nefes, sesin ilk hâlidir.",
    ],
  },
  {
    id: "ses",
    title: "Ses",
    description: [
      "Bir duygunun",
      "duyulabilir hâle geldiği",
      "ilk karşılaşma.",
    ],
  },
  {
    id: "ritim",
    title: "Ritim",
    description: [
      "Kalbin, zamanın",
      "ve topluluğun",
      "ortak yürüyüşü.",
    ],
  },
  {
    id: "sessizlik",
    title: "Sessizlik",
    description: [
      "Müziğin bittiği değil,",
      "anlamın derinleştiği yer.",
    ],
  },
];

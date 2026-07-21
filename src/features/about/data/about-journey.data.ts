export type AboutJourneyStep = {
  id: string;
  title: string;
  description: readonly string[];
};

export const aboutJourneyIntro = {
  eyebrow: "Yolculuk",
  title: ["Her yol,", "tek bir nefesle başlar."],
  lead: [
    "Bazen bir mecliste,",
    "bazen bir sahnede,",
    "ama daima aynı duygunun izinde.",
  ],
} as const;

export const aboutJourneySteps: AboutJourneyStep[] = [
  {
    id: "nefes",
    title: "Bir nefesle başladı.",
    description: [
      "Sessizliğin içinden",
      "doğan ilk ezgi,",
      "her şeyin başlangıcı oldu.",
    ],
  },
  {
    id: "birlikte",
    title: "Birlikte büyüdü.",
    description: [
      "Her buluşma,",
      "aynı duyguyu paylaşan",
      "insanları bir araya getirdi.",
    ],
  },
  {
    id: "sahne",
    title: "Sahnelerde yankılandı.",
    description: [
      "Paylaşılan her eser,",
      "dinleyenlerin hafızasında",
      "yeni bir iz bıraktı.",
    ],
  },
  {
    id: "devam",
    title: "Yol devam ediyor.",
    description: [
      "Her yeni program,",
      "aynı yolculuğun",
      "yeni bir nefesi.",
    ],
  },
];

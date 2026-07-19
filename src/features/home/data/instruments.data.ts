export type InstrumentId = "ney" | "bendir" | "kudum" | "keman";

export type InstrumentBackgroundVariant =
  | "reeds"
  | "circles"
  | "drums"
  | "curves";

export type Instrument = {
  id: InstrumentId;
  index: number;
  title: string;
  subtitle: string;
  description: string;
  themeColor: string;
  backgroundVariant: InstrumentBackgroundVariant;
  audioSrc: string;
  audioLabel: string;
  audioDuration: number;
};

export const instrumentsIntro = {
  eyebrow: "Enstrümanlar",
  title: ["Her nefes,", "başka bir sese dönüşür."],
  lead: [
    "Tasavvuf musikisinin ruhunu oluşturan",
    "her enstrüman,",
    "aynı hikâyenin farklı bir sesidir.",
  ],
} as const;

export const instruments: Instrument[] = [
  {
    id: "ney",
    index: 1,
    title: "Ney",
    subtitle: "Nefesin yolu",
    description:
      "İnce bir kamıştan yükselen nefes; tasavvuf musikisinin en sade ve en derin sesidir.",
    themeColor: "#5F7654",
    backgroundVariant: "reeds",
    audioSrc: "/audio/instruments/ney-preview.mp3",
    audioLabel: "Ney sesi ön izlemesi",
    audioDuration: 4,
  },
  {
    id: "bendir",
    index: 2,
    title: "Bendir",
    subtitle: "Ritmin çevresi",
    description:
      "Geniş bir dairenin yumuşak nabzı; mekânı saran, kalbe dokunan bir ritim hissi.",
    themeColor: "#A18E68",
    backgroundVariant: "circles",
    audioSrc: "/audio/instruments/bendir-preview.mp3",
    audioLabel: "Bendir sesi ön izlemesi",
    audioDuration: 4,
  },
  {
    id: "kudum",
    index: 3,
    title: "Kudüm",
    subtitle: "İki nabız",
    description:
      "İki dengeli formun diyaloğu; geleneğin ritmini net, saygılı ve kararlı tutar.",
    themeColor: "#8B7355",
    backgroundVariant: "drums",
    audioSrc: "/audio/instruments/kudum-preview.mp3",
    audioLabel: "Kudüm sesi ön izlemesi",
    audioDuration: 4,
  },
  {
    id: "keman",
    index: 4,
    title: "Keman",
    subtitle: "Akışkan hat",
    description:
      "İnce çizgilerin zarif hareketi; nağmeyi uzatan, duygusu akıcı bir ses katmanı.",
    themeColor: "#6B7268",
    backgroundVariant: "curves",
    audioSrc: "/audio/instruments/keman-preview.mp3",
    audioLabel: "Keman sesi ön izlemesi",
    audioDuration: 4,
  },
];

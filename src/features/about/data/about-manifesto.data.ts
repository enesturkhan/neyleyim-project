export type AboutManifestoStatement = {
  id: string;
  lines: readonly string[];
};

export const aboutManifestoContent = {
  statements: [
    {
      id: "statement-1",
      lines: ["Müzik bizim için", "bir gösteri değildir."],
    },
    {
      id: "statement-2",
      lines: ["Bir nefestir."],
    },
    {
      id: "statement-3",
      lines: ["Bir duruştur."],
    },
    {
      id: "statement-4",
      lines: ["Bir yolculuktur."],
    },
  ] satisfies AboutManifestoStatement[],
  closing: [
    "Her ezgi,",
    "kendi hikâyesini anlatırken,",
    "aynı nefeste buluşan insanların",
    "ortak duygusuna dönüşür.",
  ],
} as const;

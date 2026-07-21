export type AboutValue = {
  id: string;
  title: string;
  description: readonly string[];
};

export const aboutValuesIntro = {
  eyebrow: "Bizim İçin",
  title: ["Birlikte ürettiğimiz", "her şeyin temelinde", "aynı değerler var."],
  lead: [
    "Sahnedeki tavrımızı,",
    "repertuvarımızı ve birlikte",
    "kurduğumuz dili bu değerler biçimlendirir.",
  ],
} as const;

export const aboutValues: AboutValue[] = [
  {
    id: "samimiyet",
    title: "Samimiyet",
    description: [
      "Gösterişten uzak,",
      "duyguyla kurulan",
      "gerçek bir bağ.",
    ],
  },
  {
    id: "sadelik",
    title: "Sadelik",
    description: [
      "Fazlalığı azaltarak",
      "özde kalan sesi",
      "duyulur kılmak.",
    ],
  },
  {
    id: "ihlas",
    title: "İhlas",
    description: [
      "Müziği yalnızca",
      "duyurmak için değil,",
      "hissettirmek için paylaşmak.",
    ],
  },
  {
    id: "ustalik",
    title: "Ustalık",
    description: [
      "Geleneğe saygıyı,",
      "disiplini ve sürekli",
      "öğrenmeyi birlikte taşımak.",
    ],
  },
  {
    id: "paylasmak",
    title: "Paylaşmak",
    description: [
      "Sahnede oluşan duyguyu",
      "dinleyen herkesle",
      "aynı nefeste buluşturmak.",
    ],
  },
];

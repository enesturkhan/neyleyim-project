/**
 * Structured attribution for temporary prototype audio that requires credit.
 * Ready for future Footer / Credits rendering — not displayed yet.
 */

export type AudioAttribution = {
  file: string;
  instrument: string;
  title: string;
  creator: string;
  sourceName: string;
  sourceUrl: string;
  licenseName: string;
  licenseUrl: string;
};

export const audioAttributions: AudioAttribution[] = [
  {
    file: "kudum-preview.mp3",
    instrument: "Kudüm",
    title: "kudum.wav",
    creator: "xserra",
    sourceName: "Freesound",
    sourceUrl: "https://freesound.org/people/xserra/sounds/115397/",
    licenseName: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  {
    file: "keman-preview.mp3",
    instrument: "Keman",
    title: "Violin sounds and techniques.ogg",
    creator: "Alex Dee",
    sourceName: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Violin_sounds_and_techniques.ogg",
    licenseName: "CC BY 2.5",
    licenseUrl: "https://creativecommons.org/licenses/by/2.5/",
  },
];

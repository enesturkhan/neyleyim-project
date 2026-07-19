export type CaneZone = "left" | "center" | "right";

export type CaneConfig = {
  id: string;
  x: number;
  width: number;
  rotate: number;
  height: number;
  top: number;
  opacity: number;
  activeOpacity: number;
  holes: number[];
  zone: CaneZone;
  blur?: number;
};

export const heroContent = {
  eyebrow: "Nefesin İzinde",
  title: "Neyleyim",
  statement: ["Nefesten nağmeye,", "nağmeden gönüle."],
  description:
    "Ney, ritim ve sözün aynı gönülde buluştuğu bir tasavvuf musikisi yolculuğu.",
  primaryCta: {
    label: "Hikâyemizi Keşfet",
    href: "/hakkimizda",
  },
  secondaryCta: {
    label: "Programları Gör",
    href: "/programlar",
  },
} as const;

export const neyGreen = {
  deep: "#2D5637",
  primary: "#46754B",
  mid: "#6D996B",
  soft: "#A6C09F",
  pale: "#D8E5D3",
} as const;

/** Large desktop — 22 canes */
export const canesDesktop: CaneConfig[] = [
  // Left — lower density, still visible
  { id: "d01", x: 3, width: 56, rotate: -10, height: 148, top: -20, opacity: 0.16, activeOpacity: 0.88, holes: [22, 40, 58], zone: "left", blur: 0.4 },
  { id: "d02", x: 9, width: 72, rotate: -12, height: 155, top: -24, opacity: 0.19, activeOpacity: 0.92, holes: [18, 36, 54, 70], zone: "left" },
  { id: "d03", x: 15, width: 50, rotate: -9, height: 142, top: -16, opacity: 0.15, activeOpacity: 0.86, holes: [26, 48], zone: "left", blur: 0.6 },
  { id: "d04", x: 21, width: 64, rotate: -13, height: 150, top: -21, opacity: 0.2, activeOpacity: 0.9, holes: [16, 34, 52, 68], zone: "left" },
  { id: "d05", x: 27, width: 48, rotate: -11, height: 146, top: -18, opacity: 0.17, activeOpacity: 0.88, holes: [28, 50], zone: "left" },

  // Center
  { id: "d06", x: 34, width: 78, rotate: -10, height: 152, top: -22, opacity: 0.26, activeOpacity: 0.94, holes: [14, 32, 50, 68], zone: "center" },
  { id: "d07", x: 40, width: 58, rotate: -13, height: 148, top: -19, opacity: 0.24, activeOpacity: 0.92, holes: [20, 40, 60], zone: "center", blur: 0.3 },
  { id: "d08", x: 46, width: 88, rotate: -9, height: 158, top: -26, opacity: 0.3, activeOpacity: 0.96, holes: [12, 28, 44, 60, 76], zone: "center" },
  { id: "d09", x: 52, width: 54, rotate: -12, height: 144, top: -17, opacity: 0.25, activeOpacity: 0.9, holes: [24, 46], zone: "center" },
  { id: "d10", x: 57, width: 70, rotate: -11, height: 152, top: -21, opacity: 0.32, activeOpacity: 0.96, holes: [16, 34, 52, 70], zone: "center" },
  { id: "d11", x: 62, width: 60, rotate: -14, height: 148, top: -19, opacity: 0.28, activeOpacity: 0.94, holes: [18, 38, 56], zone: "center", blur: 0.4 },

  // Right — densest
  { id: "d12", x: 67, width: 82, rotate: -10, height: 156, top: -24, opacity: 0.36, activeOpacity: 0.98, holes: [14, 30, 46, 62, 78], zone: "right" },
  { id: "d13", x: 72, width: 96, rotate: -13, height: 160, top: -27, opacity: 0.4, activeOpacity: 1, holes: [12, 28, 44, 60, 76], zone: "right" },
  { id: "d14", x: 77, width: 64, rotate: -9, height: 150, top: -20, opacity: 0.34, activeOpacity: 0.96, holes: [18, 36, 54, 72], zone: "right" },
  { id: "d15", x: 81, width: 104, rotate: -12, height: 162, top: -28, opacity: 0.42, activeOpacity: 1, holes: [10, 26, 42, 58, 74], zone: "right" },
  { id: "d16", x: 86, width: 58, rotate: -11, height: 148, top: -18, opacity: 0.35, activeOpacity: 0.96, holes: [22, 42, 62], zone: "right", blur: 0.5 },
  { id: "d17", x: 90, width: 76, rotate: -14, height: 156, top: -23, opacity: 0.38, activeOpacity: 0.98, holes: [14, 32, 50, 68], zone: "right" },
  { id: "d18", x: 94, width: 52, rotate: -10, height: 146, top: -17, opacity: 0.33, activeOpacity: 0.94, holes: [24, 46, 66], zone: "right" },
  { id: "d19", x: 98, width: 90, rotate: -12, height: 158, top: -25, opacity: 0.4, activeOpacity: 1, holes: [12, 28, 44, 60, 76], zone: "right" },
  { id: "d20", x: 102, width: 66, rotate: -9, height: 150, top: -20, opacity: 0.34, activeOpacity: 0.96, holes: [18, 38, 56], zone: "right" },
  { id: "d21", x: 106, width: 48, rotate: -13, height: 144, top: -16, opacity: 0.32, activeOpacity: 0.92, holes: [26, 48], zone: "right", blur: 0.6 },
  { id: "d22", x: 110, width: 80, rotate: -11, height: 154, top: -22, opacity: 0.36, activeOpacity: 0.98, holes: [16, 34, 52, 70], zone: "right" },
];

/** Tablet — 16 canes */
export const canesTablet: CaneConfig[] = [
  { id: "t01", x: 4, width: 54, rotate: -10, height: 148, top: -18, opacity: 0.16, activeOpacity: 0.88, holes: [22, 42], zone: "left" },
  { id: "t02", x: 12, width: 68, rotate: -12, height: 152, top: -22, opacity: 0.19, activeOpacity: 0.9, holes: [18, 36, 54], zone: "left" },
  { id: "t03", x: 20, width: 50, rotate: -9, height: 144, top: -16, opacity: 0.17, activeOpacity: 0.86, holes: [26, 48], zone: "left" },
  { id: "t04", x: 30, width: 74, rotate: -11, height: 152, top: -21, opacity: 0.26, activeOpacity: 0.92, holes: [14, 32, 50, 68], zone: "center" },
  { id: "t05", x: 40, width: 58, rotate: -13, height: 148, top: -18, opacity: 0.28, activeOpacity: 0.94, holes: [20, 40, 60], zone: "center" },
  { id: "t06", x: 48, width: 86, rotate: -10, height: 156, top: -24, opacity: 0.32, activeOpacity: 0.96, holes: [12, 28, 44, 60], zone: "center" },
  { id: "t07", x: 56, width: 60, rotate: -12, height: 148, top: -19, opacity: 0.3, activeOpacity: 0.94, holes: [18, 38, 56], zone: "center" },
  { id: "t08", x: 64, width: 78, rotate: -9, height: 154, top: -22, opacity: 0.34, activeOpacity: 0.96, holes: [14, 32, 50, 68], zone: "right" },
  { id: "t09", x: 72, width: 98, rotate: -13, height: 160, top: -26, opacity: 0.4, activeOpacity: 1, holes: [12, 28, 44, 60, 76], zone: "right" },
  { id: "t10", x: 79, width: 56, rotate: -11, height: 148, top: -18, opacity: 0.35, activeOpacity: 0.96, holes: [22, 42, 62], zone: "right" },
  { id: "t11", x: 85, width: 84, rotate: -10, height: 156, top: -23, opacity: 0.38, activeOpacity: 0.98, holes: [14, 30, 46, 62], zone: "right" },
  { id: "t12", x: 91, width: 64, rotate: -14, height: 150, top: -20, opacity: 0.34, activeOpacity: 0.96, holes: [18, 38, 56], zone: "right" },
  { id: "t13", x: 96, width: 72, rotate: -9, height: 152, top: -21, opacity: 0.36, activeOpacity: 0.98, holes: [16, 34, 52], zone: "right" },
  { id: "t14", x: 101, width: 52, rotate: -12, height: 146, top: -17, opacity: 0.33, activeOpacity: 0.94, holes: [24, 46], zone: "right" },
  { id: "t15", x: 106, width: 90, rotate: -11, height: 158, top: -24, opacity: 0.38, activeOpacity: 1, holes: [12, 28, 44, 60], zone: "right" },
  { id: "t16", x: 111, width: 58, rotate: -10, height: 148, top: -18, opacity: 0.32, activeOpacity: 0.92, holes: [20, 40], zone: "right" },
];

/** Mobile — 9 canes with visible static green cluster */
export const canesMobile: CaneConfig[] = [
  { id: "m01", x: 8, width: 52, rotate: -10, height: 142, top: -14, opacity: 0.18, activeOpacity: 0.7, holes: [24, 46], zone: "left" },
  { id: "m02", x: 20, width: 64, rotate: -12, height: 148, top: -18, opacity: 0.2, activeOpacity: 0.75, holes: [20, 38, 56], zone: "left" },
  { id: "m03", x: 34, width: 56, rotate: -9, height: 144, top: -15, opacity: 0.26, activeOpacity: 0.82, holes: [22, 44], zone: "center" },
  { id: "m04", x: 48, width: 74, rotate: -11, height: 150, top: -20, opacity: 0.3, activeOpacity: 0.88, holes: [16, 34, 52], zone: "center" },
  { id: "m05", x: 60, width: 68, rotate: -13, height: 152, top: -20, opacity: 0.34, activeOpacity: 0.92, holes: [18, 36, 54], zone: "right" },
  { id: "m06", x: 72, width: 92, rotate: -10, height: 156, top: -22, opacity: 0.4, activeOpacity: 0.98, holes: [14, 30, 46, 62], zone: "right" },
  { id: "m07", x: 82, width: 58, rotate: -12, height: 148, top: -17, opacity: 0.36, activeOpacity: 0.94, holes: [22, 42, 60], zone: "right" },
  { id: "m08", x: 92, width: 80, rotate: -9, height: 152, top: -20, opacity: 0.38, activeOpacity: 0.96, holes: [16, 34, 52], zone: "right" },
  { id: "m09", x: 102, width: 60, rotate: -11, height: 146, top: -16, opacity: 0.34, activeOpacity: 0.9, holes: [20, 40], zone: "right" },
];

export const INTERACTION_RADIUS_DESKTOP = 680;
export const INTERACTION_RADIUS_TABLET = 480;
export const CORE_RADIUS_DESKTOP = 220;
export const CORE_RADIUS_TABLET = 160;
export const POINTER_LERP = 0.22;
export const STRENGTH_LERP = 0.2;

export const MOBILE_STATIC_FOCUS = { x: 0.74, y: 0.4, strength: 0.72 };

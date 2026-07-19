export type FormattedEventDate = {
  day: string;
  month: string;
  year: string;
  fullLabel: string;
};

const MONTHS_TR_SHORT = [
  "OCA",
  "ŞUB",
  "MAR",
  "NİS",
  "MAY",
  "HAZ",
  "TEM",
  "AĞU",
  "EYL",
  "EKİ",
  "KAS",
  "ARA",
] as const;

/**
 * Formats an ISO date (YYYY-MM-DD) for Turkish editorial event UI.
 */
export function formatEventDate(isoDate: string, time?: string): FormattedEventDate {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, (month ?? 1) - 1, day ?? 1));

  const dayLabel = String(day);
  const monthLabel = MONTHS_TR_SHORT[(month ?? 1) - 1] ?? "";
  const yearLabel = String(year);

  const longDate = new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);

  const fullLabel = time
    ? `${longDate}, saat ${time}`
    : longDate;

  return {
    day: dayLabel,
    month: monthLabel,
    year: yearLabel,
    fullLabel,
  };
}

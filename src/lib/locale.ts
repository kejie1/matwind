export type Lang = "zh" | "en";

const ZH = new Set(["CN", "HK", "MO", "TW"]);

export function parseLang(s: string | null | undefined): Lang | null {
  return s === "zh" || s === "en" ? s : null;
}

export function langFromCountry(code: string): Lang {
  return ZH.has(code.toUpperCase()) ? "zh" : "en";
}

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { langFromCountry, parseLang, type Lang } from "./lib/locale";

export type { Lang };

const KEY = "mk-lang";

export function queryLang(): Lang | null {
  return parseLang(new URLSearchParams(location.search).get("lang"));
}

export function storedLang(): Lang | null {
  try {
    return parseLang(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function guessLang(): Lang {
  return queryLang() ?? storedLang() ?? (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");
}

export async function langFromIp(): Promise<Lang> {
  const forced = queryLang() ?? storedLang();
  if (forced) return forced;
  try {
    const r = await fetch("https://get.geojs.io/v1/ip/country", { signal: AbortSignal.timeout(2500) });
    const c = (await r.text()).trim();
    if (/^[A-Za-z]{2}$/.test(c)) return langFromCountry(c);
  } catch {
    // ponytail: geo miss → browser language. Swap the endpoint if geojs is blocked.
  }
  return guessLang();
}

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function useLang() {
  return useContext(Ctx).lang;
}

export function useSetLang() {
  return useContext(Ctx).setLang;
}

export function useT() {
  const lang = useLang();
  return (zh: string, en: string) => (lang === "zh" ? zh : en);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(guessLang);
  const picked = useRef(!!(queryLang() ?? storedLang()));
  useEffect(() => {
    if (picked.current) return;
    let live = true;
    langFromIp().then((l) => {
      if (live && !picked.current) setLangState(l);
    });
    return () => {
      live = false;
    };
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);
  const setLang = (l: Lang) => {
    picked.current = true;
    try {
      localStorage.setItem(KEY, l);
    } catch {
      /* private mode */
    }
    const u = new URL(location.href);
    u.searchParams.set("lang", l);
    history.replaceState(null, "", u);
    setLangState(l);
  };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

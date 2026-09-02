import { lazy, Suspense, useEffect, useState, type ComponentType } from "react";
import { catalog, parsePath } from "./catalog";
import { Backdrop, MobileBar, SearchModal, SideNav, SkipLink, Topbar } from "./chrome";
import { useT } from "./locale";
import { REPO, VERSION } from "./repo";
import { IntroPage, InstallPage, ThemingPage, UsagePage } from "./pages/docs";
import { HomePage } from "./pages/home";
import { LandingPage } from "./pages/landing";
import { ComponentPage } from "./pages/component";

const PixelPage = lazy(() => import("./pages/pixel").then((m) => ({ default: m.PixelPage })));

const pages: Record<string, ComponentType> = {
  "/": LandingPage,
  "/docs": IntroPage,
  "/docs/installation": InstallPage,
  "/docs/usage": UsagePage,
  "/docs/theming": ThemingPage,
  "/components": HomePage,
};

function pageLabel(path: string, t: (zh: string, en: string) => string) {
  const titles: Record<string, string> = {
    "/": "Material Kit",
    "/docs": t("简介", "Introduction"),
    "/docs/installation": t("安装", "Installation"),
    "/docs/usage": t("用法", "Usage"),
    "/docs/theming": t("主题", "Theming"),
    "/components": t("组件", "Components"),
    "/pixel": "Pixel",
  };
  const hit = parsePath(path);
  if (hit?.item) return hit.item.title;
  if (hit?.group) return hit.group.title;
  return titles[path] ?? "Material Kit";
}

function usePath() {
  const t = useT();
  const [loc, setLoc] = useState(() => location.pathname + location.hash);

  useEffect(() => {
    const p = location.pathname.replace(/\/$/, "") || "/";
    const h = location.hash.slice(1);
    if (h && catalog.some((g) => `/${g.id}` === p)) {
      const url = `${p}/${h}${location.search}`;
      history.replaceState(null, "", url);
      setLoc(`${p}/${h}`);
    }
  }, []);

  useEffect(() => {
    const sync = () => setLoc(location.pathname + location.hash);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.hasAttribute("download") || a.getAttribute("target") === "_blank") return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const url = new URL(a.href);
      if (url.origin !== location.origin) return;
      e.preventDefault();
      const lang = new URLSearchParams(location.search).get("lang");
      if ((lang === "zh" || lang === "en") && !url.searchParams.has("lang")) url.searchParams.set("lang", lang);
      const next = url.pathname + url.hash;
      if (next === location.pathname + location.hash) {
        if (url.hash) document.getElementById(url.hash.slice(1))?.scrollIntoView();
        return;
      }
      history.pushState(null, "", url.pathname + url.search + url.hash);
      setLoc(next);
    };
    window.addEventListener("popstate", sync);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", sync);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const path = (loc.split("#")[0] || "/").replace(/\/$/, "") || "/";
  const hash = loc.includes("#") ? loc.slice(loc.indexOf("#") + 1) : "";

  useEffect(() => {
    const label = pageLabel(path, t);
    document.title = path === "/" ? "Material Kit" : `${label} — Material Kit`;
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [path, hash, t]);

  return { path, hash };
}

export default function App() {
  const t = useT();
  const { path, hash } = usePath();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const hit = parsePath(path);

  useEffect(() => {
    setMenu(false);
  }, [path, hash]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearch((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (path === "/pixel") {
    return (
      <Suspense fallback={null}>
        <PixelPage />
      </Suspense>
    );
  }

  const Page = pages[path] ?? HomePage;
  const wide = !!hit?.item;

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa] selection:bg-purple-600 selection:text-white">
      <SkipLink />
      <Topbar path={path} onSearch={() => setSearch(true)} />
      <MobileBar open={menu} onToggle={() => setMenu((m) => !m)} label={pageLabel(path, t)} />
      <div className="flex w-full flex-1">
        <div className={`lg:hidden ${menu ? "block" : "hidden"}`}>
          <SideNav path={path} hash={hash} mobile onNavigate={() => setMenu(false)} />
        </div>
        {menu ? <Backdrop onClick={() => setMenu(false)} /> : null}
        <SideNav path={path} hash={hash} />
        <main id="content" className="min-w-0 flex-1 py-8">
          <div className={`mx-auto w-full ${wide ? "max-w-5xl" : "max-w-4xl"}`}>
            {hit?.item ? (
              <ComponentPage group={hit.group} item={hit.item} />
            ) : hit?.group && !pages[path] ? (
              <HomePage category={hit.group.id} />
            ) : (
              <Page />
            )}
          </div>
        </main>
      </div>
      <footer className="border-t border-slate-200 bg-white px-4 py-4 text-xs text-slate-500">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>MIT {t("许可", "License")} · Material Kit {VERSION}</span>
          <a href={REPO} target="_blank" rel="noreferrer" className="text-slate-600 no-underline hover:text-slate-900">
            GitHub
          </a>
        </div>
      </footer>
      <SearchModal open={search} onClose={() => setSearch(false)} />
    </div>
  );
}

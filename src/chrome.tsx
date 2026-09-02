import { useEffect, useState } from "react";
import { catalog, docsNav, hrefOf, liveItems } from "./catalog";
import { IconClose, IconMenu, IconSearch } from "./docs-ui";
import { useLang, useSetLang, useT } from "./locale";
import { NAME, REPO, VERSION } from "./repo";

function Ico({ d, className }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "size-4"} aria-hidden>
      <path d={d} />
    </svg>
  );
}

function IconLayers() {
  return <Ico d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />;
}

function IconGitHub({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className ?? "size-4"} aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8" />
    </svg>
  );
}

function IconChev({ className }: { className?: string }) {
  return <Ico className={className ?? "size-3.5"} d="m6 9 6 6 6-6" />;
}

function LangSwitch() {
  const lang = useLang();
  const setLang = useSetLang();
  const t = useT();
  return (
    <div
      role="group"
      aria-label={t("语言", "Language")}
      className="flex overflow-hidden rounded-lg border border-slate-200 text-xs font-semibold"
    >
      {(["zh", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={`cursor-pointer px-2.5 py-1.5 ${
            lang === l ? "bg-slate-900 text-white" : "bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          }`}
        >
          {l === "zh" ? "中" : "EN"}
        </button>
      ))}
    </div>
  );
}

export function SkipLink() {
  const t = useT();
  return (
    <a href="#content" className="doc-skip">
      {t("跳到正文", "Skip to content")}
    </a>
  );
}

export function Topbar({ path, onSearch }: { path: string; onSearch: () => void }) {
  const t = useT();
  const docs = path === "/" || path.startsWith("/docs");
  const comps = path === "/components" || catalog.some((g) => path === `/${g.id}` || path.startsWith(`/${g.id}/`));
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-8">
          <a href="/" className="group flex items-center gap-2.5 text-left no-underline">
            <span className="flex size-8 items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm transition group-hover:scale-105">
              <IconLayers />
            </span>
            <span>
              <span className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">{NAME}</span>
              <span className="ml-2 hidden rounded border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 sm:inline-block">
                {VERSION}
              </span>
            </span>
          </a>
          <nav className="flex items-center space-x-1 sm:space-x-6" aria-label={t("主导航", "Primary")}>
            <a
              href="/docs"
              className={`relative py-5 text-sm font-semibold no-underline transition ${docs ? "text-slate-900" : "text-slate-500 hover:text-slate-800"}`}
              aria-current={docs ? "page" : undefined}
            >
              {t("文档", "Docs")}
              {docs ? <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-purple-600" /> : null}
            </a>
            <a
              href="/components"
              className={`relative py-5 text-sm font-semibold no-underline transition ${comps ? "text-slate-900" : "text-slate-500 hover:text-slate-800"}`}
              aria-current={comps ? "page" : undefined}
            >
              {t("组件", "Components")}
              {comps ? <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-purple-600" /> : null}
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onSearch}
            className="group flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-100/80 px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-200/80"
          >
            <span className="size-3.5 [&_svg]:size-3.5">
              <IconSearch />
            </span>
            <span className="hidden sm:inline">{t("搜索组件...", "Search components...")}</span>
            <span className="sm:hidden">{t("搜索", "Search")}</span>
            <kbd className="hidden rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-500 shadow-sm sm:inline-block">
              ⌘K
            </kbd>
          </button>
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            className="flex size-8 items-center justify-center rounded-lg text-slate-500 no-underline transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="GitHub"
          >
            <IconGitHub />
          </a>
          <LangSwitch />
        </div>
      </div>
    </header>
  );
}

export function SideNav({
  path,
  mobile,
  onNavigate,
}: {
  path: string;
  hash?: string;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const t = useT();
  const navTitle: Record<string, [string, string]> = {
    "/docs": ["简介", "Introduction"],
    "/docs/installation": ["安装", "Installation"],
    "/docs/usage": ["用法", "Usage"],
    "/docs/theming": ["主题", "Theming"],
  };
  const [treeOpen, setTreeOpen] = useState(true);
  const [cats, setCats] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(catalog.map((g, i) => [g.id, i < 3 || path === `/${g.id}` || path.startsWith(`/${g.id}/`)])),
  );

  useEffect(() => {
    const g = catalog.find((x) => path === `/${x.id}` || path.startsWith(`/${x.id}/`));
    if (g) setCats((c) => ({ ...c, [g.id]: true }));
  }, [path]);

  const docsOn = path.startsWith("/docs") || path === "/";
  const allOn = path === "/components";

  return (
    <aside
      className={`doc-scroll z-30 w-64 overflow-y-auto border-r border-slate-200 bg-white px-4 py-6 ${
        mobile ? "fixed top-16 h-[calc(100vh-4rem)]" : "sticky top-16 hidden h-[calc(100vh-4rem)] lg:block"
      }`}
    >
      <div className="mb-6 px-2">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">{NAME}</h2>
      </div>
      <div className="mb-6">
        <div className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">{t("开始", "Getting Started")}</div>
        <ul className="space-y-0.5">
          {docsNav.map((item) => {
            const on = path === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={onNavigate}
                  className={`flex w-full items-center rounded-lg px-3 py-1.5 text-left text-xs no-underline transition ${
                    on ? "bg-blue-50 font-semibold text-blue-700" : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                  aria-current={on ? "page" : undefined}
                >
                  {t(...(navTitle[item.href] ?? [item.title, item.title]))}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setTreeOpen((v) => !v)}
          className="mb-2 flex w-full cursor-pointer items-center justify-between px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600"
        >
          <span>{t("组件", "Components")}</span>
          <IconChev className={`size-3.5 transition-transform ${treeOpen ? "" : "-rotate-90"}`} />
        </button>
        {treeOpen ? (
          <div className="space-y-1">
            <a
              href="/components"
              onClick={onNavigate}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-xs no-underline transition ${
                allOn && !docsOn ? "bg-blue-100/70 font-bold text-blue-700" : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <IconLayers />
              {t("全部组件", "All Components")}
            </a>
            {catalog.map((g) => {
              const expanded = cats[g.id] !== false;
              return (
                <div key={g.id} className="pt-2">
                  <button
                    type="button"
                    onClick={() => setCats((c) => ({ ...c, [g.id]: !expanded }))}
                    className="flex w-full cursor-pointer items-center justify-between px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    <span>{g.title}</span>
                    <IconChev className={`size-3 text-slate-400 transition-transform ${expanded ? "" : "-rotate-90"}`} />
                  </button>
                  {expanded ? (
                    <ul className="ml-3 mt-1 space-y-0.5 border-l border-slate-100 pl-2">
                      {g.items.map((it) =>
                        it.skip ? (
                          <li key={it.id}>
                            <span className="block px-3 py-1.5 text-xs text-slate-400 line-through">{it.title}</span>
                          </li>
                        ) : (
                          <li key={it.id}>
                            <a
                              href={hrefOf(g.id, it.id)}
                              onClick={onNavigate}
                              className={`flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-xs no-underline transition ${
                                path === hrefOf(g.id, it.id)
                                  ? "bg-blue-100/80 font-bold text-blue-700 shadow-sm"
                                  : "font-normal text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                              }`}
                            >
                              {path === hrefOf(g.id, it.id) ? <span className="size-1.5 shrink-0 rounded-full bg-blue-600" /> : null}
                              {it.title}
                            </a>
                          </li>
                        ),
                      )}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </aside>
  );
}

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT();
  const [q, setQ] = useState("");
  useEffect(() => {
    if (open) setQ("");
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const results = liveItems().filter((it) => {
    const s = q.toLowerCase();
    return it.title.toLowerCase().includes(s) || it.group.title.toLowerCase().includes(s) || it.id.includes(s);
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-[2px]" onClick={onClose}>
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center border-b border-slate-200 px-4 py-3.5">
          <span className="mr-3 shrink-0 size-5 text-slate-400 [&_svg]:size-5">
            <IconSearch />
          </span>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("搜索组件文档...", "Search component documentation...")}
            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
          <button type="button" onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600" aria-label={t("关闭", "Close")}>
            <span className="block size-4 [&_svg]:size-4">
              <IconClose />
            </span>
          </button>
        </div>
        <div className="max-h-80 divide-y divide-slate-100 overflow-y-auto p-2">
          {results.length ? (
            results.map((it) => (
              <a
                key={`${it.group.id}-${it.id}`}
                href={hrefOf(it.group.id, it.id)}
                onClick={onClose}
                className="group flex w-full cursor-pointer items-center justify-between rounded-xl p-3 text-left no-underline transition hover:bg-blue-50/70"
              >
                <span className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700">{it.title}</span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">{it.group.title}</span>
                </span>
              </a>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">{t(`没有匹配「${q}」的组件`, `No components matching “${q}”`)}</div>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2 text-[11px] text-slate-400">
          <span>{t(`搜索 ${NAME}`, `Search ${NAME}`)}</span>
          <span>{t("ESC 关闭", "ESC to close")}</span>
        </div>
      </div>
    </div>
  );
}

export function MobileBar({ open, onToggle, label }: { open: boolean; onToggle: () => void; label: string }) {
  const t = useT();
  return (
    <div className="sticky top-16 z-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2 lg:hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 p-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
      >
        <span className="block size-4 [&_svg]:size-4">{open ? <IconClose /> : <IconMenu />}</span>
        <span>{open ? t("关闭菜单", "Close Menu") : t("菜单和组件", "Menu & Components")}</span>
      </button>
      <span className="text-xs font-semibold text-slate-500">{label}</span>
    </div>
  );
}

export function Backdrop({ onClick }: { onClick: () => void }) {
  return <div onClick={onClick} className="fixed inset-0 z-20 bg-slate-900/30 backdrop-blur-[2px] lg:hidden" />;
}

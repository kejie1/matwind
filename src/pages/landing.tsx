import { useState } from "react";
import { catalog, hrefOf } from "../catalog";
import { Button } from "../components/button";
import { REPO } from "../repo";
import { CopyButton, Highlighted } from "../docs-ui";
import { useT } from "../locale";
import { sources } from "../sources";

const variants = ["contained", "outlined", "text", "disabled"] as const;

export function LandingPage() {
  const t = useT();
  const [v, setV] = useState<(typeof variants)[number]>("contained");
  const count = catalog.reduce((n, g) => n + g.items.filter((i) => !i.skip).length, 0);

  return (
    <div className="space-y-16 pb-20">
      <section className="relative pb-10 pt-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              {t("开源 · MIT", "Open source · MIT")}
            </p>
            <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {t("开源 Material 组件。拷源码，不装包。", "Open-source Material. Copy the source — don't install a package.")}
            </h1>
            <p className="max-w-xl text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
              {t(
                "MIT 许可。外观对齐 @mui/material 9.3.1 default light。没有 Emotion、没有 ",
                "MIT licensed. Looks like @mui/material 9.3.1 default light. No Emotion, no ",
              )}
              <code className="font-mono text-[13px]">sx</code>
              {t("、没有 ", ", no ")}
              <code className="font-mono text-[13px]">@mui/*</code>
              {t("。文件拷进仓库就归你改。", ". Copy the files in — they're yours to change.")}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/docs"
                className="flex items-center gap-2 rounded-lg bg-[#0f172a] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/15 no-underline transition hover:bg-slate-800"
              >
                {t("文档", "Docs")}
                <span aria-hidden>→</span>
              </a>
              <a
                href={REPO}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm no-underline transition hover:bg-slate-50"
              >
                GitHub
              </a>
            </div>
            <p className="text-xs font-medium text-slate-400">
              {count} {t("个组件", "components")} · MIT · React + Tailwind
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-[#1e293b] text-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-700/80 bg-[#0f172a] px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="size-3 rounded-full bg-rose-500/90" />
                  <div className="size-3 rounded-full bg-amber-500/90" />
                  <div className="size-3 rounded-full bg-emerald-500/90" />
                </div>
                <span className="font-mono text-[11px] text-slate-400">App.tsx</span>
                <div className="w-8" />
              </div>
              <pre className="doc-scroll m-0 overflow-x-auto border-b border-slate-700/60 bg-[#1e293b] p-4 font-mono text-xs leading-relaxed text-slate-300">
                <code>
                  <Highlighted
                    code={`export default function Preview() {
  return (
    <Button variant="${v === "disabled" ? "contained" : v}"${v === "disabled" ? " disabled" : ""}>
      ${v}
    </Button>
  );
}`}
                  />
                </code>
              </pre>
              <div className="space-y-4 bg-white p-5">
                <div className="kit flex flex-wrap items-center gap-2">
                  {variants.map((x) => (
                    <div
                      key={x}
                      onClick={() => setV(x)}
                      className={`inline-flex rounded ${v === x ? "ring-2 ring-blue-400 ring-offset-1" : ""}`}
                    >
                      <Button variant={x === "disabled" ? "contained" : x} disabled={x === "disabled"}>
                        {x}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">{t("开始", "Getting Started")}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">1</div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Copy material.css</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{t("只拷一次。入口 CSS 里 @import，不要拷文档站的 index.css。", "Copy once. @import it in your entry CSS. Don't copy the docs site's index.css.")}</p>
            </div>
            <CopyButton
              text={sources["material.css"]}
              label="Copy material.css"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-slate-900 px-3 font-mono text-xs text-slate-200 hover:bg-slate-800"
            />
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex size-10 items-center justify-center rounded-xl bg-purple-50 text-lg font-bold text-purple-600">2</div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{t("拷组件文件", "Copy component files")}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{t("源码 tab 点复制全部。cn / ripple 在安装里拷一次。", "On the Source tab, copy all. Copy cn / ripple once in Installation.")}</p>
            </div>
            <div className="doc-scroll overflow-x-auto rounded-lg bg-slate-900 px-3 py-2 font-mono text-xs text-slate-300">
              <Highlighted code={`import { Button } from "./components/button";`} />
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-lg font-bold text-amber-600">3</div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{t("改 CSS 变量", "Change CSS variables")}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{t("主题就是 --md-* 。覆盖用 className，动态像素用 style。", "The theme is --md-*. Override with className; dynamic pixels with style.")}</p>
            </div>
            <div className="doc-scroll overflow-x-auto rounded-lg bg-slate-900 px-3 py-2 font-mono text-xs text-slate-300">
              <Highlighted code={`--md-primary: #1976d2;`} />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">{t("组件", "Components")}</h2>
            <p className="mt-0.5 text-xs text-slate-500">{t("分类对齐 MUI All components。划线项不在本仓库。", "Categories match MUI All components. Struck-through items are not in this repo.")}</p>
          </div>
          <a href="/components" className="flex items-center gap-1 text-xs font-bold text-blue-600 no-underline hover:text-blue-700">
            {t("查看目录 →", "View Gallery →")}
          </a>
        </div>
        <div className="space-y-6">
          {catalog.map((g) => (
            <div key={g.id} className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">{g.title}</h4>
              <div className="flex flex-wrap gap-2.5">
                {g.items.map((it) =>
                  it.skip ? (
                    <span key={it.id} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-400 line-through">
                      {it.title}
                    </span>
                  ) : (
                    <a
                      key={it.id}
                      href={hrefOf(g.id, it.id)}
                      className="group flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm no-underline transition hover:border-blue-200 hover:text-blue-600 hover:shadow-sm"
                    >
                      {it.title}
                      <span className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600">→</span>
                    </a>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

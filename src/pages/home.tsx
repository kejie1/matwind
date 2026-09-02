import { useEffect, useMemo, useState } from "react";
import { catalog, hrefOf } from "../catalog";
import { ComponentThumb } from "../thumbs";
import { useT } from "../locale";

export function HomePage({ category }: { category?: string }) {
  const t = useT();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(category ?? "All");

  useEffect(() => {
    setCat(category ?? "All");
  }, [category]);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return catalog
      .map((g) => ({
        ...g,
        items: g.items.filter((it) => {
          if (it.skip) return false;
          const matchCat = cat === "All" || g.id === cat;
          const matchQ = !s || it.title.toLowerCase().includes(s) || it.id.includes(s);
          return matchCat && matchQ;
        }),
      }))
      .filter((g) => g.items.length);
  }, [q, cat]);

  const total = filtered.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="space-y-8 pb-20">
      <div className="relative w-full">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("搜索组件...", "Search components...")}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-16 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20"
        />
        {q ? (
          <button
            type="button"
            onClick={() => setQ("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            {t("清除", "Clear")}
          </button>
        ) : null}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setCat("All")}
          className={`cursor-pointer whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
            cat === "All" ? "bg-slate-900 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          {t("全部分类", "All Categories")}
        </button>
        {catalog.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setCat(g.id)}
            className={`cursor-pointer whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              cat === g.id ? "bg-purple-600 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>

      <div className="space-y-10">
        {filtered.map((g) => (
          <section key={g.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold tracking-tight text-slate-900">{g.title}</h3>
              <span className="font-mono text-xs text-slate-400">
                {g.items.length} {g.items.length === 1 ? t("个组件", "component") : t("个组件", "components")}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {g.items.map((it) => (
                <a key={it.id} href={hrefOf(g.id, it.id)} className="group flex cursor-pointer flex-col no-underline">
                  <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm transition group-hover:-translate-y-0.5 group-hover:border-purple-300 group-hover:shadow-md">
                    <ComponentThumb id={it.id} />
                  </div>
                  <div className="px-1 pt-2">
                    <span className="text-xs font-semibold text-slate-800 transition group-hover:text-purple-700">{it.title}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
        {total === 0 ? (
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-8 py-16 text-center">
            <p className="text-sm font-bold text-slate-700">{t("没有找到组件", "No components found")}</p>
            <p className="text-xs text-slate-400">{t(`没有「${q}」的结果。`, `No results for “${q}”.`)}</p>
            <button
              type="button"
              onClick={() => {
                setQ("");
                setCat("All");
              }}
              className="mt-2 cursor-pointer rounded-lg bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
            >
              {t("重置筛选", "Reset Filters")}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

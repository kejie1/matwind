import { Api, Code } from "../docs-ui";
import { useT } from "../locale";
import { Playground } from "../playground";
import { previews } from "../previews";
import type { CatalogGroup, CatalogItem } from "../catalog";

export function ComponentPage({ group, item }: { group: CatalogGroup; item: CatalogItem }) {
  const t = useT();
  const spec = previews[item.id];
  const file = spec?.file ?? item.file;
  const rows = spec?.props.map((r) => [r[0], r[1], r[2], r[3] ? t(r[3][0], r[3][1]) : ""]) ?? [];
  const head = spec?.propsHead?.map(([zh, en]) => t(zh, en));
  const add = `npx matwind add ${item.id}`;

  return (
    <div className="space-y-10 pb-24">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
          <a href="/components" className="text-inherit no-underline transition hover:text-blue-600">
            {t("组件", "Components")}
          </a>
          <span aria-hidden>/</span>
          <a href={`/${group.id}`} className="text-inherit no-underline transition hover:text-slate-600">
            {group.title}
          </a>
          <span aria-hidden>/</span>
          <span className="font-bold text-blue-600">{item.title}</span>
        </div>
        <h1 className="m-0 text-4xl font-extrabold tracking-tight text-slate-900">{item.title}</h1>
        {spec?.lead ? <p className="m-0 text-base font-normal leading-relaxed text-slate-600">{t(...spec.lead)}</p> : null}
        {file ? (
          <p className="m-0">
            <code className="doc-code text-[12px] text-[var(--doc-muted)]">{file}</code>
          </p>
        ) : null}
      </div>
      <Code label="terminal">{add}</Code>
      {spec ? <Playground spec={spec} /> : null}
      {spec?.note ? <p className="m-0 text-sm text-[var(--md-text-secondary)]">{t(...spec.note)}</p> : null}
      {rows.length ? <Api title="Props" head={head} rows={rows} /> : null}
    </div>
  );
}

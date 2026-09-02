import { Children, isValidElement, useEffect, useState, type ReactNode } from "react";
import { Tab, Tabs } from "./components/tabs";
import { tokenize } from "./lib/highlight";
import { useT } from "./locale";
import { relatedFiles, sourceName, sources, copyFiles, formatBundle } from "./sources";

export function Row({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}

export function Demo({ children }: { children: ReactNode }) {
  return <div className="md-demo rounded-[var(--md-radius)] border border-solid border-[var(--md-divider)] bg-white p-6">{children}</div>;
}

function IconCopy() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

export function CopyButton({
  text,
  className,
  label,
}: {
  text: string;
  className?: string;
  label?: string;
}) {
  const t = useT();
  const lab = label ?? t("复制", "Copy");
  const done = t("已复制", "Copied");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);
  return (
    <button
      type="button"
      aria-label={copied ? done : lab}
      title={copied ? done : lab}
      className={className}
      onClick={() => {
        void navigator.clipboard
          .writeText(text)
          .then(() => setCopied(true))
          .catch(() => {});
      }}
    >
      {copied ? <IconCheck /> : <IconCopy />}
      {copied ? done : lab}
    </button>
  );
}

const copyOnDark =
  "inline-flex h-7 items-center gap-1.5 rounded-[4px] px-2 text-[12px] text-white/80 transition-colors duration-150 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50";

const copyOnLight =
  "inline-flex h-7 items-center gap-1 rounded-[4px] px-2 text-[12px] text-[var(--md-primary)] transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--md-primary)_8%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--md-primary)]";

export function Highlighted({ code }: { code: string }) {
  return (
    <>
      {tokenize(code).map((t, i) =>
        t.cls ? (
          <span key={i} className={t.cls}>
            {t.text}
          </span>
        ) : (
          t.text
        ),
      )}
    </>
  );
}

export function Code({ children, label }: { children: string; label?: string }) {
  return (
    <div className="md-code relative overflow-hidden rounded-[var(--md-radius)] bg-[#0d1117]">
      {label ? (
        <div className="flex items-center justify-between gap-3 border-0 border-b border-solid border-white/10 px-3 py-1.5">
          <span className="truncate font-mono text-[11px] text-white/45">{label}</span>
          <CopyButton text={children} className={copyOnDark} />
        </div>
      ) : (
        <CopyButton text={children} className={`absolute right-2 top-2 z-10 ${copyOnDark}`} />
      )}
      <pre className={`doc-scroll m-0 max-h-[28rem] overflow-auto p-4 font-mono text-[13px] leading-[1.7] text-slate-300 ${label ? "" : "pr-24"}`}>
        <code>
          <Highlighted code={children} />
        </code>
      </pre>
    </div>
  );
}

export function Api({
  head,
  rows,
  title,
}: {
  head?: string[];
  rows: string[][];
  title?: string | false;
}) {
  const t = useT();
  const propTable = !head;
  const cols = head ?? [t("名称", "Name"), t("类型", "Type"), t("默认值", "Default"), t("说明", "Description")];
  const heading = title === false ? null : (title ?? (propTable ? "Props" : null));
  const widths = propTable ? ["w-1/5", "w-2/5", "w-1/6", "w-2/5"] : [];
  return (
    <div className={heading ? "mt-6 space-y-4" : "mt-6"}>
      {heading ? <h2 className="m-0 text-2xl font-bold tracking-tight text-slate-900">{heading}</h2> : null}
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="border-b border-slate-200 bg-slate-100 font-bold text-slate-900">
              <tr>
                {cols.map((h, j) => (
                  <th key={h || j} className={`p-4 ${widths[j] ?? ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {rows.map((r, i) => (
                <tr key={i} className="transition hover:bg-slate-50/80">
                  {cols.map((h, j) => {
                    const typeCol = h === "Type" || h === "类型";
                    const nameCol = propTable && j === 0;
                    const defaultCol = propTable && j === 2;
                    const descCol = propTable && j === 3;
                    const value = r[j] ?? "";
                    return (
                      <td
                        key={j}
                        className={
                          typeCol
                            ? "break-words bg-slate-50/50 p-4 font-mono text-purple-700"
                            : nameCol
                              ? "p-4 font-mono font-bold text-slate-900"
                              : defaultCol
                                ? "p-4 font-mono text-slate-500"
                                : descCol
                                  ? "p-4 leading-relaxed text-slate-600"
                                  : "p-4 text-slate-600"
                        }
                      >
                        {defaultCol && !value ? "-" : value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function Doc({
  id,
  title,
  file,
  children,
}: {
  id: string;
  title: string;
  file?: string;
  children: ReactNode;
}) {
  const t = useT();
  const [tab, setTab] = useState("use");
  const name = sourceName(file);
  const src = name ? sources[name] : undefined;
  const extra = name && src ? relatedFiles(name) : [];
  const kids = Children.toArray(children);
  const play = kids.filter((n) => isValidElement(n) && (n.type === Demo || n.type === Code));
  const rest = kids.filter((n) => !isValidElement(n) || (n.type !== Demo && n.type !== Code));

  return (
    <article id={id} className="scroll-mt-24 border-0 border-t border-solid border-[var(--doc-line)] pt-10 first:border-t-0 first:pt-8">
      <h2 className="doc-h2 mb-1 mt-0">
        <a href={`#${id}`} className="text-inherit no-underline hover:underline">
          {title}
        </a>
      </h2>
      {file ? (
        <p className="mb-4 mt-0">
          <code className="doc-code text-[12px] text-[var(--doc-muted)]">{file}</code>
        </p>
      ) : (
        <div className="mb-4" />
      )}
      {src ? (
        <div className="kit mb-4 border-0 border-b border-solid border-[var(--md-divider)]">
          <Tabs value={tab} onChange={setTab}>
            <Tab value="use" label={t("使用方式", "Usage")} />
            <Tab value="src" label={t("源码", "Source")} />
          </Tabs>
        </div>
      ) : null}
      {name && src && tab === "src" ? (
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <CopyButton text={formatBundle(copyFiles(name))} className={copyOnLight} label={t("复制全部", "Copy All")} />
            {copyFiles(name).map((f) => (
              <span key={f} className="inline-flex items-center gap-1">
                <code className="font-mono text-[12px] text-[var(--doc-muted)]">{f}</code>
                <CopyButton text={sources[f]} className={copyOnLight} />
              </span>
            ))}
          </div>
          <Code label={name}>{src}</Code>
          {extra.length ? (
            <p className="mb-0 mt-3 text-[13px] text-[var(--doc-muted)]">
              {t("还要一起拷：", "Also Copy: ")}
              {extra.join(", ")}
            </p>
          ) : null}
        </div>
      ) : (
        <>
          {play}
          {rest}
        </>
      )}
    </article>
  );
}

export function Page({ title, lead, children }: { title: string; lead?: string; children: ReactNode }) {
  return (
    <>
      <h1 className="doc-h1">{title}</h1>
      {lead ? <p className="doc-lede">{lead}</p> : null}
      <div className="flex flex-col">{children}</div>
    </>
  );
}

export function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

export function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
    </svg>
  );
}

export function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden>
      <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}

export function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  );
}

export function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

export function IconFav() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
    </svg>
  );
}

export function IconPerson() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

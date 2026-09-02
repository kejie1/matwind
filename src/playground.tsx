import { useEffect, useState } from "react";
import { Switch } from "./components/switch";
import { Tab, Tabs } from "./components/tabs";
import { Code, SourceFiles } from "./docs-ui";
import { useT } from "./locale";

export type Pair = [string, string];

export type Control = {
  name: string;
  kind: "radio" | "select" | "boolean" | "text";
  options?: string[];
};

export type PropRow = [string, string, string] | [string, string, string, Pair];

export type PreviewProps = {
  p: Record<string, any>;
  set: (name: string, value: unknown) => void;
};

export type PlaygroundSpec = {
  file?: string;
  lead?: Pair;
  note?: Pair;
  defaults: Record<string, any>;
  controls: Control[];
  props: PropRow[];
  propsHead?: Pair[];
  code?: (p: Record<string, any>) => string;
  Preview: (props: PreviewProps) => JSX.Element;
};

export function emit(tag: string, p: Record<string, unknown>, children?: string, skip: string[] = []) {
  const ignore = new Set(["children", ...skip]);
  let a = "";
  for (const [k, v] of Object.entries(p)) {
    if (ignore.has(k) || v === undefined || v === false || v === "") continue;
    if (v === true) a += ` ${k}`;
    else if (typeof v === "string") a += ` ${k}="${v}"`;
    else if (typeof v === "number") a += ` ${k}={${v}}`;
  }
  const inner = children ?? (typeof p.children === "string" ? p.children : "");
  return inner ? `<${tag}${a}>${inner}</${tag}>` : `<${tag}${a} />`;
}

function IconReset() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3" aria-hidden>
      <path d="M3 12a9 9 0 1 0 3-6.7" strokeLinecap="round" />
      <path d="M3 4v5h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSliders() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5" aria-hidden>
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
    </svg>
  );
}

export function Playground({ spec }: { spec: PlaygroundSpec }) {
  const t = useT();
  const [p, setP] = useState(spec.defaults);
  const [tab, setTab] = useState("preview");
  useEffect(() => {
    setP(spec.defaults);
    setTab("preview");
  }, [spec]);
  const set = (name: string, value: unknown) => setP((prev) => ({ ...prev, [name]: value }));
  const snippet = spec.code?.(p) ?? "";
  const Preview = spec.Preview;
  const knobs = spec.controls.length > 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="kit border-b border-slate-200 px-2">
        <Tabs value={tab} onChange={setTab}>
          <Tab value="preview" label={t("预览", "Preview")} />
          <Tab value="code" label={t("代码", "Code")} />
        </Tabs>
      </div>
      {tab === "code" ? (
        <div className="space-y-4 p-4">
          {snippet ? <Code label="Usage">{snippet}</Code> : null}
          <SourceFiles file={spec.file} compact />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div
            className={`flex min-h-[340px] flex-col justify-between bg-[#fafbfc] p-6 ${
              knobs ? "border-b border-slate-200 lg:col-span-7 lg:border-b-0 lg:border-r" : "lg:col-span-12"
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <span>{t("交互预览", "Interactive Preview")}</span>
              {knobs ? (
                <button
                  type="button"
                  onClick={() => setP(spec.defaults)}
                  className="flex cursor-pointer items-center gap-1 text-xs font-medium text-slate-500 transition hover:text-slate-800"
                >
                  <IconReset />
                  <span>Reset</span>
                </button>
              ) : (
                <span />
              )}
            </div>
            <div className="md-demo my-auto flex justify-center py-6">
              <Preview p={p} set={set} />
            </div>
            <div className="text-center text-[11px] text-slate-400">
              {knobs ? t("右侧改 props，左侧实时更新", "Click controls on the right to interactively customize props") : "\u00a0"}
            </div>
          </div>
          {knobs ? (
            <div className="space-y-5 bg-white p-6 lg:col-span-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <span className="text-blue-600">
                  <IconSliders />
                </span>
                <span>{t("交互 Props", "Interactive Props")}</span>
              </div>
              {spec.controls.map((c) => (
                <div key={c.name} className="space-y-2">
                  <label className="block text-xs font-bold capitalize text-slate-700">{c.name}</label>
                  {c.kind === "radio" && c.options ? (
                    <div className="flex flex-wrap gap-1.5">
                      {c.options.map((opt) => {
                        const on = p[c.name] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => set(c.name, opt)}
                            className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold capitalize transition ${
                              on ? "bg-[#1976d2] text-white shadow-xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                  {c.kind === "select" && c.options ? (
                    <select
                      value={String(p[c.name] ?? "")}
                      onChange={(e) => set(c.name, e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 focus:border-blue-600 focus:outline-none"
                    >
                      {c.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : null}
                  {c.kind === "boolean" ? (
                    <label className="flex cursor-pointer items-center gap-3">
                      <Switch size="small" checked={!!p[c.name]} onChange={(e) => set(c.name, e.target.checked)} />
                      <span className="text-xs font-medium text-slate-600">{p[c.name] ? "Enabled" : "Disabled"}</span>
                    </label>
                  ) : null}
                  {c.kind === "text" ? (
                    <input
                      type="text"
                      value={String(p[c.name] ?? "")}
                      onChange={(e) => set(c.name, e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 focus:border-blue-600 focus:outline-none"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

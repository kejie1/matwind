export type Tok = { text: string; cls?: string };

const RE =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(#[0-9A-Fa-f]{3,8}\b)|(\b(?:import|export|from|default|function|const|let|var|return|type|interface|extends|as|if|else|true|false|null|undefined|new|class|async|await|void|typeof|keyof)\b)|(<\/?[A-Za-z][\w.]*)|(\b[A-Za-z_]\w*(?==))|(\b\d+\.?\d*)/g;

const CLS = ["text-slate-500", "text-emerald-300", "text-sky-300", "text-pink-400", "text-blue-400", "text-amber-300", "text-violet-300"];

export function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let last = 0;
  for (const m of src.matchAll(RE)) {
    const i = m.index!;
    if (i > last) out.push({ text: src.slice(last, i) });
    const kind = m.slice(1).findIndex(Boolean);
    out.push({ text: m[0], cls: CLS[kind] });
    last = i + m[0].length;
  }
  if (last < src.length) out.push({ text: src.slice(last) });
  return out;
}

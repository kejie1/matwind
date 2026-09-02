const raw = {
  ...import.meta.glob("./components/*.tsx", { query: "?raw", import: "default", eager: true }),
  ...import.meta.glob("./lib/cn.ts", { query: "?raw", import: "default", eager: true }),
  ...import.meta.glob("./lib/ripple.ts", { query: "?raw", import: "default", eager: true }),
  ...import.meta.glob("./material.css", { query: "?raw", import: "default", eager: true }),
} as Record<string, string>;

export const sources: Record<string, string> = {};
for (const [path, text] of Object.entries(raw)) {
  const file = path.replace(/^\.\//, "");
  const base = file.split("/").pop()!;
  sources[base] = text;
  sources[file] = text;
}

export const KERNEL = ["cn.ts", "ripple.ts", "ripple.tsx"] as const;
const kernelSet = new Set<string>(KERNEL);

function isKernel(file: string) {
  return kernelSet.has(file);
}

export function sourceName(file?: string) {
  return file?.split("·")[0]?.trim();
}

function lookup(spec: string) {
  const base = spec.split("/").pop()!;
  if (spec.includes("/lib/")) {
    if (sources[`${base}.ts`]) return `${base}.ts`;
    if (sources[base]) return base;
  }
  if (sources[`${base}.tsx`]) return `${base}.tsx`;
  if (sources[`${base}.ts`]) return `${base}.ts`;
  if (sources[base]) return base;
  return null;
}

export function relatedFiles(name: string) {
  const seen = new Set<string>();
  const walk = (file: string) => {
    const src = sources[file];
    if (!src) return;
    for (const m of src.matchAll(/from ["'](\.\.?\/[^"']+)["']/g)) {
      const dep = lookup(m[1]);
      if (!dep || dep === name || seen.has(dep) || isKernel(dep)) continue;
      seen.add(dep);
      walk(dep);
    }
  };
  walk(name);
  return [...seen];
}

export function copyFiles(name: string) {
  return [name, ...relatedFiles(name)];
}

export function formatBundle(files: string[]) {
  return files
    .map((file) => {
      const src = sources[file];
      if (!src) return "";
      const bar = file.endsWith(".css") ? `/* ===== ${file} ===== */` : `// ===== ${file} =====`;
      return `${bar}\n${src.trimEnd()}`;
    })
    .filter(Boolean)
    .join("\n\n");
}

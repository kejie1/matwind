import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const dir = path.dirname(fileURLToPath(import.meta.url));
const posix = (p: string) => p.replace(/\\/g, "/");
const muiNm = posix(path.resolve(dir, "../MUI/node_modules"));
const kitNm = posix(path.resolve(dir, "node_modules"));
const muiNmFs = path.resolve(dir, "../MUI/node_modules");

// MUI's ESM still `import x from 'prop-types'`. Those packages are CJS-only, and
// serving them via /@fs skips Vite's prebundle → "does not provide an export named 'default'".
const cjsOnly = new Set(["prop-types", "react-is", "hoist-non-react-statics", "object-assign"]);

function cjsAsEsm(): Plugin {
  return {
    name: "cjs-as-esm",
    enforce: "pre",
    resolveId(id) {
      if (cjsOnly.has(id)) return `\0cjs:${id}`;
    },
    async load(id) {
      if (!id.startsWith("\0cjs:")) return;
      const name = id.slice(5);
      const pkgDir = path.join(muiNmFs, name);
      if (!fs.existsSync(pkgDir)) throw new Error(`missing ${pkgDir}`);
      const pkg = JSON.parse(fs.readFileSync(path.join(pkgDir, "package.json"), "utf8")) as { main?: string };
      const result = await esbuild.build({
        absWorkingDir: pkgDir,
        entryPoints: [pkg.main || "index.js"],
        bundle: true,
        format: "esm",
        write: false,
        platform: "browser",
        logLevel: "silent",
        define: { "process.env.NODE_ENV": JSON.stringify("development") },
      });
      let code = result.outputFiles[0].text;
      // esbuild CJS→ESM only emits `export default`. MUI named-imports from react-is.
      code = code.replace(
        /export default ([^;]+);/,
        `const __mod = $1;
export default __mod;
export const {
  isValidElementType, isFragment, isElement, isMemo, isLazy, isPortal, isForwardRef,
  isContextConsumer, isContextProvider, typeOf, ForwardRef, Memo, Element, Fragment,
  ContextConsumer, ContextProvider, Lazy, Portal, Profiler, StrictMode, Suspense,
} = __mod;`,
      );
      return code;
    },
  };
}

export default defineConfig({
  plugins: [cjsAsEsm(), tailwindcss(), react()],
  resolve: {
    alias: [
      { find: /^@mui\/(.*)/, replacement: `${muiNm}/@mui/$1` },
      { find: /^@emotion\/(.*)/, replacement: `${muiNm}/@emotion/$1` },
      { find: "react/jsx-dev-runtime", replacement: `${kitNm}/react/jsx-dev-runtime` },
      { find: "react/jsx-runtime", replacement: `${kitNm}/react/jsx-runtime` },
      { find: /^react-dom$/, replacement: `${kitNm}/react-dom` },
      { find: /^react$/, replacement: `${kitNm}/react` },
    ],
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    // Don't let esbuild crawl the sibling MUI tree; CJS interop is the plugin above.
    exclude: ["@mui/material", "@mui/system", "@mui/utils", "@emotion/react", "@emotion/styled"],
  },
  server: {
    port: 5177,
    host: true,
    fs: { allow: [dir, path.resolve(dir, "../MUI")] },
  },
});

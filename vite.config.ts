import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { catalog, docsNav, liveItems } from "./src/catalog";
import { prerender } from "./scripts/prerender.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));
const kitVersion = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8")).version as string;
const site = process.env.SITE_URL || "https://material-kit.huangchuandong520.workers.dev";

export default defineConfig({
  define: { __KIT_VERSION__: JSON.stringify(kitVersion) },
  plugins: [
    tailwindcss(),
    react(),
    {
      name: "seo-shells",
      apply: "build",
      closeBundle() {
        prerender(path.join(dir, "dist"), site, { catalog, docsNav, items: liveItems() });
      },
    },
  ],
  server: {
    port: 5177,
    host: true,
  },
});

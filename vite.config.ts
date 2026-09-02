import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const dir = path.dirname(fileURLToPath(import.meta.url));
const kitVersion = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8")).version as string;

export default defineConfig({
  define: { __KIT_VERSION__: JSON.stringify(kitVersion) },
  plugins: [tailwindcss(), react()],
  server: {
    port: 5177,
    host: true,
  },
});

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const HOME_DESC =
  "Open-source Material 2 components. npx matwind add button copies source into your React app. MIT licensed. Looks like MUI 9.3.1 default light, without @mui/material.";

const DOCS_DESC = {
  "/docs": "Open-source Material 2 components, MIT licensed. npx matwind add writes source into your project.",
  "/docs/installation": "Install matwind with npx matwind add. Copy components into a React + Tailwind app.",
  "/docs/usage": "Use matwind components with className, CSS variables, and controlled inputs.",
  "/docs/theming": "Theme matwind with --md-* CSS variables.",
};

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function pages({ catalog, docsNav, items }) {
  const brand = "matwind";
  const out = [
    { path: "/", title: `${brand} — open-source Material components`, description: HOME_DESC, h1: brand },
    ...docsNav.map((d) => ({
      path: d.href,
      title: `${d.title} — ${brand}`,
      description: DOCS_DESC[d.href] ?? `${d.title} — ${brand}`,
      h1: d.title,
    })),
    {
      path: "/components",
      title: `Components — ${brand}`,
      description: "Catalog of matwind Material 2 components for React + Tailwind.",
      h1: "Components",
    },
  ];
  for (const g of catalog) {
    out.push({
      path: `/${g.id}`,
      title: `${g.title} — ${brand}`,
      description: `${g.title} components in matwind. Copy-paste Material 2 for React + Tailwind.`,
      h1: g.title,
    });
  }
  for (const it of items) {
    out.push({
      path: `/${it.group.id}/${it.id}`,
      title: `${it.title} — ${brand}`,
      description: `${it.title} for React + Tailwind. npx matwind add ${it.id}. MIT. Looks like MUI 9.3.1 default light.`,
      h1: it.title,
    });
  }
  return out;
}

function stamp(shell, origin, page) {
  const url = origin + page.path;
  let html = shell.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${esc(page.description)}" />\n    <link rel="canonical" href="${esc(url)}" />`,
  );
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"></div>\n    <noscript><h1>${esc(page.h1)}</h1><p>${esc(page.description)}</p></noscript>`,
  );
  return html;
}

/** ponytail: unique title/description shells, not React SSR. renderToString if crawlers ignore JS. */
export function prerender(dist, origin, data) {
  const base = origin.replace(/\/$/, "");
  const shell = fs.readFileSync(path.join(dist, "index.html"), "utf8");
  const list = pages(data);
  for (const page of list) {
    const dir = page.path === "/" ? dist : path.join(dist, page.path.slice(1));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), stamp(shell, base, page));
  }
  fs.writeFileSync(
    path.join(dist, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
  );
  fs.writeFileSync(
    path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${list
      .map((p) => `  <url><loc>${esc(base + p.path)}</loc></url>`)
      .join("\n")}\n</urlset>\n`,
  );

  const field = fs.readFileSync(path.join(dist, "inputs/text-field/index.html"), "utf8");
  assert.match(field, /<title>Text Field — matwind<\/title>/);
  assert.match(field, /npx matwind add text-field/);
  assert.doesNotMatch(field, /npx matwind add button copies source/);
  assert.match(fs.readFileSync(path.join(dist, "robots.txt"), "utf8"), /Sitemap:/);
  assert.match(fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8"), /\/inputs\/text-field/);
  console.log(`seo ${list.length} pages → ${dist}`);
}

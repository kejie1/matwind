#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const RAW = "https://raw.githubusercontent.com/kejie1/matwind/main";
const cache = new Map();

export async function readSrc(rel) {
  const hit = cache.get(rel);
  if (hit) return hit;
  const root = process.env.MATWIND_ROOT;
  let text;
  if (root) {
    text = fs.readFileSync(path.join(root, ...rel.split("/")), "utf8");
  } else {
    const res = await fetch(`${RAW}/${rel}`);
    if (!res.ok) throw new Error(`fetch ${rel}: ${res.status}`);
    text = await res.text();
  }
  cache.set(rel, text);
  return text;
}

function parseCatalog(src) {
  const skip = new Set();
  const files = new Map();
  for (const m of src.matchAll(/\{ id: "([^"]+)", title: "[^"]+", (skip: true|file: "([^"]+)") \}/g)) {
    if (m[2] === "skip: true") skip.add(m[1]);
    else files.set(m[1], m[3]);
  }
  return { skip, files };
}

async function loadMaybe(rel) {
  if (path.posix.extname(rel)) {
    try {
      return { file: rel, text: await readSrc(rel) };
    } catch {
      return null;
    }
  }
  for (const ext of [".tsx", ".ts"]) {
    try {
      const file = rel + ext;
      return { file, text: await readSrc(file) };
    } catch {
      /* next */
    }
  }
  return null;
}

async function walk(startFile) {
  const out = new Map();
  const queue = [startFile];
  while (queue.length) {
    const file = queue.pop();
    if (out.has(file)) continue;
    const loaded = await loadMaybe(file);
    if (!loaded) throw new Error(`missing ${file}`);
    out.set(loaded.file, loaded.text);
    const dir = path.posix.dirname(loaded.file);
    for (const m of loaded.text.matchAll(/from ["'](\.\.?\/[^"']+)["']/g)) {
      const next = path.posix.normalize(path.posix.join(dir, m[1]));
      if (!next.startsWith("src/")) continue;
      queue.push(next);
    }
  }
  return out;
}

/** Copy catalog ids into cwd. Same function for CLI add and MCP. */
export async function add(ids, { cwd = process.cwd(), log = console.log } = {}) {
  const names = ids.map((id) => String(id).trim().toLowerCase()).filter(Boolean);
  if (!names.length) throw new Error("usage: matwind add <component>...");
  const { skip, files } = parseCatalog(await readSrc("src/catalog.ts"));
  const unknown = [];
  const starts = [];
  for (const id of names) {
    if (skip.has(id)) throw new Error(`${id} is out of scope`);
    const file = files.get(id);
    if (!file) unknown.push(id);
    else starts.push({ id, file: `src/components/${file}` });
  }
  if (unknown.length) {
    throw new Error(`unknown: ${unknown.join(", ")}\ntry: ${[...files.keys()].sort().join(", ")}`);
  }
  const written = [];
  const skipped = [];
  const requested = new Set(starts.map((s) => s.file));
  const bundle = new Map();
  for (const s of starts) {
    for (const [file, text] of await walk(s.file)) bundle.set(file, text);
  }
  if (!bundle.has("src/material.css")) {
    bundle.set("src/material.css", await readSrc("src/material.css"));
  }
  for (const [file, text] of bundle) {
    const dest = path.join(cwd, ...file.split("/"));
    if (!requested.has(file) && fs.existsSync(dest)) {
      skipped.push(file);
      continue;
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, text);
    written.push(file);
  }
  for (const f of written) log(`added ${f}`);
  for (const f of skipped) log(`skip ${f} (exists)`);
  log('import "./src/material.css" from your CSS entry (once).');
  return { written, skipped };
}

function send(msg) {
  const body = Buffer.from(JSON.stringify(msg));
  process.stdout.write(`Content-Length: ${body.length}\r\n\r\n`);
  process.stdout.write(body);
}

const ADD_TOOL = {
  name: "add",
  description:
    "Copy matwind component source into the current project. Same as `npx matwind add button`. Do not npm i @mui/material.",
  inputSchema: {
    type: "object",
    properties: {
      components: {
        type: "array",
        items: { type: "string" },
        description: "Catalog ids, e.g. button, dialog",
      },
    },
    required: ["components"],
  },
};

async function onMcp(msg) {
  if (msg.method === "initialize") {
    send({
      jsonrpc: "2.0",
      id: msg.id,
      result: {
        protocolVersion: msg.params?.protocolVersion ?? "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "matwind", version: "1.3.0" },
      },
    });
    return;
  }
  if (msg.method === "notifications/initialized" || msg.method === "notifications/cancelled") return;
  if (msg.method === "ping") {
    send({ jsonrpc: "2.0", id: msg.id, result: {} });
    return;
  }
  if (msg.method === "tools/list") {
    send({ jsonrpc: "2.0", id: msg.id, result: { tools: [ADD_TOOL] } });
    return;
  }
  if (msg.method === "tools/call" && msg.params?.name === "add") {
    const raw = msg.params.arguments?.components;
    const names = Array.isArray(raw) ? raw : raw ? [raw] : [];
    try {
      const { written, skipped } = await add(names, { log() {} });
      send({
        jsonrpc: "2.0",
        id: msg.id,
        result: {
          content: [{ type: "text", text: [...written.map((f) => `added ${f}`), ...skipped.map((f) => `skip ${f}`)].join("\n") }],
        },
      });
    } catch (err) {
      send({
        jsonrpc: "2.0",
        id: msg.id,
        result: { content: [{ type: "text", text: String(err.message ?? err) }], isError: true },
      });
    }
    return;
  }
  if (msg.id != null) {
    send({ jsonrpc: "2.0", id: msg.id, error: { code: -32601, message: `unknown method ${msg.method}` } });
  }
}

export async function mcp() {
  let buf = Buffer.alloc(0);
  for await (const chunk of process.stdin) {
    buf = Buffer.concat([buf, chunk]);
    for (;;) {
      const split = buf.indexOf("\r\n\r\n");
      if (split < 0) break;
      const n = Number(/Content-Length:\s*(\d+)/i.exec(buf.subarray(0, split).toString())?.[1]);
      const start = split + 4;
      if (!n || buf.length < start + n) break;
      const msg = JSON.parse(buf.subarray(start, start + n).toString());
      buf = buf.subarray(start + n);
      await onMcp(msg);
    }
  }
}

function usage() {
  console.error("usage: matwind add <component>...\n       matwind mcp");
  process.exit(1);
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  if (cmd === "add") await add(rest.filter((a) => !a.startsWith("-")));
  else if (cmd === "mcp") await mcp();
  else usage();
}

const entry = process.argv[1] && path.resolve(process.argv[1]);
if (entry && import.meta.url === pathToFileURL(entry).href) {
  main().catch((err) => {
    console.error(err.message ?? err);
    process.exit(1);
  });
}

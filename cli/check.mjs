import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { add } from "./matwind.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
process.env.MATWIND_ROOT = root;
const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "matwind-add-"));
const { written } = await add(["button"], { cwd, log() {} });
for (const file of ["src/components/button.tsx", "src/components/ripple.tsx", "src/lib/cn.ts", "src/lib/ripple.ts", "src/material.css"]) {
  assert.ok(written.includes(file), file);
  assert.equal(fs.readFileSync(path.join(cwd, ...file.split("/")), "utf8"), fs.readFileSync(path.join(root, ...file.split("/")), "utf8"));
}
const second = await add(["button"], { cwd, log() {} });
assert.deepEqual(second.written, ["src/components/button.tsx"]);
assert.ok(second.skipped.includes("src/material.css"));
await assert.rejects(() => add(["nope"], { cwd, log() {} }), /unknown/);
fs.rmSync(cwd, { recursive: true, force: true });

function frame(obj) {
  const body = Buffer.from(JSON.stringify(obj));
  return Buffer.concat([Buffer.from(`Content-Length: ${body.length}\r\n\r\n`), body]);
}

const mcpCwd = fs.mkdtempSync(path.join(os.tmpdir(), "matwind-mcp-"));
const child = spawn(process.execPath, [path.join(root, "cli/matwind.mjs"), "mcp"], {
  cwd: mcpCwd,
  env: { ...process.env, MATWIND_ROOT: root },
  stdio: ["pipe", "pipe", "pipe"],
});
let out = Buffer.alloc(0);
const got = new Promise((resolve, reject) => {
  const t = setTimeout(() => reject(new Error("mcp timeout")), 8000);
  child.stdout.on("data", (chunk) => {
    out = Buffer.concat([out, chunk]);
    if (out.includes(Buffer.from('"isError":true'))) {
      clearTimeout(t);
      reject(new Error(out.toString()));
    }
    if (out.includes(Buffer.from("src/components/button.tsx"))) {
      clearTimeout(t);
      resolve();
    }
  });
  child.on("error", reject);
});
child.stdin.write(frame({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "check", version: "0" } } }));
child.stdin.write(frame({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "add", arguments: { components: ["button"] } } }));
await got;
assert.ok(fs.existsSync(path.join(mcpCwd, "src/components/button.tsx")));
child.kill();
await new Promise((resolve) => child.once("close", resolve));
fs.rmSync(mcpCwd, { recursive: true, force: true, maxRetries: 8, retryDelay: 50 });
console.log("ok");

import { mkdir, writeFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dir = join(root, "public/images/solutions/hub");

const cards = {
  "api-discovery": [1148820, 2582937, 325229, 373543],
  "ai-bom": [8386440, 8438918, 3861964, 1181317],
  "manage-vulnerabilities": [5380642, 60504, 5380664, 6963944],
  "automate-security-workflows": [574073, 270360, 1181376, 1181280],
  "track-appsec-kpis": [669610, 590022, 186461, 265087],
  "manage-open-source-risk": [1181263, 270348, 11035380, 1181677],
};

async function grab(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0", Accept: "image/*" },
    });
    if (!res.ok) throw new Error(String(res.status));
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 30000) throw new Error(`tiny ${buf.length}`);
    return buf;
  } finally {
    clearTimeout(timer);
  }
}

await mkdir(dir, { recursive: true });

for (const [name, ids] of Object.entries(cards)) {
  const dest = join(dir, `${name}.jpg`);
  let ok = false;
  for (const id of ids) {
    const urls = [
      `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=2400`,
      `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`,
    ];
    for (const url of urls) {
      try {
        const buf = await grab(url);
        await writeFile(dest, buf);
        console.log("ok", name, id, buf.length);
        ok = true;
        break;
      } catch (err) {
        console.log("fail", name, id, err.message);
      }
    }
    if (ok) break;
  }
  if (!ok) console.log("MISSING", name);
  else console.log("saved", (await stat(dest)).size, dest);
}

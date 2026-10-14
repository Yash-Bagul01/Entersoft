const list = await (await fetch("http://127.0.0.1:9335/json/list")).json();
const page = list.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
function send(method, params = {}) {
  const msgId = ++id;
  return new Promise((resolve, reject) => {
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });
}
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(JSON.stringify(msg.error)));
    else resolve(msg.result);
  }
});
await new Promise((r) => ws.addEventListener("open", r));
await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});

async function prep(url) {
  await send("Page.navigate", { url });
  await new Promise((r) => setTimeout(r, 4000));
  await send("Runtime.evaluate", {
    expression: `(() => {
      document.querySelectorAll(".pf-ova-media, .pf-ova-veil, .ep-ova-media, .ep-ova-veil").forEach((el) => el.style.display = "none");
      const hero = document.querySelector(".pf-ova-hero, .ep-ova-hero");
      if (hero) hero.style.background = "#111";
    })()`,
  });
}

const read = `(() => {
  const cycle = document.querySelector(".pf-ova-cycle, .ep-ova-cycle");
  const track = cycle.querySelector("span");
  const line = cycle.parentElement;
  const range = document.createRange();
  const text = line.firstChild;
  range.setStart(text, 0);
  range.setEnd(text, 3);
  const our = range.getBoundingClientRect();
  const cr = cycle.getBoundingClientRect();
  const shown = [...track.querySelectorAll("em")].map((em) => {
    const r = document.createRange();
    r.selectNodeContents(em);
    const tr = r.getBoundingClientRect();
    const visible = tr.top < cr.bottom && tr.bottom > cr.top;
    return {
      t: em.textContent,
      visible,
      dTop: Math.round(tr.top - our.top),
      dBottom: Math.round(tr.bottom - our.bottom),
      gap: Math.round(tr.left - our.right),
      clipT: Math.round(cr.top - tr.top),
      clipB: Math.round(tr.bottom - cr.bottom),
    };
  }).filter((w) => w.visible);
  const h1 = document.querySelector("h1");
  const hr = h1.getBoundingClientRect();
  return JSON.stringify({ shown, heroTop: Math.round(hr.top), heroH: Math.round(hr.height) });
})()`;

const fs = await import("fs");
await prep("http://localhost:3000/platform/sca");
for (const name of ["graph", "risk", "license"]) {
  await new Promise((r) => setTimeout(r, 300));
  const m = await send("Runtime.evaluate", { expression: read, returnByValue: true });
  console.log(name, m.result.value);
  const info = JSON.parse(m.result.value);
  const shot = await send("Page.captureScreenshot", {
    format: "png",
    clip: { x: 40, y: Math.max(0, info.heroTop - 10), width: 980, height: info.heroH + 30, scale: 1 },
  });
  fs.writeFileSync(
    `C:/Users/Asus/OneDrive/Desktop/Entersoft 1/entersoft-web/.tmp-nav-shots/${name}.png`,
    Buffer.from(shot.data, "base64")
  );
  await new Promise((r) => setTimeout(r, 2300));
}
ws.close();

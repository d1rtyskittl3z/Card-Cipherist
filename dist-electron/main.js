import { app as n, BrowserWindow as i, ipcMain as d } from "electron";
import { fileURLToPath as m } from "node:url";
import e from "node:path";
import p from "node:fs/promises";
const c = e.dirname(m(import.meta.url));
process.env.APP_ROOT = e.join(c, "..");
const t = process.env.VITE_DEV_SERVER_URL, T = e.join(process.env.APP_ROOT, "dist-electron"), l = e.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = t ? e.join(process.env.APP_ROOT, "public") : l;
let o;
function a() {
  o = new i({
    icon: e.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: e.join(c, "preload.mjs")
    }
  }), o.webContents.on("did-finish-load", () => {
    o == null || o.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), t ? o.loadURL(t) : o.loadFile(e.join(l, "index.html"));
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), o = null);
});
n.on("activate", () => {
  i.getAllWindows().length === 0 && a();
});
n.whenReady().then(a);
d.handle("read-custom-symbol-folders", async () => {
  try {
    const r = e.join(process.env.VITE_PUBLIC || "", "img", "setSymbols", "custom");
    return (await p.readdir(r, { withFileTypes: !0 })).filter((s) => s.isDirectory()).map((s) => s.name);
  } catch (r) {
    return console.error("Error reading custom symbol folders:", r), [];
  }
});
export {
  T as MAIN_DIST,
  l as RENDERER_DIST,
  t as VITE_DEV_SERVER_URL
};

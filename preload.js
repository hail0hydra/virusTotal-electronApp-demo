// const { contextBridge, ipcRenderer } = require("electron");
//
// contextBridge.exposeInMainWorld("electronAPI", {
//     scanFile: (filePath) => ipcRenderer.invoke("scan-file", filePath),
// })



// preload.js
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  pickFile: () => ipcRenderer.invoke("open-file-dialog"),
  scanFile: (filePath) => ipcRenderer.invoke("scan-file", filePath),
});


import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { virusTotal } from "./logic/vt.js";
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ipcMain.handle("open-file-dialog", async () => {
    return await dialog.showOpenDialog({
        properties: ["openFile"],
    });
});

ipcMain.handle("scan-file", async (event, filePath) => {
    try {
        return await virusTotal(filePath, process.env.VT_API_KEY);
    } catch (err) {
        return { error: err.message };
    }
});

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            sandbox: false,
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.loadFile(path.join(__dirname, "skeleton/index.html"));
};

app.whenReady().then(() => {
    createWindow();
});


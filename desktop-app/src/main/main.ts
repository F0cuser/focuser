import { app, BrowserWindow, session, ipcMain } from "electron";
import PacServer from "../utils/proxy/pacServer";
import Logger from "../utils/fileLogger";
import WindowsRegistryEditor from "../utils/windowsRegistryEditor";
import { channels } from "../utils/shared/constants";
import { Store } from "../utils/settingsInterface";

declare global {
  const MAIN_WINDOW_WEBPACK_ENTRY: string;
}

export const pacServer: PacServer = PacServer.getInstance();
const winregEditor: WindowsRegistryEditor = WindowsRegistryEditor.getInstance();
const settingsStore = new Store({ configName: "focuser", defaults: [] });

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

app.whenReady().then(() => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["*"],
      },
    });
  });
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: null | BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    winregEditor.deletePacServer();
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

const startPacServer = async () => {
  await pacServer.startServer();
  winregEditor.setPacServer(pacServer.port);
};

const restartPacServer = async () => {
  await pacServer.restartServer();
  winregEditor.setPacServer(pacServer.port);
}

const initializeApp = () => {
  Logger.info("STARTED");
  PacServer.buildPacFile(19090);
  startPacServer();
  createWindow();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", initializeApp);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open

  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle(channels.READ_SETTINGS, async (_, args) => {
  const resultsToReturn = [];
  for (const arg of args) {
    const result = settingsStore.get(arg);
    resultsToReturn.push({ [arg]: result });
  }
  return resultsToReturn;
});

ipcMain.handle(channels.WRITE_URLS, async (_, args) => {
  settingsStore.set(args.key, args.value);
  PacServer.buildPacFile(19090, args.value);
  restartPacServer();
});

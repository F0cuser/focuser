import { app, BrowserWindow } from "electron";
import FocuserProxy  from "./proxy/proxy";
import Logger from "../utils/fileLogger";
import WindowsRegistryEditor from "../utils/windowsRegistryEditor";

declare global {
  const MAIN_WINDOW_WEBPACK_ENTRY: string;
}


export const focuserProxy: FocuserProxy = FocuserProxy.getInstance();
const winregEditor: WindowsRegistryEditor = WindowsRegistryEditor.getInstance();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

app.whenReady().then(() => {
  ;
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: null | BrowserWindow;

const createWindow = () => {
  Logger.info("STARTEDWIN");

  // Create the browser window.
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
    winregEditor.disableWindowsProxy();
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

const initializeApp = () => {
  Logger.info("STARTED");
  focuserProxy.startProxy();
  winregEditor.enableWindowsProxyBindings(focuserProxy.proxyPort);
  createWindow();
}

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
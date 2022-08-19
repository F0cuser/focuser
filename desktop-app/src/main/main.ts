import {
  app,
  BrowserWindow,
  session,
  ipcMain,
  Tray,
  Menu,
  Notification,
} from "electron";
import PacServer from "../utils/proxy/pacServer";
import WindowsRegistryEditor from "../utils/windowsRegistryEditor";
import { channels } from "../utils/shared/constants";
import { Store } from "../utils/settingsInterface";
import ProxyServerController from "../utils/proxy/proxyServerController";
import path from "path";

declare global {
  const MAIN_WINDOW_WEBPACK_ENTRY: string;
}

if (process.platform === 'win32')
{
    app.setAppUserModelId(app.name)
}

export const pacServer: PacServer = PacServer.getInstance();
let isQuitting = false;
let firstTimeMinimize = true;
const ICON_PATH = path.join(
  __dirname,
  "../../public/static/images/trayIcon.ico",
);
const winregEditor: WindowsRegistryEditor = WindowsRegistryEditor.getInstance();
const settingsStore = new Store({ configName: "focuser", defaults: [] });
const proxyServerController: ProxyServerController =
  ProxyServerController.getInstance(
    path.join(__dirname, "../utils/proxy/proxyServer.exe"),
    ProxyServerController.getPortFromConfiguration(settingsStore),
  );

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

app.whenReady().then(() => {
  createTrayIcon();
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
    icon: ICON_PATH,
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

  mainWindow.on("minimize", (event: Event) => {
    minimizeToTray(event);
  });

  mainWindow.on("close", (event: Event) => {
    if (!isQuitting) {
      minimizeToTray(event);
    }
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    winregEditor.disablePacServer();
    proxyServerController.stopServer();
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

const minimizeToTray = (event: Event) => {
  event.preventDefault();
  mainWindow?.hide();
  if (firstTimeMinimize) {
    const notification = new Notification({
      title: "Focuser is still running",
      body: "You can still open the app from the system tray!",
      silent: true,
      icon: ICON_PATH,
    })
    notification.on('click', () => mainWindow?.show())
    notification.show();
  }

  firstTimeMinimize = false;
};

const createTrayIcon = () => {
  const appIcon = new Tray(ICON_PATH);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Quit",
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ]);
  appIcon.setContextMenu(contextMenu);
  appIcon.setTitle("Focuser");

  appIcon.on("click", () => {
    mainWindow?.show();
  });
};

const startPacServer = async () => {
  await pacServer.startServer();
};

const restartPacServer = async () => {
  await pacServer.restartServer();
};

const initializeApp = () => {
  proxyServerController.startServer(settingsStore);
  PacServer.buildPacFile(proxyServerController.port);
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
  PacServer.buildPacFile(proxyServerController.port, args.value);
  if (args.timerActive) {
    restartPacServer().then(() => {
      winregEditor.disablePacServer();
      winregEditor.setPacServer(pacServer.port);
    });
  }
});

ipcMain.handle(channels.START_PAC, async (_, __) => {
  winregEditor.setPacServer(pacServer.port);
});

ipcMain.handle(channels.STOP_PAC, async (_, __) => {
  winregEditor.disablePacServer();
});

ipcMain.handle(channels.FINISH_TIMER, () => {
  const notification = new Notification({title: 'Time\'s Up!', body: 'If you want to restart the timer, now\'s the time to do it!', icon: ICON_PATH});
  notification.on('click', () => mainWindow?.show());
  notification.show();
})

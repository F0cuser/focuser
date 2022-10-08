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
import { rootPath } from "electron-root-path";
import path from "path";
import url from "url";
import { exec } from "child_process";

declare global {
  const MAIN_WINDOW_WEBPACK_ENTRY: string;
  const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
}

if (handleSquirrelEvent()) {
}

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require("child_process");
  const appFolder = path.resolve(process.execPath, "..");
  const rootAtomFolder = path.resolve(appFolder, "..");
  const updateDotExe = path.resolve(path.join(rootAtomFolder, "Update.exe"));
  const exeName = path.basename(process.execPath);

  const spawn = function (command: any, args: any) {
    let spawnedProcess;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function (args: any[]) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case "--squirrel-install":
    case "--squirrel-updated":
      const elevateCommand = `"${path.join(
        appFolder,
        "./resources/proxy/elevate/elevate.cmd",
      )}"`;
      exec(
        `${elevateCommand} powershell "Import-Certificate -FilePath '${path.join(
          appFolder,
          "./resources/proxy/focuser.crt",
        )}' -CertStoreLocation cert:\\LocalMachine\\root"`,
      );
      spawnUpdate(["--createShortcut", exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case "--squirrel-uninstall":
      spawnUpdate(["--removeShortcut", exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case "--squirrel-obsolete":
      app.quit();
      return true;
  }
}

if (process.platform === "win32") {
  app.setAppUserModelId(app.name);
}

export const pacServer: PacServer = PacServer.getInstance();
let isQuitting = false;
let firstTimeMinimize = true;
const ICON_PATH = path.join(
  rootPath,
  process.env.APP_DEV
    ? "./public/static/images/trayIcon.ico"
    : "./resources/public/static/images/trayIcon.ico",
);
const winregEditor: WindowsRegistryEditor = WindowsRegistryEditor.getInstance();
const settingsStore = new Store({ configName: "focuser", defaults: [] });
const proxyServerController: ProxyServerController =
  ProxyServerController.getInstance(
    path.join(
      rootPath,
      process.env.APP_DEV
        ? "./proxy/proxyServer.exe"
        : "./resources/proxy/proxyServer.exe",
    ),
    ProxyServerController.getPortFromConfiguration(settingsStore),
  );

app.setLoginItemSettings({
  openAtLogin: settingsStore.get("runOnStartup"),
  path: path.join(rootPath, "../Focuser.exe"),
  openAsHidden: true,
});

app.whenReady().then(() => {
  createTrayIcon();
  session.defaultSession.webRequest.onHeadersReceived(
    (
      details: Electron.OnHeadersReceivedListenerDetails,
      callback: (arg0: { responseHeaders: any }) => void,
    ) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": ["*"],
        },
      });
    },
  );
});

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

  if (process.env.APP_DEV) {
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(
          rootPath,
          "./resources/app/.webpack/renderer/main_window/index.html",
        ),
        protocol: "file:",
        slashes: true,
      }),
    );
  }

  mainWindow.on("minimize", (event: Event) => {
    minimizeToTray(event);
  });

  mainWindow.on("close", (event: Event) => {
    if (!isQuitting) {
      minimizeToTray(event);
    }
  });

  mainWindow.on("closed", () => {
    winregEditor.disablePacServer();
    proxyServerController.stopServer();

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
    });
    notification.on("click", () => mainWindow?.show());
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

app.on("ready", initializeApp);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle(
  channels.WRITE_SETTINGS,
  async (_: any, newSettings: { [key: string]: any }) => {
    for (const k in newSettings) {
      settingsStore.set(k, newSettings[k]);
    }
    app.setLoginItemSettings({
      openAtLogin: settingsStore.get("runOnStartup"),
      path: path.join(rootPath, "../Focuser.exe"),
      openAsHidden: true,
    });
  },
);

ipcMain.handle(channels.READ_SETTINGS, async (_: any, args: any) => {
  const resultsToReturn: { [key: string]: any } = {};
  for (const arg of args) {
    const result = settingsStore.get(arg);
    resultsToReturn[arg] = result;
  }
  return resultsToReturn;
});

ipcMain.handle(
  channels.WRITE_URLS,
  async (
    _: any,
    args: {
      key: string | number;
      value: string[] | undefined;
      timerActive: any;
    },
  ) => {
    settingsStore.set(args.key, args.value);
    PacServer.buildPacFile(proxyServerController.port, args.value);
    if (args.timerActive) {
      restartPacServer().then(() => {
        winregEditor.disablePacServer();
        winregEditor.setPacServer(pacServer.port);
      });
    }
  },
);

ipcMain.handle(channels.START_PAC, async (_: any, __: any) => {
  winregEditor.setPacServer(pacServer.port);
});

ipcMain.handle(channels.STOP_PAC, async (_: any, __: any) => {
  winregEditor.disablePacServer();
});

ipcMain.handle(channels.FINISH_TIMER, () => {
  const notification = new Notification({
    title: "Time's Up!",
    body: "If you want to restart the timer, now's the time to do it!",
    icon: ICON_PATH,
  });
  notification.on("click", () => mainWindow?.show());
  notification.show();
});

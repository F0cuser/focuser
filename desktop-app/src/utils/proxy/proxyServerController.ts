import { ChildProcess, execFile } from "child_process";

import Logger from "../fileLogger";

class ProxyServerController {
  public port: number;
  static instance: ProxyServerController;
  public executablePath: string;
  private serverProcess: ChildProcess;

  private constructor(port: number, executablePath: string) {
    this.port = port;
    this.executablePath = executablePath;
  }

  public startServer(): void {
    this.serverProcess = execFile(
      "./proxy.exe",
      [this.port.toString()],
      { windowsHide: true },
      (error, _, __) => {
        if (error)
          Logger.error("Failed running the proxy EXE file: ", error.message);
      },
    );
    Logger.info(`Started proxy server, PID is ${this.serverProcess.pid}`);
  }

  public stopServer(): void {
    const previousPid = this.serverProcess.pid;
    this.serverProcess.kill();
    Logger.info(`Stopped proxy server, PID was ${previousPid}`);
  }

  public restartServer(): void {
    this.stopServer();
    this.startServer();
  }

  static getInstance(port: number, executablePath: string): ProxyServerController {
    if (!ProxyServerController.instance) {
        ProxyServerController.instance = new ProxyServerController(port, executablePath);
    }

    return ProxyServerController.instance;
  }
}

export default ProxyServerController;

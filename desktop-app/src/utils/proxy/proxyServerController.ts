import { ChildProcess, execFile } from "child_process";
import Store from "../settingsInterface";
import portFinder from 'portfinder'

import Logger from "../fileLogger";

const MIN_PROXY_PORT = 10000;
class ProxyServerController {
  public port: number;
  static instance: ProxyServerController;
  public executablePath: string;
  private serverProcess: ChildProcess;

  private constructor(port: number, executablePath: string) {
    this.port = port;
    this.executablePath = executablePath;
  }

  private async setRandomPort(configStore: typeof Store): Promise<void> {
    this.port = await portFinder.getPortPromise({port: MIN_PROXY_PORT});
    ProxyServerController.setPortInConfiguration(configStore, this.port)
    Logger.info("[+] Proxy port set automatically to ", this.port)
  }

  public async startServer(configStore: typeof Store): Promise<void> {

    if (!this.port) {
      await this.setRandomPort(configStore)
    }

    this.serverProcess = execFile(
      this.executablePath,
      [this.port.toString()],
      { windowsHide: true },
      async (error, _, stderr) => {
        if (error)
          Logger.error("[-] Failed running the proxy EXE file: ", error.message);
        if (stderr.includes('already in use')) {
          Logger.error(`[-] STDERR from EXE file: ${stderr} \n\n[*] Restarting server with a new port...`)
          await this.setRandomPort(configStore)
          this.startServer(configStore)
        }
      },
    );
    Logger.info(`[+] Started proxy server, PID is ${this.serverProcess.pid}`);
  }

  public stopServer(): void {
    const previousPid = this.serverProcess.pid;
    this.serverProcess.kill();
    Logger.info(`[+] Stopped proxy server, PID was ${previousPid}`);
  }


  static getInstance(executablePath: string, port: number): ProxyServerController {
    if (!ProxyServerController.instance) {
        ProxyServerController.instance = new ProxyServerController(port, executablePath);
    }

    return ProxyServerController.instance;
  }

  static getPortFromConfiguration(configStore: typeof Store): number {
    return configStore.get('proxyPort');
  }

  static setPortInConfiguration(configStore: typeof Store, newPort: number) {
    configStore.set('proxyPort', newPort);
  }
}

export default ProxyServerController;

import { execFile } from "child_process";
import Store from "../settingsInterface";
import portFinder from 'portfinder'
import processFinder from 'find-process'
import { basename } from "path";

import Logger from "../fileLogger";
import PacServer from "./pacServer";

const MIN_PROXY_PORT = 10000;
class ProxyServerController {
  public port: number;
  static instance: ProxyServerController;
  public executablePath: string;
  private serverProcessPids: number[];
  private pacServer: PacServer

  private constructor(port: number, executablePath: string) {
    this.port = port;
    this.executablePath = executablePath;
    this.pacServer = PacServer.getInstance();
  }

  private async setRandomPort(configStore: typeof Store): Promise<void> {
    this.port = await portFinder.getPortPromise({port: MIN_PROXY_PORT});
    ProxyServerController.setPortInConfiguration(configStore, this.port)
    PacServer.buildPacFile(this.port)
    if (this.pacServer.isRunning)
      this.pacServer.restartServer();
  }

  private getCreatedProcessPids() {
    processFinder('name', basename(this.executablePath)).then(foundProcesses => {
      this.serverProcessPids = foundProcesses.map((proc) => proc.pid)
      Logger.info(`[+] Proxy server PIDs are ${this.serverProcessPids}`)
    })
  }

  private killServerProcess() {
    for (const procId of this.serverProcessPids) {
      try {
        process.kill(procId, 'SIGTERM');
      }
      catch (error) {
        if (!error.message.includes('ESRCH')) {
          Logger.error(error.message);
        }
      }
    }
  }

  public async startServer(configStore: typeof Store): Promise<void> {

    if (!this.port) {
      await this.setRandomPort(configStore)
    }

    execFile(
      this.executablePath,
      [this.port.toString()],
      { windowsHide: true },
      async (error, stdout, stderr) => {
        if (error?.message.includes('[WinError 10048]') || stderr.includes('[WinError 10048]'))
          Logger.error("[-] Port is already taken, re-launching proxy server", error);
          await this.setRandomPort(configStore)
          this.killServerProcess()
          this.startServer(configStore)
        Logger.info(stdout)
        console.log(stdout)
        console.log(stderr)
      },
    );
    Logger.info('[+] Started proxy server');
    this.getCreatedProcessPids();
  }

  public stopServer(): void {
    const previousPid = this.serverProcessPids;
    this.killServerProcess();
    Logger.info(`[+] Stopped proxy server, PIDs were ${previousPid}`);
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

import { ChildProcess, execFile } from "child_process";
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
  private serverProcessPid: number;
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

  private getCreatedProcessPid() {
    processFinder('name', basename(this.executablePath)).then(foundProcesses => {
      const wantedProcess = foundProcesses.sort((a, b) => b.pid - a.pid)[0]
      this.serverProcessPid = wantedProcess.pid
      Logger.info(`[+] Proxy server PID is ${this.serverProcessPid}`)
    })
  }

  private killServerProcess() {
    process.kill(this.serverProcessPid, 'SIGTERM');
  }

  public async startServer(configStore: typeof Store): Promise<void> {

    if (!this.port) {
      await this.setRandomPort(configStore)
    }

    execFile(
      this.executablePath,
      [this.port.toString()],
      { windowsHide: true },
      async (error, _, stderr) => {
        if (error)
          Logger.error("[-] Failed running the proxy EXE file: ", error);
          this.killServerProcess()
        if (stderr.includes('[WinError 10048]')) {
          Logger.error(`[-] STDERR from EXE file: ${stderr} \n\n[*] Restarting server with a new port...`)
          await this.setRandomPort(configStore)
          this.killServerProcess()
          this.startServer(configStore)
        }
      },
    );
    Logger.info('[+] Started proxy server');
    this.getCreatedProcessPid();
  }

  public stopServer(): void {
    const previousPid = this.serverProcessPid;
    this.killServerProcess();
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

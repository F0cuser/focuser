import http from "http";
import { AddressInfo } from "net";
import settingsStore from "../settingsInterface";

import Logger from "../fileLogger";

class PacServer {
  public port: number;
  private server: http.Server;
  static instance: PacServer;
  static pacScript: string;

  private constructor() {
    this.server = http.createServer((req, res) => {
      if (req.url === "/proxy.pac") {
        res.setHeader("Content-Type", "application/x-ns-proxy-autoconfig");
        res.write(PacServer.pacScript);
        res.end();
      } else {
        console.log(req.url);
        res.write("PROXIED :)");
        res.end();
      }
    });
  }

  public startServer(): Promise<void> {
    return new Promise<void>((resolve, _) =>
      this.server.listen(0, () => {
        this.port = (this.server.address() as AddressInfo).port;
        Logger.info(`[+] PAC Server listening on ${this.port}!`);
        resolve();
      }),
    );
  }

  public closeServer(): Promise<void> {
    return new Promise<void>((resolve, _) => {
      this.server.close(() => resolve());
    });
  }

  public restartServer(): Promise<void> {
    Logger.info("[+] Restarting PAC server...");
    return new Promise<void>((resolve, _) => {
      this.server.close(() => {
        this.startServer().then(() => resolve());
      });
    });
  }

  static buildPacFile(proxyPort: number, urls: string[] | undefined=undefined): void {
    if (!urls) {
      urls = settingsStore.get('urls');
    }
    urls = urls?.map(url => {
      return `"${url}"`
    })
    PacServer.pacScript = `
const blockedUrls = [${urls}];

function FindProxyForURL(url, host) {
    for (const blockedUrl of blockedUrls) {
        if (dnsDomainIs(host, blockedUrl)) {
            return 'PROXY 127.0.0.1:${proxyPort}; DIRECT';
        }
    }
    return 'DIRECT'
}    
`;
    Logger.info(`[+] New PAC Script file URLs: ${urls}`)
  }

  static getInstance(): PacServer {
    if (!PacServer.instance) {
      PacServer.instance = new PacServer();
    }

    return PacServer.instance;
  }
}

export default PacServer;

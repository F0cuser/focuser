import http from "http";
import fs from "fs";
import path from "path";
import { AddressInfo } from "net";
import { rootPath } from 'electron-root-path';


import Logger from "../fileLogger";

class PacServer {
  public port: number;
  private server: http.Server;
  static instance: PacServer;

  private constructor() {
    this.server = http.createServer((req, res) => {
      if (req.url === "/proxy.pac") {
        res.setHeader("Content-Type", "application/x-ns-proxy-autoconfig");
        const data = fs.readFileSync(
          path.join(rootPath, "./resources/proxy.pac"),
          "utf8",
        );
        res.write(data);
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
        Logger.info(`PAC Server listening on ${this.port}!`);
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
    Logger.info("Restarting PAC server...");
    return new Promise<void>((resolve, _) => {
      this.server.close(() => {
        this.startServer().then(() => resolve());
      });
    });
  }

  static getInstance(): PacServer {
    if (!PacServer.instance) {
      PacServer.instance = new PacServer();
    }

    return PacServer.instance;
  }
}

export default PacServer;

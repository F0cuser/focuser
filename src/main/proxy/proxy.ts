import http from 'http';
import fs from 'fs';
import path from 'path';
import httpProxy from 'http-proxy';
import { AddressInfo } from 'net'

import Logger from "../../utils/fileLogger";

class FocuserProxy {

  static instance: FocuserProxy;
  proxy: httpProxy;
  webserver: http.Server;
  public proxyPort: number;

  private constructor() {
    
    const options = {
      target: {
        host: 'localhost',
        port: 9009
      },
      ssl: {
        key: fs.readFileSync(path.resolve(__dirname, '../../../static/certs/focuser.key'), 'utf8'),
        cert: fs.readFileSync(path.resolve(__dirname, '../../../static/certs/focuser.cer'), 'utf8')
      }
    }
    this.proxy = httpProxy.createProxyServer(options);
    this.proxy.on('proxyReq', this.handleProxyRequest)
    this.webserver = http.createServer((req, res) => {
      this.proxy.web(req, res, {
        target: req.headers.host
      })
    });
  }

  static getInstance(): FocuserProxy {
    if (!FocuserProxy.instance) {
      FocuserProxy.instance = new FocuserProxy();
    }

    return FocuserProxy.instance;
  }

  public startProxy() {
    Logger.info("Starting Focuser Proxy...");
    const listener = this.webserver.listen(0);
    const { port } = listener.address() as AddressInfo;
    this.proxyPort = port
    Logger.info(`Success! Listening on ${this.proxyPort}`);
  }


  private handleProxyRequest(proxyReq: http.ClientRequest, req: http.IncomingMessage, res: http.ServerResponse, options: any) {
    Logger.info(proxyReq.host);
    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
    // Logger.info(req);
    // Logger.info(res);
  }
  
}

export default FocuserProxy
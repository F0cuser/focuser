import express from "express";
import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";
import Logger from "../../utils/fileLogger";


class FocuserProxy {

  static instance: FocuserProxy;
  expressApp: express.Application;
  proxy: RequestHandler;
  proxyPort: number;

  private constructor() {
    this.expressApp = express();
    const options = {
      changeOrigin: true,
      ws: false,
      secure: false,
      on: {
        proxyReq: this.handleProxyRequest
      },
      target: 'http://localhost'
    }
    this.proxy = createProxyMiddleware(options);
    this.expressApp.use(this.proxy);
  }

  static getInstance(): FocuserProxy {
    if (!FocuserProxy.instance) {
      FocuserProxy.instance = new FocuserProxy();
    }

    return FocuserProxy.instance;
  }

  public startProxy() {
    Logger.info("Starting Focuser Proxy...");
    const listener = this.expressApp.listen(0);
    this.proxyPort = listener.address()?.port;
    Logger.info(`Success! Listening on ${this.proxyPort}`);
  }

  private handleProxyRequest(proxyReq: any, req: any, res: any) {
    Logger.info(proxyReq);
    Logger.info(req);
    Logger.info(res);
  }
  
}

export default FocuserProxy
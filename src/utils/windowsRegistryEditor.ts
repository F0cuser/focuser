import Registry from 'winreg';
import Logger from './fileLogger';


class WindowsRegistryEditor {

    static instance: WindowsRegistryEditor;
    private regKey: Registry.Registry;

    private constructor() {
        this.regKey = new Registry({
            hive: Registry.HKCU,
            key: String.raw`\SOFTWARE\Microsoft\Windows\CurrentVersion\Internet Settings`
        })
    }

    static getInstance(): WindowsRegistryEditor {
        if (!WindowsRegistryEditor.instance) {
            WindowsRegistryEditor.instance = new WindowsRegistryEditor();
        }
    
        return WindowsRegistryEditor.instance;
    }

    
    private enableProxy() {
        Logger.info("Enabling proxy in Windows Registry");
        this.regKey.set('ProxyEnable', Registry.REG_DWORD, '1', () => {;})
    }
    
    public disableWindowsProxy() {
        Logger.info("Disabling proxy in Windows Registry");
        this.regKey.set('ProxyEnable', Registry.REG_DWORD, '0', () => {;})
    }
    
    private setProxyServer(proxyPort: number) {
        Logger.info(`Setting proxy server in Windows Registry to: 127.0.0.1:${proxyPort}`);
        this.regKey.set('ProxyServer', Registry.REG_SZ, `127.0.0.1:${proxyPort}`, () => {;})
    }

    public enableWindowsProxyBindings(proxyPort: number) {
        this.setProxyServer(proxyPort);
        this.enableProxy();
    }
    
}


export default WindowsRegistryEditor;

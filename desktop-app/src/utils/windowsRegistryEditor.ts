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
    
    public deletePacServer() {
        Logger.info("Disabling proxy in Windows Registry");
        this.regKey.remove('AutoConfigUrl', () => {;})
    }
    
    public setPacServer(pacServerPort: number) {
        const registryValue = `http://127.0.0.1:${pacServerPort}/proxy.pac`
        Logger.info(`Setting PAC server in Windows Registry to: ${registryValue}`);
        this.regKey.set('AutoConfigUrl', Registry.REG_SZ, registryValue, () => {;})
    }

    // public enableWindowsProxyBindings(pacServerPort: number) {
    //     this.setPacServer(pacServerPort);
    // }
    
}


export default WindowsRegistryEditor;

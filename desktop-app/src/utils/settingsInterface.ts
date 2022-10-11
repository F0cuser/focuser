const electron = require("electron").app;
const path = require('path')
const fs = require('fs')

const parseDataFile = (filePath: any, defaults: any) => {
  if (!fs.existsSync(filePath)) {
    fs.appendFileSync(filePath, '{}', () => {;});
    return defaults;
  }
  return JSON.parse(fs.readFileSync(filePath));

}
export class Store {
  path: any;
  data: any;


  constructor(opts: { configName: string; defaults: any }) {
    const userDataPath = electron.getPath("userData");
    this.path = path.join(userDataPath, opts.configName + ".json");
    this.data = parseDataFile(this.path, opts.defaults);
  }

  getAll() {
    return this.data;
  }

  get(key: string | number) {
    return this.data[key];
  }

  set(key: string | number, val: any) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

const settingsStore = new Store({configName: 'focuser', defaults: {
    urls: [],
    runOnStartup: false,
}})

export default settingsStore;
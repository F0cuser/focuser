const path = require('path')
const fs = require('fs')

class Store {
  path: any;
  data: any;

  static parseDataFile(filePath: any, defaults: any) {
    try {
      return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      return defaults;
    }
  }

  constructor(opts: { configName: string; defaults: any }) {
    const userDataPath = __dirname;
    this.path = path.join(userDataPath, opts.configName + ".json");
    this.data = Store.parseDataFile(this.path, opts.defaults);
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
    urls: []
}})

export default settingsStore;
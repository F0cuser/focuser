const path = require('path')
const fs = require('fs')

const parseDataFile = (filePath: any, defaults: any) => {
  return JSON.parse(fs.readFileSync(filePath));

}
export class Store {
  path: any;
  data: any;


  constructor(opts: { configName: string; defaults: any }) {
    const userDataPath = __dirname;
    this.path = path.join(userDataPath, opts.configName + ".json");
    this.data = parseDataFile(this.path, opts.defaults);
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
module.exports = {
  packagerConfig: {
    extraResource: "resources/proxy.pac"
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "electron-ts-react",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        mainConfig: "./webpack.main.config.js",
        renderer: {
          config: "./webpack.renderer.config.js",
          entryPoints: [
            {
              html: "./public/index.html",
              js: "./src/renderer/renderer.tsx",
              name: "main_window",
            },
          ],
        },
      },
    ],
  ],
};

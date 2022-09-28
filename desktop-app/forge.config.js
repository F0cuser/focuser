module.exports = {
  packagerConfig: {
    extraResource: [
      "./proxy",
      "./public"
    ]
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        setupExe: "f0cuser_installer.exe",
        noMsi: true,
        iconUrl: 'https://raw.githubusercontent.com/F0cuser/focuser/main/desktop-app/build/installerIcon.ico',
        setupIcon: './public/static/images/trayIcon.ico'
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
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "F0cuser",
          name: "focuser"
        },
        draft: true
      }
    }
  ],
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        mainConfig: "./webpack.main.config.js",
        renderer: {
          nodeIntegration: true,
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

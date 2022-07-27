module.exports = {
  // Put your normal webpack config below here
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: { "react-dom": "@hot-loader/react-dom" },
    fallback: {
      fs: false,
      path: false,
    },
  },
  node: {
    __dirname: true,

  },
  module: {
    rules: require("./webpack.rules"),
  },
};

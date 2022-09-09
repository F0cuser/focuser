module.exports = {
  // Put your normal webpack config below here
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: { "react-dom": "@hot-loader/react-dom" }
  },
  node: {
    __dirname: true,

  },
  module: {
    rules: require("./webpack.rules"),
  },
};

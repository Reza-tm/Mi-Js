const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const path = require("path");

module.exports = merge(common, {
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    compress: true,
    port: 8585,
    watchFiles: ["src/**/*"],
    hot: true,
    open: true,
  },
});

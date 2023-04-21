const { merge } = require("webpack-merge");
const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const common = require("./webpack.config");

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
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [new ESLintPlugin()],
  devServer: {
    compress: true,
    port: 8585,
    watchFiles: ["src/**/*"],
    hot: true,
    open: true,
  },
});

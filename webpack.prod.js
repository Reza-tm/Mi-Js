const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  output: {
    filename: "bundle-[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "[name]-[contenthash].css" }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
});

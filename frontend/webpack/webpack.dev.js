const Dotenv = require("dotenv-webpack");
const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, "../.env.development"),
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
};

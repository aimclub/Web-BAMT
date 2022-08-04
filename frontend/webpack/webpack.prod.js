const Dotenv = require("dotenv-webpack");
const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, "../.env.production"),
    }),
  ],
  optimization: {
    minimizer: [new TerserWebpackPlugin()],
    splitChunks: {
      // include all types of chunks
      chunks: "all",
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react",
          chunks: "all",
        },
        mui: {
          test: /[\\/]node_modules[\\/](@mui)[\\/]/,
          name: "mui",
          chunks: "all",
        },
        apexcharts: {
          test: /[\\/]node_modules[\\/](apexcharts)[\\/]/,
          name: "apexcharts",
          chunks: "all",
        },
        d3: {
          test: /[\\/]node_modules[\\/](d3)/,
          name: "d3",
          chunks: "all",
        },
        redux: {
          test: /[\\/]node_modules[\\/](@reduxjs)[\\/]/,
          name: "redux",
          chunks: "all",
        },
        formik: {
          test: /[\\/]node_modules[\\/](formik)[\\/]/,
          name: "redux",
          chunks: "all",
        },
      },
    },
  },
};

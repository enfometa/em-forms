const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "index.js"),
  mode: "production",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js",
    libraryTarget: "umd",
    library: "@enfometa/emforms",
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      // {
      //   test: /\.css$/i,
      //   use: ["style-loader", "css-loader"],
      // },
    ],
  },
  externals: {
    react: "react",
  },
  //plugins: [
  // new HtmlWebpackPlugin({
  //   template: path.join(__dirname, "src", "index.html"),
  // }),
  // new CopyPlugin({
  //   patterns: [{ from: "src/assets", to: "assets" }],
  // }),
  //],
  // resolve: {
  //   alias: {
  //     src: path.resolve(__dirname, "src"),
  //     components: path.resolve(__dirname, "src/components"),
  //     hooks: path.resolve(__dirname, "src/hooks"),
  //   },
  // },
  // devServer: {
  //   // contentBase: path.join(__dirname, 'dist'),
  //   // compress: true,
  //   // port: 9000,
  //   historyApiFallback: true,
  // },
};

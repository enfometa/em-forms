const path = require("path");
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
    ],
  },
  externals: {
    react: "react",
  },
};

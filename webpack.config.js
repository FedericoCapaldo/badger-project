var path = require("path"); // ensure you have the Node.JS path module
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./app/assets/javascripts/entry.jsx",
  output: {
    path: path.join(__dirname, "public/assets"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /(node_modules)/
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, "app/assets/javascripts"),
        exclude: /(node_modules)/,
        loader: "babel"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css-loader")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test: require.resolve("react"),
        loader: "expose?React"
      }
    ]
  },
  eslint: {
    emitWarning: true,
    emitError: true,
    failOnWarning: true,
    failOnError: true
  },
  plugins: [
      new ExtractTextPlugin("bundle.css", { allChunks: true }) //output to a file called style.css
  ]
};

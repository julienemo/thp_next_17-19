const path = require("path");
// this is a plugin to compile all CSS to only one
// it should be initiated before adding the plugin into module.exports
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
// here is to prepare importing a whole folder of js
var glob = require("glob");

module.exports = (env) => {
  console.log("NODE_ENV", env.NODE_ENV);
  return {
    watch: true,
    watchOptions: {
      ignored: ["*.html", "node_modules/**"],
      aggregateTimeout: 1000,
      poll: 5000,
    },
    // the js files (only js) to bundle
    // either name the files one by one or do this to import a whole folder
    entry: glob.sync("./src/javascripts/*.js"),
    // this is where to find my final general js
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    mode: "development",
    module: {
      rules: [
        // this is to translate all ES6 JS to older version if needed
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env"] },
          },
        },
        // this is to translate SASS to SCSS or CSS
        // the loaders to be used first need to be added last, reversely
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: "css-loader" },
            { loader: "postcss-loader" },
            {
              loader: "sass-loader",
              options: { implementation: require("sass") },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              // there is an option to put images into dist/images folder
              // for now it's just under dist/
              /* options: {outputPath: "images"}*/
            },
          ],
        },
        {
          test: /\.(woff|woff2|ttf|otf|eot)$/,
          use: [
            {
              loader: "file-loader",
              /*options: {outputPath: "fonts"}*/
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // this is where to find my final general CSS
        filename: "bundle.css",
      }),
      new Dotenv(),
    ],
  };
};

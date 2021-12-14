const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js", //this starts at this entry point and traverses thru all the files and transpiles it all in 1 file which is the bundle js. this is veyr important
  mode: "development",
  module: { //module is important. for webpack this is going thru all the code and using whatever is in module as the 'lens'
    rules: [
      {
        test: /\.(js|jsx)$/, //if it sees any file that is .js or .jsx it will use the bable loader transpiler. needs to use regex because it wants the file extensions
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/, //same for css files
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: { //importnant
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

//usuall can run webpack without a server
//look at previous sprints for webpack running. look at redux sprint and the documentation, specifically the api/configuration portion: https://webpack.js.org/configuration/
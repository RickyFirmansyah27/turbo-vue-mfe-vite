const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "http://localhost:8080/",
    clean: true,
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 8080,
    hot: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("tailwindcss"), require("autoprefixer")],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        assetsService: "assetsService@http://localhost:8081/remoteEntry.js",
        commons: "commons@http://localhost:8082/remoteEntry.js",
      },
      shared: {
        vue: {
          singleton: true,
          eager: true,
          requiredVersion: "^2.6.14",
          strictVersion: false,
        },
        "vue-router": {
          singleton: true,
          requiredVersion: "^3.5.3",
        },
      },
    }),
  ],
};

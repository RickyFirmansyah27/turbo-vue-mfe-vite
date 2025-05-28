const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "http://localhost:8081/",
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 8081,
    hot: true,
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
      name: "assetsService",
      filename: "remoteEntry.js",
      exposes: {
        "./bootstrap": "./src/bootstrap.js",
        "./NotFound": "./src/views/NotFound.vue",
      },
      remotes: {
        common: "commons@http://localhost:8082/remoteEntry.js",
      },
      shared: {
        vue: {
          singleton: true,
          eager: false,
          requiredVersion: "^2.6.14",
        },
        "vue-router": {
          singleton: true,
          requiredVersion: "^3.5.3",
        },
      },
    }),
  ],
};

const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  mode: 'production', // Ubah jadi production
  entry: './src/index.js',
  output: {
    publicPath: 'http://localhost:6969/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  devServer: {
    port: 6969,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'commons',
      filename: 'remoteEntry.js',
      exposes: {
        './Utils': './src/index.js',
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^2.6.14',
        },
      },
    }),
  ],
};

import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    vue2(),
    federation({
      name: 'assetsService',
      filename: 'remoteEntry.js',
      exposes: {
        './bootstrap': './src/main.js',
        './AssetsList': './src/views/NotFound.vue',
      },
      remotes: {
        commons: 'http://localhost:6969/remoteEntry.js',
      },
      shared: ['vue'],
    }),
  ],
 server: {
    port: 3001,
    cors: true
  },
  build: {
    target: 'esnext',
    minify: false
  },
  preview: {
    port: 3001
  }
})

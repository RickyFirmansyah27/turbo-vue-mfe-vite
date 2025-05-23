import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue2(),
    federation({
      name: 'remote-app',
      filename: 'remoteEntry.js',
      exposes: {
        './AssetList': './src/views/AssetList.vue'
      },
      shared: ['vue']
    })
  ],
  build: {
    target: 'es2015',
    minify: false,
    cssCodeSplit: true
  },
  server: {
    port: 3001
  }
})
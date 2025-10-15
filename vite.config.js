import { defineConfig } from 'vite';
import {nodePolyfills} from 'vite-plugin-node-polyfills';
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    nodePolyfills() ,
    tailwindcss(),
  ],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      buffer: 'buffer',
    },
  },
  define: {
    'process.env': {},
  },
});

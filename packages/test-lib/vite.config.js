import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    host: '0.0.0.0', // Makes it accessible on your network
    port: 3001, // Change this to your preferred port
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TestLib',
      // the proper extensions will be added
      fileName: 'test-lib',
      formats: ['es', 'cjs'],
    },
  },
  plugins: [dts()],
});

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts';
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
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
  plugins:[dts() ,  tailwindcss(),]
});

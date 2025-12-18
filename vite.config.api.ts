import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/api/main.ts'),
      name: 'ksef-api',
      formats: ['cjs'],
      fileName: () => 'main.cjs',
    },
    outDir: path.resolve(__dirname, 'dist-api'),
    emptyOutDir: true,
    rollupOptions: {
      external: ['express', 'pdfmake', 'xml-js'],
      output: {
        exports: 'named',
      },
    },
    ssr: true,
    target: 'node20',
  },
  resolve: {
    alias: {
      '@lib-public': path.resolve(__dirname, 'src/lib-public'),
      '@lib-private': path.resolve(__dirname, 'src/lib-private'),
    },
  },
});

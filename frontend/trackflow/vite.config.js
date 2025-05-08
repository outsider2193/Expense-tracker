import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    minify: 'esbuild'
  },
  resolve: {
    alias: {
      // Only if you're using styled-components with MUI
      '@mui/styled-engine': '@mui/styled-engine-sc'
    }
  }
});

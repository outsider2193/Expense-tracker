import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    mainFields: ['module', 'jsnext:main', 'jsnext', 'browser', 'main'],
    alias: {
      'react': 'react',
      'react-dom': 'react-dom'
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
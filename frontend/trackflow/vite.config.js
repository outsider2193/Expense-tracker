import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Use automatic JSX transform
      jsxRuntime: 'automatic',
      // But don't import from 'react/jsx-runtime'
      jsxImportSource: 'react',
      // Use explicit React import for JSX
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', {
            runtime: 'automatic'
          }]
        ]
      }
    })
  ],
  build: {
    // Tell Rollup to include CJS modules in its bundle
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  resolve: {
    // Force Vite to use node_modules copies of deps
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: {
    // More aggressive deps optimization
    esbuildOptions: {
      target: 'esnext'
    }
  }
});
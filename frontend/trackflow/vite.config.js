import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Explicitly configure Babel without custom plugins
      babel: {
        babelrc: false,
        configFile: false,
        presets: [
          ['@babel/preset-env', { targets: 'defaults' }],
          ['@babel/preset-react', { runtime: 'automatic' }]
        ]
      }
    })
  ],
  build: {
    // Use simpler build settings
    target: 'es2015',
    minify: 'esbuild'
  }
});
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [reactRefresh()],
  css: {
    postcss: './postcss.config.cjs',
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});

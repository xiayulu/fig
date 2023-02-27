import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    WindiCSS(),
    AutoImport({
      imports: ['react', 'react-router', 'react-router-dom'],
    }),
  ],
})

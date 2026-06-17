import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Introduccion-a-React.github.io/clase-7/citas-medicas/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Introduccion-a-React.github.io/clase-1/padre_hijo/dist/',
  plugins: [react()],
})
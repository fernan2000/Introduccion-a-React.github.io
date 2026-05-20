import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/clase-1/padre_hijo/dist/',
  plugins: [react()],
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/clase-1/tarjeta/dist/',
  plugins: [react()],
})
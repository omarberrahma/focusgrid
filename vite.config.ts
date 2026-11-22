import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://omarberrahma.github.io/focusgrid/
export default defineConfig({
  plugins: [react()],
  base: '/focusgrid/',
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/auth': 'http://localhost:5000',
      '/artigos': 'http://localhost:5000',
      '/artigo': 'http://localhost:5000',
      '/dicas': 'http://localhost:5000',
      '/quiz': 'http://localhost:5000',
      '/historico': 'http://localhost:5000',
    }
  }
})

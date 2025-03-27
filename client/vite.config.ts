import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Import path module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Setup path alias for cleaner imports
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000, // Development server port
    host: true, // Listen on all network interfaces (needed for Docker)
    // Optional: Proxy API requests to backend to avoid CORS issues during development
    // proxy: {
    //   '/api': {
    //     target: 'http://server:3001', // Target backend service name in Docker
    //     changeOrigin: true,
    //     // rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix if backend doesn't expect it
    //   },
    // },
  },
})
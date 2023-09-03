import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_KEY': JSON.stringify(process.env.VITE_KEY),
  },
  // server: {
  //   proxy: {
  //     '/': 'https://us-central1-social-clone-eb38a.cloudfunctions.net/app',
  //   },
  // },
})

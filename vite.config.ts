import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/_variables.scss"; 
          @import "@/styles/_mixins.scss";
        `
      }
    }
  },
  resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
    "react": path.resolve(__dirname, "node_modules/react"),
    "react-dom": path.resolve(__dirname, "node_modules/react-dom")
  }
}

})
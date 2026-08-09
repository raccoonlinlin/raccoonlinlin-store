import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
plugins: [
react(),
tailwindcss(),
],

// GitHub Pages 部署設定
// 如果你的網址是：
// https://raccoonlinlin.github.io/raccoonlinlin-store/
// 
base: './',
})

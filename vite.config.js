import { defineConfig, loadEnv } from 'vite'
import path from 'path'

import vue from '@vitejs/plugin-vue'
import terser from '@rollup/plugin-terser'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const envDir = path.join(__dirname, '/.env')
  const env = loadEnv(mode, envDir)
  const plugins = [vue(), viteCommonjs()]

  if (env.VITE_APP_LOCALBETA === 'true') {
    plugins.push(visualizer({ open: true }))
  }

  return {
    define: {
      VITE_APP_SRC: JSON.stringify(env.VITE_APP_SRC),
      VITE_APP_ISLOCAL: JSON.stringify(env.VITE_APP_ISLOCAL)
    },
    resolve: {
      alias: { // 路径映射配置
        '@': '/src',
        '@styles': '/src/styles',
        '@utils': '/src/utils',
        '@api': '/src/api',
        '@assets': '/src/assets',
        '@comp': '/src/components',
        '@views': '/src/views'
      }
    },
    plugins,
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "@styles/less/global.less";'
        }
      }
    },
    server: {
      host: '127.0.0.1',
      port: '8080',
      strictPort: false,
      open: '/',
      proxy: {
        '/api': {
          target: 'https://xzapi.test.tiantiantongshi.com/',
          changeOrigin: true,
          ws: true
        }
      }
    },
    envDir,
    build: {
      target: 'es2015',
      reportCompressedSize: mode === 'development',
      sourcemap: mode === 'beta',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        external: ['jsencrypt'],
        plugins: [
          terser({
            compress: {
              drop_console: true,
              drop_debugger: true
            }
          })
        ],
        output: { // 静态资源分类打包
          chunkFileNames: 'static/js/[name]-[hash].js',
          // 引用包处文件资源打包输出名 入import
          entryFileNames: 'static/js/[name]-[hash].js',
          // 入口函数打包输出名
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          // asset处文件资源打包输出名
          manualChunks (id) { // 静态资源分拆打包
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    },
    optimizeDeps: {}

  }
})

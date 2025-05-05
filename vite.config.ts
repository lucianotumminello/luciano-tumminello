
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
        ecma: 2015,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
        ecma: 2015,
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom'
          ],
          router: [
            'react-router-dom'
          ],
          utilities: [
            'react-helmet-async',
            '@tanstack/react-query'
          ],
          ui: ['@/components/ui/index.ts'], // Updated path to use the index file
          icons: ['lucide-react']
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
      // Optimize for mobile by splitting package dependencies
      treeshake: {
        moduleSideEffects: true,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      },
    },
    cssCodeSplit: true,
    reportCompressedSize: false,
    assetsInlineLimit: 4096, // Inline small assets
    sourcemap: false, // Disable sourcemaps for production builds
    chunkSizeWarningLimit: 1000, // Increase warning limit
    // Generate service worker for offline capabilities and mobile performance
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      target: 'es2015',
    }
  },
  preview: {
    port: 8080,
    host: true,
  },
}));

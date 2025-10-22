
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      // Enable compression
      'Cache-Control': 'public, max-age=31536000',
    }
  },
  plugins: [
    react({
      // Optimize React build
      tsDecorators: true,
      jsxImportSource: "react",
      // Remove styled-components plugin that's causing the error
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react-router-dom"],
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        ecma: 2015,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 3, // Multiple compression passes for better minification
      },
      mangle: {
        safari10: true,
        toplevel: true, // Better variable name minification
      },
      format: {
        comments: false,
        ecma: 2015,
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'], 
          ui: ['@/components/ui/index.ts'],
          components: ['@/components/Header.tsx', '@/components/Footer.tsx'],
          blog: ['@/components/blog/BlogPostLayout.tsx', '@/components/blog/BlogPostContent.tsx', '@/components/blog/BlogPostHeader.tsx'],
          utils: ['@/utils/blog/index.ts', '@/utils/imageUtils.ts', '@/lib/utils.ts'],
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
      treeshake: {
        moduleSideEffects: true,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false, // Optimize try-catch blocks
      },
    },
    cssCodeSplit: false, // Bundle CSS for faster mobile loading
    reportCompressedSize: false,
    assetsInlineLimit: 10240, // Inline more assets (10kb) for fewer requests
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true, // Clean output directory before build
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      target: 'es2015',
      treeShaking: true, // Remove unused code
      minify: true,
      minifyWhitespace: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      legalComments: 'none',
    }
  },
  preview: {
    port: 8080,
    host: true,
    headers: {
      // Enable compression and caching for previews
      'Cache-Control': 'public, max-age=31536000',
    },
  },
  // Add asset optimization
  experimental: {
    renderBuiltUrl(filename) {
      return `/${filename}`;
    }
  },
}));

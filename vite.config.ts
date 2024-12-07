import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, UserConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig((config: UserConfig) => {
  const isProduction = config.mode === "production";
  return {
    base: "./",
    plugins: [
      react(),
      svgrPlugin({
        include: "**/*.svg",
        svgrOptions: {
          exportType: "default",
        },
      }),
    ],
    server: {
      port: 8000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      minify: isProduction, // Minificar solo en producción
      assetsDir: "assets",
      cssCodeSplit: true, // Dividir CSS para ambos modos
      sourcemap: !isProduction, // Generar sourcemaps solo en desarrollo
      rollupOptions: {
        treeshake: isProduction, // Tree shaking solo en producción
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        minify: false, // No minimizar dependencias en desarrollo
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    test: {
      includeSource: ["src/**/*.{js,ts,jsx,tsx}"], 
      environment: "happy-dom", 
      globals: true, 
      setupFiles: ["./setupTest.ts"],
      coverage: {
        provider: "istanbul", 
        reporter: ["text", "json", "html"],
        reportsDirectory: "coverage", 
        exclude: [
          "**/main.tsx",
          "**/vite.config.ts",
          "**/*.cjs",
          "**/coverge/**",
          "**/dist/**",
          "**/mocks/**",
          "**/constants/**",
          "**/modules/**",
          "**/views/**",
          "**/cypress/**",
          "cypress.config.*",
        ],
      },
    },
  };
});
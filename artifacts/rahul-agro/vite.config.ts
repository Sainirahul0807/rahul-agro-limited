import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@shared": path.resolve(import.meta.dirname, "../../lib"),
      "@workspace": path.resolve(import.meta.dirname, "../../lib")
    }
  },

  root: path.resolve(import.meta.dirname),

  base: "/",

  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    sourcemap: false,
    minify: "esbuild"
  },

  server: {
    host: "0.0.0.0",
    port: 5173
  },

  preview: {
    host: "0.0.0.0",
    port: 4173
  }
});

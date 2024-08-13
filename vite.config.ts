import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  worker: {
    format: "es",
  },
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
  optimizeDeps: {},
  assetsInclude: ["**/*.wasm"],
  plugins: [react()],
});

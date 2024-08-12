import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Vite configuration for the Weather Predictor frontend application.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});



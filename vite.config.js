import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Vite will output build files in 'dist'
    emptyOutDir: true, // Clears old files before building
  },
});


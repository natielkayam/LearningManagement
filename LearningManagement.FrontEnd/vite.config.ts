import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
      },
      output: {
        manualChunks(id) {
          // Split all node_modules packages into separate chunks
          if (id.includes("node_modules")) {
            const parts = id.toString().split("node_modules/")[1].split("/");

            // For scoped packages like @mui/icons-material
            const name = parts[0].startsWith("@")
              ? `${parts[0]}/${parts[1]}`
              : parts[0];

            return `vendor-${name}`;
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Define `@` alias
    },
  },
  server: {
    host: "localhost",
    port: 5173,
    strictPort: true,
  },
});

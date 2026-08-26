import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // If the optional backend (server/server.js) is running,
      // /api calls from the dev server are forwarded to it.
      "/api": "http://localhost:8787"
    }
  }
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        scm: resolve(__dirname, "panel/index.html"),
        "pull-requests": resolve(__dirname, "panel/pull-requests.html"),
        branch: resolve(__dirname, "popover/branch.html"),
        "pr-info": resolve(__dirname, "popover/pr-info.html"),
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import packageJson from "./package.json" with { type: "json" };

export default defineConfig({
  plugins: [react()],
  base: "/quick-five/",
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().split("T")[0]),
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/",
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:5174",
          changeOrigin: true,
        },
      },
    },
  };

  // if (command !== "serve") {
  //   config.base = "/react-face-auth/";
  // }

  return config;
});

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        // Long-lived vendor chunks: page updates don't invalidate the cached libraries.
        codeSplitting: {
          groups: [
            {
              name: "react",
              test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/,
              priority: 2,
            },
            { name: "gsap", test: /node_modules[\\/](gsap|@gsap)[\\/]/, priority: 1 },
          ],
        },
      },
    },
  },
});

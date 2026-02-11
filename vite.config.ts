import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

const config = defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  server: {
    watch: {
      ignored: ["**/routeTree.gen.ts"],
    },
    proxy: process.env.BUILDER_PORT
      ? {
          "/api": {
            target: `http://localhost:${process.env.BUILDER_PORT}`,
            changeOrigin: true,
          },
        }
      : undefined,
  },
  build: {
    minify: "esbuild",
    target: "esnext",
    reportCompressedSize: false,
  },
});

export default config;

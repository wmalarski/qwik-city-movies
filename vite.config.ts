import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import netlifyEdge from "@netlify/vite-plugin-netlify-edge";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity(),
      qwikVite({
        ssr: { outDir: "netlify/edge-functions/entry.netlify-edge" },
      }),
      tsconfigPaths(),
      netlifyEdge({ functionName: "entry.netlify-edge" }),
    ],
  };
});

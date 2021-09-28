import htmlEnv from "vite-plugin-html-env";
import istanbul from "vite-plugin-istanbul";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite-react";
import tsconfigPaths from "vite-tsconfig-paths";

const isCoverage = process.env.VITE_COVERAGE === "true";
const istanbulPlugin = isCoverage
    ? istanbul({
          include: "src/*",
          exclude: ["node_modules"],
          extension: [".js", ".jsx", ".ts", ".tsx"],
          requireEnv: true,
      })
    : undefined;

export default defineConfig({
    build: {
        outDir: "../internal/server/public_html",
        assetsDir: "static",
    },
    eslint: {
        enable: true,
    },
    plugins: [istanbulPlugin, htmlEnv(), svgr(), tsconfigPaths()],
});

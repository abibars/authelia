import { loadEnv } from "vite";
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

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, "env");
    return {
        build: {
            outDir: "../internal/server/public_html",
            assetsDir: "static",
        },
        server: {
            host: process.env.HOST,
        },
        eslint: {
            enable: true,
        },
        envDir: "env",
        html: {
            injectData: {
                ...env,
            },
        },
        plugins: [istanbulPlugin, svgr(), tsconfigPaths()],
    };
});

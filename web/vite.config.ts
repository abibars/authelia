import htmlEnv from "vite-plugin-html-env";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    build: {
        outDir: "../internal/server/public_html",
        assetsDir: "static",
    },
    server: {
        hmr: { clientPort: 3000 },
    },
    plugins: [htmlEnv(), svgr(), tsconfigPaths()],
});

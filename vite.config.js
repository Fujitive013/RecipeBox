/* global process */
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(process.cwd(), "./src"),
        },
    },
}); // Wait, I cannot use __dirname in ESM. I will use process.cwd() or import.meta logic.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

const version = Date.now().toString();

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'version-plugin',
      buildStart() {
        if (!fs.existsSync('public')) {
          fs.mkdirSync('public');
        }
        fs.writeFileSync('public/version.json', JSON.stringify({ version }));
      }
    }
  ],
  define: {
    '__APP_VERSION__': JSON.stringify(version)
  }
});

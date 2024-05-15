import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});

// I followed the documentation to install tailwind with Vite and React and it didn't worked too. then i add these changes in vite.config.js and it worked.

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "tailwindcss";

// // https://vitejs.dev/config/
// export default defineConfig({
//   css: {
//     postcss: {
//       plugins: [tailwindcss()],
//     },
//   },
// });

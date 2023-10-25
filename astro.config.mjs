import { defineConfig } from "astro/config";
// import nodejs from "@astrojs/node";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // adapter: nodejs(),
  // output: "server", 
});

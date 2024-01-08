import { defineConfig } from "astro/config";

// astro.config.mjs
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // ... other configurations
  server: {
    port: 3000
  },
  integrations: [react(), tailwind()]
});

/* export default defineConfig({});
 */
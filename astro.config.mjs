import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://www.itpc.co.jp',

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  output: "hybrid",
  adapter: cloudflare()
});
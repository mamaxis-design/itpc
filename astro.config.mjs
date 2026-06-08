import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.itpc.co.jp',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});

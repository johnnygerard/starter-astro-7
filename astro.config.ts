import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  adapter: cloudflare({
    imageService: "compile",
  }),
  build: {
    format: "file",
  },
  fonts: [
    /**
     * Geist: sans-serif typeface
     * @see https://fonts.google.com/specimen/Geist/about
     */
    {
      cssVariable: "--default-font",
      name: "Geist",
      provider: fontProviders.google(),
      styles: ["normal", "italic"],
      subsets: ["latin"],
      weights: ["100 900"],
    },
  ],
  integrations: [sitemap()],
  output: "static",
  session: {
    /**
     * Disable SESSION KV binding automatic provisioning
     *
     * This driver overrides the default driver from the Cloudflare adapter.
     * @see https://unstorage.unjs.io/
     * @see https://github.com/withastro/astro/pull/15803
     */
    driver: {
      entrypoint: "unstorage/drivers/null",
    },
  },
  site: "https://min-starter-astro-6.jgerard.workers.dev",
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
  },
});

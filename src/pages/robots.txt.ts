import type { APIRoute } from "astro";

/**
 * Generate the `robots.txt` file at build time.
 */
export const GET: APIRoute = ({ site }) =>
  new Response(`\
# https://www.rfc-editor.org/rfc/rfc9309
User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", site)}
`);

import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright Test Configuration
 * @see https://playwright.dev/docs/api/class-testconfig
 */
export default defineConfig({
  testDir: "./pw",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : "50%",
  reporter: "html",
  use: {
    baseURL: "http://localhost:3321",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "global-setup",
      testMatch: "global-setup.ts",
    },

    {
      name: "chromium",
      dependencies: ["global-setup"],
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      dependencies: ["global-setup"],
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      dependencies: ["global-setup"],
      use: { ...devices["Desktop Safari"] },
    },
  ],
  webServer: {
    command: "npm run preview",
    url: "http://localhost:3321",
    reuseExistingServer: !process.env.CI,
  },
});

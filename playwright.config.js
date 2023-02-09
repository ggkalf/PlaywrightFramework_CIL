// @ts-check
const { devices } = require('@playwright/test'); // require devices


/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {

    headless: true,
    // Take a screenshot of failed tests in /Users/gerasimoskalfountzos/PlaywrightFramework/test-results/
    screenshot: "only-on-failure",

    timezoneId: "America/Chicago",
    geolocation: { longitude: -87.623177, latitude: 41.881832 },
    permissions: ["geolocation"],
    // viewport: { width: 600, height: 900 },
  },
  // https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
    {
      name: "safari",
      use: {
        ...devices["Desktop Safari"],
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
    {
      name: "mobile safari",
      use: {
        ...devices["iPhone 12"],
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
  ],
  // Retry failed tests
  // retries: 1,

  // Max number of worker processes, max is 10 in MAC
  // workers: process.env.CI ? 2 : undefined,
  workers: 1,
  globalSetup: 'src/utils/globalSetup.ts',
};

module.exports = config;

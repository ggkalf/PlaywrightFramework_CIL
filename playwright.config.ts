import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const config: PlaywrightTestConfig = {
  // testDir: './tests',
  // /* Maximum time one test can run for. */
  // timeout: 30 * 1000,
  // expect: {
  //   /**
  //    * Maximum time expect() should wait for the condition to be met.
  //    * For example in `await expect(locator).toHaveText();`
  //    */
  //   timeout: 5000,
  // },
  // /* Run tests in files in parallel */
  // fullyParallel: true,
  // /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI ? 1 : 0,
  // /* Opt out of parallel tests on CI. */

  // // Max number of worker processes, max is 10 in MAC
  // // workers: process.env.CI ? 2 : undefined,

  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  // /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  use: {
    headless: true,
    // Take a screenshot of failed tests in /Users/gerasimoskalfountzos/PlaywrightFramework/test-results/
    screenshot: 'only-on-failure',

    timezoneId: 'America/Chicago',
    geolocation: { longitude: -87.623177, latitude: 41.881832 },
    permissions: ['geolocation'],
    // viewport: { width: 600, height: 900 },
  },
  // https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
    {
      name: 'safari',
      use: {
        ...devices['Desktop Safari'],
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
    {
      name: 'mobile safari',
      use: {
        ...devices['iPhone 12'],
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
  ],
  // workers: 1,
  globalSetup: 'src/utils/globalSetup.ts',

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
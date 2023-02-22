import { FullConfig } from '@playwright/test';
import dotenv from 'dotenv';

async function globalSetup(config: FullConfig) {
  if (process.env.testEnv) {
    dotenv.config({
      path: `./Files/environmentFiles/.env.${process.env.testEnv}`,
      override: true,
    });
  }
}

export default globalSetup;

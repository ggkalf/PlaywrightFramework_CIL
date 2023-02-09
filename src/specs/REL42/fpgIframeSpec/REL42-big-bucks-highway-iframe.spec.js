// The .loaded class is not present int Big Bucks Highway game,
// thus we are unable to test the iframe game load time.
// Pending feedback from the games team

import ENV from '../../../utils/env';

const { test, expect } = require('@playwright/test');
const baseUrl = ENV.BASE_URL;

test.describe.configure({ mode: 'parallel' });

test('Player playes a Big Bucks Highway ticket and the iframe animation is displayed', async ({
  page,
}) => {
  // Player goes to login Page and logs in
  await page.goto(baseUrl + '/account/login');
  await page.locator('#userName').fill('natalia.giannouli@camelotls.com');
  await page.locator('#password').fill('Password1!');
  await page.locator('#login-button').click();

  //Verify player is Logged in
  await expect(page.locator('#playerWallet')).toBeVisible;

  //Player navigates to FPG Games Page
  await page.goto(baseUrl + '/games/fpg');

  //Player is located to FPG Games Page
  await expect(page).toHaveURL(baseUrl + '/games/fpg');
  await expect(
    page.locator(
      '#fiesta-fever > div.fpg-game-ticket-card__controls > div > button.exc-btn.exc-btn-fill--default.range-selector__controls-btn.range-selector__controls-btn--increment > span'
    )
  ).toBeVisible;

  // Tickets for 4 fpg games are displayed and playable
  await expect(
    page.locator(
      '#il-web-app > div.exc-container.exc-container__body.exc-container--with-bottom-margin > div > section > div > section > div > section.fpg-game-play-hub__purchased-tickets > div > div > div > button'
    )
  ).toBeVisible;

  // Player Clicks the play button for Big Bucks Highway
  await page
    .locator(
      '#il-web-app > div.exc-container.exc-container__body.exc-container--with-bottom-margin > div > section > div > section > div > section.fpg-game-play-hub__purchased-tickets > div > div > div:nth-child(1) > button'
    )
    .click();

  //Player is located to FPG Games Page
  await expect(page).toHaveURL(
    baseUrl +
      '/games/fpg/big-bucks-highway/play'
  );

  // //DOESN'T WORK READ COMMENT AT THE START OF THE PAGE
  // // Wait till game is loaded
  // const iframeBodyClass = await page
  //   .frameLocator(
  //     '#il-web-app > div:nth-child(1) > div:nth-child(1) > section > section > div.iframe-play__iframe-wrapper > iframe'
  //   )
  //   .locator('.loaded');
  // await expect(iframeBodyClass).toBeVisible({ timeout: 300000, visible: true });
});

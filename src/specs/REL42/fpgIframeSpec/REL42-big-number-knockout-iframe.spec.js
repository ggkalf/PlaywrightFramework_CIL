import ENV from '../../../utils/env';

const { test, expect } = require('@playwright/test');
const baseUrl = ENV.BASE_URL;

test.describe.configure({ mode: 'parallel' });

test('Player playes a Big Number Knockout ticket and the iframe animation is displayed', async ({
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

  // Player Clicks the play button for Big Number Knockout
  await page
    .locator(
      '#il-web-app > div.exc-container.exc-container__body.exc-container--with-bottom-margin > div > section > div > section > div > section.fpg-game-play-hub__purchased-tickets > div > div > div:nth-child(3) > button > span.fpg-play-game-card__action-btn-label'
    )
    .click();

  //Player is located to FPG Games Page
  await expect(page).toHaveURL(baseUrl + '/games/fpg/big-number-knockout/play');

  // Measure page load time
  navigationTimingJson = await page.evaluate(() =>
  JSON.stringify(performance.getEntriesByType('navigation'))
  );
  navigationTiming = JSON.parse(navigationTimingJson);
  console.log(navigationTiming);

  // Wait till game is loaded
  const iframeBodyClass = await page.frameLocator('#il-web-app > div:nth-child(1) > div:nth-child(1) > section > section > div.iframe-play__iframe-wrapper > iframe')
  .locator('.loaded');
  await expect(iframeBodyClass).toBeVisible({ timeout: 300000, visible: true });

});

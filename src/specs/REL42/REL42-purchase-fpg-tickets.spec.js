import ENV from '../../utils/env';

const { test, expect } = require('@playwright/test');
const baseUrl = ENV.BASE_URL;

test.describe.configure({ mode: 'parallel' });

test('Player purchases 1 Intralot game ticket and 3 rgs game tickets', async ({
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

  //Player adds one Fiesta Fever ticket
  await page
    .locator(
      '#piggy-bank-bucks > div.fpg-game-ticket-card__controls > div > button.exc-btn.exc-btn-fill--default.range-selector__controls-btn.range-selector__controls-btn--increment > span'
    )
    .click();

  await page
    .locator(
      '#fiesta-fever > div.fpg-game-ticket-card__controls > div > button.exc-btn.exc-btn-fill--default.range-selector__controls-btn.range-selector__controls-btn--increment > span'
    )
    .click();

  await page
    .locator(
      '#big-bucks-highway > div.fpg-game-ticket-card__controls > div > button.exc-btn.exc-btn-fill--default.range-selector__controls-btn.range-selector__controls-btn--increment > span'
    )
    .click();

  await page
    .locator(
      '#big-number-knockout > div.fpg-game-ticket-card__controls > div > button.exc-btn.exc-btn-fill--default.range-selector__controls-btn.range-selector__controls-btn--increment > span'
    )
    .click();

  // Purchase Button is displayed
  await expect(
    page.locator(
      '#il-web-app > div.exc-container.exc-container__body.exc-container--with-bottom-margin > div > section > div > section > div > footer > div > button'
    )
  ).toBeVisible;

  await page
    .locator(
      '#il-web-app > div.exc-container.exc-container__body.exc-container--with-bottom-margin > div > section > div > section > div > footer > div > button'
    )
    .click();

  // Confirm Purchase Button is displayed
  await expect(page.locator('#purchase-form > div > button')).toBeVisible;

  await page.locator('#purchase-form > div > button').click();

  // Ticket is displayed and playable
  await expect(
    page.locator(
      '#fpg-purchase-success-alert > div > span.global-messages__list.global-messages__list--success > ul > li'
    )
  ).toHaveText(
    "You have successfully purchased your tickets. Play them now to see if you've won!"
  );

  await expect(
    page.locator(
      '#il-web-app > div.exc-container.exc-container__body.exc-container--with-bottom-margin > div > section > div > section > div > section.fpg-game-play-hub__purchased-tickets > div > div > div > button'
    )
  ).toBeVisible;
});

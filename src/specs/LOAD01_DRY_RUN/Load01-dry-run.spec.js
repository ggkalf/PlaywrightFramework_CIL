/*
Dry run for verifying load01 environment status
testEnv=load01 npx playwright test specs/LOAD01_DRY_RUN/Load01-dry-run.spec.js --project='chromium' --workers=1
or
npm run dryrun (the script can be located in package.json -> scripts)
*/
import ENV from '../../utils/env';

const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'parallel' });

test('Log-in, add funds, withdraw funds, DBG purchase, navigate', async ({ page }) => {

    // Override default timeout with a higher value duw to slow load01 environment
    test.setTimeout(300000)

    // Open homepage
    await page.goto(ENV.BASE_URL);
    const name = await page.innerText('#page-79ae7d0684 > div.header_conf.configuration.parbase > div > div > header > div > div.illi-header__content-wrapper.illi-header__content-logged-out > div.illi-header__account-info.user-account-info > a.illi-header__login.ill-btn.ill-btn-clear > span.user-account-info__login');
    expect(name).toBe('Log in');

    //Go to login page
    await page.goto('/account/login');
    // await page.locator('#userName').fill('pocipkpbkpkfkhlfbldlkaglkmjlgkli@camelotglobal.com');
    // await page.locator('#password').fill('Aa12345678.');
    await page.locator('#userName').fill('Rudolph_Cronin58@yahoo.com');
    await page.locator('#password').fill('C@melot1');
    await page.locator('#login-button').click();

    // Verify player is Logged in
    await expect(page.locator('#playerWallet')).toBeVisible({ timeout: 300000, visible: true });

    // Add funds
    await page.goto('/account/profile/wallet/deposit-funds');
    await expect(page.locator('#confirm-deposit-button')).toBeVisible({ timeout: 300000, visible: true });
    await page.locator('#confirm-deposit-button').click();

    // Withdraw funds
    await page.goto('/account/profile/wallet/withdraw-funds');
    await expect(page.locator('#withdraw-add-bank-button')).toBeVisible({ timeout: 300000, visible: true });
    await page.locator('#withdraw-add-bank-button').click();

    // Play powerball DBG
    await page.goto('/dbg/play/powerball');
    await expect(page.locator('#line-editor-section > div.line-number-wrapper > button.do.exc-btn.exc-btn-stroke.quick-pick.exc-btn-stroke--powerball')).toBeVisible({ timeout: 300000, visible: true });
    await page.locator('#line-editor-section > div.line-number-wrapper > button.do.exc-btn.exc-btn-stroke.quick-pick.exc-btn-stroke--powerball').click();

    // Play pcik4 DBG
    await page.goto('/dbg/play/megamillions');
    await expect(page.locator('#line-editor-section > div.line-number-wrapper > button.do.exc-btn.exc-btn-stroke.quick-pick.exc-btn-stroke--megamillions')).toBeVisible({ timeout: 300000, visible: true });
    await page.locator('#line-editor-section > div.line-number-wrapper > button.do.exc-btn.exc-btn-stroke.quick-pick.exc-btn-stroke--megamillions').click();


    // Go to fpg hub page
    await page.goto('games/fpg/hub/');
    const name2 = await page.innerText('#il-web-app > div.exc-container.exc-container__body.exc-container--with-bottom-margin > div > section > div > section > div > header > h1');
    expect(name2).toBe('Select your tickets')

});


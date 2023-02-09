/*
dbg-participation-history-details
winning numbers animation
*/

const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'parallel' });

test('Test participation history page', async ({ page }) => {

    const fs = require('fs');

    // Read users from file without last empty line
    const buffer = fs.readFileSync("results_rel39/users_qa02.txt");
    const users = buffer.toString().split("\n").slice(0, -1);
    // console.log(users)

    // Open homepage
    await page.goto('/');
    const name = await page.innerText('#page-79ae7d0684 > div.header_conf.configuration.parbase > div > div > header > div > div.illi-header__content-wrapper.illi-header__content-logged-out > div.illi-header__account-info.user-account-info > a.illi-header__login.ill-btn.ill-btn-clear > span.user-account-info__login');
    expect(name).toBe('Log in')

    //Go to login page
    await page.goto('/account/login');
    // await page.locator('#userName').fill('ilayaraja.kathiresan+1@camelotls.com');
    await page.locator('#userName').fill(users[Math.floor(Math.random() * users.length)]);
    await page.locator('#password').fill('London_123');
    await page.locator('#login-button').click();

    // Open homepage
    await page.goto('/');
    await expect(page.locator('#playerWallet')).toBeVisible()

    // Go to dbg participation history details page
    await page.goto('account/profile/games/dbg-participation-history/details/55974');
    const name2 = await page.innerText('#ticket-overview-section > div.participation-history-details__container > div.participation-history-details__lines-container > h2');
    expect(name2).toBe('Your lines:')

    // Click reveal results button
    await page.locator('#ticket-overview-section > div > div.participation-history-details__top-area-container > div.participation-history-details__animation-container > div.participation-history-details__animation-block > div.participation-history-details__animation-block-actions > div.participation-history-details__actions-block > button').click();

    // ms
    const d1 = Math.floor(Date.now())
    // console.log(d1)
    // Wait for all numbers to appear
    await expect(page.locator('#ticket-overview-section > div.participation-history-details__container > div.participation-history-details__top-area-container > div.participation-history-details__animation-container > div.participation-history-details__animation-block > div.participation-history-details__animation-block-actions > div.participation-history-details__actions-block > ul > li:nth-child(7) > span')).toBeVisible({ timeout: 10000, visible: true })
    // ms
    const d2 = Math.floor(Date.now())
    // console.log(d2)

    var results = (d2-d1).toString();
    // console.log(results)

    fs.appendFile('results_duration.csv', results.concat('\n'), function(err) {
        if (err) throw err;
        console.log("File was saved.");
    }
    );

});


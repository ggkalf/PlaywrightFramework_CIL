/*
https://jira.camelot.global/browse/ILL-27081
Update Fast Play price label, info icon & promotion icon
*/

const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'parallel' });

test('Test homepage for logged in users', async ({ page }) => {

    const fs = require('fs');

    // Read users from file without last empty line
    const buffer = fs.readFileSync("results_rel38/users_qa02.txt");
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

    //Go to fpg hub page
    await page.goto('games/fpg/hub/');
    const name2 = await page.innerText('#il-web-app > div.exc-container.exc-container__body.exc-container--with-bottom-margin > div > section > div > section > div > header > h1');
    expect(name2).toBe('Select your tickets')

    // Measure img load time
    const resourceTimingJson = await page.evaluate(() =>
        JSON.stringify(window.performance.getEntriesByType('resource'))
    )
    const resourceTiming = JSON.parse(resourceTimingJson)
    const logoResourceTiming = resourceTiming.find((element) =>
        element.name.includes('Jackpot.png')
    )
    console.log(logoResourceTiming);

    var results = [logoResourceTiming['name'],
    logoResourceTiming['entryType'],
    logoResourceTiming['startTime'],
    logoResourceTiming['duration'],
    logoResourceTiming['initiatorType'],
    logoResourceTiming['nextHopProtocol'],
    logoResourceTiming['workerStart'],
    logoResourceTiming['redirectStart'],
    logoResourceTiming['redirectEnd'],
    logoResourceTiming['fetchStart'],
    logoResourceTiming['domainLookupStart'],
    logoResourceTiming['connectStart'],
    logoResourceTiming['connectEnd'],
    logoResourceTiming['secureConnectionStart'],
    logoResourceTiming['requestStart'],
    logoResourceTiming['responseStart'],
    logoResourceTiming['responseEnd'],
    logoResourceTiming['transferSize'],
    logoResourceTiming['encodedBodySize'],
    logoResourceTiming['decodedBodySize'],
    logoResourceTiming['serverTiming']].join(',');


    // console.log(results);

    fs.appendFile('results_element.csv', results.concat('\n'), function (err) {
        if (err) throw err;
        console.log("File was saved.");
    }
    );

});


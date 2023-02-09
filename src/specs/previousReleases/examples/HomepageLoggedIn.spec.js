const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'parallel' });

test('Test homepage for logged in users', async ({ page }) => {

    const fs = require('fs');
 
    // Read users from file without last empty line
    const buffer = fs.readFileSync("users.txt");
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

    //Measure page load time
    const navigationTimingJson = await page.evaluate(() =>
        JSON.stringify(performance.getEntriesByType('navigation'))
    )
    const navigationTiming = JSON.parse(navigationTimingJson)
    console.log(navigationTiming);

    var results = [navigationTiming[0]['name'],
        navigationTiming[0]['entryType'],
        navigationTiming[0]['startTime'],
        navigationTiming[0]['duration'],
        navigationTiming[0]['initiatorType'],
        navigationTiming[0]['nextHopProtocol'],
        navigationTiming[0]['workerStart'],
        navigationTiming[0]['redirectStart'],
        navigationTiming[0]['redirectEnd'],
        navigationTiming[0]['fetchStart'],
        navigationTiming[0]['domainLookupStart'],
        navigationTiming[0]['domainLookupEnd'],
        navigationTiming[0]['connectStart'],
        navigationTiming[0]['connectEnd'],
        navigationTiming[0]['secureConnectionStart'],
        navigationTiming[0]['requestStart'],
        navigationTiming[0]['responseStart'],
        navigationTiming[0]['responseEnd'],
        navigationTiming[0]['transferSize'],
        navigationTiming[0]['encodedBodySize'],
        navigationTiming[0]['decodedBodySize'],
        navigationTiming[0]['serverTiming'],
        navigationTiming[0]['unloadEventStart'],
        navigationTiming[0]['domInteractive'],
        navigationTiming[0]['domContentLoadedEventStart'],
        navigationTiming[0]['domContentLoadedEventEnd'],
        navigationTiming[0]['domComplete'],
        navigationTiming[0]['loadEventStart'],
        navigationTiming[0]['loadEventEnd'],
        navigationTiming[0]['type'],
        navigationTiming[0]['redirectCount']].join(',');


    // console.log(results);

    fs.appendFile('results_page.csv', results.concat('\n'), function(err) {
        if (err) throw err;
        console.log("File was saved.");
    }
    );

});
const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'parallel' });


test('Open homepage', async ({ page }) => {
    await page.goto('/');
    const name = await page.innerText('#page-79ae7d0684 > div.main.responsivegrid > div > div:nth-child(2) > div > div.title.aem-GridColumn--phone--hide.aem-GridColumn--default--none.aem-GridColumn--phone--12.aem-GridColumn.aem-GridColumn--default--12.aem-GridColumn--offset--phone--0.aem-GridColumn--offset--default--0 > div > h1');
    expect(name).toBe('All Games')
});

// test.describe('Log in', () => {
//     test('Provide username and password', async ({ page }) => {
//         await page.goto('/');
//         const name = await page.innerText('#page-79ae7d0684 > div.main.responsivegrid > div > div:nth-child(2) > div > div.title.aem-GridColumn--phone--hide.aem-GridColumn--default--none.aem-GridColumn--phone--12.aem-GridColumn.aem-GridColumn--default--12.aem-GridColumn--offset--phone--0.aem-GridColumn--offset--default--0 > div > h1');
//         expect(name).toBe('All Games')
//         await page.goto('/account/login');
//         await page.locator('#userName').fill('ilayaraja.kathiresan+1@camelotls.com');
//         await page.locator('#password').fill('London_123');
//         await page.locator('#login-button').click();
//         await page.context().storageState({ path: 'qa01.json' });
//         await page.goto('account/profile/wallet/deposit-funds');
//         const name2 = await page.innerText('head > title');
//         expect(name2).toBe('Illinois Lottery Deposit Funds');
//     });
// });

//https://jira.camelot.global/browse/ILL-27078
// GIVEN author updates the secondary image in aem
// WHEN the CF has been published successfully
// THEN the relevant image shall be visible from the end user in fpg-game-ticket-card on FPG hub page
test.only('Test 1', async ({ page }) => {
    // Open homepage
    await page.goto('/');
    const name = await page.innerText('#page-79ae7d0684 > div.main.responsivegrid > div > div:nth-child(2) > div > div.title.aem-GridColumn--phone--hide.aem-GridColumn--default--none.aem-GridColumn--phone--12.aem-GridColumn.aem-GridColumn--default--12.aem-GridColumn--offset--phone--0.aem-GridColumn--offset--default--0 > div > h1');
    expect(name).toBe('All Games')

    //Go to login page
    await page.goto('/account/login');
    await page.locator('#userName').fill('ilayaraja.kathiresan+1@camelotls.com');
    await page.locator('#password').fill('London_123');
    await page.locator('#login-button').click();

    //Go to fpg hub page
    await page.goto('games/fpg/hub/');
    const name2 = await page.innerText('#il-web-app > div.exc-container.exc-container__body.exc-container--with-bottom-margin > div > section > div > section > div > header > h1');
    expect(name2).toBe('Select your tickets')

    //Check image is deplayed
    // await expect(page.locator("#illinois-jackpot > div.fpg-game-ticket-card--inner")).toBeVisible()

    // const browser = await chromium.launch()
    // const page = await browser.newPage()
    // await page.goto('https://danube-web.shop/')

    //Measure page load time
    const navigationTimingJson = await page.evaluate(() =>
        JSON.stringify(performance.getEntriesByType('navigation'))
    )
    const navigationTiming = JSON.parse(navigationTimingJson)
    console.log(navigationTiming)

    //Measure img load time
    const resourceTimingJson = await page.evaluate(() =>
        JSON.stringify(window.performance.getEntriesByType('resource'))
    )
    const resourceTiming = JSON.parse(resourceTimingJson)
    const logoResourceTiming = resourceTiming.find((element) =>
        element.name.includes('Jackpot.png')
    )
    console.log(logoResourceTiming)

});

test('Test 2', async ({ page }) => {

    const fs = require('fs');

    // Open homepage
    await page.goto('/');
    const name = await page.innerText('#page-79ae7d0684 > div.main.responsivegrid > div > div:nth-child(2) > div > div.title.aem-GridColumn--phone--hide.aem-GridColumn--default--none.aem-GridColumn--phone--12.aem-GridColumn.aem-GridColumn--default--12.aem-GridColumn--offset--phone--0.aem-GridColumn--offset--default--0 > div > h1');
    expect(name).toBe('All Games')

    //Go to login page
    await page.goto('/account/login');
    await page.locator('#userName').fill('ilayaraja.kathiresan+1@camelotls.com');
    await page.locator('#password').fill('London_123');
    await page.locator('#login-button').click();

    //Go to fpg hub page
    await page.goto('games/fpg/hub/');
    const name2 = await page.innerText('#il-web-app > div.exc-container.exc-container__body.exc-container--with-bottom-margin > div > section > div > section > div > header > h1');
    expect(name2).toBe('Select your tickets')

    //Check image is deplayed
    // await expect(page.locator("#illinois-jackpot > div.fpg-game-ticket-card--inner")).toBeVisible()

    // const browser = await chromium.launch()
    // const page = await browser.newPage()
    // await page.goto('https://danube-web.shop/')

    //Measure page load time
    const navigationTimingJson = await page.evaluate(() =>
        JSON.stringify(performance.getEntriesByType('navigation'))
    )
    const navigationTiming = JSON.parse(navigationTimingJson)
    console.log(navigationTiming);

    // var results = '';
    // results = navigationTiming[0]['name'].concat(navigationTiming[0]['entryType'])
    // console.log(results)

    var results = '';
    results = [navigationTiming[0]['name'],
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


    console.log(results);

    fs.appendFile('test.csv', results.concat('\n'), function(err) {
        if (err) throw err;
        console.log("File was saved.");
    }
    );

});
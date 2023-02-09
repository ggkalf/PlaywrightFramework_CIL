import ENV from '../../utils/env'

const { test, expect } = require('@playwright/test');
const baseUrl = ENV.BASE_URL;

test.describe.configure({ mode: 'parallel' });

test('Player navigates into FPG How to Play page', async ({ page }) => {

    const fs = require('fs');

    // performance.mark("start measuring");

    // Player goes to FPG How to Play Page
    await page.goto(baseUrl + '/games/fpg/hub/how-to-play');

    // Wait till content is loaded
    page.on('DOMContentLoaded', content => {
        content.accept();
    });

    const iframeYoutubeLogo = await page.frameLocator('#player')
    .locator('#movie_player > a > div > div.ytp-impression-link-logo');
    await expect(iframeYoutubeLogo).toBeVisible();

    // performance.mark("stop measuring");
    // console.log(performance.measure("measurement", "start measuring", "stop measuring"));
    
    //Measure page load time
    const navigationTimingJson = await page.evaluate(() =>
        JSON.stringify(performance.getEntriesByType('navigation'))
    )
    const navigationTiming = JSON.parse(navigationTimingJson)
    // console.log(navigationTiming);

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

    fs.appendFile('results_page.csv', results.concat('\n'), function (err) {
        if (err) throw err;
        console.log("File was saved.");
    }
    );

    console.log(navigationTiming[0]['duration']);

})
import ENV from '../../utils/env'

const { test, expect } = require('@playwright/test');
const baseUrl = ENV.BASE_URL;

test.describe.configure({ mode: 'parallel'});

test('Player navigates into FPG How to Play page', async ({ page }) => {
    // Player goes to FPG How to Play Page
    await page.goto(baseUrl + '/games/fpg/hub/how-to-play');
})
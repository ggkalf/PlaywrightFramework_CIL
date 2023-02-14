# PlaywrightFramework_CIL

## To push/pull throught the container

Run this at your local terminal: ssh-add $HOME/.ssh/id_rsa

## How to use Load01 Dryrun

testEnv=load01 npx playwright test specs/LOAD01_DRY_RUN/Load01-dry-run.spec.js --project='chromium' --workers=1

Or

i) npm run dryrun (the script can be located in package.json -> scripts) {}

ii) npm run dryrun -- --project='chromium'

iii) npm run dryrun -- --project='chromium' --project='safari'

iv) npm run dryrun -- --project='chromium' --workers=1

For debug

npm run dryrun -- --debug


## Local Execution

In order to see the Tests execution in the browser

at playwright.config.js set headless: false

## For the Iframe Testing

npm run fiesta -- --project=chromium --repeat-each=1

npm run pbb -- --project=chromium --repeat-each=1

npm run bnk -- --project=chromium --repeat-each=1

npm run iframeSpec -- --project=chromium --repeat-each=1

npm run clearIframeCSV

# TEST PUSH
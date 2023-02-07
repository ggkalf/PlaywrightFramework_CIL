# PlaywrightFramework_CIL

## How to use Load01 Dryrun

testEnv=load01 npx playwright test specs/LOAD01_DRY_RUN/Load01-dry-run.spec.js --project='chromium' --workers=1

Or

i) npm run dryrun (the script can be located in package.json -> scripts) {}

ii) npm run dryrun -- --project='chromium'

iii) npm run dryrun -- --project='chromium' --project='safari'

iv) npm run dryrun -- --project='chromium' --workers=1
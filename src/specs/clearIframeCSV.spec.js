const { test, expect } = require('@playwright/test');

test('Clear result files', async ({ page }) => {

  const fs = require('fs')

  fs.unlink('bigNumberKnockout.csv', (err) => {
    if (err) {
      console.log('File does not exist.');
    } else {
      console.log('File is deleted.');
    }
  });

  fs.unlink('fiestaFever.csv', (err) => {
    if (err) {
      console.log('File does not exist.');
    } else {
      console.log('File is deleted.');
    }
  });

  fs.unlink('piggyBankBucks.csv', (err) => {
    if (err) {
      console.log('File does not exist.');
    } else {
      console.log('File is deleted.');
    }
  });

});
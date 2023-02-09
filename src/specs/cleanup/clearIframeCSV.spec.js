const { test, expect } = require('@playwright/test');

test('Delete result files', async ({ page }) => {
  const fs = require('fs');

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

test('Create result files', async ({ page }) => {
  const fs = require('fs');

  // create results_page file
  var headers = 'duration';
  fs.appendFile(
    'bigNumberKnockout.csv',
    headers.concat('\n'),
    function (err) {
      if (err) throw err;
      console.log('New file was created.');
    }
  );

  // create results_element file
  var headers = 'duration';
  fs.appendFile('fiestaFever.csv', headers.concat('\n'), function (err) {
    if (err) throw err;
    console.log('New file was created.');
  });

  // create results_duration file
  var headers = 'duration';
  fs.appendFile('piggyBankBucks.csv', headers.concat('\n'), function (err) {
    if (err) throw err;
    console.log('New file was created.');
  });
});
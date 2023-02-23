const { test, expect } = require('@playwright/test');

test('Clear result files', async ({ page }) => {

  const fs = require('fs')

  // delete results_page file
  fs.unlink('results_page.csv', err => {
    if (err) {
      console.log('File does not exist.')
    } else {
      console.log('File is deleted.')
    }
  })

  // delete results_element
  fs.unlink('results_element.csv', err => {
    if (err) {
      console.log('File does not exist.')
    } else {
      console.log('File is deleted.')
    }
  })

    // delete results_duration file
    fs.unlink('results_duration.csv', err => {
      if (err) {
        console.log('File does not exist.')
      } else {
        console.log('File is deleted.')
      }
    })

});

test('Create result files', async ({ page }) => {

  const fs = require('fs')

  // create results_page file
  var headers = 'name,entryType,startTime,duration,initiatorType,nextHopProtocol,workerStart,redirectStart,redirectEnd,fetchStart,domainLookupStart,domainLookupEnd,connectStart,connectEnd,secureConnectionStart,requestStart,responseStart,responseEnd,transferSize,encodedBodySize,serverTiming,unloadEventStart,unloadEventEnd,domInteractive,domContentLoadedEventStart,domContentLoadedEventEnd,domComplete,loadEventStart,loadEventEnd,type,redirectCount';
  fs.appendFile('results_page.csv', headers.concat('\n'), function (err) {
    if (err) throw err;
    console.log("New file was created.");
  }
  );

  // create results_element file
  var headers = 'name,entryType,startTime,duration,initiatorType,nextHopProtocol,workerStart,redirectStart,redirectEnd,fetchStart,domainLookupStart,connectStart,connectEnd,secureConnectionStart,requestStart,responseStart,responseEnd,transferSize,encodedBodySize,decodedBodySize,serverTiming';
  fs.appendFile('results_element.csv', headers.concat('\n'), function (err) {
    if (err) throw err;
    console.log("New file was created.");
  }
  );

    // create results_duration file
    var headers = 'duration';
    fs.appendFile('results_duration.csv', headers.concat('\n'), function (err) {
      if (err) throw err;
      console.log("New file was created.");
    }
    );

});
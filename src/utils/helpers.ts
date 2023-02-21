import fs from 'fs';
import fsPromises from 'fs/promises';
import csv from 'csv-stringify';
import path from 'path';

const createCSVDirectory = async () => {
  const csvDir = 'CsvFiles/';
  await fs.promises.mkdir(csvDir, { recursive: true });
  return csvDir;
};

export const createCSV = (name: string) => {
  const dir = 'CsvFiles/';
  const header = [['Browser', 'Test Scenario', 'Test Duration']];

  csv.stringify(header, (e, o) =>
    fs.writeFileSync(path.resolve(dir, name.concat('.csv')), o)
  );
};

export const deleteCSV = async (dir: string, name: string = '*') => {
  try {
    if (name === '*') {
      const files = await fsPromises.readdir(dir);
      for (const file of files) {
        if (path.parse(file).ext === '.csv') {
          await fsPromises.unlink(path.resolve(dir, file));
          console.log(`${dir}/${file} has been removed succesfully`);
        }
      }
    } else {
      await fsPromises.unlink(path.resolve(dir, name));
      console.log(`${dir}/${name} has been removed succesfully`);
    }
  } catch (err) {
    console.log(err);
  }
};

export const generateAverageDurationCSV = async (
  name: string,
  browser: string,
  testName: string,
  duration: number
) => {
  createCSVDirectory();
  const csvDir = await createCSVDirectory();
  if (!fs.existsSync(`${csvDir}${name.concat('.csv')}`)) {
    createCSV(name);
  }

  const metricsParameters = [browser, testName, duration].join();

  console.log(`${csvDir}`);
  console.log(metricsParameters);
  console.log(`${csvDir}${name.concat('.csv')}`);

  fs.appendFile(
    `${csvDir}${name.concat('.csv')}`,
    metricsParameters.concat('\n'),
    function (err) {
      if (err) throw err;
      console.log('File was saved.');
    }
  );
};

// const main = () => {
//   generateAverageDurationCSV('tkigkg', 'chrome', 'TEST', 4838);
// };

// main();

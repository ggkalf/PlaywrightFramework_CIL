import fs from 'fs';
import fsPromises from 'fs/promises';
import csv from 'csv-stringify';
import path from 'path';

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

// const main = () => {
//   for (let i = 0; i < 4; i++) {
//     createCSV('test.csv'.concat(i.toString()));
//   }
// };

// const main = () => {
//   deleteCSV('CsvFiles/');
// };

// main();
const fs = require('fs');
const fsPromises = require('fs/promises');
const csv = require('csv-stringify');
const path = require('path');
// import path from path

const createCSV = (name) => {
  const dir = 'CsvFiles/';
  const header = [['Test Scenario', 'Test Duration']];

  csv.stringify(header, (e, o) =>
    fs.writeFileSync(path.resolve(dir, name.concat('.csv')), o)
  );
};

const deleteCSV = async (dir, name = '*') => {
  try {
    if (name == '*') {
      const files = await fsPromises.readdir(dir);
      for (const file of files) {
        await fsPromises.unlink(path.resolve(dir, file));
        console.log(`${dir}/${file} has been removed succesfully`);
      }
    } else {
      await fsPromises.unlink(path.resolve(dir, name));
      console.log(`${dir}/${name} has been removed succesfully`);
    }
  } catch (err) {
    console.log(err);
  }
};

const main = () => {
  //   deleteCSV('CsvFiles/');
  for (let i = 0; i < 4; i++) {
    createCSV('test'.concat(i.toString()));
  }
  //   console.log(('hello').concat((10).toString()));
};

main();

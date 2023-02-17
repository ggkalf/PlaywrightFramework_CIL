const data = [
  [1, 2],
  [3, 4],
];

const fs = require('fs');
const csv = require('csv-stringify');

csv.stringify(data, (e, o) => fs.writeFileSync('my.csv', o));

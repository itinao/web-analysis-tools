'use strict';

const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const readCSV = (path) => {
  const data = fs.readFileSync(path);
  return parse(data, {columns: true});
};

module.exports = readCSV;

'use strict';

const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const readJSON = (path) => {
  return JSON.parse(fs.readFileSync(path, 'utf8'))
};

const readJSONL = (path) => {
  let data = fs.readFileSync(path, 'utf8');
  data = `[${data.replace(/\n/g, ',').replace(/,\s*$/, '')}]`;
  data = JSON.parse(data);
  return data;
};

const readCSV = (path) => {
  const data = fs.readFileSync(path);
  return parse(data, {columns: true});
};

module.exports = {readJSON, readJSONL, readCSV};

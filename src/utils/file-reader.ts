import fs from 'fs'
import parse from 'csv-parse/lib/sync'

const readJSON = (path: string) => {
  return JSON.parse(fs.readFileSync(path, 'utf8'))
};

const readJSONL = (path: string) => {
  let data = fs.readFileSync(path, 'utf8');
  data = `[${data.replace(/\n/g, ',').replace(/,\s*$/, '')}]`;
  data = JSON.parse(data);
  return data;
};

const readCSV = (path: string) => {
  const data = fs.readFileSync(path);
  return parse(data, {columns: true});
};

export {readJSON, readJSONL, readCSV};

'use strict';

const fs = require('fs');

const appendFile = (path, fileName, data) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  fs.appendFileSync(`${path}/${fileName}`, `${data}\n`, (err) => {
    if (err) {
      throw err;
    }
    console.log('finish!');
  });
};

const writeFile = (path, fileName, data) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  fs.writeFileSync(`${path}/${fileName}`, `${data}\n`, (err) => {
    if (err) {
      throw err;
    }
    console.log('finish!');
  });
};

module.exports = {appendFile: appendFile, writeFile: writeFile};

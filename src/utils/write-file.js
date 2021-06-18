'use strict';

const fs = require('fs');

const writeFile = (path, fileName, data) => {
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

module.exports = writeFile;

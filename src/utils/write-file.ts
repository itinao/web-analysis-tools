import fs from 'fs'

const appendFile = (path: string, fileName: string, data: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  // @ts-ignore
  fs.appendFileSync(`${path}/${fileName}`, `${data}\n`, (err) => {
    if (err) {
      throw err;
    }
    console.log('finish!');
  });
};

const writeFile = (path: string, fileName: string, data: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  // @ts-ignore
  fs.writeFileSync(`${path}/${fileName}`, `${data}\n`, (err) => {
    if (err) {
      throw err;
    }
    console.log('finish!');
  });
};

export {appendFile, writeFile};

'use strict';

const path = require('path')
const program = require('commander')
  .version('0.0.1')
  .option('-p, --project-id [id]', 'project id')
  .option('-i, --dataset-id [id]', 'dataset id')
  .option('-f, --filename [filename]', 'import filename')
  .parse(process.argv);
const cliOptions = program.opts();

const GoogleBigQuery = require('./classes/GoogleBigQuery');
const {readJSON, readJSONL} = require('./utils/file-reader');

async function main() {
  const bq = new GoogleBigQuery(cliOptions.projectId);

  let rows;
  const ext = path.parse(cliOptions.filename).ext;
  switch (ext) {
    case '.json':
      rows = readJSON(cliOptions.filename);
      break;
    case '.jsonl':
      rows = readJSONL(cliOptions.filename);
      break;
    default:
      console.log(`Sorry, we are out of ${ext}.`);
  }

  await bq.insert(cliOptions.datasetId, path.parse(cliOptions.filename).name, rows);
  console.info(`Inserted ${rows.length} rows`);
}

main().catch(e => {
  console.error(e);
  throw e;
});

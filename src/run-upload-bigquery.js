'use strict';

const path = require('path')
const { BigQuery } = require('@google-cloud/bigquery');
const program = require('commander')
  .version('0.0.1')
  .option('-p, --project-id [id]', 'project id')
  .option('-k, --key-filename [filename]', 'key filename')
  .option('-i, --dataset-id [path]', 'dataset id')
  .option('-f, --filename [filename]', 'import filename')
  .parse(process.argv);
const cliOptions = program.opts();

(async () => {
  const bigQueryClient = new BigQuery({
    projectId: cliOptions.projectId,
    keyFilename: cliOptions.keyFilename
  });

  const [job] = await bigQueryClient
    .dataset(cliOptions.datasetId)
    .table(path.parse(cliOptions.filename).name)
    .load(cliOptions.filename, {
      sourceFormat: 'NEWLINE_DELIMITED_JSON',
      autodetect: true
    });
  console.log(`Job ${job.id} completed.`);
})();

'use strict';

const crossSpawn = require('cross-spawn');
const async = require('async');
const program = require('commander')
  .version('0.0.1')
  .option('-c, --concurrency [number]', 'concurrency', 1)
  .option('-d, --device-type [type]', 'device type (desktop|mobile)', 'mobile')
  .parse(process.argv);
const cliOptions = program.opts();

const targetUrls = require('../target-urls');

(async () => {
  const run = (device, url, callback) => {
    const command = `yarn run lh -d ${device} -u ${url}`;
    const [c, ...args] = command.split(' ');
    const served = crossSpawn(c, args);

    served.stdout.on('data', (data) => {
      console.log(`[pid: ${served.pid}] ${data}`.trim())
    });

    served.stderr.on('data', (data) => {
      console.log(`[pid: ${served.pid}] ${data}`.trim())
    });

    served.on('close', (code) => {
      console.log(`[pid: ${served.pid}] finished.`);
      callback();
    });
  };

  var q = async.queue((url, callback) => {
    run(cliOptions.deviceType, url, callback);
  }, cliOptions.concurrency);

  q.push(targetUrls);
  q.drain(() => {
    console.log('all items have been processed');
  });
})();

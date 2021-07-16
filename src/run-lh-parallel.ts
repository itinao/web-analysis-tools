import crossSpawn from 'cross-spawn'
import async from 'async'
import program from 'commander'
import targetUrls from '../target-urls.json'

const cliOptions = program.version('0.0.1')
  .option('-c, --concurrency [number]', 'concurrency', '1')
  .option('-d, --device-type [type]', 'device type (desktop|mobile)', 'mobile')
  .parse(process.argv)
  .opts();

async function main() {
  const run = (device: string, url: string, callback: Function) => {
    const command = `yarn run lh -d ${device} -u ${url}`;
    const [c, ...args] = command.split(' ');
    const served = crossSpawn(c, args);

    served.stdout.on('data', (data) => {
      console.info(`[pid: ${served.pid}] ${data}`.trim())
    });

    served.stderr.on('data', (data) => {
      console.info(`[pid: ${served.pid}] ${data}`.trim())
    });

    served.on('close', (code) => {
      console.info(`[pid: ${served.pid}] finished.`);
      callback();
    });
  };

  var q = async.queue((url: string, callback: Function) => {
    run(cliOptions.deviceType, url, callback);
  }, cliOptions.concurrency);

  q.push(targetUrls);
  q.drain(() => {
    console.info('all items have been processed');
  });
}

main().catch(e => {
  console.error(e);
  throw e;
});

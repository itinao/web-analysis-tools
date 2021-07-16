import moment from 'moment';
import program from 'commander';
import GoogleSearchConsole from './classes/GoogleSearchConsole';
import { writeFile } from './utils/file-writer';

const cliOptions = program.version('0.0.1')
  .option('-u, --site-url [siteUrl]', 'siteUrl')
  .option('-s, --target-date [targetDate]', 'targetDate')
  .option('-r, --start-row [startRow]', 'startRow', '0')
  .option('-l, --row-limit [rowLimit]', 'rowLimit', '25000')
  .option('-o, --output-path [path]', 'output path', './dist')
  .parse(process.argv)
  .opts();

async function main() {
  const gscBufferDay = 4;
  const targetDate = cliOptions.targetDate ? cliOptions.targetDate : moment().add(-(gscBufferDay), 'days').format('YYYY-MM-DD');

  const gsc = new GoogleSearchConsole();
  const searchResults = await gsc.query(
    cliOptions.siteUrl, targetDate, targetDate, cliOptions.startRow, cliOptions.rowLimit);

  const results = searchResults.reduce((arr: {}[], currentObj: {[key: string]: {}}) => {
    arr.push({
      target_date: currentObj.start_date,
      key: currentObj.key,
      clicks: currentObj.clicks,
      impressions: currentObj.impressions,
      ctr: currentObj.ctr,
      position: currentObj.position,
    });
    return arr;
  }, []);

  writeFile(cliOptions.outputPath, 'search_result_performances.json', JSON.stringify(results));
}

main().catch((e) => {
  console.error(e);
  throw e;
});

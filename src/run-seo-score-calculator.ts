import moment from 'moment';
import program from 'commander';
import FindabilityScoreCalculator from './classes/FindabilityScoreCalculator';
import VisibilityScoreCalculator from './classes/VisibilityScoreCalculator';
import GoogleSearchConsole from './classes/GoogleSearchConsole';
import { writeFile } from './utils/file-writer';
import { readCSV } from './utils/file-reader';

const cliOptions = program.version('0.0.1')
  .option('-u, --site-url [siteUrl]', 'siteUrl')
  .option('-s, --start-date [startDate]', 'startDate')
  .option('-s, --end-date [endDate]', 'endDate')
  .option('-o, --output-path [path]', 'output path', './dist')
  .parse(process.argv)
  .opts();

async function main() {
  const targetPeriod = 30;
  const gscBufferDay = 4; // 4日前のデータなら取得できる
  const startDate = cliOptions.startDate ? cliOptions.startDate : moment().add(-(gscBufferDay) + -(targetPeriod), 'days').format('YYYY-MM-DD');
  const endDate = cliOptions.endDate ? cliOptions.endDate : moment().add(-(gscBufferDay), 'days').format('YYYY-MM-DD');

  console.info('start Google Search Console API');
  const gsc = new GoogleSearchConsole();
  const searchResults = await gsc.getAll(cliOptions.siteUrl, startDate, endDate);

  console.info('calculate score ...');
  const searchKeywords = readCSV('./search_keywords.csv');
  const fsCalculator = new FindabilityScoreCalculator(searchResults, searchKeywords);
  const vsCalculator = new VisibilityScoreCalculator(searchResults, searchKeywords);

  const seoScores = [{
    target_date: endDate,
    findability_score: fsCalculator.execute(),
    visibility_score: vsCalculator.execute(),
  }];

  writeFile(cliOptions.outputPath, 'seo_scores.json', JSON.stringify(seoScores));
  console.info('finished!');
}

main().catch((e) => {
  console.error(e);
  throw e;
});

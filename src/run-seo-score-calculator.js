'use strict';

const moment = require('moment');
const program = require('commander')
  .version('0.0.1')
  .option('-u, --site-url [siteUrl]', 'siteUrl')
  .option('-o, --output-path [path]', 'output path', './dist')
  .parse(process.argv);
const cliOptions = program.opts();

const FindabilityScoreCalculator = require('./classes/FindabilityScoreCalculator');
const VisibilityScoreCalculator = require('./classes/VisibilityScoreCalculator');
const GoogleSearchConsole = require('./classes/GoogleSearchConsole');
const {writeFile} = require('./utils/write-file');
const {readCSV} = require('./utils/file-reader');

async function main() {
  const targetPeriod = 30;
  const gscBufferDay = 3; // 3日前のデータなら取得できる
  const startDate = moment().add(-(gscBufferDay) + -(targetPeriod), 'days').format("YYYY-MM-DD");
  const endDate = moment().add(-(gscBufferDay), 'days').format("YYYY-MM-DD");

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
    visibility_score: vsCalculator.execute()
  }];

  writeFile(cliOptions.outputPath, 'seo_scores.json', JSON.stringify(seoScores));
  console.info('finished!');
}

main().catch(e => {
  console.error(e);
  throw e;
});

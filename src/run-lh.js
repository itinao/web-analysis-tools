'use strict';

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const program = require('commander')
  .version('0.0.1')
  .option('-d, --device-type [type]', 'device type (desktop|mobile)', 'mobile')
  .option('-u, --url [url]', 'execute url')
  .option('-o, --output-path [path]', 'output path', './dist')
  .parse(process.argv);
const cliOptions = program.opts();

const desktopConfig = require('lighthouse/lighthouse-core/config/desktop-config');
const defaultConfig = { extends: 'lighthouse:default' };

const budgets = require('./performance-budgets').budgets;
const parseResult = require('./parser/parse-result');
const writeFile = require('./utils/write-file');

(async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'json', port: chrome.port, budgets: budgets};
  const config = cliOptions.deviceType === 'desktop' ? desktopConfig : defaultConfig;
  const runnerResult = await lighthouse(cliOptions.url, options, config);
  await chrome.kill();

  const results = parseResult(cliOptions.url, runnerResult.lhr);

  writeFile(cliOptions.outputPath, `lh-${cliOptions.deviceType}.jsonl`, JSON.stringify(results))
})();

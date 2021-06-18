'use strict';

const parseAuditsResult = require('./parse-audits-result');
const parseBudgetsResult = require('./parse-budgets-result');
const parseCategoriesResult = require('./parse-categories-result');
const replaceHyphen = require('../utils/replace-hyphen');

const parseResult = (url, result) => {
  const auditsResult = parseAuditsResult(result.audits);
  const budgetsResult = parseBudgetsResult(result.audits);
  const categoriesResult = parseCategoriesResult(result.categories);
  const info = {url: url, created_date: new Date}

  return replaceHyphen(Object.assign(info, auditsResult, budgetsResult, categoriesResult));
};

module.exports = parseResult;

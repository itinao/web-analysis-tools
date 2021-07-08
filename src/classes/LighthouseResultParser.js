'use strict';

const replaceHyphen = require('../utils/replace-hyphen');

class LighthouseResultParser {
  targetURL;
  runnerResult;

  constructor(url, runnerResult) {
    this.targetURL = url;
    this.runnerResult = runnerResult;
  }

  parse() {
    const result = this.runnerResult.lhr;
    const auditsResult = this.parseAudits(result.audits);
    const budgetsResult = this.parseBudgets(result.audits);
    const categoriesResult = this.parseCategories(result.categories);
    const info = {url: this.targetURL, created_date: new Date}

    return replaceHyphen(Object.assign(info, auditsResult, budgetsResult, categoriesResult));
  }

  parseAudits(audits) {
    const requiredAuditResult = {
      'first-contentful-paint'    : (result) => {return Math.round(result.score * 100);},
      'largest-contentful-paint'  : (result) => {return Math.round(result.score * 100);},
      'first-meaningful-paint'    : (result) => {return Math.round(result.score * 100);},
      'speed-index'               : (result) => {return Math.round(result.score * 100);},
      'total-blocking-time'       : (result) => {return Math.round(result.score * 100);},
      'max-potential-fid'         : (result) => {return Math.round(result.score * 100);},
      'cumulative-layout-shift'   : (result) => {return Math.round(result.score * 100);},
      'server-response-time'      : (result) => {return Math.round(result.score * 100);},
      'first-cpu-idle'            : (result) => {return Math.round(result.score * 100);},
      interactive                 : (result) => {return Math.round(result.numericValue);},
      'mainthread-work-breakdown' : (result) => {return Math.round(result.score * 100);},
      'network-rtt'               : (result) => {return Math.round(result.numericValue);},
      'layout-shift-elements'     : (result) => {return result.details.items.length;},
      'long-tasks'                : (result) => {return result.details.items.length;},
      'unsized-images'            : (result) => {return result.details.items.length;},
      'render-blocking-resources' : (result) => {return result.details.items.length;},
      'unused-css-rules'          : (result) => {return Math.round(result.score * 100);},
      'unused-javascript'         : (result) => {return Math.round(result.score * 100);},
      'uses-responsive-images'    : (result) => {return Math.round(result.score * 100);},
    };

    return Object.entries(audits).reduce(
      (obj, [key, result]) => {
        if (requiredAuditResult[key]) {
          return Object.assign({}, obj, {[key]: requiredAuditResult[key](result)});
        }
        return obj;
      }, {}
    );
  }

  parseBudgets(audits) {
    const budgetIndex = 'performance-budget';

    return audits[budgetIndex].details.items.reduce(
      (obj, item) => {
        const transferSize = item.transferSize ? item.transferSize : 0;
        return Object.assign({}, obj, {[`${budgetIndex}-${item.resourceType}`]: transferSize})
      }, {}
    );
  }

  parseCategories(categories) {
    const requiredCategoriesResult = {
      performance      : (result) => {return Math.round(result.score * 100);},
      accessibility    : (result) => {return Math.round(result.score * 100);},
      'best-practices' : (result) => {return Math.round(result.score * 100);},
      seo              : (result) => {return Math.round(result.score * 100);},
      pwa              : (result) => {return Math.round(result.score * 100);},
    }

    return Object.entries(categories).reduce(
      (obj, [key, result]) => {
        if (requiredCategoriesResult[key]) {
          return Object.assign({}, obj, {[key]: requiredCategoriesResult[key](result)});
        }
        return obj;
      }, {}
    );
  }
}

module.exports = LighthouseResultParser;

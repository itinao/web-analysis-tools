import {replaceHyphen} from '../utils/replace-hyphen';

export class LighthouseResultParser {
  targetURL;
  runnerResult;

  constructor(url: string, runnerResult: any) {
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

  parseAudits(audits: any) {
    const requiredAuditResult: {[key:string]: Function} = {
      'first-contentful-paint'    : (result: any) => {return Math.round(result.score * 100);},
      'largest-contentful-paint'  : (result: any) => {return Math.round(result.score * 100);},
      'first-meaningful-paint'    : (result: any) => {return Math.round(result.score * 100);},
      'speed-index'               : (result: any) => {return Math.round(result.score * 100);},
      'total-blocking-time'       : (result: any) => {return Math.round(result.score * 100);},
      'max-potential-fid'         : (result: any) => {return Math.round(result.score * 100);},
      'cumulative-layout-shift'   : (result: any) => {return Math.round(result.score * 100);},
      'server-response-time'      : (result: any) => {return Math.round(result.score * 100);},
      'first-cpu-idle'            : (result: any) => {return Math.round(result.score * 100);},
      interactive                 : (result: any) => {return Math.round(result.numericValue);},
      'mainthread-work-breakdown' : (result: any) => {return Math.round(result.score * 100);},
      'network-rtt'               : (result: any) => {return Math.round(result.numericValue);},
      'layout-shift-elements'     : (result: any) => {return result.details.items.length;},
      'long-tasks'                : (result: any) => {return result.details.items.length;},
      'unsized-images'            : (result: any) => {return result.details.items.length;},
      'render-blocking-resources' : (result: any) => {return result.details.items.length;},
      'unused-css-rules'          : (result: any) => {return Math.round(result.score * 100);},
      'unused-javascript'         : (result: any) => {return Math.round(result.score * 100);},
      'uses-responsive-images'    : (result: any) => {return Math.round(result.score * 100);},
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

  parseBudgets(audits: any) {
    const budgetIndex = 'performance-budget';

    return audits[budgetIndex].details.items.reduce(
      (obj: {}, item: any) => {
        const transferSize = item.transferSize ? item.transferSize : 0;
        return Object.assign({}, obj, {[`${budgetIndex}-${item.resourceType}`]: transferSize})
      }, {}
    );
  }

  parseCategories(categories: any) {
    const requiredCategoriesResult: {[key:string]: Function} = {
      performance      : (result: any) => {return Math.round(result.score * 100);},
      accessibility    : (result: any) => {return Math.round(result.score * 100);},
      'best-practices' : (result: any) => {return Math.round(result.score * 100);},
      seo              : (result: any) => {return Math.round(result.score * 100);},
      pwa              : (result: any) => {return Math.round(result.score * 100);},
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

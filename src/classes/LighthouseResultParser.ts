import { replaceHyphen } from '../utils/replace-hyphen';

export class LighthouseResultParser {
  private targetURL;
  private runnerResult;
  RATE = 100;

  constructor(url: string, runnerResult: any) {
    this.targetURL = url;
    this.runnerResult = runnerResult;
  }

  parse() {
    const result = this.runnerResult.lhr;
    const auditsResult = this.parseAudits(result.audits);
    const budgetsResult = this.parseBudgets(result.audits);
    const categoriesResult = this.parseCategories(result.categories);
    const info = { url: this.targetURL, created_date: new Date() };

    return replaceHyphen(Object.assign(info, auditsResult, budgetsResult, categoriesResult));
  }

  parseAudits(audits: any) {
    const requiredAuditResult: {[key:string]: Function} = {
      'first-contentful-paint'    : (result: any) => Math.round(result.score * this.RATE),
      'largest-contentful-paint'  : (result: any) => Math.round(result.score * this.RATE),
      'first-meaningful-paint'    : (result: any) => Math.round(result.score * this.RATE),
      'speed-index'               : (result: any) => Math.round(result.score * this.RATE),
      'total-blocking-time'       : (result: any) => Math.round(result.score * this.RATE),
      'max-potential-fid'         : (result: any) => Math.round(result.score * this.RATE),
      'cumulative-layout-shift'   : (result: any) => Math.round(result.score * this.RATE),
      'server-response-time'      : (result: any) => Math.round(result.score * this.RATE),
      'first-cpu-idle'            : (result: any) => Math.round(result.score * this.RATE),
      interactive                 : (result: any) => Math.round(result.numericValue),
      'mainthread-work-breakdown' : (result: any) => Math.round(result.score * this.RATE),
      'network-rtt'               : (result: any) => Math.round(result.numericValue),
      'layout-shift-elements'     : (result: any) => result.details.items.length,
      'long-tasks'                : (result: any) => result.details.items.length,
      'unsized-images'            : (result: any) => result.details.items.length,
      'render-blocking-resources' : (result: any) => result.details.items.length,
      'unused-css-rules'          : (result: any) => Math.round(result.score * this.RATE),
      'unused-javascript'         : (result: any) => Math.round(result.score * this.RATE),
      'uses-responsive-images'    : (result: any) => Math.round(result.score * this.RATE),
    };

    return Object.entries(audits).reduce(
      (obj, [key, result]) => {
        if (requiredAuditResult[key]) {
          return Object.assign({}, obj, { [key]: requiredAuditResult[key](result) });
        }
        return obj;
      }, {},
    );
  }

  parseBudgets(audits: any) {
    const budgetIndex = 'performance-budget';

    return audits[budgetIndex].details.items.reduce(
      (obj: {}, item: any) => {
        const transferSize = item.transferSize ? item.transferSize : 0;
        return Object.assign({}, obj, { [`${budgetIndex}-${item.resourceType}`]: transferSize });
      }, {},
    );
  }

  parseCategories(categories: any) {
    const requiredCategoriesResult: {[key:string]: Function} = {
      performance      : (result: any) => Math.round(result.score * this.RATE),
      accessibility    : (result: any) => Math.round(result.score * this.RATE),
      'best-practices' : (result: any) => Math.round(result.score * this.RATE),
      seo              : (result: any) => Math.round(result.score * this.RATE),
      pwa              : (result: any) => Math.round(result.score * this.RATE),
    };

    return Object.entries(categories).reduce(
      (obj, [key, result]) => {
        if (requiredCategoriesResult[key]) {
          return Object.assign({}, obj, { [key]: requiredCategoriesResult[key](result) });
        }
        return obj;
      }, {},
    );
  }
}

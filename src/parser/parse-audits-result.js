'use strict';

const parseAuditsResult = (audits) => {
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
};

module.exports = parseAuditsResult;

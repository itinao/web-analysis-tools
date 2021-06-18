'use strict';

const parseCategoriesResult = (categories) => {
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
};

module.exports = parseCategoriesResult;

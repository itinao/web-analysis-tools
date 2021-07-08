'use strict';

class BaseScoreCalculator {
  targetResults;
  searchKeywords;

  constructor(searchResults, searchKeywords) {
    const searchResultMap = searchResults.reduce((obj, currentObj) => {
      obj[currentObj.key] = currentObj;
      return obj;
    }, {});

    const targetResults = searchKeywords.reduce((arr, currentObj) => {
      if (searchResultMap[currentObj.keyword]) {
        arr.push(Object.assign(
          searchResultMap[currentObj.keyword],
          { search_volume: parseInt(currentObj.search_volume) }
        ));
      }
      return arr;
    }, []);

    this.targetResults = targetResults;
    this.searchKeywords = searchKeywords;
  }
}

module.exports = BaseScoreCalculator;

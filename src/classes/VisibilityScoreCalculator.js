'use strict';

const BaseScoreCalculator = require('./BaseScoreCalculator');

class VisibilityScoreCalculator extends BaseScoreCalculator {
  constructor(searchResults, searchKeywords) {
    super(searchResults, searchKeywords);
  }

  execute() {
    const totalScore = this.targetResults.reduce((currentScore, currentObj) => {
      return currentScore + (currentObj.ctr * currentObj.search_volume);
    }, 0);

    return totalScore;
  }
}

module.exports = VisibilityScoreCalculator;

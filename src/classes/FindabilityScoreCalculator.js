'use strict';

const BaseScoreCalculator = require('./BaseScoreCalculator');

class FindabilityScoreCalculator extends BaseScoreCalculator {
  MAX_SCORE = 30;

  constructor(searchResults, searchKeywords) {
    super(searchResults, searchKeywords);
  }

  execute() {
    const totalScore = this.targetResults.reduce((currentScore, currentObj) => {
      const score = this.MAX_SCORE + 1 - currentObj.position;
      return currentScore + score;
    }, 0);

    let maxScore = this.searchKeywords.length * this.MAX_SCORE;
    maxScore = maxScore <= 0 ? 1 : maxScore;

    return totalScore / maxScore;
  }
}

module.exports = FindabilityScoreCalculator;

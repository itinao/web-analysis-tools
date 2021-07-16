import BaseScoreCalculator from './BaseScoreCalculator';

export default class FindabilityScoreCalculator extends BaseScoreCalculator {
  MAX_SCORE = 30;

  constructor(searchResults: {}[], searchKeywords: []) {
    super(searchResults, searchKeywords);
  }

  execute() {
    const totalScore = this.targetResults.reduce(
      (currentScore: number, currentObj: {[key: string]: number}) => {
        let score = this.MAX_SCORE + 1 - currentObj.position;
        score = score < 0 ? 0 : score;
        return currentScore + score;
      }, 0);

    let maxScore = this.searchKeywords.length * this.MAX_SCORE;
    maxScore = maxScore <= 0 ? 1 : maxScore;

    return totalScore / maxScore;
  }
}

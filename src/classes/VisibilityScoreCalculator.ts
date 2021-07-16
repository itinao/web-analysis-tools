import BaseScoreCalculator from './BaseScoreCalculator'

export default class VisibilityScoreCalculator extends BaseScoreCalculator {
  constructor(searchResults: {}[], searchKeywords: []) {
    super(searchResults, searchKeywords);
  }

  execute() {
    const totalScore = this.targetResults.reduce((currentScore: number, currentObj: {[key: string]: number}) => {
      return currentScore + (currentObj.ctr * currentObj.search_volume);
    }, 0);

    return totalScore;
  }
}

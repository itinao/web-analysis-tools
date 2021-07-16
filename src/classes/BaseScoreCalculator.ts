export default class BaseScoreCalculator {
  protected targetResults;
  protected searchKeywords;

  constructor(searchResults: {[key: string]: number}[], searchKeywords: []) {
    const searchResultMap = searchResults.reduce(
      (obj: {[key: string]: {}}, currentObj: {[key: string]: number}) => {
        obj[currentObj.key] = currentObj;
        return obj;
      }, {});

    const targetResults = searchKeywords.reduce(
      (arr: {}[], currentObj: {[key: string]: string}) => {
        if (searchResultMap[currentObj.keyword]) {
          arr.push(Object.assign(
            searchResultMap[currentObj.keyword],
            { search_volume: parseInt(currentObj.search_volume, 10) },
          ));
        }
        return arr;
      }, []);

    this.targetResults = targetResults;
    this.searchKeywords = searchKeywords;
  }
}

'use strict';

const {google} = require('googleapis');
const webmasters = google.webmasters('v3');

class GoogleSearchConsole {
  auth;
  CREDENTIALS_PATH = './credentials.json';

  constructor(keyFilename) {
    this.auth = new google.auth.GoogleAuth({
      keyFile: this.CREDENTIALS_PATH,
      scopes: [
        'https://www.googleapis.com/auth/webmasters.readonly',
      ],
    });
  }

  async query(siteUrl, startDate, endDate, startRow, rowLimit) {
    const authClient = await this.auth.getClient();
    google.options({auth: authClient});

    const res = await webmasters.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: startDate,
        endDate: endDate,
        searchType: 'web',
        dimensions: 'query',
        startRow: startRow,
        rowLimit: rowLimit,
        aggregationType: 'byProperty',
        dimensionFilterGroups: [
          /* sample
          {
            "filters": [
              {
                "dimension": "query",
                "operator": "contains", // contains equals notContains notEquals
                "expression": "ラクマ",
              },
            ]
          },
          */
        ],
      },
    });

    return this.parseResult(res.data);
  }

  async getAll(siteUrl, startDate, endDate) {
    const maxRepeatCount = 5;
    const startRow = 0;
    const rowLimit = 25000;

    let searchResults = [];
    for (let i in [...Array(maxRepeatCount).keys()]) {
      const currentStartRow = startRow + (rowLimit * i);

      console.info(`[${startDate}] - [${endDate}] ${currentStartRow} ~ ...`);
      const results = await this.query(siteUrl, startDate, endDate, currentStartRow, rowLimit);
      searchResults = searchResults.concat(results);

      if (results.length < rowLimit) {
        break;
      }
    }

    return searchResults;
  }

  parseResult(resultData) {
    if (!resultData.rows) {
      return [];
    }

    return resultData.rows.map(row => {
      return {
        key: row.keys[0],
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position,
      }
    });
  }
}

module.exports = GoogleSearchConsole;

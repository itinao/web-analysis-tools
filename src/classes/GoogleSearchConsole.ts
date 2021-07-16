import { google } from 'googleapis';

export default class GoogleSearchConsole {
  private auth;
  CREDENTIALS_PATH = './credentials.json';

  constructor() {
    this.auth = new google.auth.GoogleAuth({
      keyFile: this.CREDENTIALS_PATH,
      scopes: [
        'https://www.googleapis.com/auth/webmasters.readonly',
      ],
    });
  }

  async query(
    siteUrl: string, startDate: string, endDate: string, startRow: number, rowLimit: number) {
    const authClient = await this.auth.getClient();
    google.options({ auth: authClient });

    const webmasters = google.webmasters('v3');
    const query = {
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        searchType: 'web',
        dimensions: 'query',
        startRow,
        rowLimit,
        aggregationType: 'byProperty',
      },
    };

    // @ts-ignore
    const res = await webmasters.searchanalytics.query(query);

    return this.parseResult(startDate, endDate, res.data);
  }

  async getAll(siteUrl: string, startDate: string, endDate: string) {
    const maxRepeatCount = 5;
    const startRow = 0;
    const rowLimit = 25000;

    let searchResults: {}[] = [];
    for (const i of [...Array(maxRepeatCount).keys()]) {
      const currentStartRow = startRow + (rowLimit * i);

      console.info(`[${startDate}] - [${endDate}] ${currentStartRow} ~ ...`);
      const results = await this.query(siteUrl, startDate, endDate, currentStartRow, rowLimit);
      searchResults = searchResults.concat(results);

      if (results.length < rowLimit) {
        break;
      }
    }

    console.info(`found ${searchResults.length} rows.`);

    return searchResults;
  }

  parseResult(startDate: string, endDate: string, resultData: any) {
    if (!resultData.rows) {
      return [];
    }

    return resultData.rows.map((row: any) => {
      return {
        start_date: startDate,
        end_date: endDate,
        key: row.keys[0],
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position,
      };
    });
  }
}

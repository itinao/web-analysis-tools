import { BigQuery } from '@google-cloud/bigquery';

export class GoogleBigQuery {
  bigQueryClient;
  CREDENTIALS_PATH = './credentials.json';

  constructor(projectId: string) {
    this.bigQueryClient = new BigQuery({
      projectId,
      keyFilename: this.CREDENTIALS_PATH,
    });
  }

  async insert(datasetId: string, tableId: string, rows: string) {
    return await this.bigQueryClient.dataset(datasetId).table(tableId).insert(rows);
  }
}

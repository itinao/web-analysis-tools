'use strict';

const {BigQuery} = require('@google-cloud/bigquery');

class GoogleBigQuery {
  bigQueryClient;
  CREDENTIALS_PATH = './credentials.json';

  constructor(projectId) {
    this.bigQueryClient = new BigQuery({
      projectId: projectId,
      keyFilename: this.CREDENTIALS_PATH
    });
  }

  async insert(datasetId, tableId, rows) {
    return await this.bigQueryClient.dataset(datasetId).table(tableId).insert(rows);
  }
}

module.exports = GoogleBigQuery;

# web-tools

WEBサイト解析に使うツール類です

## Getting Started

### Installation

```shell
% yarn install
```

## Lighthouse実行

Lighthouseの実行結果のサマリをJSON形式で出力します

### 単体実行

```shell
% yarn run lh --device-type {mobile|desktop} --url {URL} --output-path {結果ファイルの出力パス}

% yarn run lh --help
yarn run v1.22.10
$ node src/run-lh.js --help
Usage: run-lh [options]

Options:
  -V, --version             output the version number
  -d, --device-type [type]  device type (desktop|mobile) (default: "mobile")
  -u, --url [url]           execute url
  -o, --output-path [path]  output path (default: "./dist")
  -h, --help                display help for command

% more dist/lh-mobile.jsonl 
{"url":"https://fril.jp","created_date":"2021-07-08T09:02:29.755Z","first_contentful_paint":63,"largest_contentful_paint":0,"first_meaningful_paint":34,"speed_index":5,"total_blocking_time":25,"max_potential_fid":20,"cumulative_layout_shift":100,"server_response_time":100,"interactive":23026,"mainthread_work_breakdown":5,"network_rtt":108,"layout_shift_elements":0,"long_tasks":20,"unsized_images":38,"render_blocking_resources":1,"unused_css_rules":74,"unused_javascript":0,"uses_responsive_images":38,"performance_budget_image":3384518,"performance_budget_script":1597717,"performance_budget_document":190438,"performance_budget_stylesheet":37130,"performance_budget_font":15980,"performance":29,"accessibility":77,"best_practices":67,"seo":100,"pwa":50}
```

### 並列実行

```shell
% yarn run lh-parallel --concurrency {並列実行数} --device-type {mobile|desktop}

% yarn run lh-parallel --help
yarn run v1.22.10
$ node src/run-lh-parallel.js --help
Usage: run-lh-parallel [options]

Options:
  -V, --version               output the version number
  -c, --concurrency [number]  concurrency (default: 1)
  -d, --device-type [type]    device type (desktop|mobile) (default: "mobile")
  -h, --help                  display help for command
```
ターゲットのURLは[こちら](https://github.com/itinao/web-tools/blob/main/target-urls.json)

## SEOまわりのデータ算出（Google Search Console API）

### 対象日付の検索キーワード等を取得する
```shell
% yarn run gsc --site-url {サイトURL} --target-date {取得したい日}

% yarn run gsc --help            
yarn run v1.22.10
$ node src/run-gsc.js --help
Usage: run-gsc [options]

Options:
  -V, --version                   output the version number
  -u, --site-url [siteUrl]        siteUrl
  -s, --target-date [targetDate]  targetDate
  -r, --start-row [startRow]      startRow (default: 0)
  -l, --row-limit [rowLimit]      rowLimit (default: 25000)
  -o, --output-path [path]        output path (default: "./dist")
  -h, --help                      display help for command

% more dist/search_result_performances.json 
[{"target_date":"2021-07-03","key":"ららら","clicks":111,"impressions":1111,"ctr":0.11111,"position":111.1111},{"target_date":"2021-07-03","key":"らららー","clicks":1111,"impressions":1111,"ctr":0...
```
ターゲットのキーワードは[こちら](https://github.com/itinao/web-tools/blob/main/search_keywords.csv)

### ファインダビリティスコア・ビジビリティスコア

```shell
% yarn run seo-score --site-url {サイトURL}

% yarn run seo-score --help
yarn run v1.22.10
$ node src/run-seo-score-calculator.js --help
Usage: run-seo-score-calculator [options]

Options:
  -V, --version             output the version number
  -u, --site-url [siteUrl]  siteUrl
  -o, --output-path [path]  output path (default: "./dist")
  -h, --help                display help for command

% more dist/seo_scores.json 
[{"target_date":"2021-07-05","findability_score":0.44027118901429735,"visibility_score":123.86039468762067}]
```

## BigQueryアップロード

### 実行
```shell
% yarn run upload-bigquery --project-id {PROJECT_ID} --dataset-id {DATASET_ID} --filename {アップロードするファイル(jsonl)}

% yarn run upload-bigquery --help
yarn run v1.22.10
$ node src/run-upload-bigquery.js --help
Usage: run-upload-bigquery [options]

Options:
  -V, --version              output the version number
  -p, --project-id [id]      project id
  -i, --dataset-id [id]      dataset id
  -f, --filename [filename]  import filename
  -h, --help                 display help for command
```

## Github Actionsでの定期実行
[こちら](https://github.com/itinao/web-tools/blob/main/.github/workflows/run-lighthouse-and-upload.yml)

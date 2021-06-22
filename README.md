# web-tools

WEBサイト解析に使うツール類です
※ 現在はLighthouseのみ

## Getting Started

### Installation

```shell
$ yarn install
```

## Lighthouse実行

Lighthouseの実行結果のサマリをJSON形式で出力します

### 単体実行

```shell
$ yarn run lh -d {mobile|desktop} -u {URL} -o {結果ファイルの出力パス}
```

### 並列実行

```shell
$ yarn run lh-parallel -c {並列実行数} -d {mobile|desktop}
```
ターゲットのURLは[こちら](https://github.com/itinao/web-tools/blob/main/target-urls.json)

## BigQueryアップロード

### 実行
```shell
$ yarn run upload-bigquery -p {PROJECT_ID} -k {CREDENTIALファイルのパス} -i {DATASET_ID} -f {アップロードするファイル(jsonl)}
```

## Github Actionsでの定期実行
[こちら](https://github.com/itinao/web-tools/blob/main/.github/workflows/run-lighthouse-and-upload.yml)

---
title: よく使うgcloudコマンド
date: '2022-01-09'
layout: layouts/post.njk
scheduled: '2022-01-09'
---

主にCloudRun周辺の。すごく個人的なまとめです。

## コマンド
### 一般枠
- `gcloud --help`
- `gcloud config --help`
- `gcloud config configurations list`
- `gcloud config configurations create <configuration-name>`
- `gcloud config configurations activate <configuration-name>`
- `gcloud projects list`
- `gcloud config set project <your-project-id>`
- `gcloud config set project <project-name>`
- `gcloud projects create <you-project-id> --name <your-project-name>`


### Cloud BuildとArtifact RegistryとCloud Run
- `gcloud services enable  artifactregistry.googleapis.com cloudbuild.googleapis.com`
- `gcloud artifacts repositories list`
- ` gcloud artifacts repositories create <repository-name> --repository-format=docker --location=asia-northeast1 --description="Docker repository hoge"`
- `gcloud builds submit --tag asia-northeast1-docker.pkg.dev/<you-project-id>/<repository-name>/<image-name>:tag1`
- `gcloud run deploy <service-name> --image asia-northeast1-docker.pkg.dev/<you-project-id>/<repository-name>/<image-name>:tag1 --region asia-northeast1 --platform managed --allow-unauthenticated`


### その他メモ
- `gcloud builds submit`時にカレントディレクトリのDockerfileがアップロードされてビルドされるものだと思ってたけど、[公式ドキュメント](https://cloud.google.com/sdk/gcloud/reference/builds/submit)を見てもそうは書いてない？とりあえずカレントディレクトリの
- Cloud Runがデフォルトで外部接続に使うポートは8080ってまじ？


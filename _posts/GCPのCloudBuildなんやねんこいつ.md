---
title: GCPのCloudBuildなんやねんこいつ
date: '2022-01-30'
layout: layouts/post.njk
scheduled: '2022-01-30'
---
### 疑問に遭遇した状況
最近 Cloud Run にハマってる。Cloud SDK こと gcloud コマンドで Artifact Registry(Container Registry)にアップロードしてほいっと `gcloud run deploy` ですぐにサービスが公開できて気持ちがいい。

じゃあそろそろGithub ActionsでCI/CDの設定でもしようかと思ったら、サービスの概念が自分の中で咀嚼できていなかったことに気がついた。そこでの疑問は以下だ。

### 疑問
**Cloud Build なんやねんこいつ** である。

`google-github-actions/setup-gcloud` を使ってワークフローを使っていると、次のような形になる。

```yaml
name: Build and Push Image

on:
  push:
    tags:
    - "*"

jobs:
  build-and-publish:
    name: Build and Push docker image
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v2
      with:
        ref: ${{ github.ref }}

    - name: Setup Google Cloud
      uses: google-github-actions/setup-gcloud@v0
      with:
        service_account_key: ${{ secrets.GCLOUD_AUTH }}
        project_id: node-datastore-test-111

    - name: Configure docker for artifact registry
      run: |
        gcloud auth configure-docker asia-northeast1-docker.pkg.dev

    - name: set TAG
      run: |
        echo "TAG=$(echo $GITHUB_REF | awk -F/ '{print $NF}')" >> $GITHUB_ENV

    - name: Build
      run: |
        docker build -t asia-northeast1-docker.pkg.dev/node-datastore-test-111/node-datastore-test-repo/node-datastore-test-image:${{ env.TAG }} ./

    - name: Push
      run: |
        docker push asia-northeast1-docker.pkg.dev/node-datastore-test-111/node-datastore-test-repo/node-datastore-test-image:${{ env.TAG }}

    - name: Deploy
      run: |
        gcloud run deploy test-service --image asia-northeast1-docker.pkg.dev/node-datastore-test-111/node-datastore-test-repo/node-datastore-test-image:${{ env.TAG }} --region asia-northeast1 --platform managed --allow-unauthenticated

```

せっかくdockerコマンドの羅列で気持ちよくなれてたのに、deployはgcloudコマンドに戻ってくる。

...?
Cloud Buildを挟まないとArtifact RegistryからCloud Runへデプロイできないと思い込んでいたけど、Cloud RunにデプロイするためにArtifact RegistryにビルドしたDocker Imageをアップロードしてるだけで、Cloud Buildいらんやん。。。

なんやねん Cloud Build こいつは、でした。


### 周辺用語
- Github Actions
- Cloud SDK
- Cloud Build


### 参考文献
- [Cloud Run へのデプロイ](https://cloud.google.com/artifact-registry/docs/integrate-cloud-run#command-line)

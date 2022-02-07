---
title: DockerとFirebaseで作るReact環境構築
date: '2020-04-01'
layout: layouts/post.njk
scheduled: '2020-04-01'
---

## 都合のいいdockerイメージをダウンロード
`$ docker pull andreysenov/firebase-tools`

`$ mkdir docker-firebase-test`

参考: [https://hub.docker.com/r/andreysenov/firebase-tools](https://hub.docker.com/r/andreysenov/firebase-tools)

## Docker関連ファイルを作成

`$ vi docker-compose.yml`

```yml
version: "3.8"
services:
  web:
    build: .
    volumes:
      - ./:/app 
    ports:
      - "8000:3000"
      - "4000:4000" #Emulator Suite UI
      - "5000:5000" #Firebase Hosting
      - "5001:5001" #Cloud Functions
      - "8080:8080" #Cloud Firestore
      - "8085:8085" #Cloud Pub/Sub
      - "9000:9000" #Realtime Database
      - "9005:9005" #Firebase Login
      - "9099:9099" #Authentication
    
    tty: true
    stdin_open: true
```

`$ vi Dcokerfile`

```docker
FROM andreysenov/firebase-tools
WORKDIR /app
```

## ホスティングするファイルを用意
今回はReactをcreate-react-appで用意
コンテナに入ってreactをインストール

`$ docker-compose build`

`$ docker-compose up -d`

`$ docker exec -it docker-firebase-test_web_1 sh`

`$ cd /app`

`$ npx create-react-app sample-app --template typescript`

`$ exit`

## docker-compose.ymlを編集
`$ vi docker-compose.yml`

```yml
version: "3.8"
services:
  web:
    build: .
    volumes:
      - ./:/app 
    command: sh -c "cd /app/sample-app && yarn start"
    ports:
      - "8000:3000"
      - "4000:4000" #Emulator Suite UI
      - "5000:5000" #Firebase Hosting
      - "5001:5001" #Cloud Functions
      - "8080:8080" #Cloud Firestore
      - "8085:8085" #Cloud Pub/Sub
      - "9000:9000" #Realtime Database
      - "9005:9005" #Firebase Login
      - "9099:9099" #Authentication
    
    tty: true
    stdin_open: true
```

## firebaseへデプロイ
`$ docker-compose up -d`

`$ docker exec -it docker-firebase-test_web_1 sh`

`$ cd /app/react-ts-app`

`$ firebase login --no-localhost`

`$ firebase init hosting`

firebase.jsonを編集してfirebaseが公開ディレクトリをpublicディレクトリではなく、buildディレクトリを参照するように変更

`$ vi firebase.json`
```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

```

`$ firebase deploy`

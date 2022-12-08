---
title: AWS S3互換のMinIOにaws-sdk(client-s3)から接続する
description: '@aws-sdk/client-s3を利用したMinIOへの接続例のサンプルコード'
date: '2022-12-08'
tag:
  - JavaScript
  - Express.js
  - AWS
---
### 結論
s3-clientでMinIOに繋げる！

### 状況
ローカルで完結する開発環境でもS3にできるだけ近い形をとりたかった。  
[MinIO](https://min.io/)というS3互換のオブジェクトストレージが無料らしいので使ってみる。


### MinIO導入
以下のようなディレクトリ構造とする。
```sh
.
├── docker
│   └── minio
│       └── data
├── docker-compose.yml
```
```yml
version: '3.8'
services:
  minio:
    image: minio/minio:RELEASE.2022-11-29T23-40-49Z
    ports:
      - 9000:9000
      - 9090:9090
    environment:
      - MINIO_ROOT_USER=minio
      - MINIO_ROOT_PASSWORD=miniopass
      - MINIO_VOLUMES=/data
    entrypoint: sh
    command: -c "
      minio server --console-address ':9090'"
    volumes:
      - ./docker/minio/data:/data
```

コンテナを起動するとlocalhost:9090でminioの管理画面が表示される。


### aws-sdkでMinIOに接続する
`s3.js`
```js
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const IS_DEV = process.env.IS_DEV
const AWS_S3_REGION = process.env.AWS_S3_REGION
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME


const s3client = new S3Client(
  IS_DEV
    ? {
        region: AWS_S3_REGION,
        credentials: {
          accessKeyId: 'minio', // MINIO_ROOT_USER
          secretAccessKey: 'miniopass' // MINIO_ROOT_PASSWORD
        },
        endpoint: 'http://localhost:9000/',
        forcePathStyle: true
      }
    : {
        region: AWS_S3_REGION,
        credentials: {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY
        }
      }
)
export const uploadToS3 = async (body) => {
  try {
    const data = await s3client.send(
      new PutObjectCommand({
        Bucket: AWS_S3_BUCKET_NAME,
        Key: 'test/key.png',
        Body: body,
      })
    )
    console.debug('Success', data)
    return
  } catch (err) {
    console.error('Error', err)
    throw err
  }
}

```

`index.js`
```js
import express, { Router } from 'express'
import { uploadToS3 } from './s3'

const app = express()
const router = Router()

router.post('/image/upload', async (req, res) => {
    // 最小のpng
    const reqBodyMock = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQIHWP4DwABAQEANl9ngAAAAABJRU5ErkJggg=='

    await uploadToS3(reqBodyMock)

    return res.status(201)
  }
)

app.use(router)
app.listen('3000')
```

### multerS3でクライアントのフォームから送信された画像を保存する

`multer.js`
```js
import multer from 'multer'
import multerS3 from 'multer-s3'
import { s3client } from './s3'

export const multerUpload = multer({
  storage: multerS3({
    s3: s3client,
    bucket: AWS_S3_BUCKET_NAME,
    metadata: (_req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (_req, file, cb) => {
      cb(null, file.originalname)
    }
  })
})
```

`index.js`
```js
import express, { Router } from 'express'
import { uploadToS3 } from './s3'
import { multerUpload } from './multer'

const app = express()
const router = Router()

router.post(
  '/image/upload',
  multerUpload.single(),
  async (req, res) => {
    const file = req.file // 色々都合のいいファイル（本例だとimage/pngだったり的な）

    // s3multerでポート番号が削られてしまうので無理やりつける。
    const fileLocation = IS_DEV
      ? file.location.replace(
          /^http:\/\/localhost/,
          'http://localhost:9000'
        )
      : file.location

    return res.status(200).json({location: fileLocation})
  }
)

app.use(router)
app.listen('3000')
```

### 参考文献
- [ローカルS3環境(minio)を構築する - Qiita](https://qiita.com/reflet/items/3e0f07bc9d64314515c1)
- [最小のpng画像](https://yosiopp.net/archives/225/)

### 関連用語
- busboy
- multer
- multerS3

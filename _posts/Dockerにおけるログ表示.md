---
title: Dockerにおけるログ表示
date: '2022-01-26'
layout: layouts/post.njk
scheduled: '2022-01-26'
---

### 単体コンテナ用
`docker logs -f --tail=100 <container-name>`

### docker compose用
`docker compose logs -f --tail=10`

### 参考
- [Dockerのログが大きくなりすぎたから最新のだけ見たい](https://qiita.com/nitaking/items/4ca215b95cef2ad5e958)
- [docker-compose logs](https://docs.docker.com/compose/reference/logs/)

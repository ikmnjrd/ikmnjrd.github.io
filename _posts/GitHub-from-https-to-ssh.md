---
title: GitHubのhttpsからSSH通信への切り替え
date: '2021-10-29'
layout: layouts/post.njk
scheduled: '2021-10-29'
---

```bash
$ git remote -v
ターミナルを開いてください。
ワーキングディレクトリをローカルプロジェクトに変更します。
変更したいリモートの名前を取得するため、既存のリモート一覧を表示します。
$ git remote -v
> origin  https://github.com/USERNAME/REPOSITORY.git (fetch)
> origin  https://github.com/USERNAME/REPOSITORY.git (push)
git remote set-url コマンドでリモートの URL を HTTPS から SSH に変更します。
$ git remote set-url origin git@github.com:USERNAME/REPOSITORY.git
リモート URL が変更されたことを検証します。
$ git remote -v
# Verify new remote URL
> origin  git@github.com:USERNAME/REPOSITORY.git (fetch)
> origin  git@github.com:USERNAME/REPOSITORY.git (push)
```

参考：[公式サイト](https://docs.github.com/ja/get-started/getting-started-with-git/managing-remote-repositories)

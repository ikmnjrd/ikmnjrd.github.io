---
title: package.jsonに記述するlicenceの書き方
description: Licenseを書く際の決まりについて調べたのでまとめた。
date: '2022-08-06'
tag:
  - npm
  - Node.js
---

### どのように書くのがいいのか
MITやISCなどよく書いてあるがどう書くのがいいのか？
npm Docsにはこのように書いてある。
> BSD-2-Clause や MIT などの一般的なライセンスを使用している場合は、次のように、使用しているライセンスの現在の SPDX ライセンス識別子を追加します。
> { "license" : "BSD-3-Clause" }
> --- [package.json | npm Docs](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#license)

### SPDXとは
Linux Foundationのブログ（日本語訳版）に怪しい日本語でこのように書いてあります。
> SPDXは、コンポーネント、ライセンス、著作権、セキュリティ リファレンスなどのソフトウェア部品表 (SBOM) 情報を伝達するためのオープンな標準です
> --- [SPDX : すでに世界共通のソフトウェア部品表 (SBOM) およびサプライチェーン セキュリティで使用 - The Linux Foundation](https://www.linuxfoundation.jp/blog/2021/06/spdx-its-already-in-use-for-global-software-bill-of-materials-sbom-and-supply-chain-security/)

### ライセンスのリストを参照する
[SPDX License List](https://spdx.org/licenses/)
リンク先の表からのIdentifierを探し、次のようにかく。
```json
{ "license" : "CC0-1.0" }
```

UnlicenseなどもしっかりとSPDXライセンスリストに記載されています。

### 余談
[https://github.com/jslicense/spdx-license-ids](https://github.com/jslicense/spdx-license-ids)のスター数は2桁なのにUsed byの項目が1千万人近くになってるのはどういうことなのか不思議に思った。







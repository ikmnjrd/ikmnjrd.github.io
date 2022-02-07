---
title: Google Cloud Runで動かすアプリをRDBに接続した際の料金を考える
date: '2022-01-10'
layout: layouts/post.njk
scheduled: '2022-01-10'
---

Googleが提供してくれているCloud Runは便利ですよね。私は普段Reactでクライアント側を触っていてFirebaseで済ませることが多いのですが、Cloud Runの便利さに感化されてRDBも使いたくなりました。（FirebaseはNoSQLしか提供してくれていないので...）

しかしへっぽこアプリに使うにはいかんせん料金が気になったところで、予想よりも今回の用途には高級すぎました。今回の判断の元になった部分をまとめます。

自称へっぽこアプリへの、想定されるトラフィックとしては1日に1件リクエストがあるかといったレベルのものを想定して話を進めます。

まず第一にCloud Runを使用する。そこにクラウドサービスを利用してRDBを接続したい。
そうなった時の候補は、次の2つで、こちらの料金を概算していきます。
1. Cloud Run と Cloud SQL
2. Cloud RunにホストしたAPIサーバーをVPS上のDBサーバーに繋ぐ




### 注意事項
1$=100円で計算しています。

料金は全て東京リージョンで計算しています。


## **1. Cloud SQLの料金**
1ヶ月あたり800円。

#### 内訳
1. ストレージとネットワークの料金
   * SSD ストレージ容量: 1 GB あたり $0.221/月
   * HDD ストレージ容量: 1 GB あたり $0.117/月
2. ネットワーク下り（外向き）の料金
   * 送信先 Google プロダクトであれば大陸内は無料
   * インターネット下り（外向き、Cloud Interconnect を使用する場合）は$0.05/GB
   * インターネット下り（外向き、Cloud Interconnect を使用しない場合）は$0.19/GB
3. インスタンスの料金

| 共有コア マシンタイプ | 仮想 CPU 数 |RAM（GB） |最大ストレージ容量|1ヶ月あたりの料金（米ドル）
|:-----------|:------------|:------------|:------------|:------------|
| db-f1-micro | 共有  | 0.6 | 3,062 GB | $7.67 |
| db-g1-small | 共有  | 1.7 | 3,062 GB | $25.55 |



CloudFunctionsで停止と起動をスケジューリングしてことを解説している[Google Cloudのブログ](https://cloud.google.com/blog/ja/topics/developers-practitioners/lower-development-costs-schedule-cloud-sql-instances-start-and-stop)もあります。


## **2. 他社VPSにDBサーバを建て接続**
必要なもの(料金計算対象)
* VPS(今回はConoHa)
* Cloud NAT
* 静的IPアドレス


### **ConoHaのVPSの料金**
1ヶ月あたり682円

メモリ: 512MB、
CPU: 1コア、
SSD: 30GB


### **Cloud NATの料金**
1ヶ月あたり数円

| 割り当てられている VM インスタンスの数 | 1 時間あたりの料金 | 処理された 1 GB あたりの料金（下りと上り（外向きと内向き）の両方） |
|:-----------|:------------|:------------|
| 32 VM インスタンスまで | $0.0014 × ゲートウェイを使用している VM インスタンスの数 | $0.045   |
|32 VM インスタンスを超える場合|$0.044|	$0.045

参考：[https://cloud.google.com/nat/pricing?hl=ja](https://cloud.google.com/nat/pricing?hl=ja)


### **静的IPアドレス**
1ヶ月あたり1,080円

静的IPアドレス（割り当て済み、未使用）	1時間あたり$0.015

参考:[https://cloud.google.com/compute/all-pricing#ipaddress](https://cloud.google.com/compute/all-pricing#ipaddress)


### その他参考
- [https://cloud.google.com/run/docs/configuring/static-outbound-ip](https://cloud.google.com/run/docs/configuring/static-outbound-ip?hl=ja)

---
title: 実践Vimを読んだ時のメモ
description: ただのメモ
date: '2022-08-25'
tag:
  - vim
---
本を読んだ時のメモ書きがいつもより出てしまったので。

### これは実践vimを読んだ時のメモです

expressionレジスタ  
`<C-r>=` でアクセス  
1+1の実行結果(2)などが得られる。  

`vit`  
`<script>DDG.Utils.WebVitals.reportWebVitals(DDG.pixel)</script>`  

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

body>.container {
    background: none;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 1264px;
    width: 100%;
}

.container {
    flex: 1 0 auto;
    margin: 0 auto;
    position: relative;
    text-align: left;
    width: 100%;
}

| Left align | Right align | Center align | hoge |
|:--------|:--------|:--------|:-------|
| This    | This    | This    | hoge   |
| column  | column  | column  | hoge   |
| will    | will    | will    | hoge   |
| be      | be      | be      | hoge   |
| left    | right   | center  | hoge   |
| aligned | aligned | aligned | hoge   |

`q:` コマンドラインウィンドウ
テキストのように編集ができる。`J`を使って2つのコマンドを1つにまとめるなどができる。  
プロンプトから切り替えたい時は`<C-f>`で切り替えられる。  

`%`は現在編集中のファイル名のエイリアス  
バッファ内だと対となる対象へのジャンプ(モーション)  
プロンプトの`:%s`はsubstituteコマンドじゃなかった？？  

`:sh[ell]`コマンドが何故か使えず、`:terminal`コマンドなら使えた。  

`<C-z>`実行中のvimをバックグラウンドにする。zshではfgコマンドでvimに戻ってこれる。  

`read !{cmd}`コマンド実行結果をvim内に挿入できる  

`q{register}`マクロ記録開始 => `q` マクロ記録停止  
`@{register}` マクロ実行  
`@@` 前回実行のマクロを実行  
`:reg {register}` マクロ確認  

`q/` コマンドライン履歴を表示する  
ノーマルモードの時の`*`でカーソル位置の単語(?)の検索  

`C-w`s 水平分割  
`C-w`v 垂直分割  

### 置換コマンド

:[range]s[ubstitute]/{pattern}/{string}/[flags]

sコマンドのgフラグは現在行の意味でグローバルでしかない。  
ファイル全体を変更するならsコマンドの前に`%`をつける  

レジスタの参照し  
`:%s//\=@0/g` 直前の検索パターンをヤンクレジスタの内容で置き換える  

`g&` = `:%s//~/&`  

### ファイルの補完

`i_<C-x><C-f>`  
workspace/liff-firebase/liff-app/functions/node_modules/

### コンフィグ

`:set spell` => `:set nospell`  
`:set spell!` 設定値をトグル  
`:set spell?` 現在の設定値を見る  
`:set spell&` 設定値をデフォルト値にする  

`:setloacal tabstop=4` 現在のウィンドウとバッファに適用  
`:bufdo setloacal tabstop=4` 既存のバッファに適用  
`:windo setloacal tabstop=4` 全てのウィンドウに適用  

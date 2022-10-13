---
title: NeoVimとvoltaを併用するとNodeを見つけてくれない問題
description: NeoVimとvoltaを使うと必ずこの問題にぶち当たるのでは？というような
date: '2022-10-13'
tag:
  - Node.js
  - NeoVim
  - JavaScript
  - volta
---

## 環境
- macOS Monterey(v12.6)
- NeoVim(v8.0)
- volta(v1.0.8)
- Node(v16.17.0)

## 結論
voltaを使うなら[voltaのIssue](https://github.com/volta-cli/volta/issues/866)にあるようにinit.vimに以下のような記述をしておく。

```vim
if executable('volta')
  let g:node_host_prog = trim(system("volta which neovim-node-host"))
endif
```

## 経緯とシューティングタイムライン
仕事でNeoVimは一切使っていないのですが、休日趣味的に開いてみたらなんか様子がおかしい。

NeoVimを開いて`:checkhealth provider`を入力すると、以下のようなメッセージ。

```markdown
provider: health#provider#check
========================================================================

## Node.js provider (optional)
  - INFO: Node.js: v16.17.0
  - WARNING: Missing "neovim" npm (or yarn, pnpm) package.
    - ADVICE:
      - Run in shell: npm install -g neovim
      - Run in shell (if you use yarn): yarn global add neovim
      - Run in shell (if you use pnpm): pnpm install -g neovim
      - You may disable this provider (and warning) by adding `let g:loaded_node_provider = 0` to your init.vim

```

`npm install -g neovim`もしくは`volta install neovim`をしても変わらない。  
ここで[公式のHelp](https://neovim.io/doc/user/provider.html)を読むと、  

> By default, Nvim searches for "neovim-node-host" using "npm root -g", which can be slow. To avoid this, set g:node_host_prog to the host path: <cite>[Provider - Neovim docs](https://neovim.io/doc/user/provider.html)</cite>

自分のvoltaを使ってる環境で`npm root -g`を実行すると以下のような結果に。
```sh
/Users/ike/.volta/tools/image/node/16.17.0/lib/node_modules
```

ということで、`g:node_host_prog`オプションを設定したいが、うまくいかん。  
そもそもvoltaを使ってグローバルインストールしたパッケージは`/Users/ike/.volta/bin/volta-shim`にshimとしてインストールされ、シンボリックリンクが貼られる形をとっている。  
こんな感じ  
```sh
% ls -al ~/.volta/bin
drwxr-xr-x  12 ike  staff      384 Oct 13 16:45 .
drwxr-xr-x   9 ike  staff      288 Sep 10 23:29 ..
lrwxr-xr-x   1 ike  staff       32 Sep 21 21:34 http-server -> /Users/ike/.volta/bin/volta-shim
lrwxr-xr-x   1 ike  staff       32 Sep 15 23:36 memlab -> /Users/ike/.volta/bin/volta-shim
lrwxr-xr-x   1 ike  staff       32 Oct 13 16:45 neovim-node-host -> /Users/ike/.volta/bin/volta-shim
lrwxr-xr-x   1 ike  staff       32 Sep 10 23:29 node -> /Users/ike/.volta/bin/volta-shim
lrwxr-xr-x   1 ike  staff       32 Sep 10 23:29 npm -> /Users/ike/.volta/bin/volta-shim
lrwxr-xr-x   1 ike  staff       32 Sep 10 23:29 npx -> /Users/ike/.volta/bin/volta-shim
-rwxr-xr-x   1 ike  staff  6522504 Jun  2 09:14 volta
-rwxr-xr-x   1 ike  staff  4771376 Jun  2 09:14 volta-migrate
-rwxr-xr-x   1 ike  staff  5522480 Jun  2 09:14 volta-shim
lrwxr-xr-x   1 ike  staff       32 Sep 10 23:29 yarn -> /Users/ike/.volta/bin/volta-shim
```

わからん状態だったため、GitHubを探し、[結論](#結論)部分でも貼ったコードをコピペして終了。  
Vim(NeoVim)わからん。  

### 周辺用語
- Shim

### 参考文献
- [volta + neovim compatibility issues · Issue #866 · volta-cli/volta](https://github.com/volta-cli/volta/issues/866)
- [Understanding Volta | Volta](https://docs.volta.sh/guide/understanding#managing-your-toolchain)
- [Provider - Neovim docs](https://neovim.io/doc/user/provider.html)
- [Shim と Polyfill](https://qiita.com/ybiquitous/items/3104beb84b78ca15f407)
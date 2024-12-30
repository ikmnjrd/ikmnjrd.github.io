---
title: Todo.txtを運用するならVimがおすすめ
description: 普段はVSCodeを使う人でもTODO.txtを使うならVimで書くのがおすすめという話
date: '2024-12-30'
tag:
  - メモ帳
  - タスク管理ツール
---

Todo.txtというものをご存知でしょうか、私は2024年のソニックガーデンさんのアドベントカレンダーの[todo.txtを布教したい #Todoアプリ - Qiita](https://qiita.com/maedana/items/713390ce590b92fee97f)で知りました。  
私は仕事をするとき、作業ログなど個人的なメモをmacOSのプリインストールされたメモ帳に書いています。  
毎日新しいファイルを作成していましたがメモの一部にはタスクのリストもあり、タスクの部分はほぼ毎日コピペしていて煩わしく思っていました。  
そんな自分にはぴったりに思えたため、2週間使用してみて思ったことを書いていきます。 
  
ちなみにTodo.txtはこんな感じ
```
- [ ] (E)this is the important
- [ ] (B)this task
- [x] (A)hogehoge
```

### 自分の立ち位置

普段からシンプルなテキストエディタを使用していることのように、自分の作業スタイルを思いつく限り列挙します。  
- メモ帳にその日の作業ログやタスクリスト、直面した問題への感想などをマークダウン形式でメモしている
  - マークダウン形式で記述するが、txtファイルにしているし、それ用のビューワーを使うこともない
  - README.mdなどに書き写す際はマークダウンにしていて良かったと感じるし、らくがき帳に等しい中身なので多少の秩序がほしい
- タスクリストはテキストファイルの一番上の部分に常にあるがスクロールしたりが面倒くさい
- プログラマーなのでコードを書くときはVSCodeを使うことが多い
- Vim盆栽は好きだが、普段はVimをほとんど使わない。


## Todo.txtを運用してみた感想

### よかったこと

- Vimの:sortコマンドで並び替えが即終わる
- ふだんの作業メモからタスクリストがなくなって作業メモ自体が見やすくなった
- 対応済みのタスクはxでマークするとソート時に最下部へいくので常にファイル先頭を見ていればよくなり楽

### よくなかったこと

- 保存場所についてまだ決まりきらない。プロジェクトごとにTodo.txtを作るか、単一ファイルを運用するか。
    - 今はプロジェクトごとを試してるけど、単一ファイルのほうがよさそうで悩む
- 階層構造にできない
    - :sortを使う都合。公式にも階層化はしないことになってる。
- 空白行で区切りたいタスク群もソートをしたら意味がなくなる
    - 優先度をそのタスク群でまとめることで対処しているが、うーん
- Vimのキーバインドに慣れない
    - キーバインドを調べる時間が増えたことがネガティブな部分
    - 調べれば調べるほどVimとの相性の良さに震える

### よく使うコマンド

- 全体の並び替え
  - `:sort`
- 完了フラグの操作
  - `ci[`
- 優先度の操作
  - `ci(`
  - `<C-a>` / `<C-x>`
  - 自作コマンド


### 使うようになった設定
- `set nrformats=octal,hex,alpha`
  - インクリメント対象にアルファベットを追加
- 自作コマンド
  - `:ChangePriority`で実行
```
"" for Todo.txt
lua << EOF
local function change_priority()
  -- Vim の input() 関数をLuaから呼び出して、対話的に入力を受け取る
  local oldPri = vim.fn.input('Old Priority (e.g. A): ')
  local newPri = vim.fn.input('New Priority (e.g. B): ')

  -- A～Z の一文字だけかどうかチェック
  if string.match(oldPri, '^[A-Z]$') and string.match(newPri, '^[A-Z]$') then
    -- ここでグローバルコマンドを使い、「- [x]」を含む行は除外して置換を実行
    -- 例えば "(A)" を "(B)" に置き換える
    local cmd = string.format("g!/- \\[x\\]/ s/(%s)/(%s)/g", oldPri, newPri)
    vim.cmd(cmd)

    print(
      string.format("Replaced priority from (%s) to (%s) (excluding lines that have - [x])", oldPri, newPri)
    )
  else
    print("Invalid priority input!")
  end
end

-- Luaでユーザーコマンドを作成
vim.api.nvim_create_user_command(
  'ChangePriority',
  function()
    change_priority()
  end,
  {}
)
EOF
```


### 結論

タスクリストをメモ帳で運用してる人は、Todo.txtとVimを使うと幸せになれる。  
私はVimに慣れることをともに目標を据えてもう少し使ってみようと思います。

### 参考文献
- [todo.txtを布教したい #Todoアプリ - Qiita](https://qiita.com/maedana/items/713390ce590b92fee97f)
- [Todo.txt: Future-proof task tracking in a file you control](http://todotxt.org/)

---
title: スキルの管理について、2026年5月時点の個人的なAI利用方法
date: '2026-06-10'
tag:
  - AI
---

### 要約

Skillの管理を始め、新しい依存先を作らないためにGitHub CLI(ghコマンド)とGitHubで管理することにした。


### 背景とモチベーション

マークダウンファイルでのインストラクションは個人的なものはすべて捨てて半年以上運用してきた結果、MCP同様の位置にスキルも位置していると、grill-meが流行ったことで実感が湧いてきた。
ClineにはじまりClaude CodeやCodexなどのコーディング用の"エージェントアプリ"自体が最新のモデルに合わせて進化していっている印象が自分には強く、コーディングに向いているモデルが出るたびにエージェントを乗り換えていた。
しかし乗り換えるたびにインストラクションファイルをそのまま流用しても上手くいかないことが多くストレスになっていた。その結果、インストラクションファイルを捨て、やらせたい作業に対して数個のスニペットを頭の中に入れて適宜文章として作る、エージェントアプリ(と最低限のMCP利用)以外になにも持たないという距離感になった。
頭の中のスニペットの内の1つが「質問を1つずつさせていく」で、このスタイルはgrill-meそのままだったので利用させてもらうことにしたと同時に複数のエージェントアプリに対してSkill管理の必要性が出てきた。


### Skill管理アプリの候補

`$ gh skill ~~`以外にも以下の候補があった

- [microsoft/apm: Agent Package Manager](https://github.com/microsoft/apm)
- [vercel-labs/skills: The open agent skills tool - npx skills](https://github.com/vercel-labs/skills)

最終的な判断軸としては、

- 自作以外ではGitHubで公開されているものしか使わないだろうこと
- ghはすでに自分の開発ワークフローの一部として利用していること
- skillの管理もAIに任せるので薄い仕組みのほうがいい

以上がghにした理由になった。

### gh skillの使い方

非対話的に使う場合は複数agent指定ができない。対話的に使う場合は一度で複数のagentを選べる。

```shell
gh skill install ikmnjrd/skills skills/grill-me --agent codex --scope project

gh skill install ikmnjrd/ikeda-agent-skills skills/grill-me --agent claude-code --scope project
```

--scopeはuser|project
```
gh skill install ikmnjrd/ikeda-agent-skills skills/grill-me --agent claude-code --scope user
```

自分のリポジトリにコピーしてこなくてもインストールもアップデートもできるが、再構築の手軽さや取り込んだskillの編集もしたい（多分しない）ので基本的にライセンス次第にはなるがコピーして持ってくるようにしてる。
手軽に試したいだけなら自分のskillリポジトリにはもってこないでおいて、効用を感じられた段階でコピーして持ってくるようにしたいと思う。


### 最後に

サプライチェーン攻撃が多すぎてもう嫌だ


### 参考文献
- [GitHub CLI のクイック スタート - GitHubドキュメント(https://docs.github.com/ja/github-cli/github-cli/quickstart)
- [
コーディングに/grill-meを使うのをやめました。代わりに使っているのはこちらです。- YouTube](https://www.youtube.com/watch?v=6BB6exR8Zd8)
- [
/grill-me：AI駆動開発を超助けてくれるSkill【開発以外にも！】- YouTube](https://www.youtube.com/watch?v=VKuZeNlz_2o)
- [#44 AIコーディングでプランモードはもう使わない grill-meで曖昧さを排除しよう, いつできる？に答える方法 見積もりの難しさ, 胃を傷めないフィードバック方法, 圏論動画振り返り - YouTube](https://www.youtube.com/watch?v=UA2IEj-lRz0)
- [gh skillが登場。GitHub公式のスキル管理ツールにnpx skillsから乗り換えた](https://zenn.dev/ubie_dev/articles/gh-skill-install-agent-skills)

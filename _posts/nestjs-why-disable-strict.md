---
title: Nest.jsってなんでstrictNullChecksがデフォルトでfalseなの？
description: Nest.jsが採用された炎上案件に放り込まれた時の疑問の備忘録
date: '2023-08-07'
tag:
  - Nest.js
  - JavaScript
---

### TL;DR
Nest.jsのインストールを公式ドキュメントに何も考えずに沿っていくと、TypeScriptユーザーが怒りそうな設定が放り込まれたtsconfigができあがってる。


### 疑問に遭遇した状況
APIサーバーにNest.jsを採用したプロジェクトに途中参加した時、「型からnullが落ちるなー」と思っていた。  
私はNest.jsも初めてで、TypeORMなど他にも初めてのフレームワークだらけだったので、ここら辺の設計思想かな？と逡巡したが、普通にtsconfigでstrictNullChecksがfalseになっていて愕然とした。

### なんでstrictNullChecksがfalseになるの？
[公式のGetting Started](https://docs.nestjs.com/)をただなぞっていくと、以下のような`tsconfig.json`ができる...
```json
{
  "compilerOptions": {
    ...
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  }
}
```

この件に不服を唱えたユーザーがいたが、Nest.js開発メンバー(@kamilmysliwiec)は以下のように返答を寄せている。(DeepL翻訳)

> 物事を可能な限り型安全にすることが一般的に望ましいということには同意しますが、strictNullCheck/noImplictAnyをtrueに設定すると学習曲線が険しくなることを念頭に置かなければなりません。適切なバランスを追求するのは常に難しい(中略)
> 幸い、これは差し迫った問題ではないように思える。誰かがこのオプションを使いたいのであれば、オンにすればいい。今のところ、このオプションをデフォルトにする予定はないが、時間の経過とともに変更されるかもしれない。
> <cite>出典: [Please turn on `strictNullChecks` option to be `true` · Issue #2057 · nestjs/nest-cli](https://github.com/nestjs/nest-cli/issues/2057#issuecomment-1549083356)</cite>


`--strict`オプションを使うと次のようにTSユーザーが慣れ親しんでるような設定になる。

```json
{
  "compilerOptions": {
    ...
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true
  }
}

```

`--strict`オプションを使ったり、開発初期にしっかりとtsconfigを見直そう。私と同じ状況になった人はブチギレながらtsconfigを設定し直した後に修正を入れまくろう。


### 参考文献
- [Please turn on `strictNullChecks` option to be `true` · Issue #2057 · nestjs/nest-cli](https://github.com/nestjs/nest-cli/issues/2057#issuecomment-1549083356)
- [Documentation | NestJS - A progressive Node.js framework](https://docs.nestjs.com/)
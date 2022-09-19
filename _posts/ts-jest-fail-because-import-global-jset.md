---
title: Jest(ts-jest)で作ったはずのmockがundefinedになるエラー
description: Jestで遭遇したエラー
date: '2022-09-19'
tag:
  - Jest
  - TypeScript
  - JavaScript
---
### 結論
ts-jest?esmで書いてるから？とりあえずでimportするのやめよう。

### 状況
Jestの右も左もわからないがfetcをmockしてゴニョゴニョしていた。  
[公式の例](https://jestjs.io/docs/mock-function-api/#jestmockedsource)にもnode-fetchを使った例が載ってるぐらいなので、コピペして動かそうとしていたら問題発生。


以下のエラーが発生した。
```js-stacktrace
TypeError: mockGetImageFromWeb.mockClear is not a function
  23 |
  24 |   afterEach(() => {
> 25 |     mockGetImageFromWeb.mockClear()
     |                         ^
  26 |   })
  27 |   test('should be defined', () => {
  28 |     expect(getImageFromWeb).toBeDefined()
```

コピペしたコードはこれ
```js
import {expect, jest, test} from '@jest/globals';
import type {fetch} from 'node-fetch';

jest.mock('node-fetch');

let mockedFetch: jest.Mocked<typeof fetch>;

afterEach(() => {
  mockedFetch.mockClear();
});

test('makes correct call', () => {
  mockedFetch = getMockedFetch();
  // ...
});

test('returns correct data', () => {
  mockedFetch = getMockedFetch();
  // ...
});
```


### 対応
コピペしてきたtestファイルで以下のインポート文を削除したら動いた。
```js
import { expect, jest, test } from '@jest/globals'
```

### 参考文献
- [Mock Functions · Jest](https://jestjs.io/docs/mock-function-api/#jestmockedsource)
- [How To Mock Fetch in Jest | Leigh Halliday](https://www.leighhalliday.com/mock-fetch-jest)



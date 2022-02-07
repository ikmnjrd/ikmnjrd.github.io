---
title: 疑問メモ_JestでECMAScriptを使う
date: '2022-01-07'
layout: layouts/post.njk
scheduled: '2022-01-07'
---

### 疑問
JestでECMAScriptを使う方法が[公式](https://jestjs.io/ja/docs/ecmascript-modules)に書いてある。
やってみたけどなぜかできなかったというメモ。

公式通りにやってみた結果以下のエラー。

### エラー全文
```bash
% node --experimental-vm-modules node_modules/jest/bin/jest.js
(node:92238) ExperimentalWarning: VM Modules is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 FAIL  ./index.test.js
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    /Users/ike/workspace/no-degradation-image-converter/index.test.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import sum from './index';
                                                                                      ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1728:14)
      at TestScheduler.scheduleTests (node_modules/@jest/core/build/TestScheduler.js:333:13)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.222 s
```

### わからないことを辿る
そもそも実行時に付与してるオプションは、[Node.js]((https://nodejs.org/api/cli.html#--experimental-vm-modules))のサイトでこのように説明されている。
>--experimental-vm-module
>Enable experimental ES Module support in the vm module.

とてもあっさり！

`vm module`とはなんぞ？
要はV8エンジンらしい。以下公式での[Node.jsのサイト](https://nodejs.org/api/vm.html#vm-executing-javascript)での説明
>The vm module enables compiling and running code within V8 Virtual Machine contexts. The vm module is not a security mechanism. Do not use it to run untrusted code.

そして迷宮入り。Nodeを16の最新安定版にしてみたけどダメでしたね。
大人しくCommonJSでrequireします。


### 周辺用語
- Node.js
- V8
- VM moduel
- CommonJS
- ECMAScript


### 参考文献
- [--experimental-vm-module](https://nodejs.org/api/cli.html#--experimental-vm-modules)
- [(https://nodejs.org/api/vm.html#vm-executing-javascript)](https://nodejs.org/api/vm.html#vm-executing-javascript)
- [https://nodejs.org/api/vm.html#vm-executing-javascript](https://nodejs.org/api/vm.html#vm-executing-javascript)

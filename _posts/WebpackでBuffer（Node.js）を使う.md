---
title: WebpackでBuffer（Node.js）を使う
date: '2022-01-02'
layout: layouts/post.njk
scheduled: '2022-01-02'
---

駆け出しエンジニアのふわっとした理解を書く。
Node.jsのコアモジュールであるBuffer()をフロント側で使いたいときがあるらしい。[参考の該当箇所](https://github.com/CyberAgentHack/web-speed-hackathon-2021/blob/135468cc9f69f6f27ba0bc9d3b74d60f1ebe3a40/client/src/components/foundation/CoveredImage/CoveredImage.jsx#L21-L23)（パフォーマンスチューニングを行う元して書かれたソースコードなので、ベストプラクティス的ではないのかもしれないが、初心者の私には判断つきません）
```javascript
const imageSize = React.useMemo(() => {
  return data !== null ? sizeOf(Buffer.from(data)) : null;
}, [data]);
```


### 解決策
解決策(といっても、元々のソースコードに書かれていたが)、下に記載する設定がないとブラウザから怒られてしまいます。
```bash
CoveredImage.jsx:22 Uncaught ReferenceError: Buffer is not defined
```


`webpack.config.js` に以下のように追記する。
```javascript
plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
]
```



### 参考文献
- [https://github.com/diegomura/react-pdf/issues/1029](https://github.com/diegomura/react-pdf/issues/1029)
- [https://github.com/CyberAgentHack/web-speed-hackathon-2021](https://github.com/CyberAgentHack/web-speed-hackathon-2021)
- [https://webpack.js.org/plugins/provide-plugin/](https://webpack.js.org/plugins/provide-plugin/)

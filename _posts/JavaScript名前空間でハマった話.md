---
title: JavaScript名前空間でハマった話
date: '2021-12-30'
layout: layouts/post.njk
scheduled: '2021-12-30'
---

ハマったポイントとその解決策を書く。

### ハマったポイント

なぜ②の箇所で変数`audio`にアクセスできてしまうの？？？？

```javascript
const init = () => {

  const upload_file = document.getElementById('uploadedFile');
  const audio = document.getElementById('audio');

  upload_file.addEventListener('change', (e) => {
    audio.src = URL.createObjectURL(e.target.files[0]);

    console.log(audio); // ①
    audio.load();
    audio.play();
    draw();
  });
}

const draw = () => {
  console.log(audio); // ②
}

window.onload = init();

```

output例
```html
<audio id="audio" controls="" src="blob:http://localhost:8080/b691c70c-4570-4659-97d3-45577d80ec21"></audio>
<audio id="audio" controls="" src="blob:http://localhost:8080/b691c70c-4570-4659-97d3-45577d80ec21"></audio>
```


### 起こっていたこと
ググったらすぐに出てきた。
> タイトルの通りなんですが, HTML の DOM に指定した id はすべて同じ変数名としてグローバル変数に格納されます.
参考: [https://zenn.dev/phi/articles/javascript-tips-dom-id-global](https://zenn.dev/phi/articles/javascript-tips-dom-id-global)


```javascript
const init = () => {

  const upload_file = document.getElementById('uploadedFile');
  const audio2 = document.getElementById('audio');

  upload_file.addEventListener('change', (e) => {
    audio2.src = URL.createObjectURL(e.target.files[0]);

    console.log(audio); // ①
    audio2.load();
    audio2.play();
    draw();
  });
}

const draw = () => {
  console.log(audio);
  console.log(audio2); // ②
}

window.onload = init();
```
output例
```bash
script.js:40 <audio id=​"audio" controls src=​"blob:​http:​/​/​localhost:​8080/​b337de48-6ba2-459b-a022-d56dae3da9d3">​…​</audio>​
script.js:41 Uncaught ReferenceError: audio2 is not defined
    at draw (script.js:41)
    at HTMLInputElement.<anonymous> (script.js:30)
draw @ script.js:41
```



### 解決案

idは慎重に名付けしよう。


### 周辺用語
- グローバル変数
- DOM


### 参考文献
- [https://zenn.dev/phi/articles/javascript-tips-dom-id-global](https://zenn.dev/phi/articles/javascript-tips-dom-id-global)

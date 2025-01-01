// デプロイ時のビルド用にタイムアウトを設定する
let timer = setTimeout(() => {
  console.log('Timeout!')
}, 20000)

export { timer }

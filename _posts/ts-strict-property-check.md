---
title: TypeScriptでオブジェクトのプロパティをチェックしたい時の解決方法2選
description: オブジェクトのプロパティを検査したい時の解決策を2つ紹介
date: '2023-05-26'
tag:
  - TypeScript
---

### TL;DR
個人的推しは2個目のこっち。
```ts
type Impossible<K extends keyof any> = {
  [P in K]: never;
};

type NoExtraProperties<T, U extends T = T> = U & Impossible<Exclude<keyof U, keyof T>>;
```

### 解決したい事象
次のようなコードはTypeScriptではエラーになりません。
```ts
interface User {
  name: string
  email: string
}
const user = {
  name: 'John',
  email: 'john@sample.example',
  password: 'password'
}

// passwordは型定義にはない
function checkUser(input: User): boolean {
  return !!input.name && !!input.email
}
checkUser(user)
```

これでは必要のないpasswordというプロパティも取り回してしまい、不都合がある場合もあります。


### 解決策
stack overflowでは次の2019年に投稿された2つの解決策が支持を得ていました。

#### 解決策1
```ts
type StrictPropertyCheck<T, TExpected, TError> = Exclude<keyof T, keyof TExpected> extends never ? {} : TError;
```
これを先ほどの例に当てはめれると次のようになります。
```ts
function checkUser<T extends User>(
  input: T & StrictPropertyCheck<T, User, 'MyError'>
): boolean {
  return !!input.name && !!input.email
}
checkUser(user)
```

```jsstacktrace
型 '{ name: string; email: string; password: string; }' の引数を型 '{ name: string; email: string; password: string; } & "MyError"' のパラメーターに割り当てることはできません。
  型 '{ name: string; email: string; password: string; }' を型 '"MyError"' に割り当てることはできません。ts(2345)
```


#### 解決策2
```ts
type Impossible<K extends keyof any> = {
  [P in K]: never;
};

type NoExtraProperties<T, U extends T = T> = U & Impossible<Exclude<keyof U, keyof T>>;
```
例は以下
```ts
function checkUser<T extends User>(input: NoExtraProperties<User, T>): boolean {
  return !!input.name && !!input.email
}
checkUser(user)
```
```jsstacktrace
型 '{ name: string; email: string; password: string; }' の引数を型 'NoExtraProperties<User, { name: string; email: string; password: string; }>' のパラメーターに割り当てることはできません。
  型 '{ name: string; email: string; password: string; }' を型 'Impossible<"password">' に割り当てることはできません。
    プロパティ 'password' の型に互換性がありません。
      型 'string' を型 'never' に割り当てることはできません。ts(2345)
```
どのプロパティがエラーとなるのかがわかりやすい点と利用するときの記述の簡単さが推しポイントです。  
その代わり、Impossibleの使い道が他に思いつかない点が少し気がかりです。  
コチラの方が個人的には好みです。  


### 参考文献
- [Forcing excess-property checking on variable passed to TypeScript function - Stack Overflow](https://stackoverflow.com/questions/54775790/forcing-excess-property-checking-on-variable-passed-to-typescript-function)
- [Is it possible to restrict TypeScript object to contain only properties defined by its class? - Stack Overflow](https://stackoverflow.com/questions/49580725/is-it-possible-to-restrict-typescript-object-to-contain-only-properties-defined)
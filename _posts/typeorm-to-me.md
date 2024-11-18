---
title: 私が知ってるTypeORMについて、またはPrismaとの比較
description: TypeORMに対して私が思ったこと
date: '2024-11-19'
tag:
  - JavaScript
  - TypeScript
---

## はじめに
私はTypeORMについてかなりネガティブ寄り
な意見を持っています。  
これはTypeScript環境でのORMは[Prisma](https://www.prisma.io/)が1強とされる2023年、そんな時期に”Tier2以下”とされるORMを使うことを強いられたからにほかならないと思いますが、その”Tier2以下”から見える景色というのは貴重だという思いで、自分から見えた景色を書いていきます。  
ORMの厳密な定義はわかりませんが、ORMかそうじゃないかという論争をたまに見かけます。自分には判断がつかないのでTypeORMやPrismaによき期待される層のことを総称してORMとこの記事の中では呼びます。  

## ここがだめだよTypeORM
### 型が取り出しづらい
まずTypeORMのテーブル定義はClassとデコレータで行われます。
```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ database: "secondDB" })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string
}
```

リレーションの記述もこれに従います。  

```ts
@Entity({ database: "secondDB" })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @OneToMany(() => Photo, (photo) => photo.user)
    photos: Photo[]
}
```

次にUserテーブルから条件に一致するデータを取り出すときはこう書きます。
```ts
userRepository.find({
      where: {
        firstName: "Timber",
        lastName: "Saw",
    },
})
```
ここにもうTypeORMの嫌なところが顔を出します。  
上のコードの返り値からPromiseを解決させると`Userインスタンス`が現れます。  
つまり、この型には`{ photos: Photo[] }`が含まれています。もちろん実行結果にはphotosは含まれず、relation先も含めて取得する場合はそれ用のオプションがあります。  
最悪ですね。  
  
対応作はもちろんあって、元のUserからOmitしたものをベースに使用し、オプション次第で自分たちで型を組み立てるということもできるわけですが、二度手間です。Prismaならここらもうまくやってくれます。  

ちなみに[クエリビルダ](https://typeorm.io/update-query-builder)として使っても一緒です。（Prismaは最近クエリビルダでSQLを書いたらそのSQLに応じた型を提供してくれるようになったというニュースを最近みました。実際にまだ使ってないのでどの程度のものなにかは知りません。）  

### いまだにメジャーバージョンがリリースされてない

TypeORMの名前はよく聞くかと思いますが、実はまだv0.3あたりで、数年前にでました。それまでv0.1やv0.2です。  
0.2から0.3で破壊的な変更も入っています。  

## 個人的な所感
TypeORMはTypeScriptバックエンドの初期を担ったツールという印象で、今ではもう時代遅れだと感じます。  
その理由は自分の中で明確で、テーブル定義もTypeScriptで行おうとした点にあると思っています。  
リレーショナルデータベースでよく使う機能に限って言っても、デコレータは使わないシンプルなTypeScriptの表現力でカバーしきれていません。そこを近道的にクラスとデコレータで表現をしたため行き詰まり、Prismaにその座を奪われたという印象です。PrismaはDSLですしね。  
ソフトウェアの栄枯盛衰のサイクルについて学びがあったような、なかったような気がします。  
素直に時代にあった選択肢を選択しよう。  


### 参考文献
- [Prisma | Simplify working and interacting with databases ](https://www.prisma.io/)
- [Update using Query Builder | TypeORM](https://typeorm.io/update-query-builder)

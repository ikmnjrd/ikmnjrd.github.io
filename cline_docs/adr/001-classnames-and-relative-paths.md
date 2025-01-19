# ADR-001: classnames パッケージの採用と相対パスの使用規約

## ステータス

承認

## コンテキスト

- React コンポーネントで複数のクラス名を条件付きで適用する際、文字列連結やテンプレートリテラルを使用していた
- CSS Modules と通常のクラス名を組み合わせる際の可読性が低かった
- ファイル間の import 文で相対パスの使用方法が統一されていなかった

## 決定

### classnames パッケージの採用

- classnames パッケージを導入し、以下のパターンで使用する:

  ```typescript
  // 基本的な使用方法
  className={classNames('base-class', {
    'conditional-class': condition
  })}

  // CSS Modules との組み合わせ
  className={classNames(
    styles.baseClass,
    styles.additionalClass
  )}
  ```

### 相対パスの使用規約

- src/ ディレクトリ配下のファイルインポートは以下の規則に従う:
  1. 同一ディレクトリ内: `./component`
  2. 子ディレクトリ: `./subdirectory/component`
  3. 親ディレクトリ: `../parentDirectory/component`
  4. 共通モジュール（utils, hooks など）: `@/utils/helper` （tsconfig.json でパスエイリアスを設定）

## 代替案

### classnames の代替案

1. テンプレートリテラル

   ```typescript
   className={`base-class ${condition ? 'active' : ''}`}
   ```

   - 欠点: 条件が複雑になると可読性が低下
   - 欠点: 空白文字の制御が難しい

2. 配列と join
   ```typescript
   className={[
     'base-class',
     condition && 'active'
   ].filter(Boolean).join(' ')}
   ```
   - 欠点: 冗長な記述が必要
   - 欠点: パフォーマンスへの影響

### 相対パスの代替案

1. すべて絶対パスを使用

   - 欠点: インポート文が長くなる
   - 欠点: ファイル移動時の変更範囲が大きくなる

2. すべてエイリアスパスを使用
   - 欠点: 設定が複雑になる
   - 欠点: IDE の自動インポート機能との相性が悪い場合がある

## 影響

### 技術的な影響

- コードの可読性と保守性が向上
- バンドルサイズが微増（classnames パッケージの追加）
- IDE のコード補完やリファクタリング機能との親和性が向上

### プロジェクトへの影響

- 新規コンポーネント作成時のボイラープレートが標準化
- チーム内でのコードレビューが効率化
- 新規参画者の学習コストが低減

## 関連事項

- [classnames パッケージ](https://www.npmjs.com/package/classnames)
- [TypeScript Path Aliases](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)

## 備考

- ESLint ルールで相対パスの使用規約を強制することを検討
- classnames の型定義を活用し、TypeScript との親和性を高める

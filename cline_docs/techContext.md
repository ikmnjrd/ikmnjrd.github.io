# 技術コンテキスト

## 技術スタック

### フロントエンド

- Next.js (^14.1.3)
- React (^18.2.0)
- TypeScript (^4.8.3)
- Tailwind CSS (^3.1.8)

### コンテンツ管理

- gray-matter: マークダウンのフロントマター解析
- markdown-it: マークダウンの HTML 変換
- markdown-it-prism: シンタックスハイライト
- minisearch: 全文検索エンジン

### データ可視化

- d3 (^7.6.1)
- d3-sankey (^0.12.3)

### ユーティリティ

- dayjs: 日付処理
- sharp: 画像最適化
- swr: データフェッチング
- feed: RSS フィード生成

## 開発環境

### Node.js

- バージョン: 20.3.0 (Volta で管理)

### パッケージマネージャー

- npm

### ビルドツール

- npm-run-all: 複数のスクリプト実行
- tsx: TypeScript の実行
- rimraf: クロスプラットフォームの rm -rf

### コード品質

- ESLint
  - @typescript-eslint
  - eslint-config-next
  - eslint-config-prettier
- Prettier
- husky: Git フック
- lint-staged: ステージングファイルの Lint
- commitlint: コミットメッセージの Lint

### テスト

- Jest (^29.0.2)
- React Testing Library
- jest-environment-jsdom

### タスクランナー

```json
{
  "dev": "Next.js 開発サーバー + CSS Modules 監視",
  "build": "サイトマップ、RSS、検索インデックス生成 + Next.js ビルド",
  "test": "Jest によるテスト実行",
  "typecheck": "TypeScript の型チェック"
}
```

## 技術的制約

### パフォーマンス要件

- 静的サイト生成 (SSG) の活用
- 画像の最適化必須
- First Contentful Paint の最適化

### ブラウザサポート

- モダンブラウザ
- レスポンシブデザイン対応

### セキュリティ要件

- 依存関係の定期的な更新
- セキュリティ監査の実施
- Content Security Policy の実装

### アクセシビリティ

- WCAG ガイドラインへの準拠
- スクリーンリーダー対応
- キーボードナビゲーション対応

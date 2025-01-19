# 進捗状況

## 完了した作業

### Tailwind から CSS Modules への移行（進行中）

1. コンポーネントの移行

   - DarkModeButton、Header、Modal、Pagination、Footer、SankeyChart、Outline、Minisearch の移行完了
   - Post コンポーネントを新規に CSS Modules 化

2. ページの移行

   - index.tsx、about.tsx、tag/[tag].tsx の移行完了
   - blog/[slug].tsx のスタイルを改善
     - article.module.css の@apply ディレクティブを通常の CSS に変換
     - classnames モジュールを使用してクラス結合を整理

3. 共通スタイルの整備
   - variables.css でプロジェクト全体の変数を定義
   - base.module.css で共通のページレイアウトを定義

### 以前の作業

- パスエイリアスを相対パスに変更
  - すべてのファイルで `~/` で始まるパスエイリアスを相対パスに変更
  - プロジェクト全体でパスエイリアスの使用がないことを確認
  - 影響を受けた 14 のファイルすべての修正を完了

## 今後の作業

1. CSS Modules 移行の続き

   - Minisearch コンポーネントの確認と更新
   - \_document.tsx のダークモード対応の検討
   - globals.css の Tailwind ディレクティブ削除（後日）

2. 品質確認
   - 変更したファイルのテスト実行
   - 開発サーバーでの動作確認
   - レスポンシブデザインの確認

## 保留中の作業

- globals.css からの Tailwind ディレクティブ削除
  - コンポーネントの CSS Modules 化を優先
  - 必要なリセット CSS とグローバルスタイルの整理は後日実施

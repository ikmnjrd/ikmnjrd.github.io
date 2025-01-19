# 現在の作業内容

パスエイリアスを相対パスに変更する作業を完了しました。

## 変更したファイル

1. src/components/Footer.tsx
2. src/pages/\_app.tsx
3. src/pages/index.tsx
4. src/pages/about.tsx
5. src/components/Header.tsx
6. src/components/SankeyChart.tsx
7. src/components/DarkModeButton.tsx
8. src/hooks/useWindowSize.ts
9. src/scripts/rss.ts
10. src/scripts/search-json.ts
11. src/pages/tag/[tag].tsx
12. src/pages/tags.tsx
13. src/pages/blog/[slug].tsx
14. src/components/Outline.tsx

## 変更内容

- すべてのファイルで `~/` で始まるパスエイリアスを相対パスに変更
- 各ファイルの場所に応じて適切な相対パスを設定（例：`../components/`, `./Component`など）
- プロジェクト全体で残りのパスエイリアスがないことを確認済み

## 次のステップ

- 変更したファイルのテストを実行
- 開発サーバーで動作確認
- 必要に応じて tsconfig.json のパス設定の見直し

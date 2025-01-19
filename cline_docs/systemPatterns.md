# システムパターン

## アーキテクチャパターン

### ディレクトリ構造

```
/
├── _posts/          # マークダウン記事
│   └── draft/      # 下書き記事
├── public/          # 静的ファイル
│   └── images/     # 画像ファイル
└── src/            # ソースコード
    ├── components/ # Reactコンポーネント
    ├── hooks/      # カスタムフック
    ├── pages/      # Next.jsページ
    ├── scripts/    # ユーティリティスクリプト
    ├── styles/     # スタイルシート
    └── utils/      # ユーティリティ関数
```

### コンポーネント設計

- Atomic Design パターンを採用
- コンポーネントは機能ごとに分割
- Props の型定義を厳密に行う
- CSS Modules または Tailwind CSS でスタイリング
  - 新しく着手するものは CSS modules を使用する
  - ただし、`composes: xxx from global`の構文は使わない
- classnames パッケージを使用したクラス名の管理

  ```typescript
  // 条件付きクラス
  className={classNames('base-class', {
    'conditional-class': condition
  })}

  // CSS Modules
  className={classNames(
    styles.baseClass,
    styles.additionalClass
  )}
  ```

### インポートパス規約

- src/ ディレクトリ配下のファイルインポートは以下の規則に従う:
  1. 同一ディレクトリ内: `./component`
  2. 子ディレクトリ: `./subdirectory/component`
  3. 親ディレクトリ: `../parentDirectory/component`
- 詳細は ADR-001 を参照

### データフロー

1. マークダウンファイル処理

   - ファイルシステムから記事を読み込み
   - frontmatter でメタデータを管理
   - マークダウンを HTML に変換

2. 検索機能

   - Minisearch による全文検索
   - タグベースのフィルタリング

3. 画像最適化
   - Next.js Image コンポーネントの活用
   - 画像の自動最適化
   - WebP フォーマットの利用

### パフォーマンス最適化

- 静的サイト生成 (SSG) の活用
- 画像の遅延読み込み
- コンポーネントの動的インポート
- キャッシュ戦略の実装

### テストパターン

1. ユニットテスト

   - コンポーネントのレンダリングテスト
   - ユーティリティ関数のテスト
   - カスタムフックのテスト

2. インテグレーションテスト
   - ページ単位のテスト
   - データフローのテスト

### エラーハンドリング

- 型チェックによるエラー防止
- エラー境界の実装
- ユーザーフレンドリーなエラー表示
- デバッグ情報のログ記録

### セキュリティ対策

- ESLint セキュリティプラグインの使用
- 依存関係の定期的な更新
- Content Security Policy の実装
- XSS 対策の実施

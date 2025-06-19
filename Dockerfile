# ベースイメージとして公式 Node.js LTS（Alpine 版）を使用
FROM node:20-alpine AS base

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係インストールに必要なファイルのみを先にコピーしてレイヤーキャッシュを活用
COPY package.json pnpm-lock.yaml ./

# pnpm をグローバルインストール
RUN npm install -g pnpm

# 依存関係をインストール
RUN pnpm install --frozen-lockfile

# ソースコードをコピー
COPY . .

# Vite 開発サーバーのデフォルトポート
EXPOSE 5173

# コンテナ起動時に Vite 開発サーバーを 0.0.0.0 で公開
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 
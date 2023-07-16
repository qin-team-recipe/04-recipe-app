「一流レシピ」のアプリケーションのリポジトリです。

- [Figma](https://www.figma.com/file/JSVMGHBeYzAsmujXjPDwAE/%E4%B8%80%E6%B5%81%E3%83%AC%E3%82%B7%E3%83%94?type=design&node-id=0-1&t=hEktBgwhQUvdsL3W-0)
- [Notion](https://www.notion.so/natsumih/Qin-Recipe-App-36e3e4c062cf4a4dbf05234affbfba42)

## 環境構築

```bash
cp .env.example .env

# パッケージのインストール
yarn install

# データベースを起動する
docker compose up
```

```bash
# データベースのマイグレーションを実行する
DB=dev yarn prisma migrate dev

# アプリケーションを起動する
yarn run dev
```

[http://localhost:3000](http://localhost:3000)でアプリケーションを確認できます。

## TIPS

### シーダーを実行する方法

```bash
# すべてのシーダーを実行する
DB=dev yarn prisma db seed

# 特定のシーダーを実行する（関数名 = キャメルケースで指定する）
DB=dev yarn prisma db seed chefSeeder
```

### APIの動作確認をする方法

tRPCはHTTPベースのRPCなので、curlやPostmanから実行することができます。APIのエンドポイントは、`localhost:3000/api/trpc/{プロシージャ名}`です。

実行方法の詳細は、下記のドキュメントを参照してください。

- [HTTP RPC Specification | tRPC](https://trpc.io/docs/v9/rpc)
- [【小ネタ】tRPCのAPIをPostmanで実行する方法](https://zenn.dev/tekihei2317/articles/e9eb843eb728a9)

### PlanetScaleに対してマイグレーションを実行する方法

まず、PlanetScaleのコンソールからmainブランチの接続URLを取得して、.envの`DATABASE_URL`に設定します。

```text
DATABASE_URL=<取得したURL>
```

設定したら、次のコマンドでマイグレーションを実行します。

```bash
yarn prisma migrate deploy
```

マイグレーションを実行したら、ローカルでの開発中に間違って接続しないように`DATABASE_URL`はコメントアウトします。

ドキュメントでは、PlanetScaleに開発用のブランチを作成して、デプロイリクエストでスキーマの変更を反映する方法が推奨されています。

しかし、次の理由から開発中はmainブランチに対して直接`prisma migrate deploy`を実行することにしました。

- ブランチを作成してからデプロイするまでの手間がかかるため
- ローカル開発ではDockerのMySQLコンテナを使用したかったため

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

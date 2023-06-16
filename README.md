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

### シーダーを実行する

```bash
# すべてのシーダーを実行する
yarn prisma db seed

# 特定のシーダーを実行する（関数名 = キャメルケースで指定する）
yarn prisma db seed chefSeeder
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

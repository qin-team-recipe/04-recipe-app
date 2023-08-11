「一流レシピ」のアプリケーションのリポジトリです。

- [Figma](https://www.figma.com/file/JSVMGHBeYzAsmujXjPDwAE/%E4%B8%80%E6%B5%81%E3%83%AC%E3%82%B7%E3%83%94?type=design&node-id=0-1&t=hEktBgwhQUvdsL3W-0)
- [Notion](https://www.notion.so/natsumih/Qin-Recipe-App-36e3e4c062cf4a4dbf05234affbfba42)

## 環境構築

```bash
cp .env.example .env
```

`.env`で空欄になっている箇所は、[環境変数に設定するシークレット情報](https://www.notion.so/150cad500ab94c23bbd87c01542dae5a)の内容を入力します。

```bash
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

## その他

- [server/README.md](./server/README.md)

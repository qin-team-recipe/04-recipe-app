# server

`server`ディレクトリには、tRPCで作成しているAPIのコードを入れています。

## 主なライブラリ

- tRPC
  - https://trpc.io/docs/server/introduction
- Prisma
  - https://www.prisma.io/docs

## データベース設計について

エンティティとリレーションシップを、Miroでざっくり設計しています。

https://miro.com/app/board/o9J_laecEvw=/

データベース設計の経緯については、次のDicsussionにも少し書かれています。

[シェフ・レシピ機能のデータベースの設計（案） · qin-team-recipe/04-recipe-app · Discussion #6](https://github.com/qin-team-recipe/04-recipe-app/discussions/6)

## ディレクトリ構成について

トップレベルには次のディレクトリがあります。

- `trpc`
- `database`
- `utils`
- `_auth`、`_chef-recipe`、`_follow-favorite`、...

`_auth`、`_chef-recipe`などの`_`から始まるディレクトリは、機能を表すディレクトリ（移行、機能ディレクトリ）です。機能の依存関係を考慮して、次のように大まかにグルーピングしています。

| ディレクトリ       | 機能                             |
| ------------------ | -------------------------------- |
| `_auth`            | 認証に関する機能                 |
| `_chef-recipe`     | シェフとレシピに関する機能       |
| `_follow-favorite` | フォロー・お気に入りに関する機能 |
| `_my-recipe`       | マイレシピに関する機能           |
| `_shopping-list`   | 買い物リストに関する機能         |

### 機能ディレクトリについて

機能ディレクトリは、次のような構造になっています。機能ディレクトリに共通して存在するファイルは、`router.ts`、`api-schema.ts`、APIエンドポイントのファイルの3種類です。

```text
$ tree server/_chef-recipe
server/_chef-recipe
├── api-schema.ts
├── get-chef.ts
├── get-chefs.ts
├── get-recipe.ts
├── get-recipes.ts
├── recipe-util.ts
└── router.ts
```

`router.ts`にはAPIのルーティング、`api-schema`にはAPIの入力のバリデーション用のzodのスキーマを書いています。

APIエンドポイントのファイルは、`get-chefs.ts`や`get-recipes`のようなファイルです。これらのファイルには、tRPCのプロシージャを書いています。

新しくAPIエンドポイントを追加する場合は、`get-*.ts`や`create-*.ts`のようなファイルを作って、tRPCのプロシージャを記述してから、`router.ts`にルーティングを追加してください。

## TIPS

### ブラウザでデータベースの中身を確認する方法

Prisma Studioで確認できます。

```bash
DB=dev yarn prisma studio
```

### シーダーを実行する方法

```bash
# すべてのシーダーを実行する
DB=dev yarn prisma db seed

# 特定のシーダーを実行する（シーダーは、関数名 = キャメルケースで指定する）
DB=dev yarn prisma db seed chefSeeder
```

すべてのデータを削除してシーダーを実行し直す場合は、次のコマンドを実行してください。

```bash
DB=dev yarn prisma migrate reset
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

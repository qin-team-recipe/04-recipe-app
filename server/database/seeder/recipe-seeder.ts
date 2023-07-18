import { prisma } from "../prisma";

type RecipeData = {
  name: string;
  yields: number;
  description: string;
  imageId: string;
  ingredients: string[];
  processes: string[];
};

const recipes: RecipeData[] = [
  {
    name: "グラタン",
    yields: 2,
    description:
      "はじめてでも失敗なく作れるような、鶏肉や玉ねぎを具とした基本的なマカロニグラタンのレシピです。ソースと具材炒めを別器具で行うレシピも多いですが、グラタンの具を炒めたフライパンの中で、そのままホワイトソースを仕上げる手軽な作り方にしています。ぜひお試しください。",
    imageId: "tomoyo-s-kBjeHBwyJ_Q-unsplash_rxvpym",
    ingredients: ["鶏肉 200g", "玉ねぎ 1個", "油 大さじ1", "ホワイトソース 300ml", "チーズ 適量"],
    processes: [
      "鶏肉を適当な大きさに切ります。",
      "玉ねぎをみじん切りにします。",
      "フライパンに油を熱し、鶏肉を炒めます。",
      "玉ねぎを加えて炒めます。",
      "鶏肉と玉ねぎが煮えたら、火を止めます。",
      "耐熱容器に鶏肉と玉ねぎを入れ、ホワイトソースを注ぎます。",
      "表面にチーズを散らし、オーブンで焼きます。",
      "チーズが溶けてこんがりとした色になったら、完成です。",
    ],
  },
  {
    name: "具だくさんチキンカレー",
    yields: 4,
    description: "スパイシーで香り豊かなカレーです。",
    imageId: "recipeapp/recipeImages/RecipeImage-6_mid6ka",
    ingredients: ["玉ねぎ 1個", "鶏肉 300g", "油 大さじ2", "カレールー 100g", "水 500ml", "じゃがいも 2個", "人参 1本"],
    processes: [
      "玉ねぎをみじん切りにします。",
      "鍋に油を熱し、玉ねぎを炒めます。",
      "鶏肉を加えて炒めます。",
      "鶏肉に火が通ったら、カレールーを加えます。",
      "水を加えて煮込みます。",
      "じゃがいもと人参を加えて煮込みます。",
      "具材が柔らかくなったら、火を止めます。",
      "ご飯と一緒に盛り付けて、完成です。",
    ],
  },
  {
    name: "カレースープ",
    yields: 2,
    description: "",
    imageId: "monika-grabkowska-_y6A9bhILkM-unsplash_nht8aj",
    ingredients: [],
    processes: [],
  },
  {
    name: "デミグラスソースのハンバーグ",
    yields: 2,
    description: "ご飯に合う、本格的なデミグラスソースのハンバーグです。",
    imageId: "alex-munsell-auIbTAcSH6E-unsplash_iqrloe",
    ingredients: [],
    processes: [],
  },
  {
    name: "ペンネ・アラビアータ",
    yields: 2,
    description: "辛いソースをペンネにたっぷりからめたパスタです。",
    imageId: "aleksandra-tanasiienko-0y6eMd8vevA-unsplash_ztov1v",
    ingredients: [],
    processes: [],
  },
  {
    name: "本格ミートソースパスタ",
    yields: 2,
    description: "とびっきりの本格ソースをおうちでも。",
    imageId: "danijela-prijovic-qits91IZv1o-unsplash_ipi145",
    ingredients: [],
    processes: [],
  },
  {
    name: "ベーコンのクリームパスタ",
    yields: 2,
    description: "ベーコンの旨みがたっぷり染み出たクリームパスタです",
    imageId: "bruna-branco-t8hTmte4O_g-unsplash_m7ltba",
    ingredients: [],
    processes: [],
  },
  {
    name: "鶏肉のバター炒め",
    yields: 2,
    description: "カリっと炒めた鶏肉をバターじょうゆで味付けします。",
    imageId: "farhad-ibrahimzade-KpOl9jV2aJM-unsplash_ullonj",
    ingredients: [],
    processes: [],
  },
  {
    name: "かんたんバナナのパンケーキ",
    yields: 2,
    description: "ふわふわのパンケーキです",
    imageId: "estudio-bloom-2o7nA--TUXc-unsplash_zfradi",
    ingredients: [],
    processes: [],
  },
  {
    name: "カリッと餃子",
    yields: 2,
    description: "この焼き方ならカリカリ & モチモチな餃子が上手に焼けます",
    imageId: "chester-toh-USXMYHubRtA-unsplash_mvhkmd",
    ingredients: [],
    processes: [],
  },
  {
    name: "チーズバーガー",
    yields: 2,
    description: "まろやかでクリーミーなチーズと香ばしく焼き上げたビーフパティが楽しめます",
    imageId: "eiliv-aceron-pu6b4yIlQF4-unsplash_v6nie6",
    ingredients: [],
    processes: [],
  },
  {
    name: "チキンナゲット",
    yields: 2,
    description: "外はカリッと、中はジュワッと。",
    imageId: "karolina-kolodziejczak-tW1kii3cwdc-unsplash_af4a78",
    ingredients: [],
    processes: [],
  },
  {
    name: "野菜炒め",
    yields: 2,
    description: "シンプルな野菜炒めです。",
    imageId: "yang-louie-3d9T6IawX0w-unsplash_dtjr9j",
    ingredients: [],
    processes: [],
  },
  {
    name: "お家でかんたんタコス",
    yields: 2,
    description: "スパイシーで美味しいです。",
    imageId: "the-nix-company-61wG5-SAF_Y-unsplash_cmqhef",
    ingredients: [],
    processes: [],
  },
];

export async function recipeSeeder() {
  const chef = await prisma.chef.findFirstOrThrow();

  await prisma.chef.update({
    where: {
      id: chef.id,
    },
    data: {
      recipes: {
        create: recipes.map((recipe) => ({
          recipe: {
            create: {
              name: recipe.name,
              yields: recipe.yields,
              description: recipe.description,
              images: {
                createMany: {
                  data: [{ imageId: recipe.imageId }],
                },
              },
              ingredients: {
                createMany: {
                  data: recipe.ingredients.map((ingredient) => ({
                    title: ingredient,
                    description: "",
                  })),
                },
              },
              processes: {
                createMany: {
                  data: recipe.processes.map((process, index) => ({
                    order: index + 1,
                    title: process,
                    description: "",
                  })),
                },
              },
            },
          },
        })),
      },
    },
  });
}

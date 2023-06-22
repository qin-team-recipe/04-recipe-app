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
    imageId: "recipeapp/recipeImages/RecipeImage-4_d7ooyb",
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
    name: "カレー",
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

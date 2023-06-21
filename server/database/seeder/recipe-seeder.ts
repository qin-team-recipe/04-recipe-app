import { ImageResponse } from "next/server";
import { prisma } from "../prisma";

export async function recipeSeeder() {
  const chef = await prisma.chef.findFirstOrThrow()
  // レシピを登録する
  await prisma.chef.update({
    where: {
      id: chef.id,
    },
    data:{
      recipes:{
        create: [
          {
            recipe: {
              create: {
                name:"グラタン",
                yields:2,
                description:"はじめてでも失敗なく作れるような、鶏肉や玉ねぎを具とした基本的なマカロニグラタンのレシピです。ソースと具材炒めを別器具で行うレシピも多いですが、グラタンの具を炒めたフライパンの中で、そのままホワイトソースを仕上げる手軽な作り方にしています。ぜひお試しください。",
                images:{
                  createMany:{
                    data: [{ imageId: 'recipeapp/recipeImages/RecipeImage-4_d7ooyb'}]
                  }
                }
              }
          }}
        ]
      }
    }
  })
}

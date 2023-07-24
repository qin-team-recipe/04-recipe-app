import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc/init-trpc";
import { RegistrationMyRecipeInput } from "./api-schema";

/**
 * マイレシピを新規登録する
 */
export const registrationMyRecipe = protectedProcedure
  .input(RegistrationMyRecipeInput)
  .mutation(async ({ ctx, input }) => {
    //TODObase64→画像への変換処理
    //TODOCloudinaryへの登録処理
    // const imageUrls[]=["http://image1","http://image3","http://image3"]
    //TODO渡されたＪＳＯＮをもとにrecipeテーブルとマイレシピテーブルと、画像、材料、作り方、リンクに登録処理？
    // return await ctx.prisma.recipe.create({
    //     data: {
    //         name: input.name,
    //         ingredients:{
    //             createMany:{
    //                 data:[{title:"test"}]
    //             }
    //         },
    //         yields:input.yields,
    //         processes:{
    //             createMany:{
    //                 data:[{title:"test"}]
    //             }
    //         },
    //         images:{
    //             createMany:{
    //                 data:[imageUrls]
    //             }
    //         },
    //         description:input.description,
    //         links:{
    //             createMany:{
    //                 data:[{title:"test"}]
    //             }
    //         },
    //     },
    // });
  });

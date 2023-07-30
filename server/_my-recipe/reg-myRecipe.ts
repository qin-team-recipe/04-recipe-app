import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc/init-trpc";
import { RegistrationMyRecipeInput } from "./api-schema";
import { base64ToImage } from "./utils";
import * as cloudinary from "cloudinary";
import * as path from "path";
import * as fs from "fs";

/**
 * マイレシピを新規登録する
 */
export const registrationMyRecipe = protectedProcedure
  .input(RegistrationMyRecipeInput)
  .mutation(async ({ ctx, input }) => {
    //TODObase64→画像への変換処理
    let imageNum = 1;
    for (const image of input.images) {
      // Base64データ
      const base64Data = image;
      // 画像に変換してファイルに保存
      imageNum++;
      base64ToImage(base64Data, `./images/image_${imageNum}`);
    }

    //TODOCloudinaryへの登録処理

    // Cloudinaryの設定
    cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    async function uploadImageToCloudinary(localImagePath: string) {
      try {
        const result = await cloudinary.v2.uploader.upload(localImagePath, {
          folder: "./iamges", 
        });

        console.log("公開URL:", result.secure_url);
      } catch (error) {
        console.error("エラー", error);
      }
    }

    // ローカルの画像フォルダパス
    const localImageFolderPath = path.join(__dirname, "path/to/your/local/folder");

    fs.readdir(localImageFolderPath, (err, files) => {
      if (err) {
        console.error("フォルダの読み込み中にエラーが発生しました。", err);
        return;
      }

      files.forEach((file) => {
        const localImagePath = path.join(localImageFolderPath, file);
        uploadImageToCloudinary(localImagePath);
      });
    });

    const imageUrls[]=["http://image1","http://image3","http://image3"]
    //TODO渡されたＪＳＯＮをもとにrecipeテーブルとマイレシピテーブルと、画像、材料、作り方、リンクに登録処理？
    return await ctx.prisma.recipe.create({
        data: {
            name: input.name,
            ingredients:{
                createMany:{
                    data:[{title:"test"}]
                }
            },
            yields:input.yields,
            processes:{
                createMany:{
                    data:[{title:"test"}]
                }
            },
            images:{
                createMany:{
                    data:[imageUrls]
                }
            },
            description:input.description,
            links:{
                createMany:{
                    data:[{title:"test"}]
                }
            },
        },
    });
  });

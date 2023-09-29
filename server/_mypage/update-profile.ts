import { protectedProcedure } from "../trpc/init-trpc";
import { MypageInput } from "./api-schema";
import { deleteImageInCloudinary, uploadImageToCloudinary } from "../utils/cloudinary";

/**
 * マイページの情報を更新する
 */
export const updateProfile = protectedProcedure.input(MypageInput).mutation(async ({ ctx, input }) => {
  const user = await ctx.prisma.user.findUniqueOrThrow({
    where: {
      id: ctx.user.userId,
    },
    select: {
      imageId: true,
      url: true,
    },
  });

  // cloudinaryの画像を更新
  if (user.imageId) {
    await deleteImageInCloudinary(user.imageId);
  }
  let imageId = "";
  if (input.profileImage && input.profileImage !== "") {
    imageId = await uploadImageToCloudinary(input.profileImage ?? "");
  }

  const userUpdate = await ctx.prisma.user.update({
    where: {
      id: ctx.user.userId,
    },
    data: {
      name: input.nickname,
      biography: input.biography,
      url: {
        createMany: {
          data: input.multiInputItems?.filter((url) => !url.id)?.map((item) => ({ url: item.value })) ?? [],
        },
        updateMany: input.multiInputItems
          ?.filter((item) => item.id)
          ?.map((url) => ({
            where: { id: url!.id },
            data: { url: url?.value },
          })),
        deleteMany:
          user.url
            ?.filter((item) => input.multiInputItems?.every((it) => it.id !== item.id))
            ?.map((url) => ({ id: url.id })) ?? [],
      },
      imageId: imageId ?? "",
    },
    include: {
      url: true,
    },
  });

  return {
    id: userUpdate.id,
    nickname: userUpdate.name,
    biography: userUpdate.biography,
    multiInputItems: userUpdate.url,
    profileImage: userUpdate.image,
    imageId: userUpdate.imageId,
  };
});

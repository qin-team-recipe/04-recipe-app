import { getImageUrl } from "../utils/cloudinary";

/**
 * レシピの配列から、最初のレシピのURLを取得する
 */
export function getRecipeImageUrlFromImages(images: { imageId: string }[]): string | null {
  const image = images[0];
  if (image === undefined) return null;
  return getImageUrl(image.imageId);
}

/**
 * レシピの作成者を取得する
 */
export function getRecipeAuthor({
  chef,
  user,
}: {
  chef: { id: string; displayName: string } | null;
  user: { id: string; name: string } | null;
}): { id: string; displayName: string } | null {
  if (chef !== null) {
    // シェフのレシピの場合
    return { id: chef.id, displayName: chef.displayName };
  }
  if (user !== null) {
    // 一般ユーザーのレシピの場合
    return { id: user.id, displayName: user.name };
  }
  return null;
}

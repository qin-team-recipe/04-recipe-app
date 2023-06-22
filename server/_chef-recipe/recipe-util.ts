import { getImageUrl } from "../utils/cloudinary";

/**
 * レシピの配列から、最初のレシピのURLを取得する
 */
export function getRecipeImageUrlFromImages(images: { imageId: string }[]): string | null {
  const image = images[0];
  if (image === undefined) return null;
  return getImageUrl(image.imageId);
}

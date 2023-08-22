import * as cloudinary from "cloudinary";

/**
 * 画像IDから画像URLを取得する
 */
export function getImageUrl(imageId: string): string {
  // TODO: CloudinaryのSDKを使ってURLを組み立てる
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${imageId}`;
}
// Cloudinaryの設定
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//画像の新規登録
export async function uploadImageToCloudinary(dataURI: string): Promise<string> {
  const result = await cloudinary.v2.uploader.upload(dataURI);
  return result.public_id;
}

//画像の削除
export async function deleteImageInCloudinary(oldPublicId: string) {
  const result = await cloudinary.v2.uploader.destroy(oldPublicId, { invalidate: true });
}

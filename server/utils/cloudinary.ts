/**
 * 画像IDから画像URLを取得する
 */
export function getImageUrl(imageId: string): string {
  // TODO: CloudinaryのSDKを使ってURLを組み立てる
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${imageId}`;
}
// Cloudinaryの設定
import * as cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export { cloudinary };

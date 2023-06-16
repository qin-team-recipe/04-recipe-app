/**
 * 画像IDから画像URLを取得する
 */
export function getImageUrl(imageId: string): string {
  // TODO: CloudinaryのSDKを使ってURLを組み立てる
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/${imageId}`;
}

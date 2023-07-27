import * as fs from "fs";
/**
 * Base64形式のデータを画像に変換
 */
export function base64ToImage(base64Data: string, filename: string) {
  const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 data");
  }

  const extension = matches[1].split("/")[1];
  const buffer = Buffer.from(matches[2], "base64");

  fs.writeFileSync(`${filename}.${extension}`, buffer, "binary");
}

import { TRPCError } from "@trpc/server";

export const notFoundError = new TRPCError({ code: "NOT_FOUND", message: "データが見つかりませんでした" });
export const authenticationError = new TRPCError({ code: "UNAUTHORIZED", message: "ログインが必要です" });

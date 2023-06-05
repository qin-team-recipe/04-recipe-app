import { appRouter } from "@/server/trpc/router";

// APIとの動作確認用なので、APIとの繋ぎ込み時に削除して問題ありません
export default async function TestPage() {
  const caller = appRouter.createCaller({ user: undefined });
  const result = await caller.health();

  return <div>{result.status.toUpperCase()}</div>;
}

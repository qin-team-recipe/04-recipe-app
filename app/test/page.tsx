import { trpcCaller } from "@/server/trpc/router";

// APIとの動作確認用なので、APIとの繋ぎ込み時に削除します
export default async function TestPage() {
  const [result, userCount] = await Promise.all([
    trpcCaller.health(),
    trpcCaller.userCount(),
  ]);

  return (
    <div>
      <div>API status: {result.status}</div>
      <div>Number of users: {userCount}</div>
    </div>
  );
}

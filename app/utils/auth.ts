import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function redirectIfNotLoggedIn(path: string) {
  const session = await getServerSession();

  if (session === null) redirect(path);
}

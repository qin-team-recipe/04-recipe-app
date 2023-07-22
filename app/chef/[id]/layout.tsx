import ChefHero from "@/app/components/Chef/ChefHero";
import { trpcClient } from "@/app/utils/trpc";

export default async function ChefLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const chefId = params.id;
  // TODO: childrenでも実行するため、キャッシュする
  const chef = await trpcClient.chef.query({ chefId });

  return (
    <>
      <ChefHero page="hotrecipes" chef={chef} />
      {children}
    </>
  );
}

import { trpcClient } from "@/app/utils/trpc";
import RecipeHero from "../../components/Recipe/RecipeHero";

export default async function ChefLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const recipeId = params.id;
  // TODO: childrenでも実行するため、キャッシュする
  const recipe = await trpcClient.recipe.query({ recipeId });

  return (
    <>
      <RecipeHero recipe={recipe} />
      {children}
    </>
  );
}

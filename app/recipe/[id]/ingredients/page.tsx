import CopyClipboard from "@/app/components/Parts/CopyClipboard";
import { RecipeNavigation } from "../RecipeNavigation";
import { AllIngredientsButton } from "@/app/components/Recipe/AllIngredientsButton";
import { IngredientsButton } from "@/app/components/Recipe/IngredientsButton";
import { trpcClient } from "@/app/utils/trpc";

export const metadata = {
  title: "Recipes",
  description: "Generated by create next app",
};

export default async function RecipeIngredients({ params }: { params: { id: string } }) {
  const recipeId = params.id;
  const recipe = await trpcClient.recipe.query({ recipeId });
  const text = recipe.ingredients
    .map((ingredient) => {
      return `${ingredient.title} ${ingredient.description}`;
    })
    .join("\n");

  return (
    <>
      <RecipeNavigation page="ingredients" recipeId={recipe.id} />
      <section className="pb-[48px]">
        <div className="flex justify-between pt-[20px] pb-[10.5px] px-[15px] items-center border-b-[1px] border-border font-bold">
          <p className="text-title text-[20px] ">{recipe.yields}人前</p>
          <AllIngredientsButton
            recipeId={recipeId}
            className="relative pl-[20px] stroke-[#908E96] hover:stroke-primary hover:text-primary"
          />
        </div>
        <ul>
          {recipe.ingredients.map(({ id, title, description, isAddedToList }) => (
            <li className="relative border-b-[1px] border-border px-[16px] py-[8px]" key={id}>
              <p className="text-title text-[14px]">{title}</p>
              <p className="text-[10px] mt-[4px]">{description}</p>
              <IngredientsButton
                ingredientId={id}
                isAddedToList={isAddedToList ?? false}
                className={`absolute top-1/2 -translate-y-1/2 right-[16px] pl-[20px] stroke-[#908E96] hover:stroke-primary hover:text-primary`}
              />
            </li>
          ))}
        </ul>
        <CopyClipboard text={text} />
      </section>
    </>
  );
}

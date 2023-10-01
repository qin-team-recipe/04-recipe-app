"use client";
import { FC } from "react";
import Recipe from "./Recipe";

type Props = {
  shoppingList: {
    recipes: {
      id: string;
      recipe: { id: string; name: string };
      shopListIngredients: { id: string; name: string; isChecked: boolean; recipeIngredientId: number | null }[];
    }[];
  };
};

export const RecipeList: FC<Props> = ({ shoppingList }) => {
  const shoppingListRecipes = shoppingList.recipes;

  return shoppingListRecipes.length !== 0 ? (
    shoppingListRecipes.map((recipe) => (
      <Recipe
        key={recipe.id}
        id={recipe.id}
        name={recipe.recipe.name}
        ingredients={recipe.shopListIngredients.map((ingredient) => ({
          name: ingredient.name,
          checked: ingredient.isChecked,
          shopListIngredientId: ingredient.id,
        }))}
      />
    ))
  ) : (
    <section className="pt-[8px] pb-[24px] ">
      <div className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
        <h2 className="font-bold text-title text-[16px] truncate">お買い物リスト</h2>
      </div>
      <p className="text-title pt-[20px] px-[15px]">お買い物リストがありません！</p>
    </section>
  );
};

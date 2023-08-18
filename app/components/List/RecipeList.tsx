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

  return shoppingListRecipes.map((recipe) => (
    <Recipe
      key={recipe.id}
      name={recipe.recipe.name}
      ingredients={recipe.shopListIngredients.map((ingredient) => ({
        name: ingredient.name,
        checked: ingredient.isChecked,
      }))}
    />
  ));
};

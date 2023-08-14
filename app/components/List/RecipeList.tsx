"use client";
import Recipe from "./Recipe";

// DBから取得する仕様に変更予定
const defaultValuesArray = [
  {
    recipe: "インドカレーインドカレーインドカレーインドカレーインドカレー",
    ingredients: [
      { item: "バター", checked: false },
      { item: "ターメリック", checked: false },
      { item: "パプリカパウダー", checked: false },
    ],
  },
  {
    recipe: "タイカレー",
    ingredients: [
      { item: "パクチー", checked: false },
      { item: "ナンプラー", checked: false },
      { item: "えび", checked: false },
    ],
  },
];

export default function RecipeList() {
  return defaultValuesArray.map((recipe) => (
    <Recipe key={recipe.recipe} recipe={recipe.recipe} ingredients={recipe.ingredients} />
  ));
}

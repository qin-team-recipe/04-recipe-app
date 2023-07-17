import { router } from "../trpc/init-trpc";
import { favoriteRecipe } from "./favorite-recipe";
import { followChef } from "./follow-chef";
import { unfavoriteRecipe } from "./unfavorite-recipe";
import { unfollowChef } from "./unfollow-chef";

export const followFavoriteRouter = router({
  followChef,
  unfollowChef,
  favoriteRecipe,
  unfavoriteRecipe,
});

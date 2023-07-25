import { router } from "../trpc/init-trpc";
import { deleteUser } from "./delete-user";
import { getCurrentUser } from "./get-current-user";

export const authRouter = router({
  currentUser: getCurrentUser,
  deleteUser,
});

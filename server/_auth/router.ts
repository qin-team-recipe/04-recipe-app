import { router } from "../trpc/init-trpc";
import { getCurrentUser } from "./get-current-user";

export const authRouter = router({
  currentUser: getCurrentUser,
});

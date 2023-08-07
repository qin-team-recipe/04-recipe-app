import { router } from "../trpc/init-trpc";
import { updateProfile } from "./update-profile";

export const mypageRouter = router({
  mypage: updateProfile,
});

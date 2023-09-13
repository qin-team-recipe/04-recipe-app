import { z } from "zod";
import { profileFormSchema } from "@/app/mypage/[userId]/edit/zodSchema";

export const MypageInput = profileFormSchema.merge(
  z.object({
    profileImage: z.string(),
  })
);

import { User } from "@/generated/prisma/client";

export function toUserResponse(user: User) {
  const { password,
    verificationToken,
    resetPasswordToken,
    resetPasswordExpires, ...data } = user;
  return data;
}
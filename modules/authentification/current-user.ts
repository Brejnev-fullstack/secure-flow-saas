import { NextRequest } from "next/server";
import prisma from "@/libs/prisma";
import { verifyToken } from "@/libs/jwt";
import { unauthorized } from "@/utils/errors";

export async function getCurrentUser(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    throw unauthorized("Utilisateur non authentifié");
  }

  const payload = verifyToken(token);
  const user = await prisma.user.findUnique({
    where: {
      idUser: payload.idUser,
    },
  });

  if (!user) {
    throw unauthorized("Utilisateur introuvable");
  }

  return user;
}

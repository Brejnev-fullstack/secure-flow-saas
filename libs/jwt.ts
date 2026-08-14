import { SignJWT, jwtVerify } from "jose";
import { Role } from "@/generated/prisma/client";
import { env } from "@/libs/env";

const JWT_SECRET = new TextEncoder().encode(
  env.JWT_SECRET,
);

export interface JwtPayload {
  idUser: number;
  email: string;
  role: Role;
}

/**
 * Génération du Access Token
 *
 * Durée de validité : 15 minutes
 */
export async function signToken(
  payload: JwtPayload,
): Promise<string> {
  return new SignJWT({
    idUser: payload.idUser,
    email: payload.email,
    role: payload.role,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(JWT_SECRET);
}

/**
 * Vérification du Access Token
 *
 * Compatible avec le Edge Runtime
 */
export async function verifyToken(
  token: string,
): Promise<JwtPayload> {
  const { payload } = await jwtVerify(
    token,
    JWT_SECRET,
  );

  return {
    idUser: payload.idUser as number,
    email: payload.email as string,
    role: payload.role as Role,
  };
}
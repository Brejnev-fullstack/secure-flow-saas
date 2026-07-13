import jwt from "jsonwebtoken";
import { Role } from "@/generated/prisma/client";
import { env } from "@/libs/env";

const JWT_SECRET = env.JWT_SECRET;

export interface JwtPayload {
  idUser: number;
  email: string;
  role: Role;
}
export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "15m",
  });
}
export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
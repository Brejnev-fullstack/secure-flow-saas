import prisma from "@/libs/prisma";
import { Register } from "./auth.types";

export function FindByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}
export function FindByLogin(login: string) {
  return prisma.user.findUnique({
    where: {
      login,
    },
  });
}
export function RegisterUser(
  data: Register & {
   password:string;
 }
) {
  return prisma.user.create({
    data: {
      nomUser: data.nomUser,
      prenom: data.prenom,
      tel: data.tel,
      email: data.email,
      login: data.login,
      password: data.password,
    },
  });
}

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

export async function findById(idUser: number) {
  return prisma.user.findUnique({
    where: { idUser },
  });
}
export function RegisterUser(
  data: Register & {
   password:string;
    verificationToken:string;
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
      verificationToken:data.verificationToken
    },
  });
}
export function saveResetToken(idUser: number, token: string, expires: Date) {
  return prisma.user.update({
    where: {
      idUser,
    },

    data: {
      resetPasswordToken: token,
      resetPasswordExpires: expires,
    },
  });
}

export function findByResetToken(token: string) {
  return prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
    },
  });
}
export function findByVerificationToken(token: string) {
  return prisma.user.findFirst({
    where: {
      verificationToken: token,
    },
  });
}
export function verifyEmail(idUser: number) {
  return prisma.user.update({
    where: {
      idUser,
    },

    data: {
      emailVerified: true,
      verificationToken: null,
    },
  });
}
export function updatePassword(idUser: number, password: string) {
  return prisma.user.update({
    where: {
      idUser,
    },

    data: {
      password,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });
}

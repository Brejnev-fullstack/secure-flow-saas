import prisma from "@/libs/prisma";
import { UpdateUser } from "./user.types";

const userSafeSelect = {
  idUser: true,
  nomUser: true,
  prenom: true,
  tel: true,
  email: true,
  login: true,
  role: true,
  emailVerified: true,
  isActive: true,
  createdAt: true,
};

export async function findAll() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: userSafeSelect,
  });
}
export async function findById(idUser: number) {
  return prisma.user.findUnique({
    where: { idUser },
    select: userSafeSelect,
  });
}
export async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: userSafeSelect,
  });
}
export async function findByLogin(login: string) {
  return prisma.user.findUnique({
    where: { login },
    select:userSafeSelect,
  });
}
export async function updateUser(idUser: number, data: UpdateUser) {
  return prisma.user.update({
    where: { idUser },
    data,
  });
}
export async function deleteUser(idUser: number) {
  return prisma.user.delete({
    where: { idUser },
  });
}

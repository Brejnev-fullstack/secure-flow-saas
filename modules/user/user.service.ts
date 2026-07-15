import * as UserRepository from "./user.repository";
import { UpdateUser, UpdateMe} from "./user.types";
import { createError } from "@/utils/errors";

export async function getUsers() {
  return UserRepository.findAll();
}
export async function getUserById(idUser: number) {
  const user = await UserRepository.findById(idUser);

  if (!user) {
    throw createError("Utilisateur introuvable", 404);
  }

  return user;
}
export async function updateUser(idUser: number, data: UpdateUser) {
  const user = await UserRepository.findById(idUser);

  if (!user) {
    throw createError("Utilisateur introuvable", 404);
  }

  return UserRepository.updateUser(idUser, data);
}
export async function deleteUser(idUser: number) {
  const user = await UserRepository.findById(idUser);
  if (!user) {
    throw createError("Utilisateur introuvable", 404);
  }
  return UserRepository.deleteUser(idUser);
}
export async function getMe(idUser: number) {
  const user = await UserRepository.findById(idUser);

  if (!user) {
    throw createError("Utilisateur introuvable", 404);
  }

  return user;
}
export async function updateMe(idUser: number, data: UpdateMe) {
  const user = await UserRepository.findById(idUser);

  if (!user) {
    throw createError("Utilisateur introuvable", 404);
  }
  return UserRepository.updateUser(idUser, data);
}

import * as UserService from "@/modules/user/user.service";
import { updateMeSchema } from "./user.validate";
import { UpdateUser } from "./user.types";

export async function getUsersController() {
  return UserService.getUsers();
}
export async function getUserById(idUser: number) {
  return UserService.getUserById(idUser);
}
export async function updateUser(id: number, data: UpdateUser) {
  return UserService.updateUser(id, data);
}
export async function deleteUser(id: number) {
  return UserService.deleteUser(id);
}
export async function updateMe(idUser: number, body: unknown) {
  const data = updateMeSchema.parse(body);
  return UserService.updateMe(idUser, data);
}

import * as UserService from "@/modules/user/user.service";
import { updateMeSchema } from "./user.validate";
import { UpdateUser } from "./user.types";
import { AuditContext } from "@/modules/audit/audit.types";

export async function getUsersController() {
  return UserService.getUsers();
}
export async function getUserById(idUser: number) {
  return UserService.getUserById(idUser);
}
export async function updateUser(
  id: number,
  data: UpdateUser,
  actorId: number,
  context?: AuditContext,
) {
  return UserService.updateUser(id, data, actorId, context);
}
export async function deleteUser(
  id: number,
  actorId: number,
  context?: AuditContext,
) {
  return UserService.deleteUser(id, actorId, context);
}
export async function updateMe(idUser: number, body: unknown) {
  const data = updateMeSchema.parse(body);
  return UserService.updateMe(idUser, data);
}

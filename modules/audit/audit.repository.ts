import prisma from "@/libs/prisma";
import { CreateAuditLogInput } from "./audit.types";

export function create(data: CreateAuditLogInput) {
  const { userId, ...rest } = data;
  return prisma.auditLog.create({
    data: {
      ...rest,
      ...(userId && {
        user: {
          connect: {
            idUser: userId,
          },
        },
      }),
    },
  });
}

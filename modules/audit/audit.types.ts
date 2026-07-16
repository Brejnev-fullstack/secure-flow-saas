import { AuditStatus, Prisma } from "@/generated/prisma/client";

export type AuditContext = {
  ipAddress?: string;
  userAgent?: string;
  requestMethod?: string;
  requestPath?: string;
};
export type CreateAuditLogInput = {
  userId?: number;
  action: string;
  entity?: string;
  entityId?: string;
  metadata?: Prisma.InputJsonValue;
  ipAddress?: string;
  userAgent?: string;
  requestMethod?: string;
  requestPath?: string;
  statusCode?: number;
  duration?: number;
  status?: AuditStatus;
};

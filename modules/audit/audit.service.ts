import * as Repository from "./audit.repository";
import { CreateAuditLogInput } from "./audit.types";

export async function log(data: CreateAuditLogInput) {
  try {
    await Repository.create(data);
  } catch (error) {
    console.error("Audit log error:", error);
  }
}

import { Role } from "@/generated/prisma/client";


export interface UpdateUser {
  nomUser?: string;
  prenom?: string;
  tel?: string | null;
  role?: Role;
  isActive?: boolean;
}

export interface UpdateMe {
  nomUser?: string;
  prenom?: string;
  tel?: string | null;
}
"use client";

import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "../api/auth.api";
import { authKeys } from "../queries/auth.keys";

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: getCurrentUser,
    retry: false,
  });
}
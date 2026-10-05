"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "../api/auth.api";
import { authKeys } from "../queries/auth.keys";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation<void, Error>({
    mutationFn: logout,

    onSuccess: async () => {
      await queryClient.removeQueries({
        queryKey: authKeys.currentUser(),
      });
    },
  });
}
"use client";

import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../api/auth.api";

import type {
  VerifyEmailInput,
  VerifyEmailResponse,
} from "../types/auth.types";

export function useVerifyEmail() {
  return useMutation<
    VerifyEmailResponse,
    Error,
    VerifyEmailInput
  >({
    mutationFn: verifyEmail,
  });
}
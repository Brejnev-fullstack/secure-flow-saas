"use client";

import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth.api";

import type {
  RegisterInput,
  RegisterResponse,
} from "../types/auth.types";

export function useRegister() {
  return useMutation<
    RegisterResponse,
    Error,
    RegisterInput
  >({
    mutationFn: register,
  });
}
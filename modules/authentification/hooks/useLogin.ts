"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";

import type {
  LoginInput,
  LoginResponse,
} from "../types/auth.types";

export function useLogin() {
  return useMutation<
    LoginResponse,
    Error,
    LoginInput
  >({
    mutationFn: login,
  });
}
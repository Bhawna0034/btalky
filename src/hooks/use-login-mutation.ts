"use client";

import useSWRMutation from "swr/mutation";
import { login } from "../lib/client";

export function useLoginMutation() {
  const { trigger, isMutating, error } = useSWRMutation("/auth/login", login);
  return {
    trigger,
    isMutating,
    error,
  };
}

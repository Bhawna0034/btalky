"use client";

import useSWRMutation from "swr/mutation";
import { signup } from "../lib/client";

export function useSignupMutation() {
  const { trigger, isMutating, error } = useSWRMutation("/auth/signup", signup);
  return {
    trigger,
    isMutating,
    error,
  };
}

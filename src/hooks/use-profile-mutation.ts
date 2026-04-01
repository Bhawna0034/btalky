"use client";

import useSWRMutation from "swr/mutation";
import { updateProfile } from "../lib/client";

export function useProfileMutation() {
  const { trigger, isMutating, error } = useSWRMutation(
    "/auth/update-profile",
    updateProfile,
  );
  return { trigger, isMutating, error };
}

"use client";
import useSWR from "swr";
import { fetcher } from "../lib/client/fetcher";
import { AuthUser } from "../types";

export const useAuth = () => {
  const { data, isLoading, error, mutate } = useSWR<AuthUser>(
    `/auth/check`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );
  return {
    user: data,
    isLoading,
    error,
    mutate,
  };
};

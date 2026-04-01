"use client"
import { logoutFetcher } from "@/src/lib/client";
import useSWRMutation from "swr/mutation";

export function useLogout() {
    return useSWRMutation("/auth/logout", logoutFetcher);
}
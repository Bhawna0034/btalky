"use client"

import useSWR from "swr"
import { fetcher } from "../lib/client/fetcher"
import { ChatUser } from "../types"


export function useChatUsers(search: string = "") {
    const endpoint = search.trim()
        ? `/message/user?search=${encodeURIComponent(search)}`
        : "/message/user";
    const { data, isLoading, error } = useSWR<ChatUser[]>(endpoint, fetcher)
    return {
        users: data,
        isUserLoading: isLoading,
        userError: error
    }
}
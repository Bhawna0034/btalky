"use client"

import useSWR from "swr"
import { fetcher } from "../lib/client/fetcher"
import { ChatMessage } from "../types";

export function useChatMessages(id?: string){
    const {data, isLoading, error, mutate} = useSWR<ChatMessage[]>(id ? `/message/${id}` : null, fetcher);
    return{
        messages: data,
        isMessageLoading: isLoading,
        messageError: error,
        mutate
    }
}
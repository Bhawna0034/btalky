"use client"

import useSWRMutation from "swr/mutation"
import { deleteChat } from "../lib/client"

export function useDeleteChat(){
    const {trigger, isMutating} = useSWRMutation( `/message/chat`, deleteChat);
    return {
        trigger,
        isMutating
    }
}
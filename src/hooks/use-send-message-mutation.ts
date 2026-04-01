"use client";

import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";
import { sendMessage } from "../lib/client";

export function useSendMessageMutation(selectedUser: string | null) {
  const { mutate } = useSWRConfig();

  const { trigger, isMutating } = useSWRMutation(
    selectedUser ? `/message/send/${selectedUser}` : null,
    sendMessage,
    {
      onSuccess: async (newMessage) => {
        if (!selectedUser) return;

        await mutate(
          `/message/${selectedUser}`,
          (prev: any[] = []) => {
            const alreadyExists = prev.some((msg) => msg._id === newMessage._id);
            if (alreadyExists) return prev;
            return [...prev, newMessage];
          },
          false
        );
      },
    }
  );

  return {
    sendMessage: trigger,
    isMutating,
  };
}
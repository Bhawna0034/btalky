"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth, useChatMessages, useChatUsers } from "@/src/hooks";
import { useSocket } from "@/src/hooks/use-socket";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ChatContainerSkeleton from "./chat-container-skeleton";

export default function ChatContainer({ selectedUser }: { selectedUser: string }) {
    const { messages, isMessageLoading, messageError, mutate } = useChatMessages(selectedUser);
    const { users } = useChatUsers();
    const receiver = users?.find((user) => user._id === selectedUser);
    const { user: currentUser } = useAuth();
    console.log(currentUser, ">>currentUser")
    const { socket, onlineUsers } = useSocket();
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const isReceiverOnline = onlineUsers.includes(selectedUser);
    useEffect(() => {
        if (!socket || !selectedUser || !currentUser?._id) return;
        const handleNewMessage = (newMessage: any) => {
            const isCurrentChat = (newMessage.senderId === selectedUser && newMessage.receiverId === currentUser._id) || (newMessage.senderId === currentUser._id && newMessage.receiverId === selectedUser);
            if (!isCurrentChat) return;
            mutate((prev: any[] = []) => {
                const alreadyExists = prev.some((msg) => msg._id === newMessage._id);
                if (alreadyExists) return prev;
                return [...prev, newMessage];
            })
        }
        socket.on("newMessage", handleNewMessage);
        return () => {
            socket.off("newMessage", handleNewMessage);
        }
    }, [socket, selectedUser, currentUser?._id, mutate])

    // auto scroll bottom
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages])
    console.log(JSON.stringify(receiver, null, 2));

    console.log(messages, ">>messages");
    if (isMessageLoading) {
        return <ChatContainerSkeleton />
    }
    return (
        <ScrollArea className="flex-1 p-6">
            {messages?.length === 0 ? (
                <div className="flex items-center justify-center h-full min-h-96 text-center text-gray-500">
                    No messages yet. Start the conversation!
                </div>
            ) : (
                <div className="space-y-4">
                    {messages?.map((message) => {
                        const isSent = message.senderId === currentUser?._id;

                        return (
                            <div key={message._id} className={`flex items-end gap-2 ${isSent ? 'justify-end' : 'justify-start'}`}>

                                {!isSent && (

                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={receiver?.profilePic || undefined} />
                                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                                            {receiver?.fullName?.charAt(0).toUpperCase()}

                                        </AvatarFallback>
                                    </Avatar>


                                )}

                                <div
                                    className={`max-w-xs rounded-2xl overflow-hidden ${isSent
                                        ? "bg-blue-600 text-white rounded-br-md"
                                        : "bg-white text-gray-800 rounded-bl-md shadow-sm"
                                        }`}
                                >
                                    {message.image && (
                                        <Image
                                            src={message.image}
                                            alt="chat-img"
                                            width={280}
                                            height={280}
                                            className="w-full max-w-[260px] h-auto max-h-80 object-cover"
                                        />
                                    )}

                                    <div className="px-3 py-2">
                                        {message.text && <p className="text-sm">{message.text}</p>}

                                        <span
                                            className={`text-xs mt-1 block ${isSent ? "text-blue-100" : "text-gray-400"
                                                }`}
                                        >
                                            {new Date(message.createdAt).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                </div>
                                {isSent && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={currentUser?.profilePic || undefined} />
                                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                                            {currentUser?.fullName?.charAt(0).toUpperCase()}

                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        )
                    })}
                    <div ref={bottomRef} />
                </div>
            )}

        </ScrollArea>
    )
}
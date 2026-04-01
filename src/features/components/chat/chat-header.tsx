"use client";

import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useChatUsers } from "@/src/hooks/use-chat-users";
import { useSocket } from "@/src/hooks/use-socket";
import ChatHeaderSkeleton from "./chat-header-skeleton";

export default function ChatHeader({
    selectedUser,
    onBack,
}: {
    selectedUser: string;
    onBack: () => void;
}) {
    const { users, isUserLoading } = useChatUsers();
    const { onlineUsers } = useSocket();

    const user = users?.find((u) => u._id === selectedUser);
    const isOnline = onlineUsers.includes(selectedUser);

    if (!user) return null;
    if (isUserLoading) {
        return <ChatHeaderSkeleton />
    }
    return (
        <div className="p-4 border-b bg-white flex items-center gap-3">
            {/* Mobile Back Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="md:hidden shrink-0"
            >
                <ArrowLeft className="w-5 h-5" />
            </Button>

            <Avatar className="w-12 h-12">
                <AvatarImage src={user.profilePic || undefined} />
                <AvatarFallback className="bg-blue-100 text-blue-700">
                    {user.fullName
                        ?.split(" ")
                        .map((name: string) => name[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
                <h2 className="font-semibold text-lg text-gray-900 truncate">
                    {user.fullName}
                </h2>
                <p className="text-sm text-gray-500">
                    {isOnline ? "Online" : "Offline"}
                </p>
            </div>
        </div>
    );
}
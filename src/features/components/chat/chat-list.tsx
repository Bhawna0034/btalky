"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatUsers } from "@/src/hooks/use-chat-users";
import { MessageCircleMore, Search, Users } from "lucide-react";
import { Input } from "../ui/input";
import { useSocket } from "@/src/hooks/use-socket";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ChatListSkeleton from "./chat-list-skeleton";

export default function ChatList({
    selectedUser,
    setSelectedUser,
}: {
    selectedUser: string | null;
    setSelectedUser: (id: string) => void;
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const search = searchParams.get("search") || "";
    const { users, isUserLoading, userError } = useChatUsers(search);
    const { onlineUsers } = useSocket();

    const handleSearch = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value.trim()) {
            params.set("search", value);
        } else {
            params.delete("search");
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    if (isUserLoading) {
        return <ChatListSkeleton />;
    }

    if (userError) {
        return (
            <div className="w-full md:w-96 bg-white border-r flex flex-col">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search"
                            className="pl-10 bg-gray-100"
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center p-6 text-center">
                    <div>
                        <p className="text-sm text-red-500 font-medium">
                            Failed to load chats
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                            Please try again
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full md:w-96 bg-white border-r flex flex-col h-full">
            {/* Search */}
            <div className="p-4 border-b">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search"
                        className="pl-10 bg-gray-100"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Chat List / Empty State */}
            <ScrollArea className="flex-1">
                {users?.length === 0 ? (
                    <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center px-6">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                            {search ? (
                                <Search className="w-8 h-8 text-blue-600" />
                            ) : (
                                <MessageCircleMore className="w-8 h-8 text-blue-600" />
                            )}
                        </div>

                        <h3 className="text-lg font-semibold text-slate-800">
                            {search ? "No users found" : "No chats yet"}
                        </h3>

                        <p className="text-sm text-slate-500 mt-2 max-w-xs">
                            {search
                                ? `No results found for "${search}". Try a different name.`
                                : "Your conversations will appear here once you start chatting."}
                        </p>
                    </div>
                ) : (
                    users?.map((user) => {
                        const isOnline = onlineUsers.includes(user._id);

                        return (
                            <div
                                key={user._id}
                                onClick={() => setSelectedUser(user._id)}
                                className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors ${selectedUser === user._id
                                    ? "bg-blue-50 border-l-4 border-l-blue-600"
                                    : ""
                                    }`}
                            >
                                <div className="relative">
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

                                    {isOnline && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-semibold text-sm text-gray-900 truncate">
                                            {user.fullName}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </ScrollArea>
        </div>
    );
}
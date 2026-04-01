"use client";

import { MessageSquare } from "lucide-react";
import ChatContainer from "./chat-container";
import ChatHeader from "./chat-header";
import ChatInput from "./chat-input";
import { useChatMessages } from "@/src/hooks";

export default function ChatWindow({
    selectedUser,
    onBack,
}: {
    selectedUser: string | null;
    onBack: () => void;
}) {


    if (!selectedUser) {
        return (
            <div className="w-full flex flex-1 items-center justify-center p-16 bg-gray-100">
                <div className="max-w-md text-center space-y-3">
                    <div className="flex justify-center gap-4 mb-4">
                        <div className="relative">
                            <div
                                className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center animate-bounce"
                            >
                                <MessageSquare className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold">Welcome to BTalky!</h2>
                    <p className="text-gray-500">
                        Select a conversation from the sidebar to start chatting
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-gray-50 w-full">
            <ChatHeader selectedUser={selectedUser} onBack={onBack} />
            <div className="flex-1 min-h-0 overflow-y-auto">
                <ChatContainer selectedUser={selectedUser} />
            </div>

            <ChatInput selectedUser={selectedUser} />

        </div>
    );
}
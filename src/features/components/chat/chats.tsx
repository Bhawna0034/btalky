"use client";

import { useState } from "react";
import ChatList from "./chat-list";
import ChatWindow from "./chat-window";

export default function Chats() {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    return (
        <div className="h-[calc(100vh-64px)] mt-16 overflow-hidden">
            <div className="flex h-full">
                {/* Mobile / Tablet small screens */}
                <div className={`w-full md:hidden ${selectedUser ? "hidden" : "block"}`}>
                    <ChatList
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                    />
                </div>

                <div className={`w-full md:hidden ${selectedUser ? "block" : "hidden"}`}>
                    <ChatWindow
                        selectedUser={selectedUser}
                        onBack={() => setSelectedUser(null)}
                    />
                </div>

                {/* Desktop */}
                <div className="hidden md:flex h-full w-full">
                    <ChatList
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                    />
                    <ChatWindow
                        selectedUser={selectedUser}
                        onBack={() => setSelectedUser(null)}
                    />
                </div>
            </div>
        </div>
    );
}
"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client"
import { useAuth } from "./use-auth";

interface SocketContextType {
    socket: Socket | null;
    onlineUsers: string[];
}
const SocketContext = createContext<SocketContextType>({
    socket: null,
    onlineUsers: []
})

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    useEffect(() => {
        if (!user?._id) {
            setSocket(null);
            setOnlineUsers([]);
            return;
        }
        const socketInstance = io("http://localhost:8080", {
            query: {
                userId: user._id
            },
            withCredentials: true,
        })
        setSocket(socketInstance);
        socketInstance.on("connect", () => {
            console.log("Socket connected:", socketInstance.id);
        });
        socketInstance.on("getOnlineUsers", (users: string[]) => {
            setOnlineUsers(users);
        })
        return () => {
            socketInstance.disconnect();
            setSocket(null);
            setOnlineUsers([]);
        }
    }, [user?._id])

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}
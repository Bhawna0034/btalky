"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../hooks";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Chats from "../features/components/chat/chats";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!user) return null;
  return <Chats />;
}
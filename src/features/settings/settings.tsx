"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useChatUsers } from "@/src/hooks/use-chat-users";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageCircleMore, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDeleteChat } from "@/src/hooks/use-delete-chat";
import { toast } from "sonner";
import { mutate } from "swr";
import SettingsSkeleton from "./settings-skeleton";

export default function Settings() {
  const router = useRouter();
  const { users, isUserLoading } = useChatUsers();

  const { trigger, isMutating } = useDeleteChat();

  const handleDeleteChat = async (id: string) => {
    try {
      await trigger(id);
      toast.success("Chat deleted successfully");

      mutate("/message/users");
      mutate((key) => typeof key === "string" && key.startsWith("/message/"));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete chat");
    }
  };

  return (
    <div className="px-6 pt-24 md:px-8 h-screen flex flex-col overflow-hidden">
      <div className="max-w-3xl mx-auto w-full flex flex-col flex-1 min-h-0 pb-6 space-y-4">
        <Button
          onClick={() => router.push("/")}
          variant="ghost"
          className="flex items-center gap-2.5 hover:bg-slate-100 rounded-md w-fit px-2.5 py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chats
        </Button>

        <Card className="flex flex-col flex-1 min-h-0">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your chats and preferences</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col flex-1 min-h-0">
            <h3 className="text-lg font-semibold mb-4">Manage Chats</h3>

            <div className="flex-1 overflow-y-auto min-h-0">
              <div className="space-y-2">
                {/* Loading State */}
                {isUserLoading ? (
                  <SettingsSkeleton />
                ) : users?.length === 0 ? (
                  /* Empty State */
                  <div className="h-80 flex flex-col items-center justify-center text-center border border-dashed border-slate-300 rounded-xl px-6">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                      <MessageCircleMore className="w-8 h-8 text-blue-600" />
                    </div>

                    <h4 className="text-lg font-semibold text-slate-800">
                      No chats yet
                    </h4>

                    <p className="text-sm text-slate-500 mt-2 max-w-sm">
                      Your conversations will appear here once you start chatting with someone.
                    </p>

                    <Button
                      onClick={() => router.push("/")}
                      className="mt-5"
                    >
                      Go to Chats
                    </Button>
                  </div>
                ) : (
                  /* Users List */
                  users?.map((user) => (
                    <div key={user._id}>
                      <div className="border border-gray-300 p-4 rounded-md flex items-center gap-4">
                        <Avatar className="w-12 h-12 shrink-0">
                          <AvatarImage src={user?.profilePic || undefined} />
                          <AvatarFallback className="bg-blue-50 text-slate-600 text-lg">
                            {user?.fullName
                              ?.split(" ")
                              .map((name: string) => name[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex items-center justify-between w-full min-w-0">
                          <span className="text-base font-medium truncate">
                            {user?.fullName}
                          </span>

                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isMutating}
                            onClick={() => handleDeleteChat(user._id)}
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
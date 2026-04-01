"use client";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useLogout } from "@/src/hooks";
import { mutate } from "swr";
import { toast } from "sonner";

export default function Header() {
  const router = useRouter();
  const { trigger, isMutating } = useLogout();
  const handleLogout = async () => {
    try {
      await trigger();

      // Clear all SWR cache if needed
      mutate(() => true, undefined, { revalidate: false });

      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };
  return (
    <div className="shadow-sm fixed h-16 top-0 w-full px-6 py-4 flex items-center justify-between bg-slate-900">
      <div className="flex items-center gap-2">
        <MessageSquare className="size-6 text-white" />

        <h2 className="text-lg md:text-2xl text-white font-bold">BTalky</h2>
      </div>
      <div className="flex items-center gap-2">
        <Button className="bg-slate-900" onClick={() => router.push(`/settings`)}>
          <Settings className="size-5" />
          <span className="hidden md:inline">Settings</span>
        </Button>
        <Button
          className="bg-slate-900"
          onClick={() => router.push(`/profile`)}
        >
          <User className="size-5" />
          <span className="hidden md:inline">Profile</span>
        </Button>
        <Button
          className="bg-slate-900 hover:bg-slate-800"
          onClick={handleLogout}
          disabled={isMutating}
        >
          <LogOut className="size-5" />
          <span className="hidden md:inline">
            Logout
          </span>
        </Button>
      </div>
    </div>
  );
}

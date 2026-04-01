import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../components/ui/label";
import { Activity, Calendar, Camera, Phone, User } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { AuthUser } from "@/src/types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Separator } from "@/components/ui/separator";
import { useSocket } from "@/src/hooks/use-socket";

interface ProfileSettingProps {
  user?: AuthUser;
  preview: string | null;
  fullName: string;
  setFullName: Dispatch<SetStateAction<string>>;
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
  isMutating: boolean;
  hasChanges?: boolean | "";

  onImageUpload: (e: ChangeEvent<HTMLInputElement, Element>) => Promise<void>;
  handleSaveChanges: () => Promise<void>;
}
export default function ProfileSetting({
  preview,
  user,
  onImageUpload,
  isMutating,
  fullName,
  setFullName,
  phone,
  setPhone,
  hasChanges,
  handleSaveChanges,
}: ProfileSettingProps) {
  const { onlineUsers } = useSocket();
  console.log(onlineUsers, ">>onlineUsers"
  );

  const isOnline = user?._id ? onlineUsers.includes(user._id) : false;
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Profile Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4 pt-2">
          <div className="relative w-32 h-32">
            <Avatar className="w-32 h-32">
              <AvatarImage src={preview || user?.profilePic}></AvatarImage>
              <AvatarFallback className="bg-blue-50 text-slate-600 text-3xl">
                {user?.fullName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Label
              htmlFor="file-upload"
              className="absolute bottom-0 right-0 bg-blue-600 text-white hover:text-white hover:bg-blue-700 p-0 w-10 h-10 min-w-0 flex items-center justify-center rounded-full"
            >
              <Camera className="w-5 h-5" />
              <Input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={onImageUpload}
                disabled={isMutating}
              />
            </Label>
          </div>
          <p className="text-sm text-gray-500">
            {isMutating
              ? "Uploading..."
              : "Click the camera icon to change your picture"}
          </p>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-4 h-4" />
              </div>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="off"
                className="bg-gray-50 w-full pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="w-4 h-4" />
              </div>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={user?.phone || "+1 234 567 8900"}
                autoComplete="off"
                className="bg-gray-50 w-full pl-10"
              />
            </div>
          </div>
          <Button
            onClick={handleSaveChanges}
            disabled={isMutating || !hasChanges}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            {isMutating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs">Member Since</p>
              <p className="text-sm font-medium">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                  : "-"}
              </p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs">Active Status</p>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-600" : "bg-gray-400"
                    }`}
                />
                <p
                  className={`text-sm font-medium ${isOnline ? "text-green-600" : "text-gray-500"
                    }`}
                >
                  {isOnline ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

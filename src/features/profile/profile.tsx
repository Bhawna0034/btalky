"use client";
import { useAuth, useProfileMutation } from "@/src/hooks";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { Button } from "../components/ui/button";
import AccountInformation from "./account-information";
import ProfileSetting from "./profile-setting";
import { useRouter } from "next/navigation";
import { uploadImageToCloudinary } from "@/src/utils/upload-image";

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedPic, setUploadedPic] = useState<string | undefined>(undefined);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const { trigger, isMutating } = useProfileMutation();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setFullName((prev) =>
          prev !== user.fullName ? user.fullName || "" : prev,
        );
        setPhone((prev) => (prev !== user.phone ? user.phone || "" : prev));
      }, 0);
    }
  }, [user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    try {
      const imageUrl = await uploadImageToCloudinary(file, "chat-app-profile");
      setUploadedPic(imageUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload image");
    }
  };
  const handleSaveChanges = async () => {
    try {
      const updatedUser = await trigger({
        profilePic: uploadedPic ?? user?.profilePic ?? "",
        fullName,
        phone,
      });
      mutate(updatedUser, { revalidate: false });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("failed to update profile", error);
      toast.error("Failed to update profile. Please try again");
    }
  };
  const hasChanges =
    fullName !== (user?.fullName || "") ||
    phone !== (user?.phone || "") ||
    (uploadedPic && uploadedPic !== user?.profilePic);

  return (
    <div className="px-6 pt-24 md:px-8 h-screen flex flex-col overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col flex-1 min-h-0 pb-6 space-y-4">
        <Button
          onClick={() => router.push("/")}
          variant="ghost"
          className="flex items-center gap-2.5 hover:bg-slate-100 rounded-md w-fit px-2.5 py-2"
        >
          <ArrowLeft />
          Back to Chats
        </Button>
        <div className="flex-1 overflow-y-auto pb-6">
          <ProfileSetting
            user={user}
            preview={preview}
            fullName={fullName}
            setFullName={setFullName}
            phone={phone}
            setPhone={setPhone}
            isMutating={isMutating}
            hasChanges={hasChanges}
            onImageUpload={handleImageUpload}
            handleSaveChanges={handleSaveChanges}
          />
        </div>
      </div>
    </div>
  );
}

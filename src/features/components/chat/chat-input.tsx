"use client";

import { Image, Send, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useSendMessageMutation } from "@/src/hooks";
import { uploadImageToCloudinary } from "@/src/utils/upload-image";

export default function ChatInput({
    selectedUser,
}: {
    selectedUser: string | null;
}) {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { sendMessage, isMutating } = useSendMessageMutation(selectedUser);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!text.trim() && !imagePreview) return;
        if (!selectedUser) return;

        try {
            let imageUrl: string | null = null;
            if (selectedFile) {
                imageUrl = await uploadImageToCloudinary(selectedFile);
            }
            await sendMessage({
                text: text.trim(),
                image: imageUrl,
            });

            setText("");

            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }
            setImagePreview(null)
            setSelectedFile(null)
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.log(error);
            toast.error("Failed to send message");
        }
    };

    return (
        <div className="shrink-0 border-t bg-white px-3 py-3 sm:px-4 sm:py-4">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-20 w-20 rounded-lg border object-cover"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <Input
                        type="text"
                        className="flex-1 min-w-0 rounded-md bg-gray-100 text-gray-700"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className={`shrink-0 ${imagePreview ? "text-emerald-500" : "text-gray-600"
                            }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image className="h-5 w-5" />
                    </Button>
                </div>

                <Button
                    type="submit"
                    size="icon"
                    className="shrink-0 bg-blue-600 hover:bg-blue-700"
                    disabled={(!text.trim() && !imagePreview) || isMutating}
                >
                    <Send className="h-5 w-5" />
                </Button>
            </form>
        </div>
    );
}
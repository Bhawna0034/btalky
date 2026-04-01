export async function uploadImageToCloudinary(file: File, uploadPreset: string = "chat-app"): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/db0q3cfjw/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const data = await response.json();
  return data.secure_url;
}
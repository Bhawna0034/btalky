import { ChatPayload, LoginProps, SignupProps } from "@/src/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const signup = async (
  endpoint: string,
  { arg }: { arg: SignupProps },
) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }
  return data;
};

export const login = async (endpoint: string, { arg }: { arg: LoginProps }) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }
  return data;
};

export const updateProfile = async (
  endpoint: string,
  { arg }: { arg: { profilePic?: string; fullName?: string; phone?: string } },
) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update profile picture");
  }
  return res.json();
};
export const sendMessage = async (endpoint: string, { arg }: { arg: ChatPayload }) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }
  return data;
};

export const deleteChat = async(endpoint: string, {arg}: {arg: string}) => {
  const res = await fetch(`${BASE_URL}${endpoint}/${arg}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Failed to delete chat");
  }
  return data;
}
export const logoutFetcher = async (endpoint: string) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Logout failed");
  }

  return res.json();
};

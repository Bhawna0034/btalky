import { Dispatch, SetStateAction } from "react";

export interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  password?: string;
  phone?: string;
  createdAt?: string;
}

export interface AuthStore {
  authUser: AuthUser | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  checkAuth: () => void;
}

export interface SignupProps {
  fullName: string;
  email: string;
  password: string;
}

export interface SignupFormProps {
  formData: SignupProps;
  setFormData: Dispatch<SetStateAction<SignupProps>>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isMutating: boolean;
  errors: SignupProps;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface LoginformProps {
  formData: LoginProps;
  setFormData: Dispatch<SetStateAction<LoginProps>>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isMutating: boolean;
}
export interface ChatUser{
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    profilePic: string;
    createdAt: string;
    updatedAt: string
}

export interface ChatPayload {
  text: string;
  image: string | null;
}

export interface ChatMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
  text: string;
  image: string | null;
}

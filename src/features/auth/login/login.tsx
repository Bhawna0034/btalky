"use client";
import Link from "next/link";
import AuthImagePattern from "../_components/auth-image-pattern";
import { MessageSquare } from "lucide-react";
import LoginForm from "./login-form";
import { useEffect, useState } from "react";
import { LoginProps } from "@/src/types";
import { useAuth, useLoginMutation } from "@/src/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const { user, isLoading } = useAuth();
  const { trigger, isMutating } = useLoginMutation();
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/");
    }
  }, [user, router, isLoading]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await trigger(formData);
      await mutate("/auth/check");
      toast.success("Successfully Logged in");

      router.replace("/");
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    }
  };
  return (
    <section className="grid lg:grid-cols-2 min-h-screen">
      {/* Left Side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 flex items-center justify-center rounded-xl bg-blue-700  transition-colors text-white">
                <MessageSquare className="size-6" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome To BTalky</h1>
              <p className="text-gray-500">Login to continue chatting</p>
            </div>
          </div>
          {/* Form */}
          <LoginForm
            formData={formData}
            setFormData={setFormData}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleSubmit={handleSubmit}
            isMutating={isMutating}
          />
          <div className="text-center">
            <p className="text-base-content/60 text-sm">
              Don&apos;t have an account?
              <Link href="/signup" className="underline text-blue-700">
                {" "}
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </section>
  );
}

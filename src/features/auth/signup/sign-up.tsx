"use client";
import { useAuth, useSignupMutation } from "@/src/hooks";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AuthImagePattern from "../_components/auth-image-pattern";
import SignupForm from "./sign-up-form";
import { SignupProps } from "@/src/types";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignupProps>({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<SignupProps>({
    fullName: "",
    email: "",
    password: "",
  });
  const { trigger, isMutating } = useSignupMutation();

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
    };
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.values(newErrors).some(Boolean);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return;
    try {
      await trigger(formData);
      toast.success("Signup Successfully");
      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
      router.push("/login");
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
              <h1 className="text-2xl font-bold mt-2">Join BTalky</h1>
              <p className="text-gray-500">
                Create your account to start chatting
              </p>
            </div>
          </div>
          {/* Form */}
          <SignupForm
            formData={formData}
            setFormData={setFormData}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleSubmit={handleSubmit}
            isMutating={isMutating}
            errors={errors}
          />
          <div className="text-center">
            <p className="text-base-content/60 text-sm">
              Already have an account?
              <Link href="/login" className="underline text-blue-700">
                {" "}
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </section>
  );
}

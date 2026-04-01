import { Button } from "@/src/features/components/ui/button";
import { Input } from "@/src/features/components/ui/input";
import { Label } from "@/src/features/components/ui/label";
import { SignupFormProps } from "@/src/types";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";

export default function SignupForm({
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  handleSubmit,
  isMutating,
  errors,
}: SignupFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-control space-y-2">
        <Label className="label">
          <span
            className={`label-text font-medium ${errors.fullName ? "text-red-500" : ""}`}
          >
            Full Name *
          </span>
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="size-5 text-gray-500" />
          </div>
          <Input
            className={`bg-gray-50 w-full pl-10 ${errors.fullName ? "border border-red-500 focus-visible:ring-red-500" : ""}`}
            autoComplete="off"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
        </div>
        {errors.fullName && (
          <p className="text-xs text-red-500">{errors.fullName}</p>
        )}
      </div>
      <div className="form-control space-y-2">
        <Label className="label">
          <span
            className={`label-text font-medium ${errors.email ? "text-red-500" : ""}`}
          >
            Email *
          </span>
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="size-5 text-gray-500" />
          </div>
          <Input
            className={`bg-gray-50 w-full pl-10 ${errors.email ? "border border-red-500 focus-visible:ring-red-500" : ""}`}
            autoComplete="off"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>
      <div className="form-control space-y-2">
        <Label className="label">
          <span className="label-text font-medium">Password</span>
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="size-5 text-gray-500" />
          </div>
          <Input
            type={showPassword ? "text" : "password"}
            className={`bg-gray-50 w-full pl-10`}
            placeholder="••••••••"
            autoComplete="off"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Button
            type="button"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 pr-3 flex items-center hover:bg-transparent "
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="size-5  text-base-content/40" />
            ) : (
              <Eye className="size-5 text-base-content/40" />
            )}
          </Button>
        </div>
      </div>
      <Button
        className="bg-blue-700 hover:bg-blue-800 w-full"
        disabled={isMutating}
      >
        {isMutating ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Loading..
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}

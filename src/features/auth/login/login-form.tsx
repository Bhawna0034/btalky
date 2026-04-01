import { Button } from "@/src/features/components/ui/button";
import { Input } from "@/src/features/components/ui/input";
import { Label } from "@/src/features/components/ui/label";
import { LoginformProps } from "@/src/types";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

export default function LoginForm({
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  handleSubmit,
  isMutating,
}: LoginformProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-control space-y-2">
        <Label className="label">
          <span className={`label-text font-medium `}>Email *</span>
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="size-5 text-gray-500" />
          </div>
          <Input
            className={`bg-gray-50 w-full pl-10`}
            autoComplete="off"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
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
              <EyeOff className="size-5 text-gray-500" />
            ) : (
              <Eye className="size-5 text-gray-500" />
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
            Signing..
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}

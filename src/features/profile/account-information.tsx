import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AuthUser } from "@/src/types";
import { Activity, Calendar } from "lucide-react";

export default function AccountInformation({ user }: { user?: AuthUser }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Account Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs">Member Since</p>
            <p className="text-sm font-medium">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
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
              <span className="w-2 h-2 rounded-full bg-green-600" />
              <p className="text-sm font-medium text-green-600">Active</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

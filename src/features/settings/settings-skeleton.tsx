import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsSkeleton() {
    return (
        <div>
            <ScrollArea className="h-96">
                <div className="space-y-2">

                    <div className="border border-gray-300 p-4 rounded-md flex items-center gap-4">
                        <div className="relative">
                            <Skeleton className="w-10 h-10 rounded-full bg-slate-200" />
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <Skeleton className="h-4 w-32 rounded bg-slate-200" />
                            <Skeleton className="w-7 h-7 rounded-md bg-slate-200" />

                        </div>

                    </div>
                    <div className="border border-gray-300 p-4 rounded-md flex items-center gap-4">
                        <div className="relative">
                            <Skeleton className="w-10 h-10 rounded-full bg-slate-200" />
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <Skeleton className="h-4 w-32 rounded bg-slate-200" />
                            <Skeleton className="w-7 h-7 rounded-md bg-slate-200" />

                        </div>

                    </div>
                    <div className="border border-gray-300 p-4 rounded-md flex items-center gap-4">
                        <div className="relative">
                            <Skeleton className="w-10 h-10 rounded-full bg-slate-200" />
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <Skeleton className="h-4 w-32 rounded bg-slate-200" />
                            <Skeleton className="w-7 h-7 rounded-md bg-slate-200" />

                        </div>

                    </div>


                </div>
            </ScrollArea >
        </div >
    )
}
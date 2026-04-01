import { Skeleton } from "@/components/ui/skeleton";

export default function ChatHeaderSkeleton() {
    return (
        <div className="bg-white border-b px-6 py-[14px]">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Skeleton className="w-10 h-10 rounded-full bg-slate-200" />
                </div>
                <div>
                    <Skeleton className="h-5 w-24 mb-1 bg-slate-200" />
                    <Skeleton className="h-4 w-16 bg-slate-200" />
                </div>
            </div>
        </div>
    )
}
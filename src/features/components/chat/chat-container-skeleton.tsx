import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatContainerSkeleton() {
    return (
        <ScrollArea className="flex-1 px-4 py-6">
            <div className="space-y-6">
                {/* Incoming message */}
                <div className="flex items-end gap-2">
                    <Skeleton className="w-10 h-10 rounded-full shrink-0 bg-slate-200" />
                    <div className="space-y-2">
                        <Skeleton className="h-12 w-52 rounded-2xl rounded-bl-sm bg-slate-200" />

                    </div>
                </div>

                {/* Outgoing message */}
                <div className="flex items-end justify-end gap-2">
                    <div className="space-y-2 flex flex-col items-end">
                        <Skeleton className="h-14 w-44 rounded-2xl rounded-br-sm bg-slate-200" />
                    </div>
                    <Skeleton className="w-10 h-10 rounded-full shrink-0 bg-slate-200" />
                </div>

                {/* Incoming message */}
                <div className="flex items-end gap-2">
                    <Skeleton className="w-10 h-10 rounded-full shrink-0 bg-slate-200" />
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-40 rounded-2xl rounded-bl-sm bg-slate-200" />
                    </div>
                </div>

                {/* Outgoing message */}
                <div className="flex items-end justify-end gap-2">
                    <div className="space-y-2 flex flex-col items-end">
                        <Skeleton className="h-16 w-60 rounded-2xl rounded-br-sm bg-slate-200" />
                    </div>
                    <Skeleton className="w-10 h-10 rounded-full shrink-0 bg-slate-200" />
                </div>

                {/* Incoming message */}
                <div className="flex items-end gap-2">
                    <Skeleton className="w-10 h-10 rounded-full shrink-0 bg-slate-200" />
                    <div className="space-y-2">
                        <Skeleton className="h-12 w-48 rounded-2xl rounded-bl-sm bg-slate-200" />
                    </div>
                </div>
            </div>
        </ScrollArea>
    )
}
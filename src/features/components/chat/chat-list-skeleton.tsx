import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";


export default function ChatListSkeleton() {
    return (
        <div className="w-full md:w-96 bg-white border-r flex flex-col">
            {/* Search Skeleton */}
            <div className="p-4 border-b">
                <Skeleton className="h-11 w-full rounded-md bg-slate-200" />
            </div>

            {/* Users Skeleton */}
            <ScrollArea className="flex-1">
                <div className="space-y-0">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className={`flex items-center gap-3 p-4
                            }`}
                        >
                            <div className="relative">
                                <Skeleton className="w-12 h-12 rounded-full bg-slate-200" />
                                <Skeleton className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-slate-200" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-4 w-32 rounded bg-slate-200" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

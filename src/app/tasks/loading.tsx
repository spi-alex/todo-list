import { Skeleton } from "@/components/ui/skeleton";

export default function TasksLoading() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 p-4 sm:p-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-40" />
      </div>
      <Skeleton className="h-52 w-full rounded-xl" />
      <div className="space-y-3">
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    </main>
  );
}

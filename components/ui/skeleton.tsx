import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-800/60", className)}
      {...props}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl border border-orange-500/30 p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-3 w-3/4" />
      </div>
      <div className="flex space-x-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-14" />
      </div>
    </div>
  )
}

export function SkeletonProject() {
  return (
    <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl border border-orange-500/30 p-6 space-y-3">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-6 w-40" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="h-8 w-32" />
      <div className="flex space-x-2">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-14" />
      </div>
    </div>
  )
}

export { Skeleton }

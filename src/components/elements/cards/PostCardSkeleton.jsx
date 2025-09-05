import Link from "next/link";

export function PostCardSkeleton() {
  return (
    <div className="p-2 border border-neutral-400 h-full rounded-3xl animate-pulse">
      {/* Image skeleton */}
      <div className="rounded-2xl w-full h-60 bg-neutral-300" />

      <div className="pt-4 px-2 mb-2 space-y-3">
        {/* Date skeleton */}
        <div className="h-4 w-24 bg-neutral-300 rounded" />

        {/* Title skeleton */}
        <div className="h-6 w-3/4 bg-neutral-300 rounded" />
      </div>
    </div>
  );
}
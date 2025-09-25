import { memo } from "react";

const LeagueSkeleton = memo(() => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6 animate-pulse">
      <div className="space-y-4">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Badge skeleton */}
        <div className="flex items-center">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>

        {/* Click hint skeleton */}
        <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto"></div>
      </div>
    </div>
  );
});

LeagueSkeleton.displayName = "LeagueSkeleton";

const LoadingSkeleton = memo(() => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <LeagueSkeleton key={index} />
      ))}
    </div>
  );
});

LoadingSkeleton.displayName = "LoadingSkeleton";

export default LoadingSkeleton;

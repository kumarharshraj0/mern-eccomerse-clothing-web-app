const PageSkeleton = () => {
  return (
    <div className="min-h-screen p-6 animate-pulse">
      {/* Navbar skeleton */}
      <div className="h-14 bg-gray-200 rounded mb-6"></div>

      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-48 bg-gray-200 rounded-xl"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;

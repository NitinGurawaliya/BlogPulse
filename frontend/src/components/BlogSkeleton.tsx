export default function BlogSkeleton() {
  return (
    <div className="flex justify-center py-8">
      <div role="status" className="animate-pulse w-full md:w-3/6 border border-gray-200 shadow-lg rounded-lg p-6 bg-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          <div>
            <div className="h-4 w-32 bg-gray-300 rounded-full mb-2"></div>
            <div className="h-3 w-24 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <div className="mb-4 h-4 w-3/4 bg-gray-300 rounded-full"></div>
        <div className="mb-4 h-20 w-full bg-gray-300 rounded-lg"></div>
        <div className="h-4 w-32 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}

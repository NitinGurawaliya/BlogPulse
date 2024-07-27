
export const CommentSkeleton = () => {
  return (
    <div className="p-6">
      <section className="bg-white py-8 lg:py-16 antialiased">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 bg-gray-200 rounded-full w-32"></div>
        </div>
        <div className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-200 rounded-full w-20"></div>
        </div>

        {[1, 2, 3].map((index) => (
          <div key={index} className="p-6 mb-3 text-base border-black bg-white border-t">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded-full w-24 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded-full w-16"></div>
                </div>
              </div>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded-full w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-full w-full"></div>
          </div>
        ))}
      </section>
    </div>
  );
};

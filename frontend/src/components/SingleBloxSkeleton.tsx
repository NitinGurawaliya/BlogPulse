import { Appbar } from './Appbar';

export const SingleBlogSkeleton = () => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 pt-10 w-full max-w-screen-xl px-10 animate-pulse">
          <div className="col-span-8">
            <div className="h-12 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2 w-1/3"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg mb-4">
              Author
            </div>
            <div className="flex items-start">
              <div className="pt-3">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              </div>
              <div className="pl-3">
                <div className="h-6 bg-gray-200 rounded mb-2 w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

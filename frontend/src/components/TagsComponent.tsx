

import axios from 'axios';
import { useEffect, useRef } from 'react';
import { BACKEND_URL } from '../config';

export const TagsComponent = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // Ensure scrollContainerRef is not null and scrollBy is called
      scrollContainerRef.current.scrollBy({
        left: -100, // Adjust the scroll amount as needed
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // Ensure scrollContainerRef is not null and scrollBy is called
      scrollContainerRef.current.scrollBy({
        left: 100, // Adjust the scroll amount as needed
        behavior: 'smooth',
      });
    }
  };


  useEffect(()=>{
     axios.get(`${BACKEND_URL}/api/v1/tag/tags`,{
      
     })

  },[])


  return (
    <div className="bg-slate-800 py-4 relative">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white p-2 rounded-full hover:bg-slate-500 z-10"
      >
        &lt;
      </button>
      <div className="overflow-x-auto hide-scroll-bar">
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap space-x-3"
        >
          {/* Example items */}
          <div className="inline-block ml-8">
            <div className="text-white p-2 h-9 max-w-xs overflow-hidden rounded-lg shadow-md bg-slate-800 hover:shadow-xl transition-shadow duration-300 ease-in-out text-md flex items-center justify-center">
              Hello
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white p-2 rounded-full hover:bg-slate-500 z-10"
      >
        &gt;
      </button>
    </div>
  );
};

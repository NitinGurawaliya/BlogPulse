import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { BACKEND_URL } from '../config';

export const TagsComponent = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  interface Tag {
    id: number;
    tag: string;
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -100,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 100,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/tag/tags`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setTags(res.data.tags);
        console.log(res.data.tags);
      });
  }, []);

  return (
    <div className="bg-slate-800 py-4 relative">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-800 text-white p-2 h-10 rounded-full hover:bg-slate-500 z-10"
      >
        &lt;
      </button>
      <div className="overflow-x-auto hide-scroll-bar">
        <div ref={scrollContainerRef} className="flex flex-nowrap space-x-3">
          {tags.map((tag: Tag, index) => (
            <div
              key={tag.id}
              className={`inline-block px-3 ${
                index === 0 ? 'ml-4' : ''
              }`}
            >
              <div className="w-auto text-gray-200 hover:cursor-pointer hover:text-gray-400 p-2 h-9 max-w-xs overflow-hidden rounded-lg shadow-md bg-slate-800 hover:shadow-xl transition-shadow duration-300 ease-in-out flex items-center justify-center">
                {tag.tag}
              </div>
            </div>
          ))}
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

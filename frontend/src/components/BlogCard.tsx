import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
  category: string[];
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
  category,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b justify-start p-14 md:p-6 pb-6 cursor-pointer w-screen max-w-screen-md border-slate-200">
        <div className="flex">
          <div className="flex justify-center flex-col">
            <Avatars name={authorName} />
          </div>
          <div className="font-extralight flex justify-center flex-col text-sm pl-2">
            {authorName}.
          </div>
          <div className="flex pl-1 justify-center flex-col">
            <Circle />
          </div>
          <div className="pl-2 flex justify-center flex-col text-slate-400 text-sm font-thin">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl pt-4 font-semibold">{title}</div>
        <div className="font-thin text-md">{content.slice(0, 100) + "...."}</div>

        {/* Container for minute(s) read and View Blog button */}
        <div className="flex justify-between items-center pt-2">
          <div className="text-sm font-thin text-slate-500">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
          </div>
          <ViewBlog />
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          {category.map((tag, index) => (
            <button
              key={index}
              className="bg-gray-700 hover:bg-gray-500 text-white text-sm px-4 py-1 border rounded-full"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </Link>
  );
};

function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-600"></div>;
}

export function Avatars({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-700 rounded-full">
      <span className="text-s text-white">{name[0]}</span>
    </div>
  );
}

export function ViewBlog() {
  return (
    <div>
      <button
        type="button"
        className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      >
        View Blog
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  );
}

import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { blog } from "../hooks";
import { Avatars } from "./BlogCard";

interface CommentProps {
  postId: number;
  comments: {
    id: number;
    content: string;
    user: {
      name: string;
    };
  }[];
  onCommentPosted: (updatedBlog: blog) => void; // Callback to update blog state
}

export const Comment = ({ postId, comments, onCommentPosted }: CommentProps) => {
  const [comment, setComment] = useState("");

  async function postCommentHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog/comment/${postId}`,
        { content: comment },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );

      console.log("Comment posted successfully:", res.data);
      setComment("")

      // Fetch updated blog data
      const updatedBlog = await axios.get(`${BACKEND_URL}/api/v1/blog/${postId}`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });

      onCommentPosted(updatedBlog.data.blog); // Notify parent component
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }

  return (
    <div className="p-6">
      <section className="bg-white py-8 lg:py-16 antialiased">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Discussions</h2>
        </div>
        <form className="mb-6" onSubmit={postCommentHandler}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
            <label className="sr-only"></label>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              id="comment"
              className="px-0 w-full text-sm h-10 text-gray-900 border-0 focus:ring-0 focus:outline-none"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black rounded-full focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
          >
            Post comment
          </button>
        </form>

        {comments.map((comment) => (
          <article key={comment.id} className="p-6 mb-3 text-base border-black  bg-white border-t">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                <Avatars name={comment.user.name} />
                  {comment.user.name}
                </p>
                <p className="text-sm mr-2 text-gray-600">
                  <time title="March 12th, 2022">Mar. 12, 2022</time>
                </p>
              </div>
              <button
                id="dropdownComment3Button"
                data-dropdown-toggle="dropdownComment3"
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                type="button"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
                <span className="sr-only">Comment settings</span>
              </button>
              <div
                id="dropdownComment3"
                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow"
              >
                <ul className="py-1 text-sm text-gray-700" aria-labelledby="dropdownMenuIconHorizontalButton">
                  <li>
                    <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                      Edit
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                      Remove
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block py-2 px-4 hover:bg-gray-100">
                      Report
                    </a>
                  </li>
                </ul>
              </div>
            </footer>
            <p className="text-black">{comment.content}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

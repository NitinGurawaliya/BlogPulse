import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { Comment } from "../components/Comment";
import { useState,useEffect } from "react";
import { blog } from "../hooks";
import { SingleBlogSkeleton } from "../components/SingleBloxSkeleton";
import { CommentSkeleton } from "../components/CommentSkeleton";
import { useCallback } from "react";


export const Blog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState<blog | undefined>();
  const { loading, blog } = useBlog({ id: id || "" });

  // Update blog data when new data is fetched
  const updateBlogData = useCallback((newBlogData: blog) => {
    setBlogData(newBlogData);
  }, []);

  // Set blog data when fetched
  useEffect(() => {
    if (blog) {
      setBlogData(blog);
    }
  }, [blog]);

  if (loading) {
    return (
      <div>
          <SingleBlogSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />

      </div>
    );
  }

  return (
    <div>
      {blogData ? (
        <>
          <FullBlog blog={blogData} />
          <Comment postId={blogData.id} comments={blogData.comment} onCommentPosted={updateBlogData} />
        </>
      ) : (
        <div>Blog not found</div>
      )}
    </div>
  );
};

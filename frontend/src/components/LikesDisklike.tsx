import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { BACKEND_URL } from '../config';

interface LikesDislikeProps {
  postId: number;
}

export const LikeDislikeButton = ({ postId }: LikesDislikeProps) => {
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the initial number of likes and liked status
  useEffect(() => {
    const fetchLikes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/likes/count/${postId}`, {
          headers: {
            Authorization: localStorage.getItem('token') || '',
          },
        });
        const { count, isLiked } = res.data; 
        setLikes(count || 0);
        setLiked(isLiked || false);
      } catch (error) {
        console.error('Error fetching likes:', error);
        setLikes(0); 
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [postId]);

  const likeClickHandler = async () => {
    try {
      if (!liked) {
        // If not liked, send a like request
        await axios.post(
          `${BACKEND_URL}/api/v1/likes/like/${postId}`,
          {},
          {
            headers: {
              Authorization: localStorage.getItem('token') || '',
            },
          }
        );
        setLikes((prevLikes) => prevLikes + 1);
        setLiked(true);
      } else {
        // If already liked, send an unlike request
        await axios.post(
          `${BACKEND_URL}/api/v1/likes/unlike/${postId}`,
          {},
          {
            headers: {
              Authorization: localStorage.getItem('token') || '',
            },
          }
        );
        setLikes((prevLikes) => prevLikes - 1);
        setLiked(false);
      }
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching
  }

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={likeClickHandler}
        className={`flex items-center space-x-1 transition-colors duration-200 ${
          liked ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
        }`}
      >
        <FaThumbsUp className="h-6 w-6" />
        <span>{likes}</span> {/* Display the number of likes */}
      </button>

      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors duration-200">
        <FaThumbsDown className="h-6 w-6" />
      </button>
    </div>
  );
};

export default LikeDislikeButton;

import axios from "axios";
import { Appbar } from "./Appbar";
import { BACKEND_URL } from "../config";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const tagsArray = input.split(",").map((tag) => tag.trim());
    setTags(tagsArray);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePublish = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", tags.join(","));
    formData.append("content", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(`/blog/${res.data.id}`);
    } catch (error) {
      console.error("Error publishing blog", error);
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="w-full my-4 bg-gray-50 border focus:outline-none border-gray-300 text-gray-800 text-sm rounded-lg block p-2.5"
            placeholder="Title.."
          />

          <input
            type="text"
            onChange={handleTagsChange}
            className="w-full m-0 bg-gray-50 border focus:outline-none border-gray-300 text-gray-800 text-sm rounded-lg block p-2.5"
            placeholder="Enter tags separated by commas"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full my-4 bg-gray-50 border focus:outline-none border-gray-300 text-gray-800 text-sm rounded-lg block p-2.5"
          />
        </div>
      </div>

      <TextEditor
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <button
        onClick={handlePublish}
        type="submit"
        className="inline-flex items-center mx-3 mt-3 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4"
      >
        Publish post
      </button>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="mt-8 border-t border-l w-11/12">
      <div className="w-full mb-4">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <div className="px-4 py-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>

            <textarea
              onChange={onChange}
              id="editor"
              rows={8}
              className="block w-full focus:outline-none px-0 text-sm text-gray-800 bg-white border-0"
              placeholder="Write an article..."
              required
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

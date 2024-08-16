import { Link } from "react-router-dom";
// import { Avatars } from "./BlogCard";
import Writelogo from "../assets/Writelogo";
import {SimpleAvatar} from "./SimpleAvatar"
export const Appbar = () => {
  return (
    <div className="border-b py-4 flex justify-between items-center px-10">
      <Link to={"/blogs"} className="font-bold mx-8 sm:mx-0 text-2xl cursor-pointer">
        BlogPulse
      </Link>
      <div className="flex items-center gap-4">
        <Link to={"/publish"}>
          <button
            type="button"
            className="focus:outline-none hover:bg-gray-100 rounded-3xl focus:ring-4 focus:ring-gray-100 font-medium flex items-center gap-2 text-sm px-5 py-2.5"
          >
            <Writelogo /> Write
          </button>
        </Link>
        <SimpleAvatar />
      </div>
    </div>
  );
}

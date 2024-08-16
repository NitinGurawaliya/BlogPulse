import { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';  // Import the icon
import { useNavigate } from 'react-router-dom';

export function SimpleAvatar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-flex items-center">
      <div
        onClick={() => setOpen(!open)}
        className="w-12 h-12 flex items-center m-2 justify-center text-gray-700 cursor-pointer"
      >
        <div >
          <FaUserCircle size={38} />  {/* Use the icon here */}
        </div>
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-transparent z-50"
          style={{ top: '100%' }}
        >
          <ul className="py-1 space-y-2 text-gray-900 dark:text-white">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Account
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                My Blogs
              </a>
            </li>
            <li>
              <a onClick={() => {
                localStorage.removeItem("token");
                navigate("/signin");
              }} className="block px-4 py-2 cursor-pointer text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

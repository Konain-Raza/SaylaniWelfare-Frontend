import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const UserDropdown = ({ user }) => {
  const navigate = useNavigate();
  console.log("user", user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        onClick={toggleDropdown}
      >
        <img
          className="w-10 h-10 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="user"
        />
        <span className="ml-2 text-sm font-medium hidden sm:inline">
         {user.name}
        </span>
        <svg
          className={`w-5 h-5 ml-2 transform transition-transform ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg dark:bg-gray-700">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
            <p className="text-sm font-medium text-gray-800 dark:text-white">
             {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate dark:text-gray-300">
            {user.email}
            </p>
          </div>
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-300">
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/");
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

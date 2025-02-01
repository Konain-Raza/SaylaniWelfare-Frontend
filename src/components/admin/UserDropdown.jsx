import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../Store/store";

const UserDropdown = () => {
  const { user, setAuthenticated } = useStore();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("smitMode") === "true"
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("smitMode", darkMode);
  }, [darkMode]);

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
        className="flex items-center bg-white dark:bg-gray-800 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-700 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-300"
        onClick={toggleDropdown}
      >
        <img
          className="w-10 h-10 rounded-full"
          src="https://cdn-icons-png.flaticon.com/128/1326/1326377.png"
          alt="user"
        />
        <span className="ml-2 text-sm font-medium hidden sm:inline dark:text-white">
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
        <div className="absolute z-40 right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
            <p className="text-sm font-medium text-gray-800 dark:text-white">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          </div>
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-center justify-between px-4 py-2">
              <span className="text-sm font-medium">Dark Mode</span>
              <button
                className={`relative w-11 h-6 flex items-center rounded-full ${
                  darkMode ? "bg-blue-600" : "bg-gray-300"
                } transition-all`}
                onClick={() => setDarkMode(!darkMode)}
              >
                <span
                  className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                    darkMode ? "translate-x-5" : "translate-x-0"
                  }`}
                ></span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setAuthenticated(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
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

import React, { useState } from "react";

const InfoAlert = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className="relative flex flex-col md:flex-row p-4 mb-4 text-sm text-blue-800 bg-blue-100 border border-blue-300 rounded-lg shadow-sm dark:bg-blue-900 dark:text-blue-200 dark:border-blue-600"
      role="alert"
    >
      <div className="flex items-start">
        <svg
          className="shrink-0 w-5 h-5 me-3 mt-[2px] text-blue-600 dark:text-blue-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
      </div>
      <div className="flex-1">
        <span className="font-medium">This application is under development.</span>
        <p className="mt-1">For testing purposes, use the following credentials:</p>
        <ul className="mt-1.5 list-disc list-inside">
          <li>
            Email: <span className="font-medium">admin@smit.com</span>
          </li>
          <li>
            Password: <span className="font-medium">Mondego</span>
          </li>
        </ul>
      </div>
      <button
        onClick={handleClose}
        type="button"
        className="absolute top-2 right-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-400 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default InfoAlert;

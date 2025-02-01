import React from "react";

const ErrorPage = ({ errorCode }) => {
  const isServerError = errorCode === 500;

  return (
    <section className="bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen">
    <div className="text-center px-6">
      <h1
        className={`mb-4 text-8xl font-extrabold ${
          isServerError ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"
        }`}
      >
        {errorCode}
      </h1>
  
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 sm:text-xl md:w-xl">
        {isServerError
          ? "⚠️ Our servers are currently facing an issue. We're working on it—please check back soon."
          : "📄 The page you're looking for may have been moved, deleted, or doesn't exist."}
      </p>
      <a
        href="/"
        className={`inline-flex text-white ${
          isServerError
            ? "bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-600"
            : "bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 focus:ring-blue-300 dark:focus:ring-blue-600"
        } focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 my-4`}
      >
        Back to Homepage
      </a>
    </div>
  </section>
  
  );
};

export default ErrorPage;

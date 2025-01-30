import React from "react";

const ErrorPage = ({ errorCode }) => {
  const isServerError = errorCode === 500;

  return (
    <section className="bg-white flex items-center justify-center min-h-screen">
      <div className="text-center px-6">
        <h1
          className={`mb-4 text-8xl font-extrabold ${
            isServerError ? "text-red-600" : "text-blue-600"
          }`}
        >
          {errorCode}
        </h1>

        <p className="mt-4 text-lg text-gray-600 sm:text-xl md:w-xl">
          {isServerError
            ? "⚠️ Our servers are currently facing an issue. We're working on it—please check back soon."
            : "📄 The page you're looking for may have been moved, deleted, or doesn't exist."}
        </p>
        <a
          href="/"
          className={`inline-flex text-white ${
            isServerError
              ? "bg-red-600 hover:bg-red-700 focus:ring-red-300"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300"
          } focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 my-4`}
        >
          Back to Homepage
        </a>
      </div>
    </section>
  );
};

export default ErrorPage;

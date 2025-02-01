import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../../axios";
import useStore from "../../Store/store";

const UserRegistrationForm = () => {
  const { setUsers } = useStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Receptionist",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    if (name.length < 2) {
      toast.error("Name must be at least 2 characters long");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await api.post("api/auth/register", formData);
      if (response.status === 201) {
        toast.success(response.data.message || "User registered successfully");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "Receptionist",
        });
        setUsers(response.data.users);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
<div className="mx-auto w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 shadow-lg">
  <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-left">
    Register User
  </h1>
  <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
    <div>
      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-gray-800 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Full Name"
        required
      />
    </div>
    <div>
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-gray-800 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="name@company.com"
        required
      />
    </div>
    <div>
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-gray-800 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="••••••••"
        required
      />
    </div>
    <div>
      <label
        htmlFor="confirmPassword"
        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Confirm Password
      </label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-gray-800 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="••••••••"
        required
      />
    </div>
    <div>
      <label
        htmlFor="role"
        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Role
      </label>
      <select
        name="role"
        id="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-gray-800 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="Receptionist">Receptionist</option>
        <option value="Admin">Admin</option>
        <option value="Staff">Staff</option>
      </select>
    </div>
    <div className="md:col-span-2">
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5 hover:bg-blue-700 dark:hover:bg-blue-800 focus:ring-2 focus:ring-blue-500"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.97 7.97 0 014 12H2c0 2.386.943 4.556 2.48 6.12l1.52-1.83z"
              ></path>
            </svg>
            Submitting...
          </span>
        ) : (
          "Register User"
        )}
      </button>
    </div>
  </form>
</div>


      <ToastContainer />
    </>
  );
};

export default UserRegistrationForm;

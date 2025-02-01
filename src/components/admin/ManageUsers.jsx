import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../axios";
import useStore from "../../Store/store";

const ManageUsers = () => {
  const { users, setUsers } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/api/user/delete/${id}`);
      const updatedUser = users.filter((user) => user._id !== id);
      setUsers(updatedUser);
      toast.success("User deleted successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user.");
    }
  };

  const filteredUsers = users.filter((user) =>
    searchTerm
      ? user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  return (
    <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Manage Users
      </h1>

      <input
        type="text"
        placeholder="Search by Name, Email, or Role"
        className="w-full md:w-max px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredUsers.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-600 dark:text-gray-400">No users found.</p>
        </div>
      ) : (
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4">
                    <button
                      disabled={user.email === "admin@smit.com"}
                      onClick={() => handleDelete(user._id)}
                      className={`text-red-600 dark:text-red-400 hover:underline 
    ${
      user.email === "admin@smit.com"
        ? "opacity-50 cursor-not-allowed hover:no-underline text-gray-400 dark:text-gray-500"
        : "hover:text-red-800 dark:hover:text-red-500"
    }`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

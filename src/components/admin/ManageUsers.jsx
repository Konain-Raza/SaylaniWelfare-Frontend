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
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h1>
      
      <input
        type="text"
        placeholder="Search by Name, Email, or Role"
        className="w-max px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredUsers.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-600">No users found.</p>
        </div>
      ) : (
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:underline"
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
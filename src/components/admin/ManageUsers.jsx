import React from "react";
import { toast } from "react-toastify";
import api from "../../axios";
import useStore from "../../Store/store";

const ManageUsers = () => {
  const { users, setUsers } = useStore();

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h1>

      {users.length === 0 ? (
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
              {users.map((user) => (
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

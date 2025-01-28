import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../axios";
import UserRegistrationForm from "./AddUsers";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/user");
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/api/user/delete/${id}`);
        toast.success("User deleted successfully.");
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete user.");
      }
    }
  };
  const handleAddStakeholder = () => {
    setShowRegisterForm((prev)=>!prev);
  };

  return (
    <div className="p-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
        <button
          onClick={handleAddStakeholder}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
       {showRegisterForm ? "Close Form" : "Add New User"}
        </button>
      </div>
      {loading ? (
        <div className="text-center py-6">
          <p className="text-gray-600">Loading users...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-600">No users found.</p>
        </div>
      ) : (
        <div className="relative overflow-x-auto sm:rounded-lg">
          {showRegisterForm ? (
            <UserRegistrationForm/>
          ) : (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
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
          )}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

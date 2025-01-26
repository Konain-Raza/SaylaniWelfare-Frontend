import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../axios";

const ViewBeneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await api.get(
          "/api/beneficiary"
        );
        setBeneficiaries(response.data || []);
        console.log(beneficiaries);
      } catch (error) {
        console.error("Error fetching beneficiaries:", error);
        setBeneficiaries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBeneficiaries();
  }, []);

  const openModal = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBeneficiary(null);
  };
  const handleStatusChange = (newStatus) => {
    setSelectedBeneficiary((prev) => ({ ...prev, status: newStatus }));
  };

  const updateBeneficiaryStatus = async () => {
    try {
      const response = await api.patch(
        `/api/beneficiary/${selectedBeneficiary?.id}`,
        { status: selectedBeneficiary?.status }
      );
      if (response.status === 200) {
        toast.success("Status updated successfully");
        closeModal();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 text-xl">Loading beneficiaries...</div>
      </div>
    );
  }

  return (
    <div>
      {beneficiaries.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {isModalOpen ? (
              <div className="bg-white rounded-lg shadow-lg w-full h-max p-10  relative">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-left">
                  Beneficiary Details
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong className="font-medium text-gray-800">Name:</strong>{" "}
                    {selectedBeneficiary?.name}
                  </p>
                  <p className="text-gray-700">
                    <strong className="font-medium text-gray-800">CNIC:</strong>{" "}
                    {selectedBeneficiary?.cnic}
                  </p>
                  <p className="text-gray-700">
                    <strong className="font-medium text-gray-800">
                      Department:
                    </strong>{" "}
                    {selectedBeneficiary?.department}
                  </p>
                  <p className="text-gray-700">
                    <strong className="font-medium text-gray-800">
                      Status:
                    </strong>{" "}
                    {selectedBeneficiary?.status}
                  </p>
                  <p className="text-gray-700">
                    <strong className="font-medium text-gray-800">
                      Purpose:
                    </strong>{" "}
                    {selectedBeneficiary?.purpose}
                  </p>
                </div>

                <div className="mt-6 w-max">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Update Status
                  </label>
                  <select
                    id="status"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    defaultValue={selectedBeneficiary?.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={updateBeneficiaryStatus}
                  >
                    Save
                  </button>
                </div>
              </div>
          ) : (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    cnic
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {beneficiaries.map((beneficiary) => (
                  <tr
                    key={beneficiary._id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{beneficiary.name}</td>
                    <td className="px-6 py-4">{beneficiary.cnic}</td>
                    <td className="px-6 py-4">{beneficiary.department}</td>
                    <td className="px-6 py-4">{beneficiary.status}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => openModal(beneficiary)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="text-gray-500 text-center mt-8">
          No beneficiaries found
        </div>
      )}
    </div>
  );
};

export default ViewBeneficiaries;

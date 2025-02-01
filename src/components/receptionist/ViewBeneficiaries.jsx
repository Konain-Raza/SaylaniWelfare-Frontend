import React, { useState } from "react";
import useStore from "../../Store/store";
import api from "../../axios";
import { toast } from "react-toastify";
import BeneficiaryDetails from "./BeneficiaryDetails";

const ViewBeneficiaries = () => {
  const { beneficiaries, setBeneficiaries } = useStore();
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = (beneficiary) => setSelectedBeneficiary(beneficiary);
  const closeModal = () => setSelectedBeneficiary(null);

  const handleStatusChange = (newStatus) => {
    setSelectedBeneficiary((prev) => ({ ...prev, status: newStatus }));
  };

  const updateBeneficiaryStatus = async () => {
    setLoading(true);
    try {
      const response = await api.patch("/api/beneficiary/status", {
        id: selectedBeneficiary?._id,
        status: selectedBeneficiary?.status,
      });

      if (response.status === 200) {
        toast.success("Status updated successfully");
        const updatedList = beneficiaries.map((b) =>
          b._id === selectedBeneficiary._id
            ? { ...b, status: selectedBeneficiary.status }
            : b
        );
        setBeneficiaries(updatedList);
        closeModal();
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const filteredBeneficiaries = beneficiaries && beneficiaries?.filter((b) =>
    searchTerm
      ? b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(b.cnic).includes(searchTerm)
      : true
  );

  if (selectedBeneficiary) {
    return (
      <BeneficiaryDetails
        beneficiary={selectedBeneficiary}
        onClose={closeModal}
        onUpdate={updateBeneficiaryStatus}
        loading={loading}
        handleStatusChange={handleStatusChange}
      />
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Beneficiary Records
      </h1>
      <input
        type="text"
        placeholder="Search by Name or CNIC"
        className="w-max px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">CNIC</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBeneficiaries.map((beneficiary) => (
              <tr
                key={beneficiary._id}
                className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4">{beneficiary.name}</td>
                <td className="px-6 py-4">{beneficiary.cnic}</td>
                <td className="px-6 py-4">{beneficiary.department}</td>
                <td className="px-6 py-4">{beneficiary.status}</td>
                <td className="px-6 py-4">
                  <button
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    onClick={() => openModal(beneficiary)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBeneficiaries;

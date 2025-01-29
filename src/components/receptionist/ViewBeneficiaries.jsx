import React, { useState } from "react";
import useStore from "../../Store/store";
import api from "../../axios";
import { toast } from "react-toastify";
import BeneficiaryDetails from "./BeneficiaryDetails";

const ViewBeneficiaries = () => {
  const { beneficiaries, setBeneficiaries } = useStore();
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [loading, setLoading] = useState(false);

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
        setBeneficiaries((prev) =>
          prev.map((b) =>
            b._id === selectedBeneficiary._id
              ? { ...b, status: selectedBeneficiary.status }
              : b
          )
        );
        closeModal();
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

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
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Beneficiary Records</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">CNIC</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaries.map((beneficiary) => (
              <tr key={beneficiary._id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{beneficiary.name}</td>
                <td className="px-6 py-4">{beneficiary.cnic}</td>
                <td className="px-6 py-4">{beneficiary.department}</td>
                <td className="px-6 py-4">{beneficiary.status}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline" onClick={() => openModal(beneficiary)}>
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

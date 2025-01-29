import React from "react";
import Button from "../common/Button";

const BeneficiaryDetails = ({ beneficiary, onClose, onUpdate, loading, handleStatusChange }) => {
  if (!beneficiary) return null;

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Beneficiary Details</h3>
        <div className="space-y-3">
          <p className="text-gray-700">
            <strong className="font-medium text-gray-800">Name:</strong> {beneficiary.name}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-800">CNIC:</strong> {beneficiary.cnic}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-800">Department:</strong> {beneficiary.department}
          </p>

          <p className="text-gray-700">
            <strong className="font-medium text-gray-800">Status:</strong> {beneficiary.status}
          </p>
          <p className="text-gray-700 w-full">
            <strong className="font-medium text-gray-800">Purpose:</strong> {beneficiary.purpose}
          </p>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-800 mb-1">Update Status</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            value={beneficiary.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-between mt-6">
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" onClick={onClose}>
            Close
          </button>
          <Button
            text="Update"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={onUpdate}
            loading={loading}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryDetails;

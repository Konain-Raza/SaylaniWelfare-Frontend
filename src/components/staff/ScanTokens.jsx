import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../../axios";

const ScanTokens = () => {
  const [token, setToken] = useState("");
  const [beneficiary, setBeneficiary] = useState(null);
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchBeneficiary = async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const response = await api.get(`/api/beneficiary/${token}`);
      setBeneficiary(response.data.beneficiary);
      setToken("");
      toast.success("Beneficiary information retrieved successfully");
    } catch (error) {
      setBeneficiary(null);
      setNotFound(true);
      toast.error(error.response?.data?.message || "Beneficiary not found");
    } finally {
      setLoading(false);
    }
  };

  const updateBeneficiary = async () => {
    if (!status) {
      toast.error("Please select a status");
      return;
    }

    setLoading(true);
    try {
      const response = await api.put(`/api/beneficiary/${token}`, {
        status,
        remarks,
      });
      setBeneficiary(response.data.beneficiary);
      toast.success("Beneficiary updated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error updating beneficiary"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Scan Beneficiary Token
        </h2>
        <div className="flex items-center gap-4 mb-6">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter Token Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          />
          <button
            onClick={fetchBeneficiary}
            disabled={loading}
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-2 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>

      {beneficiary ? (
        <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-center mb-4">
            Beneficiary Details
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <p className="text-gray-700">
              <strong>Name:</strong> {beneficiary.name}
            </p>
            <p className="text-gray-700">
              <strong>CNIC:</strong> {beneficiary.cnic}
            </p>
            <p className="text-gray-700">
              <strong>Department:</strong> {beneficiary.department}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> {beneficiary.status}
            </p>
            <p className="text-gray-700">
              <strong>Purpose:</strong> {beneficiary.purpose}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Update Status:
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-300"
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">
              Remarks:
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-300"
              rows="4"
              placeholder="Add remarks here..."
            ></textarea>
          </div>

          <button
            onClick={updateBeneficiary}
            disabled={loading}
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center gap-2 w-full disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-2 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Updating...
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      ) : (
        notFound && (
          <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-bold text-red-600 text-center mb-4">
              Beneficiary Not Found
            </h2>
            <p className="text-gray-700 text-center">
              The token you entered does not match any beneficiary in the system.
            </p>
          </div>
        )
      )}
      <ToastContainer />
    </div>
  );
};

export default ScanTokens;

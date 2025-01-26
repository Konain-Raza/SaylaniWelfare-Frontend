import React, { useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";
import { useReactToPrint } from "react-to-print";
import api from "../../axios";

const RegisterBeneficiary = () => {
  const [formData, setFormData] = useState({
    cnic: "",
    name: "",
    phone: "",
    address: "",
    purpose: "",
    department: "",
    status: "Pending",
    remarks: "",
  });

  const [beneficiary, setBeneficiary] = useState(null);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);

  const reactToPrintFn = () => {
    console.log(contentRef.current);
    useReactToPrint({
      content: () => contentRef.current,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { cnic, name, phone, address, purpose, department } = formData;
    if (!/^[0-9]{13}$/.test(cnic)) {
      toast.error("CNIC must be exactly 13 digits");
      return false;
    }
    if (!/^[0-9]{11}$/.test(phone)) {
      toast.error("Phone number must be exactly 11 digits");
      return false;
    }
    if (name.length < 2) {
      toast.error("Name must be at least 2 characters long");
      return false;
    }
    if (address.length < 5) {
      toast.error("Address must be at least 5 characters long");
      return false;
    }
    if (purpose.length < 3) {
      toast.error("Purpose must be at least 3 characters long");
      return false;
    }
    if (department.length < 2) {
      toast.error("Department must be at least 2 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await api.post("/api/beneficiary/register", formData);
      toast.success("Beneficiary registered successfully");
      setBeneficiary(response.data.beneficiary);
      setFormData({
        cnic: "",
        name: "",
        phone: "",
        address: "",
        purpose: "",
        department: "",
        status: "Pending",
        remarks: "",
      });
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error registering beneficiary";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
      {!beneficiary ? (
        <div className="w-full bg-white  sm:max-w-4xl xl:p-0 ">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl ">
              Register Beneficiary
            </h1>
            <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="cnic"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  CNIC
                </label>
                <input
                  type="text"
                  name="cnic"
                  id="cnic"
                  value={formData.cnic}
                  onChange={handleChange}
                  className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5  "
                  placeholder="XXXXXXXXXXXXXX"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5  "
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5  "
                  placeholder="03XXXXXXXXX"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5  "
                  placeholder="Your address"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5  "
                  placeholder="Enter department name"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="purpose"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Purpose of Visit
                </label>
                <textarea
                  rows="4"
                  name="purpose"
                  id="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="bg-gray-50 border text-gray-900 rounded-lg block w-full p-2.5  "
                  placeholder="Purpose of visit"
                />
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
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
                      Loading...
                    </span>
                  ) : (
                    "Register Beneficiary"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div
          ref={contentRef}
          className="bg-white p-6 rounded-lg shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Beneficiary Details</h2>
          <p>Name: {beneficiary.name}</p>
          <p>CNIC: {beneficiary.cnic}</p>
          <p>Token: {beneficiary.token}</p>
          <QRCodeCanvas value={beneficiary.token} />,
          <button
            onClick={() => reactToPrintFn()}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Print as PDF
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default RegisterBeneficiary;

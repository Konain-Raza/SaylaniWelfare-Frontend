import React, { useState, useRef } from "react";
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

  const reactToPrintFn = useReactToPrint({
    content: () => contentRef.current,
    documentTitle: `My_HeaderText_Print`,
    onAfterPrint: () => console.log('Printing completed'),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
      {!beneficiary ? (
        <div className="w-full bg-white rounded-lg shadow-md sm:max-w-4xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Register Beneficiary
          </h1>
          <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {[
              {
                label: "CNIC",
                name: "cnic",
                type: "text",
                placeholder: "XXXXXXXXXXXXX",
              },
              {
                label: "Full Name",
                name: "name",
                type: "text",
                placeholder: "Enter your full name",
              },
              {
                label: "Phone Number",
                name: "phone",
                type: "tel",
                placeholder: "03XXXXXXXXX",
              },
              {
                label: "Address",
                name: "address",
                type: "text",
                placeholder: "Your address",
              },
              {
                label: "Department",
                name: "department",
                type: "text",
                placeholder: "Enter department name",
              },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  id={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={placeholder}
                  required
                />
              </div>
            ))}
            <div className="col-span-2">
              <label
                htmlFor="purpose"
                className="block mb-2 text-sm font-medium text-gray-800"
              >
                Purpose of Visit
              </label>
              <textarea
                rows="4"
                name="purpose"
                id="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Purpose of visit"
              />
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-medium rounded-lg px-5 py-2.5 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2 animate-spin"
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
      ) : (
        <div
        ref={contentRef}
        className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-xl mx-auto border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Beneficiary Details</h2>
        
        <div className="space-y-2 text-gray-700">
          <div>
            <span className="block text-sm font-medium text-gray-500">Name</span>
            <span className="block text-lg font-semibold">{beneficiary.name}</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-500">CNIC</span>
            <span className="block text-lg font-semibold">{beneficiary.cnic}</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-500">Token</span>
            <span className="block text-lg font-semibold">{beneficiary.token}</span>
          </div>
        </div>
        
        <div className="my-2">
          <QRCodeCanvas
            value={beneficiary.token}
            className="mx-auto w-32 h-32 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <button
          onClick={reactToPrintFn}
          className="mt-4 bg-green-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
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

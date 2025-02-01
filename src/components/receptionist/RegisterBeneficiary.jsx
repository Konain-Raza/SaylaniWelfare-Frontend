import React, { useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";
import { useReactToPrint } from "react-to-print";
import api from "../../axios";
import Button from "../common/Button";
import useStore from "../../Store/store";

const RegisterBeneficiary = () => {
  const { setBeneficiaries } = useStore();
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
    content: () => contentRef.current || null,
    documentTitle: `Beneficiary_Token`,
    onAfterPrint: () => console.log("Printing completed"),
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
      console.log(response);

      if (response.status === 201) {
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
        toast.success("Beneficiary registered successfully");

        setBeneficiaries(response.data.beneficiaries);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Error registering beneficiary";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 mx-auto">
      {!beneficiary ? (
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md sm:max-w-4xl p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Register Beneficiary
          </h1>
          <form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
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
                  className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-300"
                >
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  id={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-gray-800 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={placeholder}
                  required
                />
              </div>
            ))}
            <div className="col-span-2">
              <label
                htmlFor="purpose"
                className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-300"
              >
                Purpose of Visit
              </label>
              <textarea
                rows="4"
                name="purpose"
                id="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-gray-800 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Purpose of visit"
              />
            </div>
            <div className="col-span-2">
              <Button
                text="Register Beneficiary"
                disabled={loading}
                loading={loading}
                className="w-full bg-blue-600 text-white font-medium rounded-lg px-5 py-2.5 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>
      ) : (
        <div
          ref={contentRef}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center max-w-xl mx-auto border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2">
            Beneficiary Token
          </h2>

          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <div>
              <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Name
              </span>
              <span className="block text-lg font-semibold">
                {beneficiary.name}
              </span>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                CNIC
              </span>
              <span className="block text-lg font-semibold">
                {beneficiary.cnic}
              </span>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Token
              </span>
              <span className="block text-lg font-semibold">
                {beneficiary.token}
              </span>
            </div>
          </div>

          <div className="my-4">
            <QRCodeCanvas
              value={beneficiary.token}
              className="mx-auto w-32 h-32 p-2 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setBeneficiary(null)}
              className="bg-gray-500 dark:bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700"
            >
              Go Back
            </button>
            <button
              onClick={reactToPrintFn}
              className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-600 dark:hover:bg-green-700"
            >
              Print as PDF
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default RegisterBeneficiary;

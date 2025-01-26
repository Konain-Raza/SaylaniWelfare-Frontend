import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ManageUsers from "../components/admin/ManageUsers";
import UserDropdown from "../components/admin/UserDropdown";
import RegisterBeneficiary from "../components/receptionist/RegisterBeneficiary";
import UserRegistrationForm from "../components/admin/AddUsers";
import ViewBeneficiaries from "../components/receptionist/ViewBeneficiaries";
import ScanTokens from "../components/staff/ScanTokens";

const menus = {
  admin: [
    { name: "Dashboard", component: <div>Welcome to Admin Dashboard</div> },
    { name: "Manage Users", component: <ManageUsers /> },
    { name: "Add Users", component: <UserRegistrationForm /> },
    { name: "View Beneficiaries", component: <ViewBeneficiaries /> },
    { name: "Register Beneficiary", component: <RegisterBeneficiary /> },
  ],
  receptionist: [
    { name: "Register Beneficiary", component: <RegisterBeneficiary /> },
    { name: "View Beneficiaries", component: <ViewBeneficiaries /> },
  ],
  staff: [{ name: "Scan Tokens", component: <ScanTokens /> }],
};

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [activeComponent, setActiveComponent] = useState(<div className="text-center">Loading...</div>);
  const [selectedMenu, setSelectedMenu] = useState(0);

  useEffect(() => {
    const userFromLocation = location.state?.user || null;
    const userFromStorage = JSON.parse(localStorage.getItem("user") || "{}");
    const currentUser = userFromLocation || userFromStorage;

    if (!currentUser?.role) {
      navigate("/login"); // Redirect to login if no valid user found
    } else {
      setUser(currentUser);
      const roleKey = currentUser.role?.toLowerCase();
      const sidebarMenu = menus[roleKey] || [];
      setActiveComponent(sidebarMenu[0]?.component || <div className="text-center">No menu available for this role</div>);
    }
  }, [location, navigate]);

  const sidebarMenu = user?.role ? menus[user.role.toLowerCase()] : [];

  return (
    <div className="flex h-screen">
      <aside className="w-[20%] bg-gray-800 text-white flex-shrink-0">
        <div className="p-4 text-lg font-bold border-b border-gray-700">
          Saylani Welfare
        </div>
        <ul className="space-y-2 p-4">
          {sidebarMenu.map((menu, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  setActiveComponent(menu.component);
                  setSelectedMenu(index);
                }}
                className={`w-full text-left p-2 rounded-lg ${
                  selectedMenu === index ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                {menu.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="w-[80%] flex flex-col">
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-semibold">
            {user?.role
              ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard`
              : "Dashboard"}
          </span>
          <UserDropdown user={user || {name:"koanin", role:"akm", email:"Ki"}} />
        </nav>
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {activeComponent}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

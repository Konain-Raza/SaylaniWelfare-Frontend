import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStore from "../Store/store";
import ManageUsers from "../components/admin/ManageUsers";
import UserDropdown from "../components/admin/UserDropdown";
import RegisterBeneficiary from "../components/receptionist/RegisterBeneficiary";
import ViewBeneficiaries from "../components/receptionist/ViewBeneficiaries";
import ScanTokens from "../components/staff/ScanTokens";
import ChartsDashboard from "../components/admin/Charts";
import UserRegistrationForm from "../components/admin/AddUsers";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
const Dashboard = () => {
  const { user, setUser, userStats, beneficiaryStats } = useStore();
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const menus = {
    admin: [
      {
        name: "Dashboard Overview",
        component:
          beneficiaryStats && userStats ? (
            <ChartsDashboard />
          ) : (
            <div className="text-center">Loading Charts...</div>
          ),
      },
      {
        name: "User Management",
        subMenu: [
          { name: "All Users", component: <ManageUsers /> },
          { name: "Add New User", component: <UserRegistrationForm /> },
        ],
      },
      {
        name: "Beneficiary Services",
        subMenu: [
          { name: "All Beneficiaries", component: <ViewBeneficiaries /> },
          { name: "Register Beneficiary", component: <RegisterBeneficiary /> },
          { name: "Token Verification", component: <ScanTokens /> },
        ],
      },
    ],
    receptionist: [
      {
        name: "Beneficiary Services",
        subMenu: [
          {
            name: "Register Beneficiary",
            component: <RegisterBeneficiary />,
          },
          { name: "All Beneficiaries", component: <ViewBeneficiaries /> },
        ],
      },
    ],
    staff: [{ name: "Token Verification", component: <ScanTokens /> }],
  };

  useEffect(() => {
    const currentUser =
      location.state?.user ||
      JSON.parse(localStorage.getItem("authSmit") || "{}");
    if (!currentUser?.role) {
      navigate("/login");
    } else {
      setUser(currentUser);
    }
  }, [location, navigate, setUser]);

  useEffect(() => {
    if (user?.role) {
      const roleKey = user.role.toLowerCase();
      const firstMenu = menus[roleKey]?.[0];
      if (firstMenu) {
        setActiveComponent(firstMenu.component);
        setSelectedMenu(0);
      }
    }
  }, [user]);

  return (
    <div className="flex h-screen">
      <aside className="w-[20%] bg-white text-gray-800 flex-shrink-0 shadow-md">
        <div className="flex items-center flex-col p-5 text-xl font-bold border-b border-gray-200">
          <div className="inline-flex  items-star">
            {" "}
            <img
              src="https://saylaniwelfare.com/favicon.png"
              alt="Saylani Logo"
              className="w-8 h-8 mr-2"
            />
            Saylani Welfare
          </div>
        </div>
        <ul className="space-y-2 p-4">
          {user &&
            menus[user.role.toLowerCase()]?.map((menu, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    if (menu.subMenu) {
                      setExpandedMenu(expandedMenu === index ? null : index);
                    } else {
                      setActiveComponent(menu.component);
                      setSelectedMenu(index);
                    }
                  }}
                  className={`w-full text-left p-2 rounded-lg flex justify-between ${
                    selectedMenu === index
                      ? "bg-blue-100 text-blue-600 font-bold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {menu.name}
                  {menu.subMenu && (
                    <span>
                      {expandedMenu === index ? (
                        <ChevronUpIcon className="w-5 h-5 inline-block" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 inline-block" />
                      )}
                    </span>
                  )}
                </button>

                {menu.subMenu && expandedMenu === index && (
                  <ul className="ml-4 mt-2 space-y-2">
                    {menu.subMenu.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <button
                          onClick={() => {
                            setActiveComponent(sub.component);
                            setSelectedMenu(`${index}-${subIndex}`);
                          }}
                          className={`w-full text-left p-2 rounded-lg ${
                            selectedMenu === `${index}-${subIndex}`
                              ? "bg-blue-200 text-blue-700 font-bold"
                              : "hover:bg-gray-200"
                          }`}
                        >
                          {sub.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </aside>

      <div className="w-[80%] flex flex-col">
        <nav className="bg-white shadow px-6 py-2 flex justify-between items-center">
          <span className="text-xl font-semibold">
            {user?.role
              ? `${
                  user.role.charAt(0).toUpperCase() + user.role.slice(1)
                } Dashboard`
              : "Dashboard"}
          </span>
          <UserDropdown
            user={user || { name: "Guest", role: "Unknown", email: "N/A" }}
          />
        </nav>
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          {activeComponent}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

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
import { ChevronUpIcon, ChevronDownIcon, Bars3Icon, XMarkIcon,Bars3BottomLeftIcon, Bars3BottomRightIcon } from "@heroicons/react/24/solid";

const Dashboard = () => {
  const { user, setUser, userStats, beneficiaryStats } = useStore();
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [expandedMenu, setExpandedMenu] = useState(null);
  // const [selectedMenu, setSelectedMenu] = useState(null);
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

    <div className="flex h-screen relative">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-md z-50"
      >
        {isSidebarOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        )}
      </button>
    
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-[20%]`}
      >
        <div className="flex items-start flex-col p-5 text-xl font-bold border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-items-start items-center">
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
                      setIsSidebarOpen(false); 
                    }
                  }}
                  className={`w-full text-left p-2 rounded-lg flex justify-between ${
                    selectedMenu === index
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-bold"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
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
                            setIsSidebarOpen(false); // Close sidebar on mobile click
                          }}
                          className={`w-full text-left p-2 rounded-lg ${
                            selectedMenu === `${index}-${subIndex}`
                              ? "bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300 font-bold"
                              : "hover:bg-gray-200 dark:hover:bg-gray-700"
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
    
      {/* Main Content */}
      <div className="w-full md:w-[80%] flex flex-col">
        <nav className="bg-white dark:bg-gray-900 shadow px-6 py-2 flex items-center justify-between md:justify-between relative z-40">
          <span className="text-xl font-semibold dark:text-gray-200 whitespace-nowrap md:ml-0 ml-12">
            {user?.role
              ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard`
              : "Dashboard"}
          </span>
          <UserDropdown user={user || { name: "Guest", role: "Unknown", email: "N/A" }} />
        </nav>
        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-700 overflow-y-auto">
          {activeComponent}
        </main>
      </div>
    </div>


  );
};

export default Dashboard;

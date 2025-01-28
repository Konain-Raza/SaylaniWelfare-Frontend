import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../axios";
import ManageUsers from "../components/admin/ManageUsers";
import UserDropdown from "../components/admin/UserDropdown";
import RegisterBeneficiary from "../components/receptionist/RegisterBeneficiary";
import ViewBeneficiaries from "../components/receptionist/ViewBeneficiaries";
import ScanTokens from "../components/staff/ScanTokens";
import ChartsDashboard from "../components/admin/Charts";

const Dashboard = () => {
  const [beneficiaryStats, setBeneficiaryStats] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const menus = {
    admin: [
      {
        name: "Overview",
        component:
          beneficiaryStats && userStats ? (
            <ChartsDashboard
              beneficiaryData={beneficiaryStats}
              userData={userStats}
            />
          ) : (
            <div className="text-center">Loading Charts...</div>
          ),
      },
      { name: "User Management", component: <ManageUsers /> },
      { name: "Beneficiary Records", component: <ViewBeneficiaries /> },
      { name: "Register New Beneficiary", component: <RegisterBeneficiary /> },
    ],
    receptionist: [
      { name: "Add Beneficiary", component: <RegisterBeneficiary /> },
      { name: "Beneficiary Records", component: <ViewBeneficiaries /> },
    ],
    staff: [
      { name: "Scan Tokens", component: <ScanTokens /> },
    ],
  };
  

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [usersResponse, beneficiariesResponse] = await Promise.all([
          api.get("/api/user"),
          api.get("/api/beneficiary"),
        ]);

        const users = usersResponse.data || [];
        const beneficiaries = beneficiariesResponse.data || [];

        setUserStats({
          admin: users.filter((user) => user.role === "admin").length,
          receptionist: users.filter((user) => user.role === "Receptionist")
            .length,
          staff: users.filter((user) => user.role === "Staff").length,
        });

        setBeneficiaryStats({
          approved: beneficiaries.filter((b) => b.status === "approved").length,
          pending: beneficiaries.filter((b) => b.status === "Pending").length,
          rejected: beneficiaries.filter((b) => b.status === "rejected").length,
        });

        setError(null);
      } catch {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const userFromLocation = location.state?.user || null;
    const userFromStorage = JSON.parse(localStorage.getItem("user") || "{}");
    const currentUser = userFromLocation || userFromStorage;

    if (!currentUser?.role) {
      navigate("/login");
    } else {
      setUser(currentUser);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (user && beneficiaryStats && userStats) {
      const roleKey = user.role.toLowerCase();
      const sidebarMenu = menus[roleKey] || [];
      setActiveComponent(
        sidebarMenu[0]?.component || (
          <div className="text-center">No menu available for this role</div>
        )
      );
    }
  }, [user, beneficiaryStats, userStats]);

  if (loading || !activeComponent)
    return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="flex h-screen">
      <aside className="w-[20%] bg-white text-gray-800 flex-shrink-0 shadow-md">
        <div className="flex items-center p-4 pb-6 text-lg font-bold border-b border-gray-200">
          <img
            src="https://saylaniwelfare.com/favicon.png"
            alt="Saylani Logo"
            className="w-8 h-8 mr-2"
          />
          Saylani Welfare
        </div>
        <ul className="space-y-2 p-4">
          {user &&
            menus[user.role.toLowerCase()]?.map((menu, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setActiveComponent(menu.component);
                    setSelectedMenu(index);
                  }}
                  className={`w-full text-left p-2 rounded-lg  ${
                    selectedMenu === index
                      ? "bg-blue-100 text-blue-600 font-bold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {menu.name}
                </button>
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

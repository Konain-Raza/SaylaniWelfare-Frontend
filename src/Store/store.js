  import { create } from "zustand";

const useStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("authSmit"),
  user: JSON.parse(localStorage.getItem("authSmit")) || {},
  users: [],
  beneficiaries: [],
  userStats: {},
  beneficiaryStats: {},

  setAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated });
    if (!isAuthenticated) {
      localStorage.removeItem("authSmit");
      set({ user: {} });
    }
  },

  setUser: (user) => {
    set({ user });
    localStorage.setItem("authSmit", JSON.stringify(user));
  },

  setUsers: (users) => {
    set({ users });

    set({
      userStats: {
        admin: users.filter((u) => u.role === "admin").length,
        receptionist: users.filter((u) => u.role === "Receptionist").length,
        staff: users.filter((u) => u.role === "Staff").length,
      },
    });
  },

  setBeneficiaries: (beneficiaries) => {
    set({ beneficiaries });

    set({
      beneficiaryStats: {
        completed: beneficiaries.filter((b) => b.status === "Completed").length,
        pending: beneficiaries.filter((b) => b.status === "Pending").length,
        progress: beneficiaries.filter((b) => b.status === "In Progress").length,
      },
    });
  },
}));

export default useStore;

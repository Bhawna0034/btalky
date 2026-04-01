import { create } from "zustand";
import { fetcher } from "../lib/client/fetcher";
import { AuthStore } from "../types";

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  checkAuth: async () => {
    const res = await fetcher("/auth/check");
    set({ authUser: res, isCheckingAuth: false });
  },

  // signup: async (data) => {},
}));

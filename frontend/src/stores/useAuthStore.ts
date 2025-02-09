import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthStoreType } from "../types/auth.types";

const useAuthStore = create(
  persist<AuthStoreType>(
    (set) => ({
      account: null,
      setAuthUser: (account) => set({ account }),
      logoutUser: () => set({ account: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;

import { create } from "zustand";
import { User } from "../types";
import { checkAuth, login, logout } from "../services/authServices";
import { useCartStore } from "./cartStore";

type UserStore = {
  user: User | null;
  isAuthenticated: boolean;
  initialized: boolean;
  setInitialized: (value: boolean) => void;
  loading: boolean;
  login: (
    userInput: string,
    password: string,
    rememberMe: boolean,
    seller?: boolean
  ) => Promise<{ status: string; message: string }>;
  logout: () => Promise<{ status: string; message: string }>;
  // checkAuth: () => void;
  checkAuth: (force: boolean) => Promise<User | null>;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  initialized: false,
  setInitialized: (value) => set({ initialized: value }),
  loading: false,
  login: async (userInput, password, rememberMe, seller = false) => {
    set({ loading: true });
    try {
      const data = await login(userInput, password, rememberMe, seller);
      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
      sessionStorage.setItem("user", JSON.stringify(data.user));
      await useCartStore.getState().getCart();
      return { status: data.status, message: data.message };
    } catch (error) {
      set({ loading: false });
      return { status: "error", message: (error as Error).message };
    }
  },

  logout: async () => {
    try {
      const data = await logout();
      set({
        user: null,
        isAuthenticated: false,
      });
      sessionStorage.removeItem("user");
      useCartStore.getState().setCart([]);
      return { status: data.status, message: data.message };
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
      sessionStorage.removeItem("user");
      return {
        status: "error",
        message: (error as Error).message,
      };
    }
  },

  checkAuth: async (force = false) => {
    const { initialized } = get();
    if (initialized && !force) {
      return get().user;
    }
    if (!force) {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        set({ user, isAuthenticated: true, initialized: true });
        return user;
      }
    }
    try {
      const user = await checkAuth();
      if (user) {
        set({ user, isAuthenticated: true });
        sessionStorage.setItem("user", JSON.stringify(user));

        return user;
      } else {
        set({ user: null, isAuthenticated: false });
        useCartStore.getState().setCart([]);
        sessionStorage.removeItem("user");
        return null;
      }
    } catch {
      set({ user: null, isAuthenticated: false });
      sessionStorage.removeItem("user");
      useCartStore.getState().setCart([]);
      return null;
    } finally {
      set({ initialized: true });
    }
  },
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
    sessionStorage.setItem("user", JSON.stringify(user));
  },
  clearUser: () => {
    set({ user: null, isAuthenticated: false });
    sessionStorage.removeItem("user");
  },
}));

export default useUserStore;

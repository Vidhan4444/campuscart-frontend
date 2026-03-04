import { useCallback, useEffect, useMemo, useState } from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/cart");
      setCartCount(Array.isArray(data?.items) ? data.items.length : 0);
    } catch {
      setCartCount(0);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/auth/profile");
      setUser(data);
      await fetchCartCount();
    } catch {
      setUser(null);
      setCartCount(0);
    } finally {
      setAuthLoading(false);
    }
  }, [fetchCartCount]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const login = useCallback(async (payload) => {
    const { data } = await axiosInstance.post("/auth/login", payload);
    setUser(data.user);
    await fetchCartCount();
    return data;
  }, [fetchCartCount]);

  const signup = useCallback(async (payload) => {
    const { data } = await axiosInstance.post("/auth/register", payload);
    setUser(data.user);
    await fetchCartCount();
    return data;
  }, [fetchCartCount]);

  const logout = useCallback(async () => {
    await axiosInstance.post("/auth/logout");
    setUser(null);
    setCartCount(0);
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      authLoading,
      cartCount,
      fetchCartCount,
      login,
      signup,
      logout,
      refreshProfile,
    }),
    [user, authLoading, cartCount, fetchCartCount, login, logout, refreshProfile, signup]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = () => {
    try {
      const token = localStorage.getItem("alumnet-user");
      if (!token) {
        setUser(null);
        setLoading(false);
        return null;
      }
      setUser(JSON.parse(token));
    } catch (err) {
      console.error("User fetch failed", err);
      localStorage.removeItem("alumnet-user");
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loading,
        fetchUser,
        baseURL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

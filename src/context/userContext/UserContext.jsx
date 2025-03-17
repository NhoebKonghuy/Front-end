import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Import as a default import

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Use the default import
        return { ...decodedToken, token };
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        return null;
      }
    }
    return null;
  });

  useEffect(() => {    
    if (user) {
      localStorage.setItem("token", user.token);
    } else {
      localStorage.removeItem("token");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

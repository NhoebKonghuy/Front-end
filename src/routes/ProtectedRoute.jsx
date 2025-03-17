import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "../context/userContext/UserContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/profile" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import AdminPage from "../pages/admin/AdminPage";
import ManagePitchPage from "../pages/admin/managePitch/ManagePitchPage";
import ManageUsersPage from "../pages/admin/manageUser/ManageUserPage";
import ManageReport from "../pages/admin/manageReport/ManageReport";
import ReportPage from "../pages/report/ReportPage";
import AuthPage from "../pages/auth/AuthPage";
import Booking from "../pages/booking/Booking";
import ProtectedRoute from "./ProtectedRoute";
import { UserProvider } from "../context/userContext/UserContext";
import  PitchPage  from "../pages/pitch/PitchPage";

const RouteComponent = ({ role }) => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN_USER"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/manage-users" element={<ManageUsersPage />} />
      <Route path="/admin/manage-pitches" element={<ManagePitchPage />} />
      <Route path="/admin/manage-report" element={<ManageReport />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="/profile" element={<AuthPage />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/pitch" element={<PitchPage />} />
    </Routes>
  );
};

export default RouteComponent;

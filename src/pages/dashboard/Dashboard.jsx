import React, { useState, useEffect } from "react";
import { FaUsers, FaFutbol, FaCalendarCheck } from "react-icons/fa";
import "../../style/Style.css";
import { useDashboard } from "../../hooks/HookData";
const Dashboard = () => {
  // Simulated data
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalPitches, setTotalPitches] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const { dashboard, setDashboard, loading, error } = useDashboard();

  useEffect(() => {
    // Simulating API data fetching
    setTotalBookings(120);
    setTotalPitches(10);
    setTotalUsers(50);
  }, []);

  const dashboardData = [
    {
      id: 1,
      title: "Total Pitches",
      value: totalPitches,
      icon: <FaFutbol size={50} className="text-dark dashboard-icon" />,
      bgColor: "bg-light",
    },
    {
      id: 2,
      title: "Total Bookings",
      value: totalBookings,
      icon: <FaCalendarCheck size={50} className="text-dark dashboard-icon" />,
      bgColor: "bg-light",
    },
    {
      id: 3,
      title: "Total Users",
      value: totalUsers,
      icon: <FaUsers size={50} className="text-dark dashboard-icon" />,
      bgColor: "bg-light",
    },
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold text-dark mb-4 ">Admin Dashboard</h2>

      <div className="row justify-content-center">
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="card dashboard-card shadow-lg border-0 rounded-4 text-center bg-light">
            <div className="card-body d-flex flex-column align-items-center">
              <FaUsers size={50} className="text-dark dashboard-icon" />
              <h5 className="card-title fw-bold mt-3">Total Users</h5>
              <p className="display-4 fw-bold text-dark">
                {dashboard.totalUser}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-6 mb-4">
          <div className="card dashboard-card shadow-lg border-0 rounded-4 text-center bg-light">
            <div className="card-body d-flex flex-column align-items-center">
              <FaFutbol size={50} className="text-dark dashboard-icon" />
              <h5 className="card-title fw-bold mt-3">Total Pitchs</h5>
              <p className="display-4 fw-bold text-dark">
                {dashboard.totalPitch}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-6 mb-4">
          <div className="card dashboard-card shadow-lg border-0 rounded-4 text-center bg-light">
            <div className="card-body d-flex flex-column align-items-center">
              <FaCalendarCheck size={50} className="text-dark dashboard-icon" />
              <h5 className="card-title fw-bold mt-3">Total Bookings</h5>
              <p className="display-4 fw-bold text-dark">
                {dashboard.totalBooking}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

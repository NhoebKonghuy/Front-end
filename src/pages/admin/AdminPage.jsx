import React from "react";
import { Link } from "react-router-dom";
import { GrUserManager } from "react-icons/gr";
import { GiSoccerField } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import '../../style/Style.css';
import { IoSettings } from "react-icons/io5";
const AdminPage = () => {
  const adminOptions = [
    {
      id: 1,
      title: "Manage Users",
      description: "Add, edit, or remove users from the system.",
      icon: <GrUserManager size={80} className="text-black admin-icon" />,
      link: "/admin/manage-users",
    },
    {
      id: 2,
      title: "Manage Pitches",
      description: "Add, edit, or remove pitches from the system.",
      icon: <GiSoccerField size={80} className="text-black admin-icon" />,
      link: "/admin/manage-pitches",
    },
    {
      id: 3,
      title: "Manage Reports",
      description: "View and manage system reports.",
      icon: <TbReportSearch size={80} className="text-black admin-icon" />,
      link: "/admin/manage-report",
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold text-black mb-4"><IoSettings /> Admin Dashboard</h2>
      <div className="row justify-content-center">
        {adminOptions.map((option) => (
          <div key={option.id} className="col-md-4 col-sm-6 mb-4">
            <div className="card admin-card shadow-lg border-0 rounded-4 text-center">
              <div className="card-body d-flex flex-column align-items-center">
                {option.icon}
                <h5 className="card-title fw-bold mt-3">{option.title}</h5>
                <p className="card-text">{option.description}</p>
                <Link to={option.link} className="btn btn-outline-dark">
                  Go to {option.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;

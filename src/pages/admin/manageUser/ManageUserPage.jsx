import React from "react";
import { useUsers } from "../../../hooks/HookData";
import { useState } from "react";
import ApiClient from "../../../utils/ApiClient";
import { toast } from "react-toastify";
const ManageUserPage = () => {
  const { users, setUsers, loading, error } = useUsers();
  const [showTable, setShowTable] = useState("");
  const [currentUsrId, setCurrentUserId] = useState(null);
  const [newUser, setNewUsers] = useState({
    username: "",
    password: "",
    role: "",
  });

  const handleCreateUser = async () => {
    try {
      console.log("newUser: ", newUser);
      toast.error("Failed to update report", error);
      const response = await ApiClient.post("/admin/create-user", {
        username: newUser.username,
        password: newUser.password,
        role: newUser.role,
      });
      console.log("response: ", response);
      setUsers((prevUsers) => [
        ...prevUsers,
        {
          username: newUser.name,
          password: newUser.password,
          role: newUser.role,
        },
      ]);
      setNewUsers({ username: "", password: "", role: "" });
      setShowTable("");
    } catch (error) {
      console.error("Failed to add report", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await ApiClient.delete(`/admin/delete-user/${id}`);
      const filteredReports = users.filter((users) => users.id !== id);
      setUsers(filteredReports);
    } catch (error) {
      toast.error("Failed to delete user", error);
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await ApiClient.put(
        `/admin/update-user/${currentUsrId}`,
        {
          username: newUser.username,
          password: newUser.password,
          role: newUser.role,
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === currentUsrId
            ? {
                ...user,
                username: newUser.username,
                password: users.password,
                role: newUser.role,
              }
            : user
        )
      );
      setNewUsers({ username: "", password: "", role: "" });
    } catch (error) {
      toast.error("Failed to update report", error);
    }
  };

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
    <div className="col">
      <div
        className="card shadow-sm no-border"
        style={{
          height: "100%",
        }}
      >
        <div className="card-body text-center">
          <h5 className="fw-bold text-black mb-0"> Manage User</h5>

          <div className="kk">
            <button
              className="btn btn-dark d-flex align-items-center gap-2 shadow-sm"
              onClick={() => setShowTable("create-user")}
            >
              <i className="fas fa-plus"></i>+ Add New Report
            </button>

            <div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                {users.map((report, index) => {
                  return (
                    <tbody key={report.id}>
                      <tr>
                        <td>
                          <span>{index + 1}</span>
                        </td>

                        <td>
                          <span>{report.username}</span>
                        </td>
                        <td className="mb-2">{report.role}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn btn-secondary btn-sm me-2"
                              onClick={() => {
                                // setCurrentId(report.id); // Set the current report id first
                                setNewUsers({
                                  name: report.username,
                                  url: report.password,
                                  role: report.role,
                                }); // Set the newReport state with the selected report's data
                                setShowTable("update-user");
                                setCurrentUserId(report.id); // Then show the update modal
                              }}
                            >
                              <i className="fas fa-edit"></i> Edit
                            </button>
                            <button
                              className="btn btn-sm btn-dark"
                              onClick={() => handleDeleteUser(report.id)}
                            >
                              <i className="fas fa-trash"></i> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>

          {showTable === "create-user" && (
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content p-4 shadow-lg rounded-3">
                  <div className="position-absolute top-0 end-0 p-3">
                    <button
                      className="btn-close"
                      onClick={() => setShowTable("")}
                      aria-label="Close"
                    ></button>
                  </div>

                  <div className="modal-header border-0 text-center">
                    <h2 className="w-100 text-dark fw-bold">Add New User</h2>
                  </div>

                  <div className="modal-body">
                    <form>
                      <div className="mb-3 text-start">
                        <label className="form-label fw-semibold text-start d-block ms-1">
                          Username:
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          placeholder="Enter Report Name"
                          value={newUser.username}
                          onChange={(e) =>
                            setNewUsers({
                              ...newUser,
                              username: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mb-3 text-start">
                        <label className="form-label fw-semibold text-start d-block ms-1">
                          Password:
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          placeholder="Enter Report URL"
                          value={newUser.password}
                          onChange={(e) =>
                            setNewUsers({
                              ...newUser,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mb-3 text-start">
                        <label className="form-label fw-semibold text-start d-block ms-1">
                          Select User Role:
                        </label>
                        <select
                          id="userRole"
                          className="form-select shadow-sm"
                          value={newUser.role}
                          onChange={(e) =>
                            setNewUsers({ ...newUser, role: e.target.value })
                          }
                        >
                          <option value="ADMIN_USER">ADMIN_USER</option>
                          <option value="STAFF_USER">STAFF_USER</option>
                        </select>
                      </div>
                    </form>
                  </div>

                  <div className="modal-footer border-0 d-flex justify-content-end">
                    <button
                      className="btn btn-dark btn-sm ms-2 shadow-sm"
                      onClick={handleCreateUser}
                    >
                      Add User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showTable === "update-user" && (
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-4 shadow-lg rounded-3">
                  {/* Close Button */}
                  <div className="position-absolute top-0 end-0 p-2">
                    <button
                      className="btn-close"
                      onClick={() => setShowTable("")}
                      aria-label="Close"
                    ></button>
                  </div>

                  {/* Modal Header */}
                  <div className="modal-header border-0 text-center">
                    <h2 className="w-100 text-dark fw-bold">Add New Report</h2>
                  </div>

                  {/* Modal Body */}
                  <div className="modal-body">
                    <form>
                      <div className="mb-3 text-start">
                        <label className="form-label fw-semibold text-start d-block ms-1">
                          Username:
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          placeholder="Enter Username"
                          value={newUser.username}
                          onChange={(e) =>
                            setNewUsers({
                              ...newUser,
                              username: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mb-3 text-start">
                        <label className="form-label fw-semibold text-start d-block ms-1">
                          Password:
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          placeholder="Enter Report URL"
                          value={newUser.password}
                          onChange={(e) =>
                            setNewUsers({
                              ...newUser,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="mb-3 text-start">
                        <label className="form-label fw-semibold text-start d-block ms-1">
                          Select User Role:
                        </label>
                        <select
                          id="userRole"
                          className="form-select shadow-sm"
                          value={newUser.role}
                          onChange={(e) =>
                            setNewUsers({ ...newUser, role: e.target.value })
                          }
                        >
                          <option value="ADMIN_USER">ADMIN_USER</option>
                          <option value="STAFF_USER">STAFF_USER</option>
                        </select>
                      </div>
                    </form>
                  </div>

                  {/* Modal Footer */}
                  <div className="modal-footer border-0 d-flex justify-content-end">
                    <button
                      className="btn btn-dark btn-sm ms-2 shadow-sm"
                      onClick={() => {
                        handleUpdate();
                        setShowTable("");
                      }}
                    >
                      Update User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUserPage;

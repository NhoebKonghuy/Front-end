import React, { useState } from "react";
import { useUsers } from "../../../hooks/HookData";
import ApiClient from "../../../utils/ApiClient";
import { toast } from "react-toastify";

const ManageUserPage = () => {
  const { users, setUsers, loading, error } = useUsers();
  const [showTable, setShowTable] = useState("");
  const [currentUsrId, setCurrentUserId] = useState(null);
  const [loadingAction, setLoading] = useState(false);
  const [newUser, setNewUsers] = useState({
    username: "",
    password: "",
    role: "",
  });

  // Create New User
  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const response = await ApiClient.post("/admin/create-user", newUser);

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
      setShowTable("");
      toast.success("User created successfully!");
    } catch (error) {
      toast.error("Failed to add user");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    setLoading(true);
    try {
      await ApiClient.delete(`/admin/delete-user/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update User
  const handleUpdate = async () => {
    setLoading(true);
    try {
      await ApiClient.put(`/admin/update-user/${currentUsrId}`, newUser);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === currentUsrId ? { ...user, ...newUser } : user
        )
      );

      toast.success("User updated successfully!");
      setNewUsers({ username: "", password: "", role: "" });
      setShowTable("");
    } catch (error) {
      toast.error("Failed to update user");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || loadingAction) {
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
      <div className="card shadow-sm no-border" style={{ height: "100%" }}>
        <div className="card-body text-start p-4 pb-0 d-flex flex-column gap-3 h-100 justify-content-between bg-light rounded-3">
          <h2 className="fw-bold text-black mb-3 text-center">Manage Users</h2>
          <div>
            <button
              className="btn btn-dark d-flex align-items-center gap-2 shadow-sm mb-3"
              onClick={() => setShowTable("create-user")}
            >
              <i className="fas fa-plus"></i> + Add New User
            </button>
          </div>

          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Role</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-secondary btn-sm me-2"
                      onClick={() => {
                        setNewUsers({
                          username: user.username,
                          password: user.password, // Corrected
                          role: user.role,
                        });
                        setCurrentUserId(user.id);
                        setShowTable("update-user");
                      }}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Create User Modal */}
          {showTable === "create-user" && (
            <div className="modal fade show d-block">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-4 shadow-lg rounded-3">
                  <button
                    className="btn-close position-absolute top-0 end-0 p-3"
                    onClick={() => setShowTable("")}
                  ></button>

                  <h2 className="text-dark fw-bold text-center">
                    Add New User
                  </h2>

                  <div className="modal-body">
                    <label className="form-label">Username:</label>
                    <input
                      type="text"
                      className="form-control shadow-sm mb-3"
                      value={newUser.username}
                      onChange={(e) =>
                        setNewUsers({ ...newUser, username: e.target.value })
                      }
                    />

                    <label className="form-label">Password:</label>
                    <input
                      type="password"
                      className="form-control shadow-sm mb-3"
                      value={newUser.password}
                      onChange={(e) =>
                        setNewUsers({ ...newUser, password: e.target.value })
                      }
                    />

                    <label className="form-label">Role:</label>
                    <select
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

                  <div className="modal-footer">
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={handleCreateUser}
                    >
                      Add User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Update User Modal */}
          {showTable === "update-user" && (
            <div className="modal fade show d-block">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-4 shadow-lg rounded-3">
                  <button
                    className="btn-close position-absolute top-0 end-0 p-3"
                    onClick={() => setShowTable("")}
                  ></button>

                  <h2 className="text-dark fw-bold text-center">Update User</h2>

                  <div className="modal-body">
                    <label className="form-label">Username:</label>
                    <input
                      type="text"
                      className="form-control shadow-sm mb-3"
                      value={newUser.username}
                      onChange={(e) =>
                        setNewUsers({ ...newUser, username: e.target.value })
                      }
                    />

                    <label className="form-label">Password:</label>
                    <input
                      type="password"
                      className="form-control shadow-sm mb-3"
                      value={newUser.password}
                      onChange={(e) =>
                        setNewUsers({ ...newUser, password: e.target.value })
                      }
                    />

                    <label className="form-label">Role:</label>
                    <select
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

                  <div className="modal-footer">
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={handleUpdate}
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

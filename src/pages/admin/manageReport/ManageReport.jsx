import React, { useState } from "react";
import { toast } from "react-toastify";
import { useReports } from "../../../hooks/HookData";
import ApiClient from "../../../utils/ApiClient";

const ManageReport = () => {
  const { reports, setReports, loading, error } = useReports();
  const [showTable, setShowTable] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [newReport, setNewReport] = useState({
    name: "",
    url: "",
  });

  // Delete Report
  const handleDeleteAPI = async (id) => {
    setLoadingAction(true);
    try {
      await ApiClient.delete(`/admin/delete-report/${id}`);
      setReports((prevReports) =>
        prevReports.filter((report) => report.id !== id)
      );
      toast.success("Report deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete report");
      console.error("Error deleting report:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  // Create New Report
  const handleAddNewAPI = async () => {
    if (!newReport.name || !newReport.url) {
      toast.warning("Please fill all fields");
      return;
    }

    setLoadingAction(true);
    try {
      const response = await ApiClient.post("/admin/create-report", {
        username: newReport.name,
        reportUrl: newReport.url,
      });

      if (response?.data) {
        setReports((prevReports) => [
          ...prevReports,
          { username: newReport.name, reportUrl: newReport.url },
        ]);
        toast.success("Report added successfully!");
        handleCloseModal();
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      toast.error("Failed to add report");
      console.error("Error adding report:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  // Update Report
  const handleUpdateReport = async () => {
    if (!newReport.name || !newReport.url) {
      toast.warning("Please fill all fields");
      return;
    }

    setLoadingAction(true);
    try {
      await ApiClient.put(`/admin/update-report/${currentId}`, {
        username: newReport.name,
        reportUrl: newReport.url,
      });

      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === currentId
            ? { ...report, username: newReport.name, reportUrl: newReport.url }
            : report
        )
      );

      toast.success("Report updated successfully!");
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to update report");
      console.error("Error updating report:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  // Close Modal and Reset State
  const handleCloseModal = () => {
    setShowTable("");
    setCurrentId(null);
    setNewReport({ name: "", url: "" });
  };

  // Show loading spinner
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
        <div className="card-body text-center p-4 pb-0 d-flex flex-column gap-3 h-100 justify-content-between bg-light rounded-3">
          <h5 className="fw-bold text-black mb-3">Manage Reports</h5>

          <div>
            <button
              className="btn btn-dark d-flex align-items-center gap-2 shadow-sm mb-3"
              onClick={() => setShowTable("add-report")}
            >
              <i className="fas fa-plus"></i> + Add New Report
            </button>
          </div>

          {/* Reports Table */}
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>URL</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report.id}>
                  <td>{index + 1}</td>
                  <td>{report.username}</td>
                  <td className="text-truncate" style={{ maxWidth: "300px" }}>
                    {report.reportUrl}
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-secondary btn-sm me-2"
                      onClick={() => {
                        setCurrentId(report.id);
                        setNewReport({
                          name: report.username,
                          url: report.reportUrl,
                        });
                        setShowTable("update-report");
                      }}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() => handleDeleteAPI(report.id)}
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for Adding / Updating Report */}
          {showTable && (
            <div className="modal fade show d-block">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-4 shadow-lg rounded-3">
                  <button
                    className="btn-close position-absolute top-0 end-0 p-3"
                    onClick={handleCloseModal}
                  ></button>

                  <h2 className="text-dark fw-bold text-center">
                    {showTable === "add-report"
                      ? "Add New Report"
                      : "Update Report"}
                  </h2>

                  <div className="modal-body">
                    <label className="form-label">Report Name:</label>
                    <input
                      type="text"
                      className="form-control shadow-sm mb-3"
                      placeholder="Enter Report Name"
                      value={newReport.name}
                      onChange={(e) =>
                        setNewReport({ ...newReport, name: e.target.value })
                      }
                    />

                    <label className="form-label">Report URL:</label>
                    <input
                      type="text"
                      className="form-control shadow-sm mb-3"
                      placeholder="Enter Report URL"
                      value={newReport.url}
                      onChange={(e) =>
                        setNewReport({ ...newReport, url: e.target.value })
                      }
                    />
                  </div>

                  <div className="modal-footer">
                    {showTable === "add-report" ? (
                      <button
                        className="btn btn-dark btn-sm"
                        onClick={handleAddNewAPI}
                      >
                        Add Report
                      </button>
                    ) : (
                      <button
                        className="btn btn-dark btn-sm"
                        onClick={handleUpdateReport}
                      >
                        Update Report
                      </button>
                    )}
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

export default ManageReport;

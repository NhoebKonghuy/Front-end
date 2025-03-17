import React from "react";
import { GiSoccerField } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../../../style/ListStyle.css";
import ApiClient from "../../../utils/ApiClient";
import { useReports } from "../../../hooks/HookData";
import { toast } from "react-toastify";
const ManageReport = () => {
  const { reports, setReports, loading, error } = useReports();
  const [ShowTable, setShowTable] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [newReport, setNewReport] = useState([
    {
      name: "",
      url: "",
    },
  ]);

  const handleDeleteAPI = async (id) => {
    try {
      await ApiClient.delete(`/admin/delete-report/${id}`);
      const filteredReports = reports.filter((report) => report.id !== id);
      setReports(filteredReports);
    } catch (error) {
      console.error("Failed to delete report", error);
    }
  };

  const handleAddNewAPI = async () => {
    try {
      const response = await ApiClient.post("/admin/create-report", {
        username: newReport.name,
        reportUrl: newReport.url,
      });
      setReports((prevReports) => [
        ...prevReports,
        { username: newReport.name, reportUrl: newReport.url },
      ]);
      setNewReport({ name: "", url: "" });
      setShowTable("");
    } catch (error) {
      console.error("Failed to add report", error);
    }
  };

  const handleUpdateReport = async () => {
    if (currentId === null) return; // Make sure we have the correct report ID to update

    try {
      if (newReport.name === "" || newReport.url === "") {
        alert("Please fill all the fields");
        return;
      } else {
        const response = await ApiClient.put(
          `/admin/update-report/${currentId}`,
          {
            username: newReport.name,
            reportUrl: newReport.url,
          }
        );
      }

      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === currentId
            ? { ...report, username: newReport.name, reportUrl: newReport.url }
            : report
        )
      );
      setNewReport({ name: "", url: "" });
      setShowTable("");
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
          <h5 className="fw-bold text-black mb-0"> Manage Reports</h5>
          {ShowTable === "manageReport" && (
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
                    <h2 className="w-100 text-dark fw-bold">Add New Report</h2>
                  </div>

                  <div className="modal-body">
                    <form>
                      <div className="mb-3 text-start">
                        <label className="form-label fw-semibold">
                          Report Name:
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          placeholder="Enter Report Name"
                          value={newReport.name}
                          onChange={(e) =>
                            setNewReport({ ...newReport, name: e.target.value })
                          }
                        />
                      </div>

                      <div className="mb-3 text-start">
                        <label className="form-label fw-semibold text-start d-block ms-1">
                          Report URL:
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          placeholder="Enter Report URL"
                          value={newReport.url}
                          onChange={(e) =>
                            setNewReport({ ...newReport, url: e.target.value })
                          }
                        />
                      </div>
                    </form>
                  </div>

                  <div className="modal-footer border-0 d-flex justify-content-end">
                    <button
                      className="btn btn-dark btn-sm ms-2 shadow-sm"
                      onClick={handleAddNewAPI}
                    >
                      Add Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {ShowTable === "update-report" && (
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content p-4 shadow-lg rounded-3">
                  {/* Close Button */}
                  <div className="position-absolute top-0 end-0 p-3">
                    <button
                      className="btn-close"
                      onClick={() => {
                        setShowTable(""),
                          setCurrentId(null),
                          setNewReport({
                            name: null,
                            url: null,
                          });
                      }}
                      aria-label="Close"
                    ></button>
                  </div>

                  {/* Modal Header */}
                  <div className="modal-header border-0 text-center">
                    <h2 className="w-100 text-dark fw-bold">Update User</h2>
                  </div>

                  {/* Modal Body */}
                  <div className="modal-body">
                    <form>
                      <div className="mb-3 text-start">
                        <label className="form-label fw-semibold text-start d-block ms-1">
                          Report Name:
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          placeholder="Enter Report Name"
                          value={newReport.name}
                          onChange={(e) =>
                            setNewReport({ ...newReport, name: e.target.value })
                          }
                        />
                      </div>

                      <div className="mb-3 text-start">
                        <label className="form-label fw-semibold text-start d-block ms-1">
                          Report URL:
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-sm"
                          placeholder="Enter Report URL"
                          value={newReport.url}
                          onChange={(e) =>
                            setNewReport({ ...newReport, url: e.target.value })
                          }
                        />
                      </div>
                    </form>
                  </div>

                  {/* Modal Footer */}
                  <div className="modal-footer border-0 d-flex justify-content-end">
                    <button
                      className="btn btn-dark btn-sm ms-2 shadow-sm"
                      onClick={handleUpdateReport}
                    >
                      Update Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="kk card-body">
            <button
              className="btn btn-dark d-flex align-items-center gap-2 shadow-sm"
              onClick={() => setShowTable("manageReport")}
            >
              <i className="fas fa-plus"></i>+ Add New Report
            </button>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Url</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report, index) => {
                    return (
                      <tr key={report.id}>
                        {" "}
                        {/* Apply the key here */}
                        <td>
                          <span>{index + 1}</span>
                        </td>
                        <td>
                          <span>{report.username}</span>
                        </td>
                        <td className="mb-2">{report.reportUrl}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn btn-secondary btn-sm me-2"
                              onClick={() => {
                                setCurrentId(report.id); // Set the current report id first
                                setNewReport({
                                  name: report.username,
                                  url: report.reportUrl,
                                }); // Set the newReport state with the selected report's data
                                setShowTable("update-report"); // Then show the update modal
                              }}
                            >
                              <i className="fas fa-edit"></i> Edit
                            </button>
                            <button
                              className="btn btn-sm btn-dark"
                              onClick={() => handleDeleteAPI(report.id)}
                            >
                              <i className="fas fa-trash"></i> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageReport;

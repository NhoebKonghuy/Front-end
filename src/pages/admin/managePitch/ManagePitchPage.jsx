import React from "react";
import { useReports } from "../../../hooks/HookData";
import { useState } from "react";
import ApiClient from "../../../utils/ApiClient";

const ManagePitchPage = () => {
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
      console.error("Failed to update report", error);
    }
  };

  return (
    <div className="col">
      <div
        className="card shadow-sm no-border"
        style={{
          height: "100%",
        }}
      >
        <div className="card-body text-center">
          <h5 className="fw-bold text-black mb-0"> Manage Pitchs</h5>
          {ShowTable === "manageReport" && (
            <div
              className="modal-dialog modal-dialog-scrollable"
              style={{
                position: "absolute",
                display: "block",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, 30%)",
                backgroundColor: "white",
                border: "1px solid lightgray",
                borderRadius: "10px",
              }}
            >
              <div
                className="modal-content p-4"
                style={{
                  borderRadius: "10px",
                  margin: "0px 0px 0px 0px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                  }}
                >
                  <button
                    className="btn-close"
                    onClick={() => setShowTable("")}
                    aria-label="Close"
                  ></button>
                </div>

                <div
                  className="modal-header"
                  style={{ marginBottom: "10px", marginTop: "20px" }}
                >
                  <h2 className="text-center w-100">Add New Report</h2>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Report Name"
                        value={newReport.name}
                        onChange={(e) =>
                          setNewReport({ ...newReport, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Report URL"
                        value={newReport.url}
                        onChange={(e) =>
                          setNewReport({ ...newReport, url: e.target.value })
                        }
                      />
                    </div>
                  </form>
                </div>
                <div
                  className="modal-footer d-flex justify-content-end"
                  style={{ marginTop: "20px" }}
                >
                  <button
                    className="btn btn-dark btn-sm me-2"
                    onClick={handleAddNewAPI}
                  >
                    Add Pitch
                  </button>
                </div>
              </div>
            </div>
          )}

          {ShowTable === "update-report" && (
            <div
              className="modal-dialog modal-dialog-scrollable"
              style={{
                position: "absolute",
                display: "block",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, 30%)",
                backgroundColor: "white",
                border: "1px solid lightgray",
                borderRadius: "10px",
              }}
            >
              <div
                className="modal-content p-4"
                style={{
                  borderRadius: "10px",
                  margin: "0px 0px 0px 0px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                  }}
                >
                  <button
                    className="btn-close"
                    onClick={() => {
                      setShowTable("");
                    }}
                    aria-label="Close"
                  ></button>
                </div>

                <div
                  className="modal-header"
                  style={{ marginBottom: "10px", marginTop: "20px" }}
                >
                  <h2 className="text-center w-100">Update Pitch</h2>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Report Name"
                        value={newReport.name}
                        onChange={(e) =>
                          setNewReport({ ...newReport, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Report URL"
                        value={newReport.url}
                        onChange={(e) =>
                          setNewReport({ ...newReport, url: e.target.value })
                        }
                      />
                    </div>
                  </form>
                </div>
                <div
                  className="modal-footer d-flex justify-content-end"
                  style={{ marginTop: "20px" }}
                >
                  <button
                    className="btn btn-secondary btn-sm me-2"
                    onClick={handleUpdateReport}
                  >
                    Update Report
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="kk">
            <button
              className="btn btn-dark d-flex align-items-center gap-2 shadow-sm"
              onClick={() => setShowTable("manageReport")}
            >
              <i className="fas fa-plus"></i>+ Add New Pitch
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
                {reports.map((report, index) => {
                  return (
                    <tbody key={report.id}>
                      <tr>
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
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePitchPage;

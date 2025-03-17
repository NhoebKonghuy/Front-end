import React from "react";

const Booking = () => {
  const booking = [
    {
      id: 1,
      username: "John Doe",
      reportUrl: "https://example.com/report1",
    },
    {
      id: 7,
      username: "John Doe",
      reportUrl: "https://example.com/report1",
    },
  ];
  return (
    <div className="col">
      <div
        className="card shadow-sm no-border"
        style={{
          height: "100%",
        }}
      >
        <div className="card-body text-center">
          <div className="kk">
            <h3 className="fw-bold text-black mb-0">Pennding Booking</h3>
            
            <div style={{ paddingTop: "30px" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Pitch No</th>
                    <th scope="col">Booking By</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                {booking.map((report, index) => {
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
                        <td className="mb-2">100$</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn btn-secondary btn-sm me-2"
                              //   onClick={() => {
                              //     setCurrentId(report.id); // Set the current report id first
                              //     setNewReport({
                              //       name: report.username,
                              //       url: report.reportUrl,
                              //     }); // Set the newReport state with the selected report's data
                              //     setShowTable("update-report"); // Then show the update modal
                              //   }}
                            >
                              <i className="fas fa-edit"></i> Accept
                            </button>
                            <button
                              className="btn btn-sm btn-dark"
                              //   onClick={() => handleDeleteAPI(report.id)}
                            >
                              <i className="fas fa-trash"></i> Reject
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

export default Booking;

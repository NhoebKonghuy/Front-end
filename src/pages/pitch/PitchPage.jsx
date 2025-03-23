import React, { useState } from "react";
import { usePitches } from "/src/hooks/HookData";

const PitchPage = () => {
  const [selectedPitchId, setSelectedPitchId] = useState(null);
  const { pitches, loading, error } = usePitches();

  return (
    <div className="col">
      <div className="card shadow-sm no-border" style={{ height: "100%" }}>
        <div className="card-body text-center">
          <h3 className="fw-bold text-black mb-0">Pending Bookings</h3>

          <div style={{ paddingTop: "30px" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Field No</th>
                  <th>Field Type</th>
                  <th>Capacity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pitches.map((pitch, index) => (
                  <React.Fragment key={pitch.id}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{pitch.fieldNo}</td>
                      <td>{pitch.fieldType}</td>
                      <td>{pitch.fieldCapacity}</td>
                      <td>{pitch.price}$</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-light btn-sm me-2 border"
                            onClick={() =>
                              setSelectedPitchId(
                                selectedPitchId === pitch.id ? null : pitch.id
                              )
                            }
                          >
                            <i className="fas fa-eye"></i> View
                          </button>
                          <button className="btn btn-sm btn-secondary">
                            <i className="fas fa-edit"></i> Edit
                          </button>
                          <button className="btn btn-sm btn-dark">
                            <i className="fas fa-trash"></i> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    {selectedPitchId === pitch.id && (
                      <tr>
                        <td colSpan="6">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Time Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pitch.matchModel.map((match, index) => (
                                <tr key={match.id}>
                                  <td>{index + 1}</td>
                                  <td>{match.startTime}</td>
                                  <td>{match.endTime}</td>
                                  <td>{match.timeStatus}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchPage;

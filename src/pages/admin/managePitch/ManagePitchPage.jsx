import React, { useState } from "react";
import { usePitches } from "../../../hooks/HookData";
import { toast } from "react-toastify";
import ApiClient from "../../../utils/ApiClient";

const ManagePitchPage = () => {
  const [selectedPitchId, setSelectedPitchId] = useState(null);
  const [showTable, setShowTable] = useState("");
  const [viewingMatches, setViewingMatches] = useState(false);
  const [matches, setMatches] = useState([]);
  const [loadingAction, setLoadingAction] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [newPitch, setNewPitch] = useState({
    fieldNo: 0,
    fieldType: "MEDIUM",
    fieldCapacity: 0,
    price: 0,
  });
  const [newMatch, setNewMatch] = useState({
    pitchId: 0,
    matchNo: 0,
    startTime: "", // Change to an empty string to hold time in HH:mm format
    endTime: "", // Change to an empty string to hold time in HH:mm format
    timeStatus: "MORNING",
  });

  const { pitches, loading, error, setPitches } = usePitches();

  const convertToTimestamp = (timeString) => {
    if (!timeString) return null;

    const today = new Date();
    const [hours, minutes] = timeString.split(":");
    today.setHours(hours);
    today.setMinutes(minutes);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today.getTime(); // returns the timestamp in milliseconds
  };
  const handleCloseModal = () => {
    setShowTable("");
    setCurrentId(null);
    setIsEditing(false);
    setShowModal(false);
    setNewPitch({
      fieldNo: 0,
      fieldType: "MEDIUM",
      fieldCapacity: 0,
      price: 0,
    });
  };

  const handleAddNewPitch = async () => {
    setLoadingAction(true);
    if (
      !newPitch.fieldNo ||
      !newPitch.fieldType ||
      !newPitch.fieldCapacity ||
      !newPitch.price
    ) {
      toast.warning("Please fill in all fields");
      return;
    }
    const formattedPitch = {
      fieldNo: newPitch.fieldNo,
      fieldType: newPitch.fieldType,
      fieldCapacity: newPitch.fieldCapacity,
      price: newPitch.price,
    };
    console.log("newPitch:", formattedPitch);

    try {
      const response = await ApiClient.post(
        "/admin/create-pitch",
        formattedPitch
      );
      setPitches((prevPitches) => [
        ...prevPitches,
        {
          fieldNo: newPitch.fieldNo,
          fieldCapacity: newPitch.fieldCapacity,
          fieldType: newPitch.fieldType,
          price: newPitch.price,
        },
      ]);
      toast.success("Pitch added successfully!");
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to add pitch");
      console.error("Error adding pitch:", error);
    } finally {
      setLoadingAction(false);
    }
  };
  const handleDeleteAPI = async (id) => {
    setLoadingAction(true);
    try {
      await ApiClient.delete(`/admin/delete-pitch/${id}`);
      setPitches(pitches.filter((pitch) => pitch.id !== id));
      toast.success("Pitch deleted successfully!");
    } catch (error) {
      toast.error("Please Delete Match of this Fitch First!!");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleUpdatePitch = async () => {
    setLoadingAction(true);
    try {
      await ApiClient.put(`/admin/update-pitch/${currentId}`, newPitch);
      setPitches((prevPitches) =>
        prevPitches.map((pitch) =>
          pitch.id === currentId ? { ...pitch, ...newPitch } : pitch
        )
      );
      toast.success("Pitch updated successfully!");
      setShowTable("");
    } catch (error) {
      toast.error("Failed to update pitch");
      console.error("Error updating pitch:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleAddNewMatch = async () => {
    setLoadingAction(true);
    if (!newMatch.startTime || !newMatch.endTime || !newMatch.timeStatus) {
      toast.warning("Please fill in all fields");
      return;
    }
    const startTimestamp = convertToTimestamp(newMatch.startTime);
    const endTimestamp = convertToTimestamp(newMatch.endTime);
    const formattedMatch = {
      pitchId: selectedPitchId,
      matchNo: newMatch.matchNo,
      startTime: startTimestamp,
      endTime: endTimestamp,
      timeStatus: newMatch.timeStatus,
    };

    console.log("newMatch:", formattedMatch);
    const pitch = pitches.find((pitch) => pitch.id === selectedPitchId);
    try {
      const response = await ApiClient.post(
        `/admin/create-match/${selectedPitchId}`,
        formattedMatch
      );
      setPitches((prevPitches) =>
        prevPitches.map((pitch) =>
          pitch.id === selectedPitchId
            ? {
                ...pitch,
                matchModel: [...pitch.matchModel, formattedMatch],
              }
            : pitch
        )
      );
      toast.success("Match added successfully!");
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to add match");
      console.error("Error adding match:", error);
    } finally {
      setLoadingAction(false);
    }
  };
  const handleUpdateMatch = async () => {
    console.log("Update Match:", newMatch);
    setLoadingAction(true);
    const startTimestamp = convertToTimestamp(newMatch.startTime);
    const endTimestamp = convertToTimestamp(newMatch.endTime);
    const formattedMatch = {
      pitchId: currentId,
      matchNo: newMatch.matchNo,
      startTime: startTimestamp,
      endTime: endTimestamp,
      timeStatus: newMatch.timeStatus,
    };
    try {
      await ApiClient.put(`/admin/update-match/${currentId}`, formattedMatch);
      setMatches((prevMatches) =>
        prevMatches.map((match) =>
          match.id === currentId ? { ...match, ...newMatch } : match
        )
      );
      toast.success("Match updated successfully!");
      setShowTable("");
    } catch (error) {
      toast.error("Failed to update match");
      console.error("Error updating match:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteMatch = async (id) => {
    setLoadingAction(true);
    try {
      await ApiClient.delete(`/admin/delete-match/${id}`);
      // Update the matches state
      setMatches(matches.filter((match) => match.id !== id));

      // Update the pitches state to reflect the deleted match
      setPitches((prevPitches) =>
        prevPitches.map((pitch) =>
          pitch.id === selectedPitchId
            ? {
                ...pitch,
                matchModel: pitch.matchModel.filter((match) => match.id !== id),
              }
            : pitch
        )
      );

      toast.success("Match deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete match");
      console.error("Error:", error);
    } finally {
      setLoadingAction(false);
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
        <div className="card-body text-center p-4 pb-0 d-flex flex-column gap-3 h-100 justify-content-between bg-light rounded-3">
          {/* Header with Back Button */}
          <div className="d-flex justify-content-between align-items-center">
            {viewingMatches ? (
              <>
                <button
                  className="btn btn-secondary"
                  onClick={() => setViewingMatches(false)}
                >
                  <i className="fas fa-arrow-left"></i> ← Back
                </button>
                <h3 className="fw-bold text-black mb-0 text-center flex-grow-1">
                  Pitches Number:{" "}
                  {
                    pitches.find((pitch) => pitch.id === selectedPitchId)
                      ?.fieldNo
                  }
                </h3>
              </>
            ) : (
              <h2 className="fw-bold text-black mb-0 text-center flex-grow-1">
                Pending Bookings
              </h2>
            )}
          </div>

          {/* Add New Pitch Button (Only When Viewing Pitches) */}
          {!viewingMatches && (
            <div>
              {" "}
              <button
                className="btn btn-dark d-flex align-items-center gap-2 shadow-sm mt-3"
                onClick={() => setShowTable("add-pitch")}
              >
                <i className="fas fa-plus"></i>+ Add New Pitch
              </button>
            </div>
          )}

          <div style={{ paddingTop: "20px" }}>
            {/* Show Pitches List if Not Viewing Matches */}
            {!viewingMatches ? (
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Field No</th>
                    <th>Field Type</th>
                    <th>Capacity</th>
                    <th>Price</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pitches.map((pitch) => (
                    <tr key={pitch.id}>
                      {" "}
                      {/* Ensure key is unique */}
                      <td>{pitch.fieldNo}</td>
                      <td>{pitch.fieldType}</td>
                      <td>{pitch.fieldCapacity}</td>
                      <td>{pitch.price}$</td>
                      <td className="text-end">
                        <div className="action-buttons d-flex justify-content-end gap-2">
                          <button
                            className="btn btn-light btn-sm border"
                            onClick={() => {
                              setSelectedPitchId(pitch.id);
                              setViewingMatches(true);
                            }}
                          >
                            <i className="fas fa-eye"></i> View Match
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => {
                              setShowTable("update-pitch");
                              setCurrentId(pitch.id);
                              setNewPitch({
                                fieldNo: pitch.fieldNo,
                                fieldCapacity: pitch.fieldCapacity,
                                fieldType: pitch.fieldType,
                                price: pitch.price,
                              });
                              setIsEditing(true);
                            }}
                          >
                            <i className="fas fa-edit"></i> Edit
                          </button>
                          <button
                            className="btn btn-sm btn-dark"
                            onClick={() => handleDeleteAPI(pitch.id)}
                          >
                            <i className="fas fa-trash"></i> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              // Show Matches List if Viewing Matches
              <div className="mt-3 mb-0 table-responsive border-0 shadow-sm p-3 bg-white">
                <button
                  className="btn btn-dark d-flex align-items-center gap-2 shadow-sm mb-3"
                  onClick={() => {
                    setNewMatch({
                      pitchId: selectedPitchId,
                      matchNo: 0,
                      startTime: 0,
                      endTime: 0,
                      timeStatus: "MORNING",
                    });
                    setShowTable("add-match");
                  }}
                >
                  <i className="fas fa-plus"></i>+ Add New Match
                </button>
                <table className="table table-striped table-bordered mt-3 mb-0">
                  <thead>
                    <tr>
                      <th>Match No</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Time Status</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pitches
                      .find((pitch) => pitch.id === selectedPitchId)
                      ?.matchModel.map((match, index) => (
                        <tr key={match.id}>
                          <td>{match.matchNo}</td>
                          <td>{match.startTime}</td>
                          <td>{match.endTime}</td>
                          <td>{match.timeStatus}</td>
                          <td>
                            <div className="action-buttons d-flex justify-content-end gap-2">
                              <button
                                className="btn btn-sm btn-secondary"
                                onClick={() => {
                                  setShowTable("update-match"); // Show the edit match modal
                                  setCurrentId(match.id); // Set the current match ID
                                  setNewMatch({
                                    pitchId: selectedPitchId,
                                    matchNo: match.matchNo,
                                    startTime: match.startTime,
                                    endTime: match.endTime,
                                    timeStatus: match.timeStatus,
                                  }); // Populate the modal with match data
                                  setIsEditing(true); // Set editing mode
                                }}
                              >
                                <i className="fas fa-edit"></i>
                                Edit
                              </button>

                              <button
                                className="btn btn-sm btn-dark"
                                onClick={() => handleDeleteMatch(match.id)}
                              >
                                <i className="fas fa-trash"></i> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {(showTable === "add-pitch" || showTable === "update-pitch") && (
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-4 shadow-lg rounded-3">
                <button
                  className="btn-close position-absolute top-0 end-0 p-3"
                  onClick={handleCloseModal}
                ></button>

                <h2 className="text-dark fw-bold text-center">
                  {showTable === "add-pitch" ? "Add New Pitch" : "Update Pitch"}
                </h2>

                <div className="modal-body">
                  <label className="form-label">Pitch Number:</label>
                  <input
                    type="tnumber"
                    className="form-control shadow-sm mb-3"
                    placeholder="Enter Report Name"
                    value={newPitch.fieldNo}
                    onChange={(e) =>
                      setNewPitch({
                        ...newPitch,
                        fieldNo: e.target.value,
                      })
                    }
                  />

                  <label className="form-label">Pitch Capacity:</label>
                  <input
                    type="number"
                    className="form-control shadow-sm mb-3"
                    placeholder="Enter Report Name"
                    value={newPitch.fieldCapacity}
                    onChange={(e) =>
                      setNewPitch({
                        ...newPitch,
                        fieldCapacity: e.target.value,
                      })
                    }
                  />

                  <label className="form-label">Price:</label>
                  <input
                    type="number"
                    className="form-control shadow-sm mb-3"
                    placeholder="Enter Report URL"
                    value={newPitch.price}
                    onChange={(e) =>
                      setNewPitch({
                        ...newPitch,
                        price: e.target.value,
                      })
                    }
                  />

                  <label className="form-label">Pitch Type:</label>
                  <select
                    className="form-select shadow-sm"
                    value={newPitch.fieldType}
                    onChange={(e) =>
                      setNewPitch({ ...newPitch, fieldType: e.target.value })
                    }
                  >
                    <option value="MEDUIM">MEDIUM</option>
                    <option value="SMALL">SMALL</option>
                  </select>
                </div>

                <div className="modal-footer">
                  {showTable === "add-pitch" ? (
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() => {
                        handleAddNewPitch();
                        setShowTable("");
                      }}
                    >
                      Add Pitch
                    </button>
                  ) : (
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() => {
                        handleUpdatePitch();
                        setShowTable("");
                      }}
                    >
                      Update Pitch
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {(showTable === "add-match" || showTable === "update-match") && (
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-4 shadow-lg rounded-3">
                <button
                  className="btn-close position-absolute top-0 end-0 p-3"
                  onClick={handleCloseModal}
                ></button>

                <h2 className="text-dark fw-bold text-center">
                  {showTable === "add-match" ? "Add New Match" : "Update Match"}
                </h2>

                <div className="modal-body">
                  <label className="form-label">Match Number:</label>
                  <input
                    type="number"
                    className="form-control shadow-sm mb-3"
                    placeholder="Enter Match Number"
                    value={newMatch.matchNo}
                    onChange={(e) =>
                      setNewMatch({
                        ...newMatch,
                        matchNo: parseInt(e.target.value, 10) || 0, // Convert to number or default to 0
                      })
                    }
                  />

                  <label className="form-label">Start Time:</label>
                  <input
                    type="time"
                    className="form-control shadow-sm mb-3"
                    value={newMatch.startTime}
                    onChange={(e) =>
                      setNewMatch({
                        ...newMatch,
                        startTime: e.target.value,
                      })
                    }
                  />

                  <label className="form-label">End Time:</label>
                  <input
                    type="time" // Changed to type="time" for time input
                    className="form-control shadow-sm mb-3"
                    value={newMatch.endTime}
                    onChange={(e) =>
                      setNewMatch({
                        ...newMatch,
                        endTime: e.target.value, // Update state with the time value
                      })
                    }
                  />

                  <label className="form-label">Time Status:</label>
                  <select
                    className="form-select shadow-sm"
                    value={newMatch.timeStatus}
                    onChange={(e) =>
                      setNewMatch({ ...newMatch, timeStatus: e.target.value })
                    }
                  >
                    <option value="MORNING">MORNING</option>
                    <option value="EVENING">EVENING</option>
                  </select>
                </div>

                <div className="modal-footer">
                  {showTable === "add-match" ? (
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() => {
                        handleAddNewMatch();
                        setShowTable("");
                      }}
                    >
                      Add Match
                    </button>
                  ) : (
                    <button
                      className="btn btn-dark btn-sm"
                      onClick={() => {
                        setShowTable("");
                        handleUpdateMatch();
                      }}
                    >
                      Update Match
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePitchPage;

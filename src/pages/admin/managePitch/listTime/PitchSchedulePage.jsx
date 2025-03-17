import React, { useState } from "react";
import ListTime from "./ListTime"; // Import ListTime component
import '../../../../style/style.css';
const PitchSchedulePage = () => {
  // Mock data for pitches
  const [pitches, setPitches] = useState([
    { id: 1, name: "Pitch 1" },
    { id: 2, name: "Pitch 2" },
    { id: 3, name: "Pitch 3" },
  ]);

  const [selectedPitch, setSelectedPitch] = useState(null);

  const handleViewScheduleClick = (pitch) => {
    setSelectedPitch(pitch);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Manage Pitches</h2>

      {/* List of Pitches as Cards */}
      <div className="row">
        {pitches.map((pitch) => (
          <div key={pitch.id} className="col-md-4 mb-4">
            <div className="card shadow-lg rounded-lg pitch-card">
              <div className="card-body text-center">
                <h5 className="card-title">{pitch.name}</h5>
                <p className="card-text">
                  Manage the schedule for {pitch.name} here.
                </p>
                <button
                  className="btn btn-outline-primary btn-lg"
                  onClick={() => handleViewScheduleClick(pitch)}
                >
                  View Schedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show schedule form for the selected pitch */}
      {selectedPitch && <ListTime pitch={selectedPitch} />}
    </div>
  );
};

export default PitchSchedulePage;

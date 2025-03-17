import React, { useState } from "react";
const ListTime = ({ pitch }) => {
  if (!pitch) {
    return <div>No pitch selected</div>;
  }

  const [schedule, setSchedule] = useState({
    monday: { from: "", to: "" },
    tuesday: { from: "", to: "" },
    wednesday: { from: "", to: "" },
    thursday: { from: "", to: "" },
    friday: { from: "", to: "" },
    saturday: { from: "", to: "" },
    sunday: { from: "", to: "" },
  });

  const handleTimeChange = (day, timeType, value) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeType]: value,
      },
    }));
  };

  const handleSaveSchedule = () => {
    console.log("Schedule saved:", schedule);
    // You can save the schedule to a backend or perform other operations here
  };

  return (
    <div className="schedule-card">
      <div className="card shadow-lg rounded-lg">
        <div className="card-body">
          <h5 className="card-title text-dark">{`Schedule for ${pitch.name}`}</h5>
          <p className="card-text text-muted">
            Set the schedule for the selected pitch.
          </p>

          {/* Weekly Schedule Inputs */}
          {Object.keys(schedule).map((day) => (
            <div key={day} className="mb-3">
              <label className="day-label">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </label>
              <div className="d-flex">
                <input
                  type="time"
                  className="time-input mr-2"
                  value={schedule[day].from}
                  onChange={(e) =>
                    handleTimeChange(day, "from", e.target.value)
                  }
                />
                <span className="mx-2">to</span>
                <input
                  type="time"
                  className="time-input"
                  value={schedule[day].to}
                  onChange={(e) => handleTimeChange(day, "to", e.target.value)}
                />
              </div>
            </div>
          ))}

          <button className="save-btn" onClick={handleSaveSchedule}>
            <i className="fas fa-save"></i> Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListTime;

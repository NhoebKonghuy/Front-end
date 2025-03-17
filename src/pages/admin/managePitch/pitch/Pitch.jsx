import React, { useState } from 'react';

const Pitch = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [price, setPrice] = useState('');
  const [pitchName, setPitchName] = useState('');
  const [pitches, setPitches] = useState([
    { selectedDay: 'monday', price: 50, pitchName: 'Pitch 1' },
    { selectedDay: 'wednesday', price: 70, pitchName: 'Pitch 2' },
    { selectedDay: 'friday', price: 60, pitchName: 'Pitch 3' }
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showTable, setShowTable] = useState(true); 
  const [showForm, setShowForm] = useState(false); 

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handlePitchNameChange = (e) => {
    setPitchName(e.target.value);
  };

  const handleAddNewPitch = () => {
    setShowTable(false); 
    setShowForm(true); 
    setIsEditing(false);
    setSelectedDay('');
    setPrice('');
    setPitchName('');
  };

  const handleSavePitch = () => {
    if (isEditing) {
      const updatedPitches = [...pitches];
      updatedPitches[editingIndex] = { selectedDay, price, pitchName };
      setPitches(updatedPitches);
    } else {
      setPitches([...pitches, { selectedDay, price, pitchName }]);
    }
    setSelectedDay('');
    setPrice('');
    setPitchName('');
    setShowTable(true); 
    setShowForm(false); 
  };

  const handleCancel = () => {
    setShowTable(true);
    setShowForm(false);
    setSelectedDay('');
    setPrice('');
    setPitchName('');
  };

  const handleEditPitch = (index) => {
    const pitchToEdit = pitches[index];
    setSelectedDay(pitchToEdit.selectedDay);
    setPrice(pitchToEdit.price);
    setPitchName(pitchToEdit.pitchName);
    setIsEditing(true);
    setEditingIndex(index);
    setShowTable(false); 
    setShowForm(true); 
  };

  const handleDeletePitch = (index) => {
    const updatedPitches = pitches.filter((_, i) => i !== index);
    setPitches(updatedPitches);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Manage Pitches</h2>

      {/* Add New Pitch Button */}
      <div className="mb-4 text-center">
        <button
          className="btn btn-primary btn-lg"
          onClick={handleAddNewPitch}
        >
          <i className="fas fa-plus"></i> Add New Pitch
        </button>
      </div>

      {/* List of Existing Pitches - Initially Hidden */}
      {showTable && (
        <div className="mb-4">
          <table className="table table-striped table-bordered shadow-sm">
            <thead>
              <tr>
                <th>Pitch Name</th>
                <th>Day</th>
                <th>Price</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pitches.map((pitch, index) => (
                <tr key={index}>
                  <td>{pitch.pitchName}</td>
                  <td>{pitch.selectedDay}</td>
                  <td>${pitch.price}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEditPitch(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm ml-2"
                      onClick={() => handleDeletePitch(index)}
                      style={{ marginLeft: '3px' }} 
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form for Adding or Editing a Pitch */}
      {showForm && (
        <div className="card shadow-lg p-4 mb-4 rounded-lg" style={{ backgroundColor: "#f9f9f9" }}>
          <div className="card-body">
            <h4 className="card-title text-dark mb-3">{isEditing ? 'Edit Pitch' : 'Add New Pitch'}</h4>
            <p className="card-text text-muted mb-4">
              {isEditing ? 'Edit the details of the selected pitch.' : 'Enter the details of the new pitch.'}
            </p>

            <div className="mb-3">
              <label htmlFor="dayDropdown" className="form-label">Select Day</label>
              <select
                id="dayDropdown"
                className="form-select"
                value={selectedDay}
                onChange={handleDayChange}
              >
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="pitchName" className="form-label">Pitch Name</label>
              <input
                type="text"
                className="form-control"
                id="pitchName"
                placeholder="Enter pitch name"
                value={pitchName}
                onChange={handlePitchNameChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Enter pitch price"
                value={price}
                onChange={handlePriceChange}
              />
            </div>

            <div className="d-flex justify-content-between">
              <button className="btn btn-success btn-lg" onClick={handleSavePitch}>
                {isEditing ? 'Update Pitch' : 'Add Pitch'}
              </button>
              <button className="btn btn-secondary btn-lg" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pitch;

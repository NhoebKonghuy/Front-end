import React, { useState } from "react";
import { register } from "../../../context/userContext/UserAction";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log(formData.name, formData.phone, formData.gender);

    const success = await register(formData); // Pass the entire formData object
    
  };

  return (
    
    <form onSubmit={handleRegister}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone:
        </label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="gender" className="form-label">
          Gender:
        </label>
        <select
          className="form-select"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );
};

export default RegisterPage;

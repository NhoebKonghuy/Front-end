import React, { useState } from "react";
import { signin } from "../../../context/userContext/UserAction";
import { useUser } from "../../../context/userContext/UserContext";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Import as a default import

const LoginPage = () => {
  const [formData, setFormData] = useState({
    phone: "",
    code: "",
  });
  const { user, setUser } = useUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const token = await signin(formData);
    if (token) {
      try {
        const decodedToken = jwtDecode(token.data.results.token); // Use the default import
        setUser({ ...decodedToken, token: token.data.results.token });
        console.log(decodedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        toast.error("Invalid token received");
      }
    } else {
      toast.error("Login failed");
    }
  };

  return (
    <div className="col">
      
          <div style={{padding: "80px 0px 0px 0px",borderRadius: "10px"}}>

         
            <form onSubmit={handleLogin} >
              <h2 className="text-center">Login</h2>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="code"
                  className="form-control"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck"
                />
                <label className="form-check-label" htmlFor="exampleCheck">
                  Remember Me.
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            </div>
          </div>
  );
};

export default LoginPage;

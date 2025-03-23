import React, { useState, useEffect } from "react";
import { useUser } from "../../context/userContext/UserContext";
import { toast } from "react-toastify";
import ApiClient from "../../utils/ApiClient";
import { CgPassword } from "react-icons/cg";
import { jwtDecode } from "jwt-decode";
import { GrUserManager } from "react-icons/gr";

const AuthPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await ApiClient.post(`/admin/auth/login`, {
        name: formData.username,
        password: formData.password,
      });

      if (res.status === 200) {
        const token = res.data.results.token; // Extract the token
        if (!token) {
          throw new Error("Token not found in response");
        }

        try {
          const decodedToken = jwtDecode(token); // Decode the token
          console.log("Decoded token:", decodedToken);
          setUser({ ...decodedToken, token, role: decodedToken.role }); // Store user data
          // Save token in localStorage
          localStorage.setItem("token", token);

          toast.success("Login successful!");
        } catch (error) {
          console.error("Error decoding token:", error);
          toast.error("Invalid token");
        }
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
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
    <div className="container">
      <div
        className="row justify-content-center"
        style={{ paddingTop: "200px" }}
      >
        <div
          className="col-md-6"
          style={{
            padding: "80px",
            border: "1px solid lightgray",
            borderRadius: "10px",
          }}
        >
          <form onSubmit={handleLogin}>
            <h2 className="text-center">Login</h2>
            <div className="mb-3">
              <label
                htmlFor="username"
                className="form-label fw-semibold text-start d-block ms-1"
              >
                Username:
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label fw-semibold text-start d-block ms-1"
              >
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-dark" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="container">
      <div
        className="row justify-content-center"
        style={{ paddingTop: "50px" }}
      >
        <div
          className="col-md-6"
          style={{
            padding: "50px",
            border: "1px solid lightgray",
            borderRadius: "10px",
          }}
        >
          <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6 text-center">
            <GrUserManager size={80} className="text-black mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              User Profile
            </h2>
            <div className="text-gray-700">
              <p>
                <strong>Username:</strong> Huy
              </p>
              <p>
                <strong>Role:</strong> Kong
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fix: Proper conditional rendering inside a functional component
const AuthContainer = () => {
  const { user } = useUser();
  console.log("Khmer Checking", user);
  return user ? <Profile /> : <AuthPage />;
};

export default AuthContainer;

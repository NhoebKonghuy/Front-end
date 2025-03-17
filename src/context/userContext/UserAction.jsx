import ApiClient from "../../utils/ApiClient";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
export const signin = async ({ phone, code }) => {
  try {
    if (phone.length > 0 && code.length > 0) {
      const res = await ApiClient.post(`/user/auth/verify-login`, {
        phone: phone,
        code: code,
      });
      if (res.status === 200) {
        toast.success("Welcome to our website");
        return res;
      } else {
        toast.error("Login failed");
        return null;
      }
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } else if (error.request) {
      toast.error("No response received from server");
    }
  }
};

export const register = async ({ name, phone, gender }) => {
  try {
    const res = await ApiClient.post(`/user/auth/register`, {
      ref: "",
      name: name,
      phone: phone,
      passcode: "", // Consider adding proper passcode logic
      gender: gender,
      dob: "2005-04-03", // Consider making this dynamic if needed
    });

    if (res.status === 200) {
      toast.success("Welcome to our website");
      return true;
    } else {
      toast.error("Registration failed");
      return false;
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } else if (error.request) {
      toast.error("No response received from server");
    } else {
      toast.error("An unexpected error occurred");
    }
    return false;
  }
};
export const signout = async () => {
  try {
    const res = await ApiClient.post(`/user/auth/logout`);
    if (res.status === 200) {
      toast.success("Logged out successfully");
      return true;
    } else {
      toast.error("Logout failed");
      return false;
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } else if (error.request) {
      toast.error("No response received from server");
    } else {
      toast.error("An unexpected error occurred");
    }
    return false;
  }
}

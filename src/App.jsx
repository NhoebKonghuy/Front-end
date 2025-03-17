import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import RouteComponent from "./routes/RouteComponent";
import { UserProvider, useUser } from "./context/userContext/UserContext";
import { ToastContainer } from "react-toastify";
import  AuthPage  from "./pages/auth/AuthPage";

const AppContent = () => {
  const { user } = useUser();

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      {user ? (
        <Router>
          <Navbar />
          <RouteComponent />
        </Router>
      ) : (
        <AuthPage />
      )}
    </div>
  );
};

const App = () => {
  return (
    <UserProvider >
      <AppContent />
    </UserProvider>
  );
};

export default App;

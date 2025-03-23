import { useState, useEffect } from "react";
import ApiClient from "../utils/ApiClient";

export const useReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ApiClient.get("/admin/get-report-list");
        if (response.status === 200 && response.data.results) {
          setReports(response.data.results);
        } else {
          setError("Failed to fetch reports");
        }
      } catch (err) {
        setError(
          err?.response?.data?.message || err.message || "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return { reports, setReports, loading, error };
};

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ApiClient.get("/admin/get-user-list");
        if (response.status === 200 && response.data.results) {
          setUsers(response.data.results);
          console.log("user: ", response.data.results);
        } else {
          setError("Failed to fetch reports");
        }
      } catch (err) {
        setError(
          err?.response?.data?.message || err.message || "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, setUsers, loading, error };
};

export const useDashboard = () => {
  const [dashboard, setDashboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ApiClient.get("/admin/dashboard-info");
        if (response.status === 200 && response.data.results) {
          setDashboard(response.data.results);
          console.log("user: ", response.data.results);
        } else {
          setError("Failed to fetch reports");
        }
      } catch (err) {
        setError(
          err?.response?.data?.message || err.message || "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return { dashboard, setDashboard, loading, error };
};

export const usePitches = () => {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchpitches = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ApiClient.get("/admin/get-pitch-list");
        if (response.status === 200 && response.data.results) {
          setPitches(response.data.results);
        } else {
          setError("Failed to fetch reports");
        }
      } catch (err) {
        setError(
          err?.response?.data?.message || err.message || "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchpitches();
  }, []);

  return { pitches, setPitches, loading, error };
};




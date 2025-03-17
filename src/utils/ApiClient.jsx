import axios from "axios";
import { REACT_APP_API_ENDPOINT } from "./baseUrl";

const ApiClient = axios.create({
  baseURL: REACT_APP_API_ENDPOINT,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    "Content-Type": ["application/json"],
  },
  credentials: true,
});

export default ApiClient;
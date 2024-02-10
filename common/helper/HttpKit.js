import axios from "axios";
import get from "lodash/get";
import { BASE_URL } from "../../constant/settings";

const HttpKit = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

HttpKit.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

HttpKit.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = get(error, "response.status");
    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default HttpKit;

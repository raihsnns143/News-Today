import axios from "axios";

const API = "https://mominulweb.site/api";

export const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

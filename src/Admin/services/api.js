import axios from "axios";

const API = "http://mominulweb.site/api";

export const api = axios.create({
  baseURL: API,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

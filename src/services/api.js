import axios from "axios";

const api = axios.create({
  baseURL: "https://front.devmatheus.com"
});

export default api;

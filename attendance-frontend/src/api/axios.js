import axios from "axios";
import requestInterceptor from "./interceptor";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

requestInterceptor(instance);

export default instance;
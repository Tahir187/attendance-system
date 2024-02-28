import Cookies from "js-cookie";

export default function requestInterceptor(instance) {
  instance.interceptors.request.use((req) => {
    const accessToken = Cookies.get("jwtToken");
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  });
  return instance;
}
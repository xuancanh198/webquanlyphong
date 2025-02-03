import axios from 'axios';
import Cookies from 'js-cookie';
import { setIsLoginUser, setIsLoginAdmin } from "../redux/accction/reducers";
import store from '../redux/store';

const APILink = axios.create({
  baseURL: "http://localhost:8000/api/",
});

APILink.interceptors.request.use(
  (config) => {
    const isAdmin = window.location.pathname.includes("admin");
    let token;

    if (isAdmin) {
      token = Cookies.get("token_admin");
    } else {
      token = Cookies.get("token_user") || Cookies.get("token_otp_user");
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

APILink.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        const isAdmin = window.location.pathname.includes("admin");
        const dispatch = store.dispatch;

        if (isAdmin) {
          dispatch(setIsLoginAdmin(false));
          Cookies.remove("token_admin");
        } else {
          dispatch(setIsLoginUser(false));
          Cookies.remove("token_user");
        }

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    }

    return Promise.reject(error);
  }
);

export default APILink;

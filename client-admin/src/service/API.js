import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    const state = store.getState();
    const language = state.reducers.lang || "vi";
    config.headers["Accept-Language"] = language;

    return config;
  },
  (error) => Promise.reject(error)
);

APILink.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

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

        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!", {
          position: "top-right",
          autoClose: 3000,
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }

      if (status === 422) {
        toast.error(`Lỗi: ${data.message}`, { position: "top-right", autoClose: 3000 });

        if (data.errors) {
          Object.keys(data.errors).forEach((key) => {
            toast.error(`${key}: ${data.errors[key].join(", ")}`, {
              position: "top-right",
              autoClose: 3000,
            });
          });
        }
      }
    }

    return Promise.reject(error);
  }
);

export default APILink;

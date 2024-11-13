import axios from 'axios';
import Cookies from 'js-cookie';
import {setIsLogin} from "../redux/accction/reducers";
import store from '../redux/store';
import { useNavigate } from 'react-router-dom';
const APILink = axios.create({
  baseURL: "http://localhost:8000/api/"
});

APILink.interceptors.request.use(  (config) => {
    const token = Cookies.get('token');
    if (token && token !== null) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

APILink.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        store.dispatch(setIsLogin(false));
        Cookies.remove('token');
        const navigate = useNavigate();
        setTimeout(() => {
          navigate('/'); 
        }, 1000);
      }
    } 
    
    return Promise.reject(error);
  }
);

export default APILink;
import APILink from "../API";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { setLoading, setInfoStaff, setIsAdmin, setIsLogin } from "../../redux/accction/reducers";

export const loginFun = (value, navigate) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    APILink.post('admin/login', value)
      .then((response) => {
        if (response.data.status === "success") {
            Cookies.set('token', response.data.token, { expires: 30, secure: true, sameSite: 'Strict' });
          Cookies.set('type', response.data.type, { expires: 30, secure: true, sameSite: 'Strict' });
          dispatch(setIsAdmin(response.data.type))
          dispatch(setIsLogin(true))
          toast.success(response.data.message);
          navigate('/admin/')
        }else{
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
    });
  }
  
}
export const getMyInfoStaff = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    APILink.get('admin/my-user-account')
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(setInfoStaff(response.data.result))
        } 
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }
}
export const getMyInfoUser = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    APILink.get('user/my-user-account')
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(setInfoStaff(response.data.result))
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }
}
export const updateInfoAuth = (data, configStatus = false) =>{
  const config = configStatus ? {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  } : null;
  return (dispatch) => {
    dispatch(setLoading(true));
    const url = `admin/update-staff-account`;

    const request = configStatus
      ? APILink.post(`${url}?_method=PUT`, data, config)
      : APILink.put(url, data, config);

    request
      .then((response) => {
        if (response.data.status === "success") {
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }
}
export const updateInfoAuthUser = (data, configStatus = false) => {
  const config = configStatus ? {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  } : null;
  return (dispatch) => {
    dispatch(setLoading(true));
    const url = `admin/update-staff-account`;

    const request = configStatus
      ? APILink.post(`${url}?_method=PUT`, data, config)
      : APILink.put(url, data, config);

    request
      .then((response) => {
        if (response.data.status === "success") {
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }
}
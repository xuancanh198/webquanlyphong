import APILink from "../API";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

import { getListFunService, getAllData, addFunService, updateFunService, deleteFunService } from "./baseFuntion";
import { setLoading, setDataUser, setInfoStaff, setIsAdmin, setIsLoginAdmin, setIsLoginUser, setIsOpenOTPModal } from "../../redux/accction/reducers";
import { LOGIN_USER_BY_PASSWORD, LOGIN_USER_BY_EMAIL, LOGIN_USER_BY_PHONE } from "../../Constants/Login"
export const loginFun = (value, navigate) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    APILink.post('admin/login', value)
      .then((response) => {
        if (response.data.status === "success") {
          Cookies.set('token_admin', response.data.token, { expires: 30, secure: true, sameSite: 'Strict' });
          Cookies.set('type', response.data.type, { expires: 30, secure: true, sameSite: 'Strict' });
          dispatch(setIsAdmin(true))
          dispatch(setIsLoginAdmin(true))
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
export const loginUserFun = (value, navigate, type = LOGIN_USER_BY_PASSWORD) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    APILink.post('user/login', value)
      .then((response) => {
        if (response.data.status === "success") {
          if (type === LOGIN_USER_BY_PASSWORD){
            navigate('/');
            Cookies.set('token_user', response.data.token, { expires: 30, secure: true, sameSite: 'Strict' });

          } else if (type === LOGIN_USER_BY_EMAIL || type === LOGIN_USER_BY_PHONE){
            dispatch(setIsOpenOTPModal(true))
            Cookies.set('token_otp_user', response.data.token, { expires: 30, secure: true, sameSite: 'Strict' });
          }
          Cookies.set('type', response.data.type, { expires: 30, secure: true, sameSite: 'Strict' });
          dispatch(setIsAdmin(false))
          dispatch(setIsLoginUser(true))
          toast.success(response.data.message);
         
        } else {
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
export const sendOTPLoginUser = (data, navigate, type = LOGIN_USER_BY_EMAIL) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    APILink.post('user/send-otp', data)
      .then((response) => {
        if (response.data.status === "success") {
          navigate('/');
          toast.success(response.data.message);
          Cookies.set('token_user', response.data.token, { expires: 30, secure: true, sameSite: 'Strict' });
          dispatch(setIsAdmin(false))
          dispatch(setIsLoginUser(true))
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
    const url = `user/update-user-account`;

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

export const getMyAuthData = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    APILink.get('user/my-account')
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(setDataUser(response.data.result))
        } else {
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

export const getMyBill = (titel = null, page = 1, limit = 10, search = null, fitler = null, exportExcel = false, filtersBase64 = null, filterBaseDecode = null) => {
  const objectGet = {
    page: page,
    limit: limit,
    search: search,
    fitler: fitler,
    exportExcel: exportExcel,
    filtersBase64: filtersBase64,
    routerLink: 'bill/',
    titelnameExcel: ["STT", "ID", "Tên chức vụ", "Thời gian tạo", "Cập nhật"],
    columExcel: ['id', 'name', 'created_at', 'updated_at'],
    titelExcel: titel,
    filterBaseDecode: filterBaseDecode,
    linkGroup: "user"
  }
  return (dispatch) => {
    dispatch(getListFunService(objectGet))
  };
};


export const updateBillUser = (data, resetForm, configStatus = false) => {

  const objectUpdate = {
    routerLink: 'bill/pay',
    data: data,
    resetForm: resetForm,
    getList: getMyBill,
    linkGroup: "user"
  }
  return (dispatch) => {
    dispatch(updateFunService(objectUpdate, configStatus));
  };
};
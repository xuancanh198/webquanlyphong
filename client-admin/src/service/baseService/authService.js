import APILink from "../API";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { setLoading, setInfoStaff } from "../../redux/accction/reducers";

export const loginFun = (value, navigate) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    APILink.post('admin/login', value)
      .then((response) => {
        if (response.data.status === "success") {
          Cookies.set('token', response.data.token, { expires: 30, secure: true, sameSite: 'Strict' });
          toast.success(response.data.message);
          navigate('/')
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

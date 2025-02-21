import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAdmin } from "../redux/accction/reducers";
const ProtectedRoute = ({ element, redirectPath = "/login", isLoginPage = false }) => {
  const isLoginUser = useSelector((state) => state.reducers.isLoginUser);
  const isLoginAdmin = useSelector((state) => state.reducers.isLoginAdmin);
  const isOpenModelOTPUser = useSelector((state) => state.reducers.isOpenModelOTPUser);

  const token_admin = Cookies.get('token_admin');
  const token_user = Cookies.get('token_user');
  const token_otp_user = Cookies.get('token_otp_user');
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(token_user, token_otp_user)

  const isAdmin = location.pathname.includes("admin");
  if (isAdmin) {
    dispatch(setIsAdmin(true))
    if (isLoginPage && token_admin) {
      return <Navigate to={"/admin"} />;
    }
    else if ((!isLoginPage && !token_admin) || isLoginAdmin === false) {
      return <Navigate to={isAdmin ? '/admin/login' : redirectPath} />;
    }
  } else {
   
    dispatch(setIsAdmin(false))
    if (isLoginPage && token_user) {
      return <Navigate to={"/"} />;
    }
    else if ((!isLoginPage && (!token_user)) || isLoginUser === false) {
      return <Navigate to={'/login' } />;
    }
  }

  return element;
};

export default ProtectedRoute;

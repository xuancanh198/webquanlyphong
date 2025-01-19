import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAdmin } from "../redux/accction/reducers";
const ProtectedRoute = ({ element, redirectPath = "/login", isLoginPage = false }) => {
  const isLogin = useSelector((state) => state.reducers.isLogin);
  const token = Cookies.get('token');
  const location = useLocation();
  const dispatch = useDispatch();

  const isAdmin = location.pathname.includes("admin");
 if(isAdmin) {
   dispatch(setIsAdmin(true))
 }else{
   dispatch(setIsAdmin(false))
 }

  if (isLoginPage && token ) {
    return <Navigate to={isAdmin ? "/admin" : "/"} />;
  }
    if ((!isLoginPage && !token)|| isLogin === false) {
      return <Navigate to={isAdmin ? '/admin/login' : redirectPath} />;
  }

  return element;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ element, redirectPath = "/login", isLoginPage = false }) => {
  const isLogin = useSelector((state) => state.reducers.isLogin);
  const token = Cookies.get('token');
  if (isLoginPage && token ) {
    return <Navigate to="/" />;
  }
    if ((!isLoginPage && !token)|| isLogin === false) {
    return <Navigate to={redirectPath} />;
  }

  return element;
};

export default ProtectedRoute;

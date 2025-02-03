import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import i18n from './lang/lang';
import Loading from './service/component/loading';
import ProtectedRoute from "./middleware/AuthRouter";
import Cookies from 'js-cookie';
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const Login = React.lazy(() => import('./views/pages/login/Login'));

const LoginUser = React.lazy(() => import('./views/User/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const lang = useSelector((state) => state.reducers.lang);
  const storedTheme = useSelector((state) => state.theme);
  const loadding = useSelector((state) => state.reducers.loadding);
  const isAdmin = useSelector((state) => state.reducers.isAdmin);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }
    if (isColorModeSet()) {
      return;
    }
    setColorMode(storedTheme);
  }, []);

  React.useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  return (
    <Router>
      <ToastContainer />
      <Loading />
      {loadding === true ?
        (
          <div className='modal-fullscreen '> </div>) : null}
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="*" element={<ProtectedRoute element={<DefaultLayout />} />} />
          {isAdmin === false
            ?
            (
              <>
                <Route path="/login" element={<ProtectedRoute element={<LoginUser />} isLoginPage />} />
              </>

            ) :
            (
              <>
                <Route path="/admin/login" element={<ProtectedRoute element={<Login />} isLoginPage />} />
              </>
            )
          }

        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;

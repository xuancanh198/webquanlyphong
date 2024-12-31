import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'; 
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import {loginFun} from "../../../service/baseService/authService";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [togglePassword, settogglePassword] = useState(false);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values) => {
    dispatch(loginFun(values, navigate));
  };

  const updateTogglePassword = () => {
    settogglePassword(!togglePassword);
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center login">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup className="row m-0 m-lg-2">
              <CCard className="p-4 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ handleChange, values, touched, errors }) => (
                    <FormikForm>
                      <CCardBody>
                        <h1>{t('page.login')}</h1>
                        <p className="text-body-secondary">{t('messageText.login')}</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilUser} />
                          </CInputGroupText>
                          <Field
                            as={CFormInput}
                            placeholder={t('lableView.login.username')}
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            isValid={touched.username && !errors.username}
                            autoComplete="username"
                          />
                          <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </CInputGroup>
                        <CInputGroup className="mb-4 position-relative">
                          <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                          </CInputGroupText>
                              <Field
                                as={CFormInput}
                                type={togglePassword ? 'text' : 'password'}
                                placeholder={t('lableView.login.password')}
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isValid={touched.password && !errors.password}
                                autoComplete="current-password"
                              />
                          <ErrorMessage name="password" component="div" className="invalid-feedback" />
                          <i className={`fa-solid icon-password-acction ${togglePassword === false ? 'fa-eye' : "fa-eye-slash"}`} onClick={updateTogglePassword}></i>
                    </CInputGroup>
                        <CRow>
                          <CCol xs={6}>
                            <CButton type="submit" color="primary" className="px-4">
                              {t('page.login')}
                            </CButton>
                          </CCol>
                          <CCol xs={6} className="text-right">
                            <CButton color="link" className="px-0">
                              {t('page.missPassWord')}?
                            </CButton>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </FormikForm>
                  )}
                </Formik>
              </CCard>
              <CCard className="d-none d-lg-block text-white bg-primary py-5 col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <CCardBody className="text-center">
                  <div>
                    <h2>{t('messageText.note')}</h2>
                    <p>{t('messageText.loginPageMessage')}</p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;

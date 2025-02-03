import React, { useState } from 'react';
import Cookies from 'js-cookie';
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
import { cilLockLocked, cilUser, cilEnvelopeClosed, cilPhone } from '@coreui/icons';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { loginUserFun, sendOTPLoginUser } from "../../../service/baseService/authService";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LOGIN_USER_BY_PASSWORD, LOGIN_USER_BY_EMAIL, LOGIN_USER_BY_PHONE, arrTypeLogin } from "../../../Constants/Login"
const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState(LOGIN_USER_BY_EMAIL)
  const [togglePassword, settogglePassword] = useState(false);
  const [initialValues, setInitialValues] = useState(arrTypeLogin[1].initialValues)
  const isOpenModalOTPUser = useSelector((state) => state.reducers.isOpenModalOTPUser);
  const validationSchema = Yup.object().shape({
    // username: Yup.string().required('Username is required'),
    // password: Yup.string().required('Password is required'),
  });
  const handleSubmit = (values) => {
    isOpenModalOTPUser === true ? dispatch(sendOTPLoginUser(values, navigate, type)):  dispatch(loginUserFun(values, navigate, type));
  };
  console.log(Cookies.get('token_otp_user'))
  const updateTogglePassword = () => {
    settogglePassword(!togglePassword);
  };
  const changeTypeLogin = (item) => {
    setType(item?.value)
    setInitialValues(item?.initialValues)
  }
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
                        <h1>{t('messageText.sumbitOTPText')}</h1>
                        <p className="text-body-secondary">{t('messageText.sumbitOTP')}</p>
                        {isOpenModalOTPUser === true
                          ?
                          (<>
                            <CInputGroup className="mb-3">
                              <CInputGroupText>
                                <CIcon icon={cilEnvelopeClosed} />
                              </CInputGroupText>
                              <Field
                                as={CFormInput}
                                placeholder={t('lableView.login.otp')}
                                name="otp"
                                value={values.otp}
                                onChange={handleChange}
                                isValid={touched.otp && !errors.otp}
                                autoComplete="otp"
                              />
                              <ErrorMessage name="otp" component="div" className="invalid-feedback" />
                            </CInputGroup>
                          </>)
                          : (
                            <>

                              {type === LOGIN_USER_BY_PASSWORD ? (
                                <>
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
                                    <i
                                      className={`fa-solid icon-password-acction ${togglePassword ? 'fa-eye-slash' : 'fa-eye'
                                        }`}
                                      onClick={updateTogglePassword}
                                    ></i>
                                  </CInputGroup>
                                </>
                              ) : type === LOGIN_USER_BY_EMAIL ? (
                                <>
                                  <CInputGroup className="mb-3">
                                    <CInputGroupText>
                                      <CIcon icon={cilEnvelopeClosed} />
                                    </CInputGroupText>
                                    <Field
                                      as={CFormInput}
                                      placeholder={t('lableView.login.email')}
                                      name="email"
                                      value={values.email}
                                      onChange={handleChange}
                                      isValid={touched.email && !errors.email}
                                      autoComplete="email"
                                    />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                  </CInputGroup>
                                </>
                              ) : (
                                <> <CInputGroup className="mb-3">
                                  <CInputGroupText>
                                    <CIcon icon={cilPhone} />
                                  </CInputGroupText>
                                  <Field
                                    as={CFormInput}
                                    placeholder={t('lableView.login.phoneNumber')}
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    isValid={touched.phoneNumber && !errors.phoneNumber}
                                    autoComplete="phoneNumber"
                                  />
                                  <ErrorMessage name="phoneNumber" component="div" className="invalid-feedback" />
                                </CInputGroup>

                                </>
                              )}
                            </>

                          )
                        }
                     
                        <CInputGroup className="mb-4 d-flex gap-3">
                          {arrTypeLogin?.map((item, index) => {
                            return (
                              <div onClick={() => changeTypeLogin(item)} className={`box-login ${type === item?.value && "active"}`} key={index}>
                                <FontAwesomeIcon icon={item.icon} />
                              </div>
                            )
                          })}
                        </CInputGroup>

                        <CRow>
                          <CCol xs={6}>
                            <CButton type="submit" color="primary" className="px-4">
                              {t(isOpenModalOTPUser === true ? 'messageText.sendOTP' : 'page.login')}
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
                    <p>{t(isOpenModalOTPUser === true ? "messageText.sumbitOTP" : 'messageText.loginPageMessage')}</p>
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

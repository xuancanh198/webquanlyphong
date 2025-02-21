import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'
import { cilUser, cilText, cilEnvelopeClosed, cilPhone, cilCreditCard, cilArrowTop, cilArrowBottom } from '@coreui/icons';
import DatePicker from 'react-datepicker';
import CIcon from '@coreui/icons-react';
import Switch from 'react-switch';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ImageUploading from 'react-images-uploading';
import { updateInfoAuthUser } from "../../service/baseService/authService";
import { setTypeModalAuthDashboard } from "../../redux/accction/reducers"
import { USERINFO, CONTRACTNOW, LISTCONTRACT, BILLNOW, LISTBILL, MYROOM, MYROOMMATES } from "../../Constants/MainModalAuthUser"
import { formatPrice, getTotalTime, formatToDateTime, convertDateTimeUS, getRemainingTime, getElapsedTime, convertDateTimePost, convertDateTime } from "../../service/FunService/funweb"
const WidgetsDropdown = (props) => {
  const maxNumber = 1;
  let triggerImageUpload = null;
  const typeModalAutDashboard = useSelector((state) => state.reducers.typeModalAutDashboard);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [typeModal, setTypeModal] = useState(USERINFO)
  const [checkedUser, setCheckedUser] = useState(false);
  const [checkedBill, setCheckedBill] = useState(false);
  const [checkedContract, setCheckedContract] = useState(false);
  const [images, setImages] = useState([]);
  const [dateIssuanceCard, setDateIssuanceCard] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [validated, setValidated] = useState(false);
  const [initialValues, setInitialValues] = useState({
    username: '',
    fullname: "",
    address: "",
    identificationCard: "",
    email: "",
    phoneNumber: "",
    image: null,
    dateOfBirth: convertDateTime(dateOfBirth),
    dateIssuanceCard: convertDateTime(dateIssuanceCard),
    placeIssue: "",
  });
  const handleClose = () => setShow(false);
  const dataUser = useSelector((state) => state.reducers.dataUser);
  const changeValue = (value) => {
    setTypeModal(value);
    setShow(true)
  }

  const updateUserFun = async (values, resetForm) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key === 'image' && values[key]) {
        formData.append('image', values[key]);
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      await dispatch(updateInfoAuthUser(formData, true));
      formik.resetForm();
    } catch (error) {
      toast.error('có lỗi xảy ra');
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, t('validation.attribute.min', { attribute: t('lableView.user.username'), min: 5 }))
        .max(255, t('validation.attribute.min', { attribute: t('lableView.user.username'), max: 255 }))
        .matches(/^[a-zA-Z0-9]*$/, t('validation.attribute.matches', { attribute: t('lableView.user.username') }))
        .required(t('validation.attribute.required', { attribute: t('lableView.user.username') })),

      fullname: Yup.string()
        .min(5, t('validation.attribute.min', { attribute: t('lableView.user.fullname'), min: 2 }))
        .max(255, t('validation.attribute.min', { attribute: t('lableView.user.fullname'), max: 50 }))
        .matches(/^[\p{L}\s.']+$/u, t('validation.attribute.matches', { attribute: t('lableView.user.fullname') }))
        .required(t('validation.attribute.required', { attribute: t('lableView.user.fullname') })),
      email: Yup.string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t('validation.attribute.email', { attribute: t('lableView.user.email') }))
        .required(t('validation.attribute.required', { attribute: t('lableView.user.email') })),
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, t('validation.attribute.matches', { attribute: t('lableView.user.phoneNumber') }))
        .min(10, t('validation.attribute.min', { attribute: t('lableView.user.phoneNumber'), min: 10 }))
        .max(15, t('validation.attribute.max', { attribute: t('lableView.user.phoneNumber'), max: 15 }))
        .required(t('validation.attribute.required', { attribute: t('lableView.user.phoneNumber') })),
      identificationCard: Yup.string()
        .matches(/^[0-9]+$/, t('validation.attribute.matches', { attribute: t('lableView.user.identificationCard') }))
        .min(10, t('validation.attribute.min', { attribute: t('lableView.user.identificationCard'), min: 10 }))
        .max(15, t('validation.attribute.max', { attribute: t('lableView.user.identificationCard'), max: 15 }))
        .required(t('validation.attribute.required', { attribute: t('lableView.user.identificationCard') })),
      placeIssue: Yup.string()
        .min(5, t('validation.attribute.min', { attribute: t('lableView.user.placeIssue'), min: 2 }))
        .max(2500, t('validation.attribute.min', { attribute: t('lableView.user.placeIssue'), max: 2500 }))
        .matches(/^[\p{L}\s.']+$/u, t('validation.attribute.matches', { attribute: t('lableView.user.placeIssue') }))
        .required(t('validation.attribute.required', { attribute: t('lableView.user.placeIssue') })),
    }),
    onSubmit: (values, { resetForm }) => {
      if (images === null || images.length === 0) {
        dispatch(updateInfoAuthUser(values));
      } else {
        updateUserFun(values, resetForm);
      }
    }
  });
useEffect(() => {
    if (dataUser && dataUser !== null) {
      setInitialValues({
        username: dataUser.username || '',
        passwordDefault: dataUser.defaultPassword || '',
        fullname: dataUser.fullname || '',
        address: dataUser.address || '',
        identificationCard: dataUser.identificationCard || 1,
        email: dataUser.email || '',
        phoneNumber: dataUser.phoneNumber || '',
        note: dataUser.note || '',
        image: dataUser.image || null,
        dateOfBirth: convertDateTime(dataUser.dateIssuanceCard),
        dateIssuanceCard: convertDateTime(dataUser.dateOfBirth),
        placeIssue: dataUser.placeIssue || '',
      });
      setDateIssuanceCard(dataUser.dateIssuanceCard !== null ? convertDateTimeUS(dataUser.dateIssuanceCard) : new Date());
      setDateOfBirth(dataUser.dateOfBirth !== null ? convertDateTimeUS(dataUser.dateOfBirth) : new Date())
    }
  }, [dataUser]);
  const onChange = (imageList) => {
    if (imageList.length > 0) {
      const file = imageList[0].file;
      formik.setFieldValue('image', file);
      setImages(imageList);
    } else {
      formik.setFieldValue('image', null);
      setImages([]);
    }
  };
   const changeTypeModalUser = () => {
    
   }
  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      {dataUser ? (
        <>
          <div className='d-flex  justify-content-center  align-items mb-3'>
            {/* <ButtonGroup aria-label="Basic example">
              <Button variant="secondary">TThoo</Button>
              <Button variant="secondary">Middle</Button>
              <Button variant="secondary">Middle</Button>
              <Button variant="secondary">Middle</Button>
              <Button variant="secondary">Middle</Button>
              <Button variant="secondary">Middle</Button>
              <Button variant="secondary">Right</Button>
            </ButtonGroup> */}
        </div>
          <CCol sm={12} xl={6} xxl={6} className="widget-container">
            <CWidgetStatsA
              color="info"
              onClick={() => changeValue(USERINFO)}
              className="widget-item cursor-pointer"
              value={
                <div className='py-4 widget-content'>
                  <p> {t('lableView.user.username')}  : {dataUser?.username}</p>
                  <p>{t('lableView.user.fullname')}:{dataUser?.fullname} </p>
                </div>
              }

            />
          </CCol>
          <CCol sm={12} xl={6} xxl={6} className="widget-container">
            <CWidgetStatsA
              color="info"
              className="widget-item cursor-pointer"
              onClick={() => changeValue(CONTRACTNOW)}
              value={
                <div className="py-4 widget-content">
                  <p>
                    {t("lableView.contract.duration")}:{" "}
                    {getTotalTime(
                      formatToDateTime(dataUser?.contractNow?.startTime),
                      formatToDateTime(dataUser?.contractNow?.endTime)
                    )}
                  </p>
                  <p>
                    {t("lableView.contract.remainingTime")}:{" "}
                    {getRemainingTime(formatToDateTime(dataUser?.contractNow?.endTime))}
                  </p>
                  <p>
                    {t("lableView.contract.elapsedTime")}:{" "}
                    {getElapsedTime(formatToDateTime(dataUser?.contractNow?.startTime))}
                  </p>
                </div>
              }
            />
          </CCol>
          <CCol sm={6} xl={4} xxl={3} className="widget-container">
            <CWidgetStatsA
              color="primary"
              className="widget-item cursor-pointer"
              onClick={() => changeValue(MYROOM)}
              value={
                <div className="py-4 widget-content">
                  <p>{t("lableView.room.currentRoom")}: {dataUser?.room?.name}</p>
                  <p>{t("lableView.room.price")}: {formatPrice(dataUser?.room?.price ?? 0)}</p>
                </div>
              }
            />
          </CCol>
          <CCol sm={6} xl={4} xxl={3} className="widget-container">
            <CWidgetStatsA
              color="warning"
              className="widget-item cursor-pointer"
              onClick={() => changeValue(BILLNOW)}
              value={
                <div className="py-4 widget-content">
                  <p>{t("lableView.bill.code")}: {dataUser?.billNow?.code}</p>
                  <p>{t("lableView.bill.totalMoney")}: {formatPrice(dataUser?.billNow?.totalMoney ?? 0)}</p>
                  <p>
                    {t("lableView.bill.status")}:{" "}
                    {dataUser?.billNow?.pay_at === null
                      ? t("lableView.bill.checkIsNowStatus.hasnot")
                      : t("lableView.bill.checkIsNowStatus.has")}
                  </p>
                </div>
              }
            />
          </CCol>
          <CCol sm={6} xl={4} xxl={3} className="widget-container">
            <CWidgetStatsA
              color="danger"
              className="widget-item cursor-pointer"
              onClick={() => changeValue(MYROOMMATES)}
              value={
                <div className="py-4 widget-content">
                  <p>
                    {t("lableView.roommates.totalMembers")}: {dataUser?.roommates?.length}
                  </p>
                </div>
              }
            />
          </CCol>

          <Modal show={show} onHide={handleClose} className='actice-1200 flex_center'>

            <Modal.Header closeButton>
              <Modal.Title>
                {typeModal === USERINFO ? (
                  <div>{t("messageText.info", { attribute: t("messageText.account") })}</div>
                ) : typeModal === CONTRACTNOW ? (
                    <div>{t("messageText.contractNow")}</div>
                ) : typeModal === LISTCONTRACT ? (
                  <div>{t("page.contract")}</div>
                ) : typeModal === BILLNOW ? (
                        <div>{t("messageText.billnow")}</div>
                ) : typeModal === LISTBILL ? (
                  <div>{t("page.bill")}</div>
                ) : typeModal === MYROOM ? (
                            <div>{t("messageText.roomNow")}</div>
                ) : (
                  <div>{t("lableView.roommates.totalMembers")}</div>
                )}
              </Modal.Title>
            </Modal.Header>s
            <Modal.Body>
              <div>
                {typeModal === USERINFO ? (
                  <div>
                    <div className='d-flex mb-4 justify-content-center  align-items'>
                      <label className="font-weight">{t("messageText.viewInfo")}</label>
                      <Switch className="toggle-modal-detail ms-2" onChange={() => setCheckedUser(!checkedUser)} checked={checkedUser} />
                      <label className="font-weight ms-2">{t("messageText.updateInfo")}</label>
                    </div>
                    {checkedUser === false
                      ? (<>
                        <div className='d-flex'>
                          <label className='font-weight'>
                            {t('lableView.user.username')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.username}
                          </p>
                        </div>
                        <div className='d-flex mt-2'>
                          <label className='font-weight'>
                            {t('lableView.user.fullname')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.fullname}
                          </p>
                        </div>
                        <div className='d-flex mt-2'>
                          <label className='font-weight'>
                            {t('lableView.user.email')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.email}
                          </p>
                        </div>
                        <div className='d-flex mt-2'>
                          <label className='font-weight'>
                            {t('lableView.user.phoneNumber')} :
                          </label>
                          <p className='ms-2'>
                            +{dataUser?.phoneNumber}
                          </p>
                        </div>
                        <div className='d-flex mt-2'>
                          <label className='font-weight'>
                            {t('lableView.user.address')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.address}
                          </p>
                        </div>
                        <div className='d-flex mt-2'>
                          <label className='font-weight'>
                            {t('lableView.user.placeIssue')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.placeIssue}
                          </p>
                        </div>
                        <div className='d-flex mt-2'>
                          <label className='font-weight'>
                            {t('lableView.user.dateOfBirth')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.dateOfBirth && convertDateTimePost(dataUser?.dateOfBirth)}
                          </p>
                        </div>
                        <div className='d-flex mt-2'>
                          <label className='font-weight'>
                            {t('lableView.user.dateIssuanceCard')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.dateIssuanceCard && convertDateTimePost(dataUser?.dateIssuanceCard)}
                          </p>
                        </div>
                        <div className='d-flex mt-2'>
                          <label className='font-weight'>
                            {t('lableView.user.identificationCard')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.identificationCard}
                          </p>
                        </div>
                        <div className='d-flex mt-2'>
                          <label className='font-weight'>
                            {t('lableView.user.isVerifiedInfor')} :
                          </label>
                          <p className='ms-2'>
                            {t(dataUser?.isVerifiedInfor === 0 ? "lableView.user.isVerifiedInforValue.notAuthenticated" : 'lableView.user.isVerifiedInforValue.authenticated')}
                          </p>
                        </div>
                        <div className='d-flex mt-2'>
                          <label className='font-weight'>
                            {t('lableView.user.staus')} :
                          </label>
                          <p className='ms-2'>
                            {t(dataUser?.status === 0 ? "lableView.user.statusValue.baned" : 'lableView.user.statusValue.active')}
                          </p>
                        </div>
                      </>) : (

                        <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>
                          <Row className="mb-3 mt-3">
                            <Form.Group as={Col} xl="3" md="12" className='mb-3 mt-3'>
                              <ImageUploading
                                value={images}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                              >
                                {({
                                  imageList,
                                  onImageUpload,
                                  onImageRemove,
                                  isDragging,
                                }) => {
                                  triggerImageUpload = { onImageUpload, isDragging };
                                  return (
                                    <div className="upload__image-wrapper">
                                      {imageList.length === 0 ? (
                                        <div className='img-form-div'>

                                          <img src={dataUser?.imgLink} className='img-form' />
                                        </div>
                                      ) : (
                                        imageList.map((image, index) => (
                                          <div key={index} className='img-form-div'>
                                            <img src={image['data_url']} alt="" width="100" className='img-form form-img-div' />
                                            <div className="image-item__btn-wrapper">
                                              <p onClick={() => onImageRemove(index)}>x</p>
                                            </div>
                                          </div>
                                        ))
                                      )}
                                    </div>
                                  );
                                }}
                              </ImageUploading>
                            </Form.Group>
                            <Form.Group as={Col} xl="9" md="12" className='mb-3 mt-3 row'>
                              <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                                <div className='css-animation'>
                                  <div className='font-icon flex_center'>
                                    <CIcon icon={cilText} size="l" />
                                  </div>
                                  <Form.Control
                                    type="text"
                                    name="fullname"
                                    value={formik.values.fullname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.fullname && formik.errors.fullname}
                                    required
                                  />
                                  <Form.Label> {t('lableView.user.fullname')}</Form.Label>
                                  <Form.Control.Feedback type="invalid">
                                    {formik.errors.fullname}
                                  </Form.Control.Feedback>
                                </div>

                              </Form.Group>
                              <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                                <div className=' css-animation'>
                                  <div className='font-icon flex_center'>
                                    <CIcon className='' icon={cilUser} size="l" />
                                  </div>
                                  <Form.Control
                                    type="text"
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.username && formik.errors.username}
                                    required
                                  />
                                  <Form.Label> {t('lableView.user.username')}</Form.Label>
                                  <Form.Control.Feedback type="invalid">
                                    {formik.errors.username}
                                  </Form.Control.Feedback>
                                </div>
                              </Form.Group>
                              <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                                <div className=' css-animation'>
                                  <div className='font-icon flex_center'>
                                    <CIcon className='' icon={cilCreditCard} size="l" />
                                  </div>

                                  <Form.Control
                                    type="text"
                                    name="identificationCard"
                                    value={formik.values.identificationCard}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.email && formik.errors.identificationCard}
                                    required
                                  />
                                  <Form.Label> {t('lableView.user.identificationCard')}</Form.Label>
                                  <Form.Control.Feedback type="invalid">
                                    {formik.errors.identificationCard}
                                  </Form.Control.Feedback>
                                </div>
                              </Form.Group>
                              <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                                <div className=' css-animation'>
                                  <div className='font-icon flex_center'>
                                    <CIcon className='' icon={cilEnvelopeClosed} size="l" />
                                  </div>
                                  <Form.Control
                                    type="text"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.email && formik.errors.email}
                                    required
                                  />
                                  <Form.Label> {t('lableView.user.email')}</Form.Label>
                                  <Form.Control.Feedback type="invalid">
                                    {formik.errors.email}
                                  </Form.Control.Feedback>
                                </div>
                              </Form.Group>
                              <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                                <div className='css-animation'>
                                  <div className='font-icon flex_center'>
                                    <CIcon icon={cilPhone} size="l" />
                                  </div>
                                  <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    required
                                  />
                                  <Form.Label> {t('lableView.user.phoneNumber')}</Form.Label>
                                  <Form.Control.Feedback type="invalid">
                                    {formik.errors.phoneNumber}
                                  </Form.Control.Feedback>
                                </div>

                              </Form.Group>
                              <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '></Form.Group>
                              <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                                <Form.Label className='mb-2'> {t('lableView.user.dateOfBirth')} : </Form.Label>
                                <DatePicker
                                  selected={dateOfBirth || new Date()} onChange={(date) => setDateOfBirth(date)}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {formik.errors.dateOfBirth}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                                <Form.Label className='font-weight'> {t('lableView.user.dateIssuanceCard')} </Form.Label>
                                <DatePicker
                                  selected={dateIssuanceCard || new Date()} onChange={(date) => setDateIssuanceCard(date)}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {formik.errors.dateIssuanceCard}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                                <Form.Label className='font-weight'> {t('lableView.user.placeIssue')} </Form.Label>
                                <Form.Control
                                  type="text"
                                  name="placeIssue"
                                  value={formik.values.placeIssue}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  isInvalid={formik.touched.placeIssue && formik.errors.placeIssue}
                                  required
                                />
                                <Form.Control.Feedback type="invalid">
                                  {formik.errors.placeIssue}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3'>
                                <Form.Label> {t('lableView.user.address')}</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={formik.values.address}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  isInvalid={formik.touched.address && formik.errors.address}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {formik.errors.address}
                                </Form.Control.Feedback>
                              </Form.Group>
                              {/* <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3'>
                                <p>Nếu không chỉnh sửa địa chỉ, sẽ giữ nguyên địa chỉ cũ là :  {data.address }   </p>
                              </Form.Group> */}

                              <>
                                <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3'>
                                  <div
                                    className='btn_upload_img'
                                    style={triggerImageUpload?.isDragging ? { color: 'red' } : undefined}
                                    onClick={() => triggerImageUpload && triggerImageUpload.onImageUpload()}
                                  >
                                    {t('lableView.user.img')}
                                  </div>
                                </Form.Group>
                              </>


                            </Form.Group>
                          </Row>

                          <div className='mt-3'>
                            <Button variant='primary' type='submit' className='m-2'>
                              {t('actionView.update')}
                            </Button>
                            <Button variant='secondary' className='m-2' onClick={handleClose}>
                              {t('actionView.close')}
                            </Button>
                          </div>

                        </Form>
                      )}
                  </div>
                ) : typeModal === CONTRACTNOW || typeModal === LISTCONTRACT ? (
                  <div>
                    <div className='d-flex mb-4 justify-content-center  align-items'>
                        <label className="font-weight">{t("messageText.latestContract")}</label>
                        <Switch className="toggle-modal-detail ms-2" onChange={() => setCheckedContract(!checkedContract)} checked={checkedContract} />
                        <label className="font-weight ms-2">{t("messageText.contractBill")}</label>
                    </div>
                    {checkedContract === false
                      ? (<>
                        <div className='d-flex'>
                          <label className='font-bold'>
                            {t('lableView.contract.code')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.contractNow?.code}
                          </p>
                        </div>
                        <div className='d-flex mt-2'>
                          <label className='font-bold'>
                            {t('lableView.contract.priceTime')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.contractNow?.priceTime && formatPrice(dataUser?.contractNow?.priceTime)}
                          </p>
                        </div>

                        <div className='d-flex mt-2'>
                          <label className='font-bold'>
                            {t('lableView.contract.deposit')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.contractNow?.deposit}
                          </p>
                        </div>
                        <div className='d-flex mt-2'>
                          <label className='font-bold'>
                            {t('lableView.contract.startTime')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.contractNow?.startTime && convertDateTime(dataUser?.contractNow?.startTime)}
                          </p>
                        </div> <div className='d-flex mt-2'>
                          <label className='font-bold'>
                            {t('lableView.contract.endTime')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.contractNow?.endTime}
                          </p>
                        </div>

                      </>) : (
                        <Accordion defaultActiveKey="0">
                          {dataUser?.contracts?.map((item, key) => {
                            return (
                              <Accordion.Item eventKey={key}>
                                <Accordion.Header>
                                  <div>
                                    <div className='d-flex'>
                                      <label className='font-bold'>
                                        {t('lableView.contract.code')} :
                                      </label>
                                      <p className='ms-2'>
                                        {item?.code}
                                      </p>
                                    </div>

                                  </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div className='d-flex'>
                                    <label className='font-bold'>
                                      {t('lableView.contract.code')} :
                                    </label>
                                    <p className='ms-2'>
                                      {item?.code}
                                    </p>
                                  </div>
                                  <div className='d-flex mt-2'>
                                    <label className='font-bold'>
                                      {t('lableView.contract.priceTime')} :
                                    </label>
                                    <p className='ms-2'>
                                      {item?.priceTime && formatPrice(item?.priceTime)}
                                    </p>
                                  </div>

                                  <div className='d-flex mt-2'>
                                    <label className='font-bold'>
                                      {t('lableView.contract.deposit')} :
                                    </label>
                                    <p className='ms-2'>
                                      {item?.deposit}
                                    </p>
                                  </div>
                                  <div className='d-flex mt-2'>
                                    <label className='font-bold'>
                                      {t('lableView.contract.startTime')} :
                                    </label>
                                    <p className='ms-2'>
                                      {item?.startTime && convertDateTime(item?.startTime)}
                                    </p>
                                  </div>
                                  <div className='d-flex mt-2'>
                                    <label className='font-bold'>
                                      {t('lableView.contract.endTime')} :
                                    </label>
                                    <p className='ms-2'>
                                      {item?.endTime}
                                    </p>
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            )
                          })}
                        </Accordion>
                      )}
                  </div>
                ) : typeModal === BILLNOW || typeModal === LISTBILL ? (
                  <div>
                    <div className='d-flex mb-4 justify-content-center  align-items'>
                          <label className="font-weight">{t("messageText.latestBill")}</label>
                          <Switch className="toggle-modal-detail ms-2" onChange={() => setCheckedBill(!checkedBill)} checked={checkedBill} />
                          <label className="font-weight ms-2">{t("messageText.ssbillList")}</label>
                    </div>
                    {checkedBill === false
                      ? (<>
                        <div className='d-flex'>
                          <label className='font-bold'>
                            {t('lableView.bill.code')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.billNow?.code}
                          </p>
                        </div>
                        <div className='d-flex mt-2'>
                          <label className='font-bold'>
                            {t('lableView.bill.totalMoney')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.billNow?.totalMoney && formatPrice(dataUser?.billNow?.totalMoney)}
                          </p>
                        </div>
                        <div className='d-flex mt-2'>
                          <label className='font-bold'>
                            {t('lableView.bill.start_at')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.billNow?.started_at && convertDateTime(dataUser?.billNow?.started_at)}
                          </p>
                        </div> <div className='d-flex mt-2'>
                          <label className='font-bold'>
                            {t('lableView.bill.end_at')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.billNow?.ends_at && convertDateTime(dataUser?.billNow?.ends_at)}
                          </p>
                        </div>
                        <div className='d-flex mt-2'>
                          <label className='font-bold'>
                            {t('lableView.bill.pay_at')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.billNow?.pay_at ? convertDateTime(dataUser?.billNow?.pay_at) : t('lableView.bill.checkIsNowStatus.hasnot')}
                          </p>
                        </div>

                        <div className='d-flex mt-2'>
                          <label className='font-bold'>
                            {t('lableView.bill.pay_at')} :
                          </label>
                          <p className='ms-2'>
                            {dataUser?.billNow?.status === 1 ? t('lableView.bill.checkIsNowStatus.has') : t('lableView.bill.checkIsNowStatus.hasnot')}
                          </p>
                        </div>
                      </>) : (
                        <Accordion defaultActiveKey="0">
                          {dataUser?.bills?.map((item, key) => {
                            return (
                              <Accordion.Item eventKey={key}>
                                <Accordion.Header>
                                  <div>
                                    <div className='d-flex'>
                                      <label className='font-bold'>
                                        {t('lableView.bill.code')} :
                                      </label>
                                      <p className='ms-2'>
                                        {item?.code}
                                      </p>
                                    </div>

                                  </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div>
                                    <div className='d-flex'>
                                      <label className='font-bold'>
                                        {t('lableView.bill.code')} :
                                      </label>
                                      <p className='ms-2'>
                                        {item?.code}
                                      </p>
                                    </div>
                                    <div className='d-flex mt-2'>
                                      <label className='font-bold'>
                                        {t('lableView.bill.totalMoney')} :
                                      </label>
                                      <p className='ms-2'>
                                        {item?.totalMoney && formatPrice(item?.totalMoney)}
                                      </p>
                                    </div>
                                    <div className='d-flex mt-2'>
                                      <label className='font-bold'>
                                        {t('lableView.bill.start_at')} :
                                      </label>
                                      <p className='ms-2'>
                                        {item?.started_at && convertDateTime(item?.started_at)}
                                      </p>
                                    </div> <div className='d-flex mt-2'>
                                      <label className='font-bold'>
                                        {t('lableView.bill.end_at')} :
                                      </label>
                                      <p className='ms-2'>
                                        {item?.ends_at && convertDateTime(item?.ends_at)}
                                      </p>
                                    </div>
                                    <div className='d-flex mt-2'>
                                      <label className='font-bold'>
                                        {t('lableView.bill.pay_at')} :
                                      </label>
                                      <p className='ms-2'>
                                        {item?.pay_at ? convertDateTime(item?.pay_at) : t('lableView.bill.checkIsNowStatus.hasnot')}
                                      </p>
                                    </div>

                                    <div className='d-flex mt-2'>
                                      <label className='font-bold'>
                                        {t('lableView.bill.pay_at')} :
                                      </label>
                                      <p className='ms-2'>
                                        {item?.status === 1 ? t('lableView.bill.checkIsNowStatus.has') : t('lableView.bill.checkIsNowStatus.hasnot')}
                                      </p>
                                    </div>
                                  </div>
                                </Accordion.Body>
                              </Accordion.Item>
                            )
                          })}
                        </Accordion>
                      )}
                  </div>
                ) : typeModal === MYROOM ? (
                  <div>
                    <div className='d-flex'>
                      <label className='font-bold'>
                        {t('lableView.room.code')} :
                      </label>
                      <p className='ms-2'>
                        {dataUser?.room?.code}
                      </p>
                    </div>
                    <div className='d-flex mt-2'>
                      <label className='font-bold'>
                        {t('lableView.room.name')} :
                      </label>
                      <p className='ms-2'>
                        {dataUser?.room?.name}
                      </p>
                    </div>
                    <div className='d-flex mt-2'>
                      <label className='font-bold'>
                        {t('lableView.room.length')} :
                      </label>
                      <p className='ms-2'>
                        {dataUser?.room?.length}
                      </p>
                    </div> <div className='d-flex mt-2'>
                      <label className='font-bold'>
                        {t('lableView.room.height')} :
                      </label>
                      <p className='ms-2'>
                        {dataUser?.room?.height}
                      </p>
                    </div>
                    <div className='d-flex mt-2'>
                      <label className='font-bold'>
                        {t('lableView.room.width')} :
                      </label>
                      <p className='ms-2'>
                        {dataUser?.room?.width}
                      </p>
                    </div>

                    <div className='d-flex mt-2'>
                      <label className='font-bold'>
                        {t('lableView.room.price')} :
                      </label>
                      <p className='ms-2'>
                        {dataUser?.room?.price && formatPrice(dataUser?.room?.price)}
                      </p>
                    </div>
                    <div className='d-flex mt-2'>
                      <label className='font-bold'>
                        {t('lableView.room.acreage')} :
                      </label>
                      <p className='ms-2'>
                        {dataUser?.room?.acreage}
                      </p>
                    </div>
                    <div className='d-flex mt-2'>
                      <label className='font-bold'>
                        {t('lableView.floor.name')} :
                      </label>
                      <p className='ms-2'>
                        {dataUser?.room?.floor}
                      </p>
                    </div>
                    <div className='d-flex mt-2'>
                      <label className='font-bold'>
                        {t('lableView.typeRoom.name')} :
                      </label>
                      <p className='ms-2'>
                        {dataUser?.room?.typeRoom}
                      </p>
                    </div>
                    <div className='d-flex mt-2'>
                      <label className='font-bold'>
                        {t('lableView.building.name')} :
                      </label>
                      <p className='ms-2'>
                        {dataUser?.room?.building}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Accordion defaultActiveKey="0">
                    {dataUser?.roommates?.map((item, key) => {
                      return (
                        <Accordion.Item eventKey={key}>
                          <Accordion.Header>
                            <div className='d-flex mt-2'>
                              <label className='font-weight'>
                                {t('lableView.user.fullname')} :
                              </label>
                              <p className='ms-2'>
                                {item?.fullname}
                              </p>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div className='d-flex'>
                              <label className='font-weight'>
                                {t('lableView.user.username')} :
                              </label>
                              <p className='ms-2'>
                                {item?.username}
                              </p>
                            </div>
                            <div className='d-flex mt-2'>
                              <label className='font-weight'>
                                {t('lableView.user.fullname')} :
                              </label>
                              <p className='ms-2'>
                                {item?.fullname}
                              </p>
                            </div>
                            <div className='d-flex mt-2'>
                              <label className='font-weight'>
                                {t('lableView.user.email')} :
                              </label>
                              <p className='ms-2'>
                                {item?.email}
                              </p>
                            </div>
                            <div className='d-flex mt-2'>
                              <label className='font-weight'>
                                {t('lableView.user.phoneNumber')} :
                              </label>
                              <p className='ms-2'>
                                +{item?.phoneNumber}
                              </p>
                            </div>
                            <div className='d-flex mt-2'>
                              <label className='font-weight'>
                                {t('lableView.user.address')} :
                              </label>
                              <p className='ms-2'>
                                {item?.address}
                              </p>
                            </div>
                            <div className='d-flex mt-2'>
                              <label className='font-weight'>
                                {t('lableView.user.placeIssue')} :
                              </label>
                              <p className='ms-2'>
                                {item?.placeIssue}
                              </p>
                            </div>
                            <div className='d-flex mt-2'>
                              <label className='font-weight'>
                                {t('lableView.user.dateOfBirth')} :
                              </label>
                              <p className='ms-2'>
                                {item?.dateOfBirth && convertDateTimePost(item?.dateOfBirth)}
                              </p>
                            </div>
                            <div className='d-flex mt-2'>
                              <label className='font-weight'>
                                {t('lableView.user.dateIssuanceCard')} :
                              </label>
                              <p className='ms-2'>
                                {item?.dateIssuanceCard && convertDateTimePost(item?.dateIssuanceCard)}
                              </p>
                            </div>
                            <div className='d-flex mt-2'>
                              <label className='font-weight'>
                                {t('lableView.user.identificationCard')} :
                              </label>
                              <p className='ms-2'>
                                {item?.identificationCard}
                              </p>
                            </div>
                            <div className='d-flex mt-2'>
                              <label className='font-weight'>
                                {t('lableView.user.isVerifiedInfor')} :
                              </label>
                              <p className='ms-2'>
                                {t(item?.isVerifiedInfor === 0 ? "lableView.user.isVerifiedInforValue.notAuthenticated" : 'lableView.user.isVerifiedInforValue.authenticated')}
                              </p>
                            </div>
                            <div className='d-flex mt-2'>
                              <label className='font-weight'>
                                {t('lableView.user.staus')} :
                              </label>
                              <p className='ms-2'>
                                {t(item?.status === 0 ? "lableView.user.statusValue.baned" : 'lableView.user.statusValue.active')}
                              </p>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      )
                    })}
                  </Accordion>
                )}

              </div>
            </Modal.Body>
          </Modal>
        </>
      ) : (<div>
        Loading...
      </div>)}

    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown

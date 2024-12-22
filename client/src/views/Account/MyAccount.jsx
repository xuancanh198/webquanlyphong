import React, { useState, useEffect } from 'react'
import {
    CCard,
} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { getMyInfoStaff } from "../../service/baseService/authService";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { convertDateTime } from '../../service/FunService/funweb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ImageUploading from 'react-images-uploading';
import CIcon from '@coreui/icons-react';
import { getListProvince, getListDistrict, getListward } from '../../service/baseService/APIOutsideSystem';

import { cilUser, cilLockLocked, cilText, cilEnvelopeClosed, cilPhone } from '@coreui/icons';
const MyAccount = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const infoStaff = useSelector((state) => state.reducers.infoStaff);
    const [validated, setValidated] = useState(false);
    const [images, setImages] = useState([]);
    const maxNumber = 1;
    let triggerImageUpload = null;
    const [initialValues, setInitialValues] = useState({
        username: '',
        passwordDefault: '',
        fullname: '',
        address: '',
        roleId: 1,
        email: '',
        phoneNumber: '',
        note: '',
        image: null
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if (infoStaff === null) {
            dispatch(getMyInfoStaff())
        }
         dispatch(getListProvince());
    }, []);
    const province = useSelector((state) => state.listTable.province);
    const district = useSelector((state) => state.listTable.district);
    const ward = useSelector((state) => state.listTable.ward);
    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            username: Yup.string()
                .min(5, t('validation.attribute.min', { attribute: t('lableView.staff.username'), min: 5 }))
                .max(255, t('validation.attribute.min', { attribute: t('lableView.staff.username'), max: 255 }))
                .matches(/^[a-zA-Z0-9]*$/, t('validation.attribute.matches', { attribute: t('lableView.staff.username') }))
                .required(t('validation.attribute.required', { attribute: t('lableView.staff.username') })),
            passwordDefault: Yup.string()
                .min(5, t('validation.attribute.min', { attribute: t('lableView.staff.passwordDefault'), min: 2 }))
                .max(255, t('validation.attribute.min', { attribute: t('lableView.staff.passwordDefault'), max: 50 }))
                .matches(/^[a-zA-Z0-9]*$/, t('validation.attribute.matches', { attribute: t('lableView.staff.passwordDefault'), excludeEmptyString: true, }))
                .required(t('validation.attribute.required', { attribute: t('lableView.staff.passwordDefault') })),
            fullname: Yup.string()
                .min(5, t('validation.attribute.min', { attribute: t('lableView.staff.fullname'), min: 2 }))
                .max(255, t('validation.attribute.min', { attribute: t('lableView.staff.fullname'), max: 50 }))
                .matches(/^[\p{L}\s.']+$/u, t('validation.attribute.matches', { attribute: t('lableView.staff.fullname') }))
                .required(t('validation.attribute.required', { attribute: t('lableView.staff.fullname') })),
            email: Yup.string()
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t('validation.attribute.email', { attribute: t('lableView.staff.email') }))
                .required(t('validation.attribute.required', { attribute: t('lableView.staff.email') })),
            phoneNumber: Yup.string()
                .matches(/^[0-9]+$/, t('validation.attribute.matches', { attribute: t('lableView.staff.phoneNumber') }))
                .min(10, t('validation.attribute.min', { attribute: t('lableView.staff.phoneNumber'), min: 10 }))
                .max(15, t('validation.attribute.max', { attribute: t('lableView.staff.phoneNumber'), max: 15 }))
                .required(t('validation.attribute.required', { attribute: t('lableView.staff.phoneNumber') })),
            roleId: Yup.string()
                .matches(/^[0-9]*$/, t('validation.attribute.matches', { attribute: t('lableView.staff.roleId') }))
                .min(1, t('validation.attribute.min', { attribute: t('lableView.staff.roleId'), min: 1 }))
                .required(t('validation.attribute.required', { attribute: t('lableView.staff.roleId') }))
        }),
        onSubmit: (values, { resetForm }) => {
            if (images === null || images.length === 0) {
                ///dispatch(updateStaff(id, values, resetForm))
            } else {
                // updateStaffFun(values, resetForm);
            }
        }
    });
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

    return (
        <>
            <Modal show={show} onHide={handleClose} className='actice-1200 flex_center'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps,
                                    }) => {
                                        triggerImageUpload = { onImageUpload, isDragging };
                                        return (
                                            <div className="upload__image-wrapper">
                                                {imageList.length === 0 ? (
                                                    <div className='img-form-div'>
                                                        <img src={infoStaff && infoStaff !== null && infoStaff.img ? infoStaff.img : ""} className='img-form' />
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
                                <Form.Group as={Col} xl="6" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
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
                                        <Form.Label> {t('lableView.staff.fullname')}</Form.Label>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.fullname}
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group as={Col} xl="6" lg="6" md="6" sm="12" className='mb-3 mt-3'>
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
                                        <Form.Label> {t('lableView.staff.username')}</Form.Label>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.username}
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} xl="6" lg="6" md="6" sm="12" className='mb-3 mt-3'>
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
                                        <Form.Label> {t('lableView.staff.email')}</Form.Label>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.email}
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group as={Col} xl="6" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
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
                                        <Form.Label> {t('lableView.staff.phoneNumber')}</Form.Label>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.phoneNumber}
                                        </Form.Control.Feedback>
                                    </div>

                                </Form.Group>
                                <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                                    <Form.Label>{t('lableView.staff.province')}</Form.Label>
                                    <Form.Select aria-label="Default select example" name='province' onChange={(e) => provinceFun(e)}>
                                        {province && province.map((item) => (
                                            <option key={item.province_id} value={item.province_id}>{item.province_name}</option>
                                        ))}
                                    </Form.Select>

                                </Form.Group>

                                <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                                    <Form.Label> {t('lableView.staff.district')}</Form.Label>
                                    <Form.Select aria-label="Default select example" name='district' onChange={(e) => districtFun(e)}>
                                        {district && district.map((item) => (
                                            <option key={item.district_id} value={item.district_id}>{item.district_name}</option>
                                        ))}
                                    </Form.Select>

                                </Form.Group>
                                <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                                    <Form.Label> {t('lableView.staff.ward')}</Form.Label>
                                    <Form.Select aria-label="Default select example" name='ward' onChange={(e) => wardFun(e)}>
                                        {ward && ward.map((item) => (
                                            <option key={item.ward_id} value={item.ward_id}>{item.ward_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3'>
                                    <Form.Label> {t('lableView.staff.addressDetail')}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formik.values.addressDetail}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.addressDetail && formik.errors.addressDetail}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.addressDetail}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3'>
                                    <p>Nếu không chỉnh sửa địa chỉ, sẽ giữ nguyên địa chỉ cũ là :  {infoStaff && infoStaff !== null && infoStaff.address ? infoStaff.address : ""}   </p>
                                </Form.Group>


                                <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3'>
                                    <div
                                        className='btn_upload_img'
                                        style={triggerImageUpload?.isDragging ? { color: 'red' } : undefined}
                                        onClick={() => triggerImageUpload && triggerImageUpload.onImageUpload()}
                                    >
                                        {t('lableView.staff.img')}
                                    </div>
                                </Form.Group>
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
                </Modal.Body>
            </Modal>
            <CCard className="p-4">
                {
                    infoStaff &&
                    (<Row className="row">
                        <Row className="mb-3 mt-3 justify-content-end">
                            <div className="flex_center icon-delete" onClick={handleShow}>
                                <i class="fa-solid fa-user-pen"></i>
                            </div>
                        </Row>

                        <Row className="mb-3 mt-3 row">
                            <h4 className='text-center mb-5'>
                                {t('messageText.yourInfoText')}
                            </h4>
                            <Row className="mb-3 mt-3 row">
                                <div className='row col-xl-3 col-sm-12'>
                                    <div className='img-form-div'>
                                        <img src={infoStaff?.img} className='img-form' />
                                    </div>
                                </div>
                                <div className='row col-xl-9 col-sm-12'>
                                    <Col className='d-flex col-xl-6 col-sm-12'>
                                        <Form.Label className='font-weight'>
                                            {t('lableView.staff.username')} :
                                        </Form.Label>
                                        <p className='ms-3'>
                                            {infoStaff?.username}
                                        </p>
                                    </Col>
                                    <Col className='d-flex col-xl-6 col-sm-12'>
                                        <Form.Label className='font-weight'>
                                            {t('lableView.staff.fullname')} :
                                        </Form.Label>
                                        <p className='ms-3'>
                                            {infoStaff?.fullname}
                                        </p>
                                    </Col>
                                    <Col className='d-flex col-xl-6 col-sm-12'>
                                        <Form.Label className='font-weight'>
                                            {t('lableView.role.name')} :
                                        </Form.Label>
                                        <p className='ms-3'>
                                            {infoStaff?.role?.name}
                                        </p>
                                    </Col>
                                    <Col className='d-flex col-xl-6 col-sm-12'>
                                        <Form.Label className='font-weight'>
                                            {t('lableView.staff.phoneNumber')} :
                                        </Form.Label>
                                        <p className='ms-3'>
                                            {infoStaff?.phoneNumber}
                                        </p>
                                    </Col>
                                    <Col className='d-flex col-xl-6 col-sm-12'>
                                        <Form.Label className='font-weight'>
                                            {t('lableView.staff.email')} :
                                        </Form.Label>
                                        <p className='ms-3'>
                                            {infoStaff?.email}
                                        </p>
                                    </Col>
                                    <Col className='d-flex col-xl-6 col-sm-12'>
                                        <Form.Label className='font-weight'>
                                            {t('messageText.verifyText', { attribute: t('messageText.account') })} :
                                        </Form.Label>
                                        <p className='ms-3'>
                                            {infoStaff?.verify_email_at ? t('messageText.verifyValue.authenticated') : t('messageText.verifyValue.notAuthenticated')}
                                        </p>
                                    </Col>
                                    <Col className='d-flex col-xl-6 col-sm-12'>
                                        <Form.Label className='font-weight'>
                                            {t('messageText.statusText')} :
                                        </Form.Label>
                                        <p className='ms-3'>
                                            {infoStaff?.ban_at !== null ? t('messageText.statusValue.ban') : t('messageText.statusValue.active')}
                                        </p>
                                    </Col>
                                    <Col className='d-flex col-xl-6 col-sm-12'>
                                        <Form.Label className='font-weight'>
                                            {t('lableView.staff.created_at')} :
                                        </Form.Label>
                                        <p className='ms-3'>
                                            {infoStaff?.created_at !== null ? convertDateTime(infoStaff.created_at) : t('noData')}
                                        </p>
                                    </Col>
                                    <Col className='d-flex col-xl-6 col-sm-12'>
                                        <Form.Label className='font-weight'>
                                            {t('lableView.staff.updated_at')} :
                                        </Form.Label>
                                        <p className='ms-3'>
                                            {infoStaff?.updated_at !== null ? convertDateTime(infoStaff.updated_at) : t('noData')}
                                        </p>
                                    </Col>
                                    <Col className='d-flex col-12'>
                                        <Form.Label className='font-weight'>
                                            {t('lableView.staff.address')} :
                                        </Form.Label>
                                        <p className='ms-3'>
                                            {infoStaff?.address ?? t('noData')}
                                        </p>
                                    </Col>
                                    <Col className='col-12'>
                                        <h5 className='text-center font-weight py-5'> {t('page.permisstionDetail')} </h5>
                                        <div className=' row mt-4'>
                                            {infoStaff?.permission_detail?.length > 0 && infoStaff?.permission_detail?.map((item, index) => {
                                                return (
                                                     <div key={index} className='col-xl-4 col-lg-6 col-md-12 col-sm-12 d-flex align-items-stretch'>
                                                        <div className='item-user pt-3 pb-3 ps-4 pe-4 m-2 w-100'>
                                                            <p>
                                                                {t('lableView.permisstionDetail.name') + " : " + item?.name}
                                                            </p>
                                                            <p>
                                                                {t('lableView.permisstionDetail.code') + " : " + item?.code} 
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </Col>
                                 
                                </div>
                            </Row>

                        </Row>
                    </Row>)
                }

            </CCard>
        </>
    )
}

export default MyAccount
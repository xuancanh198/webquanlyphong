import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { stripHtmlTags } from '../../../../service/FunService/funweb';
import { updateStaff, deleteStaff, getAllPermisstion, getAllAcction, getAllPermisstionDetail } from '../../../../service/baseService/cruds';
import { getListProvince, getListDistrict, getListward } from '../../../../service/baseService/APIOutsideSystem';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CIcon from '@coreui/icons-react';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { useTranslation } from 'react-i18next';
import { getAllRole } from "../../../../service/baseService/cruds";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImageUploading from 'react-images-uploading';
import { cilUser, cilLockLocked, cilText, cilEnvelopeClosed, cilPhone } from '@coreui/icons';
import { setFilter, setModalUpdate } from "../../../../redux/accction/listTable";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { cilArrowTop, cilArrowBottom } from '@coreui/icons';

function List({ data }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const show = useSelector((state) => state.listTable.modalUpdate);
  const [dataDeatil, setDataDeatil] = useState(null);
  const [editorData, setEditorData] = useState('');
  const [togglePassword, settogglePassword] = useState(false);
  const [images, setImages] = useState([]);
  const [address, setAddress] = useState('');
  const [roleId, setRoleId] = useState(1);
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState(0);
  const [arrPemisstionDetail, setArrPemisstionDetail] = useState([])
  const listAcctionAll = useSelector((state) => state.listTable.listAcctionAll);
  const listPermisstionDetailAll = useSelector((state) => state.listTable.listPermisstionDetailAll);
  const listPermisstionAll = useSelector((state) => state.listTable.listPermisstionAll);
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

  const province = useSelector((state) => state.listTable.province);
  const district = useSelector((state) => state.listTable.district);
  const ward = useSelector((state) => state.listTable.ward);

  const listRole = useSelector((state) => state.listTable.listRoleAll);

  let filters = useSelector((state) => state.listTable.filters);
  const maxNumber = 1;
  useEffect(() => {
    dispatch(getListProvince());
    dispatch(getAllRole(true));
  }, []);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      address: address,
    });
  }, [address]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      roleId: roleId,
    });
  }, [roleId]);


  const handleClose = () => {
    dispatch(setModalUpdate(false));
    if (show === true) {
      setDataDeatil("");
      formik.setValues({ name: "" });
      setArrPemisstionDetail([])
    }
  }
  useEffect(() => {
    if (dataDeatil && dataDeatil !== null) {
      setInitialValues({
        username: dataDeatil.username || '',
        passwordDefault: dataDeatil.password_default || '',
        fullname: dataDeatil.fullname || '',
        address: dataDeatil.address || '',
        roleId: dataDeatil.role_id || 1,
        email: dataDeatil.email || '',
        phoneNumber: dataDeatil.phoneNumber || '',
        note: dataDeatil.note || '',
        image: dataDeatil.image || null
      });
      setId(dataDeatil.id);
      const codes = dataDeatil.permission_detail?.map((detail) => detail.code) || [];
      setArrPemisstionDetail(codes);
    }
  }, [dataDeatil]);
  const handleShow = (item) => {
    dispatch(setModalUpdate(true));
    if (show === false) {
      setDataDeatil(item);
      setId(item.id);
      formik.setValues({ name: item.name });
    }
  };
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };
  useEffect(() => {
    formik.setFieldValue('arrPemisstionDetail', arrPemisstionDetail);
  }, [arrPemisstionDetail]);
  const changePermisstionDetail = (isCheck, value) => {
    const result = listPermisstionDetailAll.filter((item) =>
      item.code.includes(value)
    );
    setArrPemisstionDetail((prev) => {
      if (isCheck) {
        const newItems = result.filter((item) => !prev.includes(item.code));
        return [...prev, ...newItems.map((item) => item.code)];
      } else {
        return prev.filter((item) => !result.map((r) => r.code).includes(item));
      }
    })
  }
  const isValueInArray = (value) => {
    return arrPemisstionDetail.includes(value);
  };
  useEffect(() => {
    dispatch(getAllPermisstion(true, true));
    dispatch(getAllAcction(true, true));
    dispatch(getAllPermisstionDetail(true, true));
  }, [])
  const returnResultCount = (code) => {
    const arrPermisstionCount = arrPemisstionDetail.filter((item) =>
      item.includes(code)
    ).length;
    const listPermisstionCount = listPermisstionDetailAll.filter((item) =>
      item.code.includes(code)
    ).length;
    if (arrPermisstionCount === listPermisstionCount) {
      return "full"
    }
    else if ((arrPermisstionCount > 0) && (arrPermisstionCount < listPermisstionCount)) {
      return "insufficient"
    }
    return false;
  };
  const deleteStaffId = (id) => {
    confirmAlert({
      title: t('action.authentication.delete', { attribute: t('attribute.staff') }),
      message: t('action.message.delete', { attribute: t('attribute.staff') }),
      buttons: [
        {
          label: 'Xóa',
          onClick: () => dispatch(deleteStaff(id))
        },
        {
          label: 'Hủy',
          onClick: () => { }
        }
      ]
    });
  };
  const updateStaffFun = async (values, resetForm) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key === 'image' && values[key]) {
        formData.append('image', values[key]);
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      await dispatch(updateStaff(id, formData, resetForm, true));
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
        dispatch(updateStaff(id, values, resetForm))
      } else {
        updateStaffFun(values, resetForm);
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

  let triggerImageUpload = null;
  const updateTogglePassword = () => {
    settogglePassword(!togglePassword);
  }
  const provinceFun = (e) => {
    dispatch(getListDistrict(e.target.value));
    setProvinceValue(e.target.options[e.target.selectedIndex].text)
  }
  const districtFun = (e) => {
    dispatch(getListward(e.target.value));
    setDistrictValue(e.target.options[e.target.selectedIndex].text)
  }
  const wardFun = (e) => {
    setWardValue(e.target.options[e.target.selectedIndex].text)
  }

  const chaneFtiler = (data) => {
    if (!Array.isArray(filters)) {
      filters = [];
    }

    let found = false;
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].colum === data.colum) {
        found = true;
        if (filters[i].order_by !== data.order_by) {
          filters[i].order_by = data.order_by;
        }
        break;
      }
    }
    if (!found) {
      filters.push(data);
    }
    dispatch(setFilter(btoa(JSON.stringify(filters))));
  }

  return (
    <div className='p-3'>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col'>STT</CTableHeaderCell>
            <CTableHeaderCell scope='col' >
              <div className='flex_start'>
                {t('lableView.staff.fullname')}
                <div>
                  <CIcon icon={cilArrowTop} size='sx'
                    onClick={() => dispatch(
                      chaneFtiler(
                        {
                          colum: "fullname",
                          order_by: "asc"
                        }, filters
                      )
                    )} />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "fullname",
                        order_by: "desc"
                      }, filters
                    ))}
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flex_start'>
                {t('lableView.staff.username')}
                <div>
                  <CIcon icon={cilArrowTop} size='sx'
                    onClick={() => dispatch(
                      chaneFtiler(
                        {
                          colum: "username",
                          order_by: "asc"
                        }, filters
                      )
                    )} />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "username",
                        order_by: "desc"
                      }, filters
                    ))}
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flex_start'>
                {t('lableView.staff.email')}
                <div>
                  <CIcon icon={cilArrowTop} size='sx'
                    onClick={() => dispatch(
                      chaneFtiler(
                        {
                          colum: "email",
                          order_by: "asc"
                        }, filters
                      )
                    )} />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "email",
                        order_by: "desc"
                      }, filters
                    ))}
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flex_start'>
                {t('lableView.staff.phoneNumber')}
                <div>
                  <CIcon icon={cilArrowTop} size='sx'
                    onClick={() => dispatch(
                      chaneFtiler(
                        {
                          colum: "phoneNumber",
                          order_by: "asc"
                        }, filters
                      )
                    )} />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "phoneNumber",
                        order_by: "desc"
                      }, filters
                    ))}
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>{t('table.colum.viewDetail')}</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data && data.map((item, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope='row'>{index + 1}</CTableHeaderCell>
              <CTableDataCell>{item.fullname}</CTableDataCell>
              <CTableDataCell>{item.username}</CTableDataCell>
              <CTableDataCell>{item.email}</CTableDataCell>
              <CTableDataCell>{item.phoneNumber}</CTableDataCell>
              <CTableDataCell>
                <Button variant='primary' onClick={() => handleShow(item)}>
                  {t('table.colum.viewDetail')}
                </Button>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>

        <Modal show={show} onHide={handleClose} className='actice-1200 flex_center'>
          <Modal.Header closeButton>
            <Modal.Title>
              {checked === false ? t('actionView.detail') : t('actionView.update')}

            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='flex_between'>
              <div className='flex_center'>
                <label> {t('actionView.detail')} </label>
                <Switch className='toggle-modal-deatil' onChange={handleChange} checked={checked} />
                <label> {t('actionView.update')}</label>
              </div>
              <div className='flex_center icon-delete' onClick={() => deleteStaffId(dataDeatil.id)}>
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} xl="3" md="12" className='mb-3 mt-3'>
                  {checked === false ? (
                    <div className='img-form-div'>
                      <img src={dataDeatil && dataDeatil !== null && dataDeatil.img ? dataDeatil.img : ""} className='img-form' />
                    </div>
                  )
                    :
                    (
                      <>
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
                                    <img src={dataDeatil && dataDeatil !== null && dataDeatil.img ? dataDeatil.img : ""} className='img-form' />
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
                      </>
                    )}
                </Form.Group>
                <Form.Group as={Col} xl="9" md="12" className='mb-3 mt-3 row'>
                  <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                    {checked === false ?
                      (
                        <p> <span className='lable-form'>{t('lableView.staff.fullname')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.fullname ? dataDeatil.fullname : t('noData')} </p>
                      ) : (
                        <>
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

                        </>
                      )}
                  </Form.Group>
                  <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                    {checked === false ?
                      (
                        <p> <span className='lable-form'>{t('lableView.staff.username')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.username ? dataDeatil.username : t('noData')} </p>
                      ) : (
                        <>
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

                        </>
                      )}
                  </Form.Group>
                  <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                    {checked === false ?
                      (
                        <p> <span className='lable-form'>{t('lableView.staff.passwordDefault')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.password_default ? dataDeatil.password_default : t('noData')} </p>
                      ) : (
                        <>
                          <div className='css-animation'>
                            <div className='font-icon flex_center'>
                              <CIcon icon={cilLockLocked} size="l" />
                            </div>
                            <Form.Control
                              type={togglePassword === false ? "password" : "text"}
                              value={formik.values.passwordDefault}
                              name='passwordDefault'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={formik.touched.passwordDefault && formik.errors.passwordDefault}
                              required
                            />
                            <Form.Label> {t('lableView.staff.passwordDefault')}</Form.Label>
                            <i className={`fa-solid icon-password-acction ${togglePassword === false ? 'fa-eye' : "fa-eye-slash"}`} onClick={updateTogglePassword}></i>
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.passwordDefault}
                            </Form.Control.Feedback>
                          </div>

                        </>
                      )}
                  </Form.Group>
                  <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                    {checked === false ?
                      (
                        <p> <span className='lable-form'>{t('attribute.role')}</span>  : {dataDeatil?.role?.name ?? t('noData')} </p>
                      ) : (
                        <>
                          <Form.Select aria-label="Default select example" name="roleId" onChange={(e) => setRoleId(e.target.value)}>
                            <option key={dataDeatil && dataDeatil !== null && dataDeatil.role_id ? dataDeatil.role_id : null}
                              value={dataDeatil && dataDeatil !== null && dataDeatil.role_id ? dataDeatil.role_id : null}>
                              {dataDeatil && dataDeatil !== null && dataDeatil.role.name ? dataDeatil.role.name : null}
                            </option>
                            {listRole && listRole.map((item) => (
                              dataDeatil && dataDeatil.role_id && item.id === dataDeatil.role_id ? null : (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              )
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.roleId}
                          </Form.Control.Feedback>
                        </>
                      )
                    }
                  </Form.Group>
                  <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                    {checked === false ?
                      (
                        <p> <span className='lable-form'>{t('lableView.staff.email')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.email ? dataDeatil.email : t('noData')} </p>
                      ) : (
                        <>
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

                        </>
                      )
                    }
                  </Form.Group>
                  <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                    {checked === false ?
                      (
                        <p> <span className='lable-form'> {t('lableView.staff.phoneNumber')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.phoneNumber ? dataDeatil.phoneNumber : t('noData')} </p>
                      ) : (
                        <>
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

                        </>
                      )
                    }
                  </Form.Group>
                  {
                    checked === false
                    &&
                    (
                      <>
                        <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                          <p> <span className='lable-form'> {t('messageText.verifyText', { attribute: t('lableView.staff.email') })}</span>  : {dataDeatil?.verify_email_at ? t('messageText.verifyValue.notAuthenticated') : t('messageText.verifyValue.authenticated')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                          <p> <span className='lable-form'> {t('messageText.statusText')}</span>  : {dataDeatil?.ban_at ? t('messageText.statusValue.ban') : t('messageText.statusValue.active')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                          <p> <span className='lable-form'> {t('lableView.staff.ban_expiration_at')}</span>  : {dataDeatil?.ban_expiration_at ?? t('noData')} </p>
                        </Form.Group>
                      </>
                    )
                  }
                  {checked === false ?
                    (
                      <p> <span className='lable-form'> {t('lableView.staff.address')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.address ? dataDeatil.address : t('noData')} </p>
                    ) : (
                      <>
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
                      </>
                    )
                  }
                  {
                    checked === true
                    && (
                      <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3'>
                        <p>Nếu không chỉnh sửa địa chỉ, sẽ giữ nguyên địa chỉ cũ là :  {dataDeatil && dataDeatil !== null && dataDeatil.address ? dataDeatil.address : ""}   </p>
                      </Form.Group>
                    )
                  }
                  {checked === false ?
                    "" : (
                      <>
                        <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3'>
                          <div
                            className='btn_upload_img'
                            style={triggerImageUpload?.isDragging ? { color: 'red' } : undefined}
                            onClick={() => triggerImageUpload && triggerImageUpload.onImageUpload()}
                          >
                            {t('lableView.staff.img')}
                          </div>
                        </Form.Group>
                      </>
                    )
                  }
                  <Form.Group as={Col} md="12 mt-4">
                    {checked === false ?
                      <div>
                        <Form.Label className='font-weight'>  {t('page.permisstionDetail')} :</Form.Label>
                        <div className='row'>
                          {dataDeatil?.permission_detail?.map((item, index) => {
                            return (
                              <div className='my-3 col-xl-4 col-lg-6 col-md-6 col-sm-12' key={index}>
                                <p>
                                  {item?.name}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      :
                      <>
                        <Tabs
                          defaultActiveKey="permisstion"
                          id="uncontrolled-tab-example"
                          className="mb-3"
                        >
                          <Tab eventKey="permisstion" title={t('page.permisstion')}>
                            <div className='row'>
                              {listPermisstionAll?.map((item, index) => {
                                return (
                                  <div className='d-flex col-xl-4 col-lg-6 col-md-6 col-sm-12' key={index}>
                                    <input
                                      checked={
                                        returnResultCount(item?.code) === false
                                          ? false : true
                                      }
                                      type='checkbox' onChange={(e) => changePermisstionDetail(e.target.checked, item?.code)} value={item?.code} />
                                    <label className={`ms-2 ${returnResultCount(item?.code) !== false && (returnResultCount(item?.code) === "full" ? "color-violet" : "color-dark-accent")}`}>
                                      {item?.name}
                                    </label>
                                  </div>
                                )
                              })}
                            </div>
                          </Tab>
                          <Tab eventKey="acction" title={t('page.acction')}>
                            <div className='row'>
                              {listAcctionAll?.map((item, index) => {
                                return (
                                  <div className='d-flex col-xl-4 col-lg-6 col-md-6 col-sm-12' key={index}>
                                    <input
                                      checked={
                                        returnResultCount(item?.code) === false
                                          ? false : true
                                      }
                                      type='checkbox' onChange={(e) => changePermisstionDetail(e.target.checked, item?.code)} value={item?.code} />
                                    <label className={`ms-2 ${returnResultCount(item?.code) !== false && (returnResultCount(item?.code) === "full" ? "color-violet" : "color-dark-accent")}`}>
                                      {item?.name}
                                    </label>
                                  </div>
                                )
                              })}
                            </div>
                          </Tab>
                          <Tab eventKey="permisstionDetail" title={t('page.permisstionDetail')}>
                            <div className='row'>
                              {listPermisstionDetailAll?.map((item, index) => {
                                return (
                                  <div className='d-flex col-xl-4 col-lg-6 col-md-6 col-sm-12' key={index}>
                                    <input type='checkbox'
                                      checked={isValueInArray(item?.code)}
                                      onChange={(e) => changePermisstionDetail(e.target.checked, item?.code)} value={item?.code} />
                                    <label className='ms-2'>
                                      {item?.name}
                                    </label>
                                  </div>
                                )
                              })}
                            </div>
                          </Tab>
                        </Tabs>
                      </>
                    }
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xl="12" sm="12" className='mb-3 mt-3'>
                    {checked === false ?
                      (
                        <p> <span className='lable-form'> {t('lableView.staff.note')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.note ? stripHtmlTags(dataDeatil.note) : t('noData')} </p>
                      ) : (
                        <>
                          <Form.Label> {t('lableView.staff.note')}</Form.Label>
                          <CKEditor
                            name="note"
                            editor={ClassicEditor}
                            data={editorData}
                            config={{
                              toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
                              ckfinder: {
                                uploadUrl: '/path/to/your/upload/url'
                              }
                            }}

                          />
                        </>
                      )
                    }
                  </Form.Group>
                </Form.Group>
              </Row>
              {checked === false ? null : (
                <div className='mt-3'>
                  <Button variant='primary' type='submit' className='m-2'>
                    {t('actionView.update')}
                  </Button>
                  <Button variant='secondary' className='m-2' onClick={handleClose}>
                    {t('actionView.close')}
                  </Button>
                </div>
              )}
            </Form>
          </Modal.Body>

        </Modal>
      </CTable>
    </div>
  );
}

export default List;
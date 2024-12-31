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
import { stripHtmlTags, convertDateTimeUS, convertDateTime } from '../../../../service/FunService/funweb';
import { updateUser, deleteUser, getAllRoom } from '../../../../service/baseService/cruds';
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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImageUploading from 'react-images-uploading';
import { cilUser, cilText, cilEnvelopeClosed, cilPhone, cilCreditCard, cilArrowTop, cilArrowBottom } from '@coreui/icons';
import { setFilter, setModalUpdate } from "../../../../redux/accction/listTable";
import DatePicker from 'react-datepicker';

function List({ data }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const show = useSelector((state) => state.listTable.modalUpdate);
  const [dataDeatil, setDataDeatil] = useState(null);
  const [editorData, setEditorData] = useState('');
  const [note, setNote] = useState('')
  const [images, setImages] = useState([]);
  const [address, setAddress] = useState('');
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState(0);
  const [dateIssuanceCard, setDateIssuanceCard] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [initialValues, setInitialValues] = useState({
    username: '',
    password: "",
    fullname: "",
    address: address,
    identificationCard: "",
    email: "",
    phoneNumber: "",
    note: note,
    image: null,
    dateOfBirth: convertDateTime(dateOfBirth),
    dateIssuanceCard: convertDateTime(dateIssuanceCard),
    placeIssue: "",
  });

  const province = useSelector((state) => state.listTable.province);
  const district = useSelector((state) => state.listTable.district);
  const ward = useSelector((state) => state.listTable.ward);
  const page = useSelector((state) => state.listTable.page);
  const limit = useSelector((state) => state.listTable.limit);

  let filters = useSelector((state) => state.listTable.filters);
  const maxNumber = 1;
  useEffect(() => {
       dispatch(getListProvince());
    dispatch(getAllRoom(true, true));
  }, []);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      address: address,
    });
  }, [address]);

  const handleClose = () => {
    dispatch(setModalUpdate(false));
    if (show === true) {
      setDataDeatil("");
      formik.setValues({ name: "" });
    }
  }
  useEffect(() => {
    if (dataDeatil && dataDeatil !== null) {
      setInitialValues({
        username: dataDeatil.username || '',
        passwordDefault: dataDeatil.defaultPassword || '',
        fullname: dataDeatil.fullname || '',
        address: dataDeatil.address || '',
        identificationCard: dataDeatil.identificationCard || 1,
        email: dataDeatil.email || '',
        phoneNumber: dataDeatil.phoneNumber || '',
        note: dataDeatil.note || '',
        image: dataDeatil.image || null,
        dateOfBirth: convertDateTime(dataDeatil.dateIssuanceCard),
        dateIssuanceCard: convertDateTime(dataDeatil.dateOfBirth),
        placeIssue: dataDeatil.placeIssue || '',
      });
      setId(dataDeatil.id);
      setDateIssuanceCard(dataDeatil.dateIssuanceCard !== null ? convertDateTimeUS(dataDeatil.dateIssuanceCard) : new Date());
      setDateOfBirth(dataDeatil.dateOfBirth !== null ? convertDateTimeUS(dataDeatil.dateOfBirth) : new Date())
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
    setInitialValues(prevValues => ({
      ...prevValues,
      dateOfBirth: convertDateTime(dateOfBirth)
    }));
  }, [dateOfBirth]);
  useEffect(() => {
    setInitialValues(prevValues => ({
      ...prevValues,
      dateIssuanceCard: convertDateTime(dateIssuanceCard)
    }));
  }, [dateIssuanceCard]);
  const deleteUserId = (id) => {
    confirmAlert({
      title: t('action.authentication.delete', { attribute: t('page.user') }),
      message: t('action.message.delete', { attribute: t('page.user') }),
      buttons: [
        {
          label: 'Xóa',
          onClick: () => dispatch(deleteUser(id))
        },
        {
          label: 'Hủy',
          onClick: () => { }
        }
      ]
    });
  };
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
      await dispatch(updateUser(id, formData, resetForm, true));
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
        dispatch(updateUser(id, values, resetForm))
      } else {
        updateUserFun(values, resetForm);
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
                {t('lableView.user.fullname')}
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
                {t('lableView.user.username')}
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
                {t('lableView.user.email')}
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
                {t('lableView.user.phoneNumber')}
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
              <div className='flex_center icon-delete' onClick={() => deleteUserId(dataDeatil.id)}>
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} xl="3" md="12" className='mb-3 mt-3'>
                  {checked === false ? (
                    <div className='img-form-div'>
                      <img src={dataDeatil && dataDeatil !== null && dataDeatil.imgLink} className='img-form' />
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

                                    <img src={dataDeatil && dataDeatil !== null && dataDeatil.imgLink} className='img-form' />
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
                        <p> <span className='lable-form'>{t('lableView.user.fullname')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.fullname ? dataDeatil.fullname : t('noData')} </p>
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
                            <Form.Label> {t('lableView.user.fullname')}</Form.Label>
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
                        <p> <span className='lable-form'>{t('lableView.user.username')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.username ? dataDeatil.username : t('noData')} </p>
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
                            <Form.Label> {t('lableView.user.username')}</Form.Label>
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.username}
                            </Form.Control.Feedback>
                          </div>

                        </>
                      )}
                  </Form.Group>
                  <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                    {checked === false ?
                      (
                        <p> <span className='lable-form'>{t('lableView.user.identificationCard')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.identificationCard ? dataDeatil.identificationCard : t('noData')} </p>
                      ) : (
                        <>
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
                        </>
                      )
                    }
                  </Form.Group>
                  <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                    {checked === false ?
                      (
                        <p> <span className='lable-form'>{t('lableView.user.email')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.email ? dataDeatil.email : t('noData')} </p>
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
                            <Form.Label> {t('lableView.user.email')}</Form.Label>
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
                        <p> <span className='lable-form'> {t('lableView.user.phoneNumber')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.phoneNumber ? dataDeatil.phoneNumber : t('noData')} </p>
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
                            <Form.Label> {t('lableView.user.phoneNumber')}</Form.Label>
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.phoneNumber}
                            </Form.Control.Feedback>
                          </div>

                        </>
                      )
                    }
                  </Form.Group>
                  {
                    checked === true
                    &&
                    (
                      <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                      </Form.Group>
                    )
                  }
                  <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                    {
                      checked === false
                        ?
                        (
                          <p>
                            <Form.Label className='mb-2 font-weight'> {t('lableView.user.dateOfBirth')} : </Form.Label>
                            {dataDeatil && dataDeatil !== null && dataDeatil.dateOfBirth ? convertDateTime(dataDeatil.dateOfBirth) : t('noData')}

                          </p>
                        ) :
                        (
                          <>
                            <Form.Label className='mb-2'> {t('lableView.user.dateOfBirth')} : </Form.Label>
                            <DatePicker
                              selected={dateOfBirth || new Date()} onChange={(date) => setDateOfBirth(date)}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.dateOfBirth}
                            </Form.Control.Feedback>
                          </>
                        )
                    }

                  </Form.Group>
                  <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                    {
                      checked === false
                        ?
                        (
                          <p>
                            <Form.Label className='font-weight'> {t('lableView.user.dateIssuanceCard')} :</Form.Label>
                            {dataDeatil && dataDeatil !== null && dataDeatil.dateIssuanceCard ? convertDateTime(dataDeatil.dateIssuanceCard) : t('noData')}
                          </p>
                        ) :
                        (
                          <>
                            <Form.Label className='font-weight'> {t('lableView.user.dateIssuanceCard')} </Form.Label>
                            <DatePicker
                              selected={dateIssuanceCard || new Date()} onChange={(date) => setDateIssuanceCard(date)}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.dateIssuanceCard}
                            </Form.Control.Feedback>
                          </>
                        )
                    }

                  </Form.Group>
                  <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                    {
                      checked === false
                        ?
                        (
                          <p>
                            <Form.Label className='font-weight'> {t('lableView.user.placeIssue')} :</Form.Label>
                            {dataDeatil !== null && dataDeatil.placeIssue && dataDeatil.placeIssue !== null && dataDeatil.placeIssue.length > 0 ? dataDeatil.placeIssue : t('noData')}
                          </p>
                        ) :
                        (
                          <>
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
                          </>
                        )
                    }

                  </Form.Group>
                  {checked === false ?
                    (
                      <p> <span className='lable-form'> {t('lableView.user.address')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.address ? dataDeatil.address : t('noData')} </p>
                    ) : (
                      <>
                        <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                          <Form.Label>{t('lableView.user.province')}</Form.Label>
                          <Form.Select aria-label="Default select example" name='province' onChange={(e) => provinceFun(e)}>
                            {province && province.map((item) => (
                              <option key={item.province_id} value={item.province_id}>{item.province_name}</option>
                            ))}
                          </Form.Select>

                        </Form.Group>

                        <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                          <Form.Label> {t('lableView.user.district')}</Form.Label>
                          <Form.Select aria-label="Default select example" name='district' onChange={(e) => districtFun(e)}>
                            {district && district.map((item) => (
                              <option key={item.district_id} value={item.district_id}>{item.district_name}</option>
                            ))}
                          </Form.Select>

                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                          <Form.Label> {t('lableView.user.ward')}</Form.Label>
                          <Form.Select aria-label="Default select example" name='ward' onChange={(e) => wardFun(e)}>
                            {ward && ward.map((item) => (
                              <option key={item.ward_id} value={item.ward_id}>{item.ward_name}</option>
                            ))}
                          </Form.Select>

                        </Form.Group>
                        <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3'>
                          <Form.Label> {t('lableView.user.addressDetail')}</Form.Label>
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
                  <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3'>
                    <p>Nếu không chỉnh sửa địa chỉ, sẽ giữ nguyên địa chỉ cũ là :  {dataDeatil && dataDeatil !== null && dataDeatil.address ? dataDeatil.address : ""}   </p>
                  </Form.Group>
                  {checked === true &&
                    (
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
                    )
                  }
                  <Form.Group as={Col} xl="12" sm="12" className='mb-3 mt-3'>
                    {checked === false ?
                      (
                        <p> <span className='lable-form'> {t('lableView.user.note')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.note ? stripHtmlTags(dataDeatil.note) : t('noData')} </p>
                      ) : (
                        <>
                          <Form.Label> {t('lableView.user.note')}</Form.Label>
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
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
import { stripHtmlTags, formatPrice, convertDateTimeFull } from '../../../../../service/FunService/funweb';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { setModalUpdate } from "../../../../../redux/accction/listTable";
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import 'rc-input-number/assets/index.css';
import ImageUploading from 'react-images-uploading';
import { updateBillUser } from "../../../../../service/baseService/authService";
function List({ data }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const maxNumber = 1;
  let triggerImageUpload = null;
  const show = useSelector((state) => state.listTable.modalUpdate);
  const [dataDeatil, setDataDeatil] = useState(null);
  const [checked, setChecked] = useState(false);
  const [images, setImages] = useState([]);
  const handleClose = () => {
    dispatch(setModalUpdate(false));
    if (show === true) {
      setDataDeatil(null);
    }
  }
  useEffect(() => {
    if (dataDeatil !== null){
      formik.setFieldValue('billId', dataDeatil?.id);
      formik.setFieldValue('totalMoney', dataDeatil?.totalMoney);
    }
  }, [dataDeatil])

  const onChange = (imageList) => {
    if (imageList.length > 0) {
      const file = imageList[0].file;
      formik.setFieldValue('images', file);
      setImages(imageList);
    } else {
      formik.setFieldValue('images', null);
      setImages([]);
    }
  };

  const handleShow = (item) => {
    dispatch(setModalUpdate(true));
    setDataDeatil(item);
  };

  const payBillUser = async (values, resetForm) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key === 'image' && values[key]) {
        formData.append('image', values[key]);
      } else {
        formData.append(key, values[key]);
      }
    });
    try {
      await dispatch(updateBillUser(formData, resetForm, true));
      formik.resetForm();
    } catch (error) {
      toast.error('có lỗi xảy ra');
    }
  };

  const formik = useFormik({
    initialValues: {
      totalMoney: null,
      images: null,
      billId: null,
    },
    validationSchema: Yup.object({
      // name: Yup.string()
      //   .min(2, t('validation.attribute.min', { attribute: t('lableView.typeRoom.name'), min: 2 }))
      //   .max(50, t('validation.attribute.max', { attribute: t('lableView.typeRoom.name'), max: 50 }))
      //   .matches(/^[\p{L} ]+$/u, t('validation.attribute.matches', { attribute: t('lableView.typeRoom.name') }))
      //   .required(t('validation.attribute.required', { attribute: t('lableView.typeRoom.name') })),
    }),
    onSubmit: (values, { resetForm }) => {
      if (images === null || images.length === 0) {
        dispatch(updateBillUser(values, resetForm))
      } else {
        payBillUser(values, resetForm);
      }
    }
  });
  return (
    <div className='p-3'>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col'>STT</CTableHeaderCell>
            <CTableHeaderCell scope='col' >
              <div className='flex_start'>
                {t('lableView.bill.code')}
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flexcontract_start'>
                {t('lableView.bill.totalMoney')}
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flex_start'>
                {t('lableView.contract.room')}
              </div>
            </CTableHeaderCell>

            <CTableHeaderCell scope='col'>{t('table.colum.viewDetail')}</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data && data.map((item, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope='row'>{index + 1}</CTableHeaderCell>
              <CTableDataCell>{item?.code}</CTableDataCell>
              <CTableDataCell>{item?.totalMoney && formatPrice(item?.totalMoney)}</CTableDataCell>
              <CTableDataCell>{item?.room?.name}</CTableDataCell>
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
              {dataDeatil?.status === 0
                &&
                (
                  <div className='flex_center'>
                    <label> {t('actionView.detail')} </label>
                    <Switch className='toggle-modal-deatil' onChange={() => setChecked(!checked)} checked={checked} />
                    <label> {t('actionView.update')}</label>
                  </div>
                )
              }
            </div>
            <Form noValidate validated={true} onSubmit={formik.handleSubmit}>
              {checked === false
                ?
                (
                  <>
                    <Row className="mb-3 mt-3">
                      <Form.Group as={Col} xl="3" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                        <div className='img-form-div'>
                          <img src={dataDeatil?.img ?? "https://ung-dung.com/images/upanh_online/upanh.png"} className='img-form' />
                        </div>
                      </Form.Group>
                      <Form.Group as={Col} xl="9" lg="6" md="6" sm="12" className='mb-3 mt-3 row'>
                        <Form.Group as={Col} xl="4" lg="4" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.bill.code')}</span>  : {dataDeatil?.code !== null ? dataDeatil?.code : t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl={"6"} lg={"6"} md="12" sm="12" className='mb-3 mt-3'>
                          <p> <span className='lable-form'>{t('lableView.bill.start_at')}</span>  : {dataDeatil?.start_at !== null ? convertDateTimeFull(dataDeatil?.start_at) : t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl={"6"} lg={"6"} md="12" sm="12" className='mb-3 mt-3'>
                          <p> <span className='lable-form'>{t('lableView.bill.end_at')}</span>  : {dataDeatil?.end_at !== null ? convertDateTimeFull(dataDeatil?.end_at) : t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.bill.user')}</span>  :
                            {dataDeatil?.user?.fullname ?? t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.bill.staff')}</span>  :
                            {dataDeatil?.staff?.fullname ?? t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.bill.status')}</span>  :
                            {dataDeatil?.pay_at ? t('lableView.bill.checkIsNowStatus.has') : t('lableView.bill.checkIsNowStatus.hasnot')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.bill.status')}</span>  :
                            {dataDeatil?.formPayment ? dataDeatil?.formPayment : t('noData')} </p>
                        </Form.Group>

                        <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.bill.totalMoney')}</span>  :
                            {(dataDeatil?.totalMoney && formatPrice(dataDeatil?.totalMoney)) ?? t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.bill.created_at')}</span>  :
                            {(dataDeatil?.created_at && convertDateTimeFull(dataDeatil?.created_at)) ?? t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.bill.updated_at')}</span>  :
                            {(dataDeatil?.updated_at && convertDateTimeFull(dataDeatil?.updated_at)) ?? t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.bill.pay_at')}</span>  :
                            {(dataDeatil?.pay_at && convertDateTimeFull(dataDeatil?.pay_at)) ?? t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.building.name')}</span>  :
                            {dataDeatil?.room?.building?.name !== null ? dataDeatil?.room?.building?.name : t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.room.name')}</span>  :
                            {dataDeatil?.room?.name ?? t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.room.code')}</span>  :
                            {dataDeatil?.room?.floor?.code ?? t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.floor.name')}</span>  :
                            {dataDeatil?.room?.floor?.name !== null ? dataDeatil?.room?.floor?.name : t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.floor.code')}</span>  :
                            {dataDeatil?.room?.floor?.code !== null ? dataDeatil?.room?.floor?.code : t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.building.name')}</span>  :
                            {dataDeatil?.room?.building.name ?? t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.building.code')}</span>  :
                            {dataDeatil?.room?.building.code ?? t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3 '>
                          <p> <span className='lable-form'>{t('lableView.building.address')}</span>  :
                            {dataDeatil?.room?.building?.address !== null ? dataDeatil?.room?.building.address : t('noData')} </p>
                        </Form.Group>
                        <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-2 mt-2'>
                          <Form.Label className='font-weight'> {t('lableView.contract.serivce')} : </Form.Label>
                          <div className=' row mt-4'>
                            {dataDeatil?.detail?.length > 0 && dataDeatil?.detail?.map((item, index) => {
                              return (
                                <div key={index} className='col-xl-4 col-lg-6 col-md-12 col-sm-12 d-flex align-items-stretch'>
                                  <div className='item-user pt-3 pb-3 ps-4 pe-4 m-2 w-100'>
                                    <Link>
                                      {t('lableView.service.name') + " : " + item?.service?.name}
                                    </Link>
                                    <p>
                                      {t('lableView.bill.intoMoney') + " : "}  {item?.price && item?.quantity && formatPrice(item?.price * item?.quantity)}
                                    </p>
                                    <p>
                                      {t('lableView.service.price') + " : " + formatPrice(item?.price) + " / " + t("lableView.service.unitValue." + item.service.unit)} <br />
                                      {t('quantity') + " : " + item?.quantity}
                                    </p><br />

                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </Form.Group>
                        <Form.Group as={Col} xl="12" sm="12" className='mb-3 mt-3'>
                          <p>
                            <span className='label-form'>{t('lableView.contract.note')}</span> :
                            {dataDeatil?.note !== null ? stripHtmlTags(dataDeatil?.note) : t('noData')}
                          </p>
                        </Form.Group>
                      </Form.Group>
                    </Row>
                  </>
                ) : (
                  <div className='row' >
                    <Form.Group as={Col} xl="3" md="12" className={'mt-2 mb-2'}>
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
                                  <img src={dataDeatil?.img ? dataDeatil.img : "https://ung-dung.com/images/upanh_online/upanh.png"} className='img-form' />
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
                    <Form.Group as={Col} xl="6" md="12" className={'row mt-2 mb-2'}>
                      <Form.Group as={Col} className={'col-12 mt-2 mb-2'}>
                        <Form.Label> {t('lableView.bill.totalMoney')}</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="totalMoney"
                          value={formik.values.totalMoney}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={formik.touched.totalMoney && formik.errors.totalMoney}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.totalMoney}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} className={'col-12 mt-2 mb-2'}>
                        <div
                          className='btn_upload_img'
                          style={triggerImageUpload?.isDragging ? { color: 'red' } : undefined}
                          onClick={() => triggerImageUpload && triggerImageUpload.onImageUpload()}
                        >
                          {t('lableView.bill.imageBill')}
                        </div>
                      </Form.Group>
                    </Form.Group>

                  </div>
                )
              }
              {checked === true && (
                <div className='mt-3'>
                  <Button variant='primary' type='submit' className='m-2'>
                    {t('actionView.pay')}
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

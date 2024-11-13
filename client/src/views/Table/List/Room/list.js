import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { convertDateTime } from '../../../../service/FunService/funweb';
import ImageUploading from 'react-images-uploading';
import { updateRoom, deleteRoom, getAllTypeRoom, getAllFloor, getAllBuilding, getAllService, getAllFurniture } from "../../../../service/baseService/cruds";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CIcon from '@coreui/icons-react';
import { cilArrowTop, cilArrowBottom } from '@coreui/icons';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import InputNumber from 'rc-input-number';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { setFurnitureAll, setModalUpdate } from "../../../../redux/accction/listTable";
import { useTranslation } from 'react-i18next';
import { chaneFtiler } from "../../../../service/baseService/funService";
import 'rc-input-number/assets/index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { stripHtmlTags } from "../../../../service/FunService/funweb";
import {formatPrice} from "../../../../service/FunService/funweb"
function List({ data }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  let filters = useSelector((state) => state.listTable.filters);
  let show = useSelector((state) => state.listTable.modalUpdate);
  const [dataDeatil, setDataDeatil] = useState(null);
  const [checked, setChecked] = useState(false);
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState([]);
  const [note, setNote] = useState('');
  const [floor, setFloor] = useState(null);
  const [typeRoom, setTypeRoom] = useState(null);
  const [building, setBuilding] = useState(null);
  const [service, setService] = useState([]);
  const [id, setId] = useState(0);
  const [furniture, setFurnitures] = useState([]);
  const [furnitureArray, setFurnitureArray] = useState([]);
  const [serviceArray, setServiceArray] = useState([]);
  const [initialValues, setInitialValues] = useState({
    acreage: 1,
    height: 1,
    width: 1,
    length: 1,
    code: 1,
    name: 1,
    images: [],
    furniture: [],
    service: [],
    buildingId: 1,
    floorId: 1,
    typeRoomId: 1,
    note: 1,
    price:1
  });

  const listFurnituresAll = useSelector((state) => state.listTable.listFurnituresAll);
  const listServiceAll = useSelector((state) => state.listTable.listServiceAll);
  const listTypeRoomAll = useSelector((state) => state.listTable.listTypeRoomAll);
  const listBuildingAll = useSelector((state) => state.listTable.listBuildingAll);
  const listFloor = useSelector((state) => state.listTable.listFloorAll);

  const handleClose = () => dispatch(setModalUpdate(false));
  const handleShow = (item) => {
    setDataDeatil(item)
    dispatch(setModalUpdate(true))
  };

  const maxNumber = 10;
  let triggerImageUpload = null;
  const onChange = (imageList) => {
    if (imageList.length > 0) {
      setImages(imageList);
      formik.setFieldValue('images', Array.isArray(imageList));
    } else {
      formik.setFieldValue('images', []);
      setImages([]);
    }
  };

  useEffect(() => {
    if (dataDeatil && dataDeatil !== null) {
      setInitialValues(dataDeatil);
      setId(dataDeatil.id);
    }
  }, [dataDeatil]);

  useEffect(() => {
    if (dataDeatil && dataDeatil !== null) {
      setInitialValues({
        acreage: dataDeatil.acreage,
        height: dataDeatil.height,
        width: dataDeatil.width,
        length: dataDeatil.length,
        code: dataDeatil.code,
        name: dataDeatil.name,
        price: dataDeatil.price,
        images: [],
        furniture: [],
        service: [],
        buildingId: dataDeatil.building.id,
        floorId: dataDeatil.floor.id,
        typeRoomId: dataDeatil.type_room.id,
        note: dataDeatil.note,
      });
      setId(dataDeatil.id);
      setFurnitureArray(dataDeatil.furniture_room);
      setService(dataDeatil.service_room.map(item => ({
        serviceId: item.service.id,
        id: item.id
      })))
      setFurnitures(dataDeatil.furniture_room.map(item => ({
        furnitureId: item.furniture.id,
        quantity: item.quantity,
        id: item.id
      })))
      setServiceArray(dataDeatil.service_room);
    }
  }, [dataDeatil]);
  useEffect(() => {
    if (listBuildingAll !== null && listBuildingAll.length > 0) {
      setBuilding(listBuildingAll[0].id);
    }
  }, [listBuildingAll]);

  const handleChange = (checked) => {
    setChecked(checked);
  };
  useEffect(() => {
    if (listTypeRoomAll !== null && listTypeRoomAll.length > 0) {
      setTypeRoom(listTypeRoomAll[0].id);
    }
  }, [listTypeRoomAll]);

  useEffect(() => {
    if (listBuildingAll !== null && listBuildingAll.length > 0) {
      setBuilding(listBuildingAll[0].id);
    }
  }, [listBuildingAll]);

  useEffect(() => {
    if (listFloor !== null && listFloor.length > 0) {
      setFloor(listFloor[0].id);
    }
  }, [listFloor]);
  useEffect(() => {
    if (show === true) {
        if (
            listFurnituresAll === null &&
            listServiceAll === null &&
            listTypeRoomAll === null &&
            listBuildingAll === null &&
            listFloor === null
        ) {
            Promise.all([
                dispatch(getAllTypeRoom(true, true)),
                dispatch(getAllFloor(true, true)),
                dispatch(getAllBuilding(true, true)),
                dispatch(getAllService(true, true)),
                dispatch(getAllFurniture(true, true)),
            ])
        } else {
            if (listTypeRoomAll === null) {
                dispatch(getAllTypeRoom(true, true));
            }
            if (listFloor === null) {
                dispatch(getAllFloor(true, true));
            }
            if (listBuildingAll === null) {
                dispatch(getAllBuilding(true));
            }
            if (listServiceAll === null) {
                dispatch(getAllService(true, true));
            }
            if (listFurnituresAll === null) {
                dispatch(getAllFurniture(true, true));
            }
        }
    }
}, [dispatch, show]);
  useEffect(() => {
    setInitialValues(prevValues => ({
      ...prevValues,
      typeRoomId: typeRoom,
    }));
  }, [typeRoom]);

  useEffect(() => {
    setInitialValues(prevValues => ({
      ...prevValues,
      floorId: floor,
    }));
  }, [floor]);

  useEffect(() => {
    setInitialValues(prevValues => ({
      ...prevValues,
      buildingId: building,
    }));
  }, [building]);

  useEffect(() => {
    setInitialValues(prevValues => ({
      ...prevValues,
      service: [...service],
    }));
  }, [service]);

  useEffect(() => {
    setInitialValues(prevValues => ({
      ...prevValues,
      images: [...images],
    }));
  }, [images]);

  useEffect(() => {
    setInitialValues(prevValues => ({
      ...prevValues,
      furniture: furniture,
    }));
  }, [furniture]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      length: Yup.number()
        .required(t('validation.attribute.required', { attribute: t('lableView.room.length') }))
        .min(1, t('validation.attribute.min', { attribute: t('lableView.room.length'), min: 1 }))
        .integer(t('validation.attribute.integer', { attribute: t('lableView.room.length') }))
        .typeError(t('validation.attribute.integer', { attribute: t('lableView.room.length') })),

      width: Yup.number()
        .required(t('validation.attribute.required', { attribute: t('lableView.room.width') }))
        .min(1, t('validation.attribute.min', { attribute: t('lableView.room.width'), min: 1 }))
        .integer(t('validation.attribute.integer', { attribute: t('lableView.room.width') }))
        .typeError(t('validation.attribute.integer', { attribute: t('lableView.room.width') })),

      height: Yup.number()
        .required(t('validation.attribute.required', { attribute: t('lableView.room.height') }))
        .min(1, t('validation.attribute.min', { attribute: t('lableView.room.height'), min: 1 }))
        .integer(t('validation.attribute.integer', { attribute: t('lableView.room.height') }))
        .typeError(t('validation.attribute.integer', { attribute: t('lableView.room.height') })),

      acreage: Yup.number()
        .required(t('validation.attribute.required', { attribute: t('lableView.room.acreage') }))
        .min(1, t('validation.attribute.min', { attribute: t('lableView.room.acreage'), min: 1 }))
        .integer(t('validation.attribute.integer', { attribute: t('lableView.room.acreage') }))
        .typeError(t('validation.attribute.integer', { attribute: t('lableView.room.acreage') })),

      name: Yup.string()
        .required(t('validation.attribute.required', { attribute: t('lableView.room.name') }))
        .min(1, t('validation.attribute.min', { attribute: t('lableView.room.name'), min: 1 }))
        .max(255, t('validation.attribute.max', { attribute: t('lableView.room.name'), max: 255 }))
        .matches(/^[\p{L}0-9 ]+$/u, t('validation.attribute.matches', { attribute: t('lableView.room.name') })),

      code: Yup.string()
        .required(t('validation.attribute.required', { attribute: t('lableView.room.code') }))
        .min(1, t('validation.attribute.min', { attribute: t('lableView.room.code'), min: 1 }))
        .max(255, t('validation.attribute.max', { attribute: t('lableView.room.code'), max: 255 }))
        .matches(/^[a-zA-Z0-9]+$/, t('validation.attribute.matches', { attribute: t('lableView.room.code') })),
      price: Yup.number()
        .required(t('validation.attribute.required', { attribute: t('lableView.room.price') }))
        .min(1, t('validation.attribute.min', { attribute: t('lableView.room.price'), min: 1 }))
        .integer(t('validation.attribute.integer', { attribute: t('lableView.room.price') }))
        .typeError(t('validation.attribute.integer', { attribute: t('lableView.room.price') })),
    }),

    onSubmit: (values, { resetForm }) => {
      updateRoomFun(values, resetForm)

    }
  });

  const updateRoomFun = async (values, resetForm) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key === 'images' && Array.isArray(values[key])) {
        values[key].forEach((file) => {
          formData.append('images[]', file.file);
        });
      } else if (key === 'service' && Array.isArray(values[key])) {
        values[key].forEach((item) => {
          formData.append('service[]', JSON.stringify(item));
        });
      } else if (key === 'furniture' && Array.isArray(values[key])) {
        values[key].forEach((item) => {
          formData.append('furniture[]', JSON.stringify(item));
        });
      } else {
        formData.append(key, values[key]);
      }
    });

    try {
      await dispatch(updateRoom(id, formData, resetForm));
    } catch (error) {
      toast.error('có lỗi xảy ra');
    }
  };
  // console.log(service)
  const addItemServices = (e, item) => {
    const serviceId = e.target.value;
    const isChecked = e.target.checked;
    /// console.log(serviceId)
    if (isChecked === true) {
      if (item.service && item.service.id && item.service.id !== null) {
        setService((prevServices) => [
          ...prevServices,
          { serviceId, id: item.service.id }
        ]);
      } else {
        setService((prevServices) => [
          ...prevServices,
          { serviceId, id: null }
        ]);
      }
    } else {
      setService((prevServices) =>
        prevServices.filter(service => Number(service.serviceId) !== Number(serviceId))
      );
    }
  };
  const addItemFurnitures = (e, item) => {
    const newObjectFurniture = {
      furnitureId: Number(e.target.value),
      id: item.furniture ? Number(id) : null,
      quantity: 1
    }
    const furnitureId = newObjectFurniture.furnitureId;

    if (e.target.checked === true) {
      setFurnitures((prevFurnitures) => {
        const exists = prevFurnitures.some(f => Number(f.furnitureId) === Number(newObjectFurniture.furnitureId));
        if (exists) {
          return prevFurnitures;
        } else {
          return [
            ...prevFurnitures,
            { furnitureId, quantity: 1, id: item.furniture ? Number(id) : null }
          ];
        }
      });
    } else {

      setFurnitures((prevFurnitures) =>
        prevFurnitures.filter(f => Number(f.furnitureId) !== Number(furnitureId))
      );
    }
  };
  
  const isChecked = (id) => {
    return furniture.some(f => Number(f.furnitureId) === Number(id));
  };

  const isCheckedService = (id) => {
    return service.some(f => Number(f.serviceId) === Number(id));
  };

  const handleQuantityChange = (newQuantity, furnitureId) => {
    setFurnitures((prevFurnitures) => {
      return prevFurnitures.map((item) => {
        if (Number(item.furnitureId) === Number(furnitureId)) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };


  const getQuantity = (value) => {

    if (value.quantity !== null) {
      if (value.furniture && value.furniture.id !== null) {
        const item = furniture.find(item => Number(item.furnitureId) === Number(value.furniture.id) || Number(item.id) === Number(value.id));
        return item ? item.quantity : 1;
      } else {
        const item = furniture.find(item => Number(item.furnitureId) === Number(value.id));
        return item ? item.quantity : 1;
      }
    } else {
      return 1;
    }



  };

  const deleteRoomId = (id) => {
    confirmAlert({
      title: t('action.authentication.delete', { attribute: t('page.room') }),
      message: t('action.message.delete', { attribute: t('page.room') }),
      buttons: [
        {
          label: t('actionView.delete'),
          onClick: () => dispatch(deleteRoom(id))
        },
        {
          label: t('actionView.close'),
          onClick: () => { }
        }
      ]
    });
  };
  return (
    <div className='p-3'>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col'>STT</CTableHeaderCell>
            <CTableHeaderCell scope='col' >
              <div className='flex_start'>
                {t('lableView.room.name')}
                <div>
                  <CIcon icon={cilArrowTop} size='sx'
                    onClick={() => dispatch(
                      chaneFtiler(
                        {
                          colum: "name",
                          order_by: "asc"
                        }, filters
                      )
                    )} />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "name",
                        order_by: "desc"
                      }, filters
                    ))}
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col' >
              <div className='flex_start'>
                {t('lableView.room.code')}
                <div>
                  <CIcon icon={cilArrowTop} size='sx'
                    onClick={() => dispatch(
                      chaneFtiler(
                        {
                          colum: "code",
                          order_by: "asc"
                        },
                        filters
                      )
                    )} />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "code",
                        order_by: "desc"
                      }, filters
                    ))}
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flex_start'>
                {t('lableView.room.created_at')}
                <div>
                  <CIcon icon={cilArrowTop} className='icon-acction actice' size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "created_at",
                        order_by: "asc"
                      },
                      filters
                    ))}
                  />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "created_at",
                        order_by: "desc"
                      },
                      filters
                    ))}
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flex_start'>
                {t('lableView.room.updated_at')}
                <div>

                  <CIcon icon={cilArrowTop} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "updated_at",
                        order_by: "asc"
                      },
                      filters
                    ))}
                  />

                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "updated_at",
                        order_by: "desc"
                      }, filters
                    ))}
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>{t('table.colum.role.action')}</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data && data.map((item, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope='row'>{index + 1}</CTableHeaderCell>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{item.code}</CTableDataCell>
              <CTableDataCell>{item.created_at ? convertDateTime(item.created_at) : ''}</CTableDataCell>
              <CTableDataCell>{item.updated_at ? convertDateTime(item.updated_at) : ''}</CTableDataCell>
              <CTableDataCell>
                <Button variant='primary' onClick={() => handleShow(item)}>
                  {t('table.colum.viewDetail')}
                </Button>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>

        <Modal show={show} onHide={handleClose} className='actice-1200 flex_center'>
          <Modal.Header closeButton>   <Modal.Title>
            {checked === false ? t('actionView.detail') : t('actionView.update')}
          </Modal.Title>
          </Modal.Header>

          <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>

            <div className='flex_between ps-4 pe-4 pt-3'>
              <div className='flex_center'>
                <label> {t('actionView.detail')} </label>
                <Switch className='toggle-modal-deatil' onChange={handleChange} checked={checked} />
                <label> {t('actionView.update')}</label>
              </div>
              <div className='flex_center icon-delete' onClick={() => deleteRoomId(dataDeatil.id)}>
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <Modal.Body>
              <Row className="mb-3 mt-3">
                <div className='row'>
                  <div className='col-xl-3 col-lg-6 col-md-6 col-sm-12'>
                    <ImageUploading
                      multiple
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
                              <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                                {dataDeatil && dataDeatil !== null && dataDeatil.img_room && dataDeatil.img_room.map((image, index) => (
                                  <SwiperSlide key={index} className='img-slider'>
                                    <div className='img-form-div'>
                                      <img src={image.imgLink} alt="" width="100" className='img-form form-img-div' />
                                    </div>

                                  </SwiperSlide>
                                ))}
                              </Swiper>
                            ) : (

                              <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                                {imageList.map((image, index) => (
                                  <SwiperSlide key={index} className='img-slider'>
                                    <div className='img-form-div'>
                                      <img src={image['data_url']} alt="" width="100" className='img-form form-img-div' />
                                      <div className="image-item__btn-wrapper">
                                        <p onClick={() => onImageRemove(index)}>x</p>
                                      </div>
                                    </div>

                                  </SwiperSlide>
                                ))}
                              </Swiper>

                            )}
                          </div>
                        );
                      }}
                    </ImageUploading>
                  </div>
                  <div className='col-xl-9 col-lg-6 col-md-6 col-sm-12 row'>
                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
                      {checked === false ?
                        (
                          <p> <span className='lable-form'>{t('lableView.room.name')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.name ? dataDeatil.name : t('noData')} </p>
                        ) : (
                          <>
                            <Form.Label> {t('lableView.room.name')}</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={formik.values.name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={formik.touched.name && formik.errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.name}
                            </Form.Control.Feedback>
                          </>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
                      {checked === false ?
                        (
                          <p> <span className='lable-form'>{t('lableView.room.code')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.code ? dataDeatil.code : t('noData')} </p>
                        ) : (
                          <>
                            <Form.Label> {t('lableView.room.code')}</Form.Label>
                            <Form.Control
                              type="text"
                              name="code"
                              value={formik.values.code}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={formik.touched.code && formik.errors.code}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.code}
                            </Form.Control.Feedback>
                          </>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
                      {checked === false ?
                        (
                          <p> <span className='lable-form'>{t('lableView.room.length')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.length ? dataDeatil.length : t('noData')} </p>
                        ) : (
                          <>
                            <Form.Label> {t('lableView.room.length')}</Form.Label>
                            <Form.Control
                              type="text"
                              name="length"
                              value={formik.values.length}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={formik.touched.length && formik.errors.length}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.length}
                            </Form.Control.Feedback>
                          </>
                        )}
                    </Form.Group>

                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
                      {checked === false ?
                        (
                          <p> <span className='lable-form'>{t('lableView.room.width')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.width ? dataDeatil.width : t('noData')} </p>
                        ) : (
                          <>
                            <Form.Label> {t('lableView.room.width')}</Form.Label>
                            <Form.Control
                              type="text"
                              name="width"
                              value={formik.values.width}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={formik.touched.width && formik.errors.width}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.width}
                            </Form.Control.Feedback>
                          </>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
                      {checked === false ?
                        (
                          <p> <span className='lable-form'>{t('lableView.room.height')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.height ? dataDeatil.height : t('noData')} </p>
                        ) : (
                          <>
                            <Form.Label> {t('lableView.room.height')}</Form.Label>
                            <Form.Control
                              type="text"
                              name="height"
                              value={formik.values.height}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={formik.touched.height && formik.errors.heights}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.height}
                            </Form.Control.Feedback>
                          </>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
                      {checked === false ?
                        (
                          <p> <span className='lable-form'>{t('lableView.room.acreage')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.acreage ? dataDeatil.acreage : t('noData')} </p>
                        ) : (
                          <>
                            <Form.Label> {t('lableView.room.acreage')}</Form.Label>
                            <Form.Control
                              type="text"
                              name="acreage"
                              value={formik.values.acreage}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              isInvalid={formik.touched.acreage && formik.errors.acreage}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.acreage}
                            </Form.Control.Feedback>
                          </>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
                      {checked === false ?
                        (
                          <p> <span className='lable-form'>{t('lableView.room.price')}</span>  :
                            {dataDeatil && dataDeatil !== null && dataDeatil.price ? formatPrice(dataDeatil.price) : t('noData')} </p>
                        ) : (<>
                          <Form.Label> {t('lableView.room.price')}</Form.Label>
                          <Form.Control
                            type="text"
                            name="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.price && formik.errors.price}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.price}
                          </Form.Control.Feedback>
                        </>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
                      {checked === false ?
                        (
                          <p> <span className='lable-form'>{t('lableView.room.floor')}</span>  :
                            {dataDeatil && dataDeatil !== null && dataDeatil.floor && dataDeatil.name ? dataDeatil.floor.name : t('noData')} </p>
                        ) : (
                          <>
                            <Form.Label> {t('lableView.room.floor')}</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setFloor(e.target.value)}>
                              {dataDeatil && dataDeatil.floor && (
                                <>
                                  <option value={dataDeatil.floor.id}>{dataDeatil.floor.name}</option>
                                  {listFloor && listFloor.map(item => (
                                    item.id !== dataDeatil.floor.id && (<option key={item.id} value={item.id}>{item.name}</option>)
                                  ))}
                                </>
                              )}
                            </Form.Select>
                          </>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
                      {checked === false ?
                        (
                          <p> <span className='lable-form'>{t('lableView.room.typeRoom')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.type_room && dataDeatil.type_room.name ? dataDeatil.type_room.name : t('noData')} </p>
                        ) : (
                          <>
                            <Form.Label> {t('lableView.room.typeRoom')}</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setTypeRoom(e.target.value)}>
                              {dataDeatil && dataDeatil.type_room && (
                                <>
                                  <option value={dataDeatil.type_room.id}>{dataDeatil.type_room.name}</option>
                                  {listTypeRoomAll && listTypeRoomAll.map(item => (
                                    item.id !== dataDeatil.type_room.id && (<option key={item.id} value={item.id}>{item.name}</option>)
                                  ))}
                                </>
                              )}
                            </Form.Select>
                          </>
                        )}
                    </Form.Group>
                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
                      {checked === false ?
                        (
                          <p> <span className='lable-form'>{t('lableView.room.building')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.building ? dataDeatil.building.name : t('noData')} </p>
                        ) : (
                          <>
                            <Form.Label> {t('lableView.room.building')}</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setBuilding(e.target.value)}>
                              {dataDeatil && dataDeatil.building && (
                                <>
                                  <option value={dataDeatil.building.id}>{dataDeatil.building.name}</option>
                                  {listBuildingAll && listBuildingAll.map(item => (
                                    item.id !== dataDeatil.building.id && (<option key={item.id} value={item.id}>{item.name}</option>)
                                  ))}
                                </>
                              )}
                            </Form.Select>
                          </>
                        )}
                    </Form.Group>
                    {checked === false ?

                      (
                        <>
                          <Form.Group as={Col} className='mb-2 mt-2 col-12'>
                            <p> <span className='lable-form'>{t('lableView.room.status')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.status === 1 ? t('lableView.room.statusValue.online') : t('lableView.room.statusValue.off')} </p>

                          </Form.Group>
                        </>
                      )
                      :
                      (<Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
                        <Form.Label>{t('lableView.room.image')}</Form.Label>
                        <div
                          className='btn_upload_img'
                          style={triggerImageUpload?.isDragging ? { color: 'red' } : undefined}
                          onClick={() => triggerImageUpload && triggerImageUpload.onImageUpload()}
                        >
                          {t('actionView.upload')}
                        </div>
                      </Form.Group>)}

                    <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-2 mt-2'>
                      {checked === false ? (
                        <p>
                          <span className='lable-form'>{t('lableView.room.furniture')} :</span><br />
                          {dataDeatil && dataDeatil.furniture_room && dataDeatil.furniture_room.length > 0 ? (
                            dataDeatil.furniture_room.map((item, index) => (
                              <React.Fragment key={index}>
                                {item.furniture.name + "  ( Số lượng : " + item.quantity + " )"}
                                {index < dataDeatil.furniture_room.length - 1 ? ',  ' : ''}
                              </React.Fragment>
                            ))
                          ) : (
                            t('noData')
                          )}
                        </p>
                      ) : (
                        <>

                          <Form.Label> {t('lableView.room.furniture')} : </Form.Label>
                          <div class="d-flex flex-wrap gap-3">

                            {furniture && (
                              <>
                                {furnitureArray.length > 0 && furnitureArray.map((item, index) => (
                                  <div key={item.id} className={`${index === 0 ? "" : "ms-3"}`}>
                                    <input
                                      type="checkbox"
                                      value={item.furniture.id}
                                      checked={isChecked(item.furniture.id)}
                                      onChange={(e) => addItemFurnitures(e, item)}
                                    />
                                    <label className='ms-1'>{item.furniture.name}</label>
                                    <InputNumber
                                      className={`input-quantity ms-2`}
                                      value={getQuantity(item)}
                                      min={1}
                                      step={1}
                                      onChange={(e) => handleQuantityChange(e, item.furniture.id)}
                                    />
                                  </div>
                                ))}

                                {listFurnituresAll && listFurnituresAll.map((item, index) => (
                                  !furnitureArray.some(f => f.furniture.id === item.id) && (
                                    <div key={item.id} className={`${index === 0 ? "" : "ms-3"}`}>
                                      <input type="checkbox" value={item.id} onChange={(e) => addItemFurnitures(e, item)} />
                                      <label className='ms-1'>{item.name}</label>
                                      <InputNumber
                                        className={`input-quantity ms-2`}
                                        value={getQuantity(item)}
                                        min={0}
                                        step={1}
                                        onChange={(e) => handleQuantityChange(e, item.id)}
                                      />
                                    </div>
                                  )
                                ))}
                              </>
                            )}

                          </div>
                        </>
                      )}
                    </Form.Group>
                    {console.log(dataDeatil)}
                    <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-2 mt-2'>
                      {checked === false ? (
                        <p>
                          <span className='lable-form'>{t('lableView.room.service')} :</span><br />
                          {dataDeatil && dataDeatil.service_room && dataDeatil.service_room.length > 0 ? (
                            dataDeatil.service_room.map((item, index) => (
                              <React.Fragment key={index}>
                                {item.service.name}
                                {index < dataDeatil.service_room.length - 1 ? ',  ' : ''}
                              </React.Fragment>
                            ))
                          ) : (
                            t('noData')
                          )}
                        </p>
                      ) : (
                        <>

                          <Form.Label> {t('lableView.room.service')} : </Form.Label>
                          <div className="d-flex flex-wrap gap-3">
                            {serviceArray && serviceArray.length > 0 && serviceArray.map((item) => (
                              <div key={item.service.id}>
                                <input
                                  type="checkbox"
                                  value={item.service.id}
                                  checked={isCheckedService(item.service.id)}
                                  onChange={(e) => addItemServices(e, item)}
                                />
                                <label className='ms-1'>{item.service.name}</label>
                              </div>
                            ))}

                            {listServiceAll && listServiceAll.map((item) => (
                              !serviceArray.some(s => s.service.id === item.id) && (
                                <div key={item.id}>
                                  <input
                                    type="checkbox"
                                    value={item.id}
                                    onChange={(e) => addItemServices(e, item)}
                                  />
                                  <label className='ms-1'>{item.name}</label>
                                </div>
                              )
                            ))}
                          </div>

                        </>
                      )}
                    </Form.Group>
                    <Form.Group as={Col} xl="12" sm="12" className='mb-3 mt-3'>
                      {checked === false ?
                        (
                          <p> <span className='lable-form'>{t('lableView.room.note')}</span>  :  <br />
                            {dataDeatil && dataDeatil !== null && dataDeatil.note ? stripHtmlTags(dataDeatil.note) : t('noData')} </p>
                        ) : (
                          <>
                            <Form.Label> {t('lableView.room.note')}</Form.Label>
                            <CKEditor
                              name="note"
                              editor={ClassicEditor}
                              data={note}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setNote(data);
                                formik.setFieldValue('note', data);
                              }}
                              config={{
                                toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
                                ckfinder: {
                                  uploadUrl: '/path/to/your/upload/url'
                                }
                              }}

                            />
                          </>
                        )}
                    </Form.Group>
                  </div>
                </div>
              </Row>


            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                {t('actionView.close')}
              </Button>
              <Button variant="primary" type="submit">
                {t('actionView.update')}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </CTable>
    </div>
  );
}

export default List;
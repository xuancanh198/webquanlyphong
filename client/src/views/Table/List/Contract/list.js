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
import { stripHtmlTags, formatPrice, convertDateTimeFull } from '../../../../service/FunService/funweb';
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
import { cilUser, cilX, cilNotes } from '@coreui/icons';
import { setFilter, setModalUpdate } from "../../../../redux/accction/listTable";
import { getAllRoom, getAllUser,  getListServiceRoom, getListFurnitureRoom,  updateContract, deleteContract, downloadFileContract} from "../../../../service/baseService/cruds";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
import { Icons, toast } from 'react-toastify';
function List({ data }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const show = useSelector((state) => state.listTable.modalUpdate);
  const [dataDeatil, setDataDeatil] = useState(null);
  const [statusToggle, setStatusToggle] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [roomId, setRoomId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [changeUserId, setChangeUserId] = useState(null);
  const listUserAll = useSelector((state) => state.listTable.listUserAll);
  const listRoomAll = useSelector((state) => state.listTable.listRoomAll);
  const listServiceRoom = useSelector((state) => state.listTable.listServiceRoom);
  const listFurnitureRoom = useSelector((state) => state.listTable.listFurnitureRoom);
  const [note, setNote] = useState('')
  const [images, setImages] = useState([]);
  const [pageUser, setPageUser] = useState(1);
  const [pageRoom, setPageRoom] = useState(1);
  const [searchUser, setSearchUser] = useState(null);
  const [searchRoom, setSearchRoom] = useState(null);
  const [custormers, setCustormers] = useState([])
  const [listRoom, setListRoom] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [quantityFurniture, setQuantityFurniture] = useState(null);
  const [quantityService, setQuantityService] = useState(null);

  const [id, setId] = useState(0);
  const [initialValues, setInitialValues] = useState({
    priceTime: '',
    deposit: "",
    code: "",
    startTime: "",
    endTime: "",
    roomId: "",
    userId: "",
    note: note,
    image: null,
    customers: [],
    service: [],
    furniture: []
  });


  let filters = useSelector((state) => state.listTable.filters);
  const maxNumber = 1;
  const removeCustomrers = (item) => {

    setCustormers(custormers =>
      custormers.filter(custormer => Number(custormer.label) !== Number(item.label))
    );
    setChangeUserId(null);
  }
  useEffect(() => {
    const fetchData = async () => {
      if (show === true) {
        if (listUserAll === null && listRoomAll === null) {
          try {
            await Promise.all([
              dispatch(getAllUser(false, true, pageUser, 20, searchUser)),
              dispatch(getAllRoom(false, true, pageRoom, 20, searchRoom))
            ]);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        } else {
          if (listUserAll === null) {
            try {
              await dispatch(getAllUser(false, true, pageUser, 20, searchUser));
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          }
          if (listRoomAll === null) {
            try {
              await dispatch(getAllRoom(false, true, pageRoom, 20, searchRoom));
            } catch (error) {
              console.error('Error fetching room data:', error);
            }
          }
        }
      }
    };
    fetchData();
  }, [show, dispatch]);

  useEffect(() => {
    if (listUserAll !== null) {
      setListUser(
        listUserAll.length > 0 && listUserAll.map(item => ({
          value: item.id,
          label: item.fullname
        }))
      );
    }
  }, [listUserAll])
  useEffect(() => {
    if (listRoomAll !== null) {
      setListRoom(
        listRoomAll.length > 0 && listRoomAll.map(item => ({
          value: item.id,
          label: item.name
        }))
      );
    }
  }, [listRoomAll]);
  const addCustormers = (custormer) => {
    const isAlreadySelected = custormers.some(user => Number(user.value) === Number(custormer.value));
    if (isAlreadySelected === false) {
      setCustormers(custormers => [
        ...custormers,
        custormer
      ]);
      setChangeUserId(Number(custormer.value))
    }
  };
  const updateContractFun = async (values, resetForm) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key === 'image' && values[key]) {
        if (images === null) {
          formData.delete('image');
        } else {
          formData.append('image', values[key]);
        }
      }
      
      else if (key === 'customers' && values[key]) {
        custormers.forEach((customer) => {
        const newObject = {
         id : customer.id,
          user_id : customer.label,
           fullname : customer.value,
        }
          formData.append('customers[]',JSON.stringify(newObject));
        });
      }
      else if (key === 'service' && values[key]) {
        quantityService.forEach((service) => {
          delete service.name;
          formData.append('service[]', JSON.stringify(service));
        });
      }
      else if (key === 'furniture' && values[key]) {

        quantityFurniture.forEach((furniture) => {
          delete furniture.name;
          formData.append('furniture[]', JSON.stringify(furniture));
        });
      }
      else {
        formData.append(key, values[key]);
      }
    });
    try {
      await dispatch(updateContract(id, formData, resetForm));
      formik.resetForm();
    } catch (error) {
      toast.error('có lỗi xảy ra');
    }
  };

  useEffect(() => {
    formik.setFieldValue('startTime', convertDateTimeFull(startTime));
  }, [startTime]);
  useEffect(() => {
    formik.setFieldValue('endTime', convertDateTimeFull(endTime));
  }, [endTime])
  useEffect(() => {
    if (userId !== null) {
      formik.setFieldValue('userId', userId.value);
    }
  }, [userId]);
  useEffect(() => {
    if (roomId !== null) {
      formik.setFieldValue('roomId', roomId.value);
      const fetchData = async () => {
        await Promise.all([
          Promise.resolve(dispatch(getListServiceRoom(roomId.value))),
          Promise.resolve(dispatch(getListFurnitureRoom(roomId.value)))
        ]);

      };

      fetchData();
    }

  }, [roomId])
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      priceTime: Yup.number()
      .required(t('validation.attribute.required', { attribute: t('lableView.contract.priceTime') }))
      .min(1, t('validation.attribute.min', { attribute: t('lableView.contract.priceTime'), min: 1 }))
      .integer(t('validation.attribute.integer', { attribute: t('lableView.contract.priceTime') }))
      .typeError(t('validation.attribute.integer', { attribute: t('lableView.contract.priceTime') })),
  deposit: Yup.number()
      .required(t('validation.attribute.required', { attribute: t('lableView.contract.deposit') }))
      .min(1, t('validation.attribute.min', { attribute: t('lableView.contract.deposit'), min: 1 }))
      .integer(t('validation.attribute.integer', { attribute: t('lableView.contract.deposit') }))
      .typeError(t('validation.attribute.integer', { attribute: t('lableView.contract.deposit') })),
  roomId: Yup.number()
      .required(t('validation.attribute.required', { attribute: t('lableView.contract.room') }))
      .min(1, t('validation.attribute.min', { attribute: t('lableView.contract.room'), min: 1 }))
      .integer(t('validation.attribute.integer', { attribute: t('lableView.contract.room') }))
      .typeError(t('validation.attribute.integer', { attribute: t('lableView.contract.room') })),

  userId: Yup.number()
      .required(t('validation.attribute.required', { attribute: t('lableView.room.user') }))
      .min(1, t('validation.attribute.min', { attribute: t('lableView.room.user'), min: 1 }))
      .integer(t('validation.attribute.integer', { attribute: t('lableView.room.user') }))
      .typeError(t('validation.attribute.integer', { attribute: t('lableView.room.user') })),
  code: Yup.string()
      .required(t('validation.attribute.required', { attribute: t('lableView.room.code') }))
      .min(1, t('validation.attribute.min', { attribute: t('lableView.room.code'), min: 1 }))
      .max(255, t('validation.attribute.max', { attribute: t('lableView.room.code'), max: 255 }))
      .matches(/^[a-zA-Z0-9]+$/, t('validation.attribute.matches', { attribute: t('lableView.room.code') })),
  // image: Yup.mixed()
  //     .required(t('validation.attribute.required', { attribute: t('lableView.contract.image') }))
  //     .nullable(),
  // customers: Yup.array()
  //     .min(1, t('validation.attribute.minItems', { attribute: t('lableView.contract.customers'), min: 1 }))
  //     .required(t('validation.attribute.required', { attribute: t('lableView.contract.customers') })),
  // service: Yup.array()
  //     .min(1, t('validation.attribute.minItems', { attribute: t('lableView.contract.service'), min: 1 }))
  //     .required(t('validation.attribute.required', { attribute: t('lableView.contract.service') })),

  // furniture: Yup.array()
  //     .min(1, t('validation.attribute.minItems', { attribute: t('lableView.contract.furniture'), min: 1 }))
  //     .required(t('validation.attribute.required', { attribute: t('lableView.contract.furniture') })),
    }),
    onSubmit: (values, { resetForm }) => {
      updateContractFun(values, resetForm);
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
  const addItemFurnitures = (e, item, type =false) => {
    const isChecked = e.target.checked;
    const newObject = {
      quantity: 1,
      furnitureId: item.furnitureId ||  item.furniture.id,
      id : type === true ? item.id : null,
      name :  item.name||  item.furniture.name,
      maxQuantity : item.quantity
    };
   
    if (isChecked) {
      setQuantityFurniture((prev) => {
        const updatedPrev = prev || [];
        const exists = updatedPrev.some(item => Number(item.furnitureId) === Number(newObject.furnitureId));
        if (exists) {      
          return updatedPrev;
        } else {
          return [...updatedPrev, newObject];
        }
      });
    } else {
      setQuantityFurniture((prev) => {
        const updatedPrev = prev || [];
        return updatedPrev.filter(item => item.furnitureId !== newObject.furnitureId);
      });
    }


  };

  const getQuantityFurniture = (furnitureId) => {
    const item = Array.isArray(quantityFurniture) && quantityFurniture.find(f => Number(f.furnitureId) === Number(furnitureId));
    return item ? item.quantity : 1;
  };
  const handleQuantityChangeFurniture = (item, value, type = false) => {

    const numericValue = Number(value);
     const maxQuantity = Number(type === true ? item.quantity : item.maxQuantity);
    if (numericValue > maxQuantity) {
      toast.error(t('messageText.changeQuantityFail', { attribute: t('lableView.contract.furniture') }));
      setQuantityFurniture((prevFurnitures) => {
        if (Array.isArray(prevFurnitures)) {
          return prevFurnitures.map(furniture =>
            furniture.furnitureId === item.furnitureId
              ? { ...furniture, quantity: item.quantity }
              : furniture
          );
        }
        return prevFurnitures;
      });
    } else {
      setQuantityFurniture((prevFurnitures) => {
        if (Array.isArray(prevFurnitures)) {
          const furnitureExists = prevFurnitures.some(furniture => Number(furniture.furnitureId) === Number(item.furnitureId));
          if (furnitureExists) {
            return prevFurnitures.map(furniture =>
              Number(furniture.furnitureId) === Number( item.furnitureId)
                ? { ...furniture, quantity: numericValue }
                : furniture
            );
          } else {
            return [...prevFurnitures, { furnitureId: item.furnitureId, quantity: numericValue }];
          }
        }
        return prevFurnitures;
      });
    }
  };

  const addItemServices = (e, item , type = false) => {
    const isChecked = e.target.checked;
    const newObject = {
      quantity: item.quantity || 1,
      serviceId: item.serviceId ||  item.service.id,
      id : type === true ? item.id : null,
      name : item.name || item.service.name,
    };
   
    if (isChecked) {
      setQuantityService((prev) => {
        const updatedPrev = prev || [];
        const exists = updatedPrev.some(item => Number(item.serviceId) === Number(newObject.serviceId));
        if (exists) {
          return updatedPrev;
        } else {
          return [...updatedPrev, newObject];
        }
      });
    } else {
      setQuantityService((prev) => {
        const updatedPrev = prev || [];
        return updatedPrev.filter(item => Number(item.serviceId) !== Number(newObject.serviceId));
      });
    }
  };

  const getQuantityService = (serviceId) => {
    const item = Array.isArray(quantityService) && quantityService.find(f => f.serviceId === serviceId);
    return item ? item.quantity : 1;
  };

  const handleQuantityChangeService = (item, value) => {
    const numericValue = Number(value);
    setQuantityService((prevServices) => {
      if (Array.isArray(prevServices)) {
        const serviceExists = prevServices.some(service => Number(service.serviceId) === Number(item.id));
        if (serviceExists) {
          return prevServices.map(service =>
            service.serviceId === item.id
              ? { ...service, quantity: numericValue }
              : service
          );
        } else {
          return [...prevServices, { serviceId: item.id, quantity: numericValue }];
        }
      }
      return prevServices;
    });
  };
  const handleClose = () => {
    dispatch(setModalUpdate(false));
    if (show === true) {
      setDataDeatil("");

    }
  }
  useEffect(() => {
    if (dataDeatil && dataDeatil !== null) {
      setInitialValues({
        priceTime: dataDeatil.priceTime,
        deposit: dataDeatil.deposit,
        code: dataDeatil.code,
        startTime: dataDeatil.startTime,
        endTime: dataDeatil.endTime,
        roomId: dataDeatil.room.id,
        userId: dataDeatil.user.id,
        note: dataDeatil.deposit || null,
        image: dataDeatil.img,
        customers: [],
        service: [],
        furniture: []
      });
      setId(dataDeatil.id);
      setStartTime(new Date(dataDeatil.startTime));
      setEndTime(new Date(dataDeatil.endTime));
      setUserId(
        {
          value: dataDeatil.user.id,
          label: dataDeatil.user.fullname
        }
      );
      setRoomId({
        value: dataDeatil.room.id,
        label: dataDeatil.room.name
      });
      setQuantityService(
        dataDeatil.service?.map(serviceItem => ({
          serviceId: serviceItem?.service?.id,
          name: serviceItem?.service?.name,
          id: serviceItem?.id,
          quantity: serviceItem?.quantity
        }))
      );
      setQuantityFurniture(
        dataDeatil.furniture?.map(furnitureItem => ({
          furnitureId: furnitureItem?.furniture?.id,
          name: furnitureItem?.furniture?.name,
          id: furnitureItem?.id,
          quantity: furnitureItem?.quantity,
          maxQuantity : furnitureItem?.max_quantity
        }))
      );
      setCustormers(
        dataDeatil?.custormer?.map(custormerItem => ({
          label: custormerItem?.user?.id,
          value: custormerItem?.user?.fullname,
          id: custormerItem?.id,
        }))
      );
  
    }
  }, [dataDeatil]);
  const handleShow = (item) => {
    dispatch(setModalUpdate(true));
    setDataDeatil(item);
    setId(item.id);
  };
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };

  const deleteContractId = (id) => {
    confirmAlert({
      title: t('action.authentication.delete', { attribute: t('page.contract') }),
      message: t('action.message.delete', { attribute: t('page.contract') }),
      buttons: [
        {
          label: 'Xóa',
          onClick: () => dispatch(deleteContract(id))
        },
        {
          label: 'Hủy',
          onClick: () => { }
        }
      ]
    });
  };


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
                {t('lableView.contract.code')}
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flexcontract_start'>
                {t('lableView.contract.userepresentative')}
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
              <CTableDataCell>{item?.user?.fullname}</CTableDataCell>
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
              <div className='flex_center'>
                <label> {t('actionView.detail')} </label>
                <Switch className='toggle-modal-deatil' onChange={handleChange} checked={checked} />
                <label> {t('actionView.update')}</label>
              </div>
              <div className='d-flex'>
              <div className='flex_center icon-delete' onClick={() => deleteContractId(dataDeatil.id)}>
                <i class="fa-solid fa-trash"></i>
              </div>
              <div className='flex_center icon-delete ms-3' onClick={() => dispatch(downloadFileContract(dataDeatil.id))}>
              <CIcon className='' icon={cilNotes} size="l" />
              </div>
              </div>
            </div>
            {dataDeatil !== null
              &&
              (<Form noValidate onSubmit={formik.handleSubmit}>
                <Modal.Body>
                  <Row className="mb-3 mt-3">
                    <Form.Group as={Col} xl="3" lg="6" md="6" sm="12" className='mb-3 mt-3'>
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
                                  <img src={dataDeatil.img} className='img-form' />
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
                    <Form.Group as={Col} xl="9" lg="6" md="6" sm="12" className='mb-3 mt-3 row'>
                      <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                        {checked === false ?
                          (
                            <p> <span className='lable-form'>{t('lableView.contract.code')}</span>  : {dataDeatil.code !== null ? dataDeatil.code : t('noData')} </p>
                          ) : (
                            <>
                              <div className=' css-animation'>
                                <div className='font-icon flex_center'>
                                  <CIcon className='' icon={cilUser} size="l" />
                                </div>
                                <Form.Control
                                  type="text"
                                  name="code"
                                  value={formik.values.code}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  isInvalid={formik.touched.code && formik.errors.code}
                                  required
                                />
                                <Form.Label> {t('lableView.contract.code')}</Form.Label>
                                <Form.Control.Feedback type="invalid">
                                  {formik.errors.code}
                                </Form.Control.Feedback>
                              </div>
                            </>
                          )}
                      </Form.Group>
                      <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                        {checked === false ?
                          (
                            <p> <span className='lable-form'>{t('lableView.contract.code')}</span>  : {dataDeatil.code !== null ? dataDeatil.code : t('noData')} </p>
                          ) : (
                            <>
                              <Select
                                value={userId}
                                onChange={(e) => setUserId(e)}
                                options={listUser}
                                placeholder={t('messageText.searchTitel', { attribute: t('lableView.contract.user') })}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formik.errors.userId}
                              </Form.Control.Feedback>
                            </>
                          )}
                      </Form.Group>
                      <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                        {checked === false ?
                          (
                            <p> <span className='lable-form'>{t('page.room')}</span>  : {dataDeatil.code !== null ? dataDeatil.code : t('noData')} </p>
                          ) : (
                            <>
                              <Select
                                value={roomId}
                                onChange={(e) => setRoomId(e)}
                                options={listRoom}
                                placeholder={t('messageText.searchTitel', { attribute: t('page.room') })}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formik.errors.roomId}
                              </Form.Control.Feedback>
                            </>
                          )}
                      </Form.Group>
                      <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                        {checked === false ?
                          (
                            <p> <span className='lable-form'>{t('lableView.contract.priceTime')}</span>  : {dataDeatil.priceTime !== null ? formatPrice(dataDeatil.priceTime) : t('noData')} </p>
                          ) : (
                            <>
                              <div className=' css-animation'>
                                <div className='font-icon flex_center'>
                                  <CIcon className='' icon={cilUser} size="l" />
                                </div>
                                <Form.Control
                                  type="text"
                                  name="priceTime"
                                  value={formik.values.priceTime}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  isInvalid={formik.touched.priceTime && formik.errors.priceTime}
                                  required
                                />
                                <Form.Label> {t('lableView.contract.priceTime')}</Form.Label>
                                <Form.Control.Feedback type="invalid">
                                  {formik.errors.priceTime}
                                </Form.Control.Feedback>
                              </div>
                            </>
                          )}
                      </Form.Group>
                      <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                        {checked === false ?
                          (
                            <p> <span className='lable-form'>{t('lableView.contract.deposit')}</span>  : {dataDeatil.deposit !== null ? formatPrice(dataDeatil.deposit) : t('noData')} </p>
                          ) : (
                            <>
                              <div className=' css-animation'>
                                <div className='font-icon flex_center'>
                                  <CIcon className='' icon={cilUser} size="l" />
                                </div>
                                <Form.Control
                                  type="text"
                                  name="deposit"
                                  value={formik.values.deposit}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  isInvalid={formik.touched.deposit && formik.errors.deposit}
                                  required
                                />
                                <Form.Label> {t('lableView.contract.deposit')}</Form.Label>
                                <Form.Control.Feedback type="invalid">
                                  {formik.errors.deposit}
                                </Form.Control.Feedback>
                              </div>
                            </>
                          )}
                      </Form.Group>
                      {checked === true && (<Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3'>
                        <div
                          className='btn_upload_img'
                          style={triggerImageUpload?.isDragging ? { color: 'red' } : undefined}
                          onClick={() => triggerImageUpload && triggerImageUpload.onImageUpload()}
                        >
                          {t('lableView.contract.img')}
                        </div>
                      </Form.Group>)
                      }

                      <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3'>
                        {checked === false ?
                          (
                            <p> <span className='lable-form'>{t('lableView.contract.startTime')}</span>  : {dataDeatil.startTime !== null ? dataDeatil.startTime : t('noData')} </p>
                          ) : (
                            <>
                              <label className='mb-2 font-weight'> {t('lableView.contract.startTime')} : </label>
                              <DatePicker selected={startTime} onChange={(date) => setStartTime(date)} />
                            </>
                          )}
                      </Form.Group>
                      <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3'>
                        {checked === false ?
                          (
                            <p> <span className='lable-form'>{t('lableView.contract.endTime')}</span>  : {dataDeatil.endTime !== null ? dataDeatil.endTime : t('noData')} </p>
                          ) : (
                            <>
                              <label className='mb-2 font-weight'> {t('lableView.contract.endTime')} : </label>
                              <DatePicker selected={endTime} onChange={(date) => setEndTime(date)} />
                            </>
                          )}
                      </Form.Group>

                      {checked === false &&
                        (
                          <>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.contract.checkIsNow')}</span>  :
                                {new Date(dataDeatil?.endTime) > new Date() ? t('lableView.contract.checkIsNowStatus.has') : t('lableView.contract.checkIsNowStatus.hasnot')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.contract.created_at')}</span>  :
                                {convertDateTimeFull(dataDeatil?.created_at)} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.contract.updated_at')}</span>  :
                                {dataDeatil?.updated_at !== null ? convertDateTimeFull(dataDeatil?.updated_at) : t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.building.name')}</span>  :
                                {dataDeatil?.room?.building?.name !== null ? dataDeatil?.room?.building?.name : t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.building.code')}</span>  :
                                {dataDeatil?.room?.building?.code !== null ? dataDeatil?.room?.building?.code : t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.building.address')}</span>  :
                                {dataDeatil?.room?.building?.address !== null ? dataDeatil?.room?.building.address : t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.floor.name')}</span>  :
                                {dataDeatil?.room?.floor?.name !== null ? dataDeatil?.room?.floor?.name : t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.floor.code')}</span>  :
                                {dataDeatil?.room?.floor?.code !== null ? dataDeatil?.room?.floor?.code : t('noData')} </p>
                            </Form.Group>
                          </>
                        )}

                      <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3 '>
                        {checked === false ?

                          (<p> <span className='lable-form'>{t('lableView.contract.custorm')}</span>  : </p>)
                          :
                          (
                            <>
                              <Select
                                value={changeUserId}
                                onChange={(e) => addCustormers(e)}
                                options={listUser}
                                placeholder={t('messageText.searchTitel', { attribute: t('lableView.contract.custorm') })}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formik.errors.custorm}
                              </Form.Control.Feedback></>
                          )}
                        <div className='list-user d-flex flex-wrap mt-4 gap-3'>
                          {checked === false ?
                          dataDeatil?.custormer?.length > 0 && dataDeatil?.custormer?.map((item, index) => {
                            return (
                              <div key={index} className='item-user pt-3 pb-3 ps-4 pe-4'>
                                <Link>
                                  {item?.user?.fullname}
                                </Link>
                               
                              </div>
                            )
                          })
                          :
                          
                          custormers?.length > 0 && custormers?.map((item, index) => {
                            return (
                              <div key={index} className='item-user pt-3 pb-3 ps-4 pe-4'>
                                <Link>
                                  {item.value}
                                </Link>
                                {checked === true &&
                                  (<CIcon icon={cilX} className="close-icon" onClick={() => removeCustomrers(item)} />)}
                              </div>
                            )
                          })
                          }
                        </div>
                      </Form.Group>
                      <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-2 mt-2'>
                        <Form.Label className='font-weight'> {t('lableView.contract.furniture')} : </Form.Label>
                        {checked === false ?

                          (

                            <div className=' row mt-4'>
                              {dataDeatil?.furniture?.length > 0 && dataDeatil?.furniture?.map((item, index) => {
                                return (
                                  <div key={index} className='col-xl-4 col-lg-6 col-md-12 col-sm-12 d-flex align-items-stretch'>
                                    <div className='item-user pt-3 pb-3 ps-4 pe-4 m-2 w-100'>
                                      <Link>
                                        {t('lableView.furniture.price') + " : " + item?.furniture?.name}
                                      </Link>
                                      <p>
                                        {t('lableView.furniture.price') + " : " + formatPrice(item?.furniture?.price)} <br />
                                        {t('quantity') + " : " + item?.quantity}
                                      </p>
                                      
                                    </div>
                                  </div>
                                )
                              })}
                            </div>

                          )
                          :
                          (
                            <>
                              <div className="d-flex flex-wrap gap-3">
                                {quantityFurniture && quantityFurniture?.length > 0 && (
                                  quantityFurniture?.map((item) => (
                                    <div key={item.id} className="quantity-item-custorm">
                                      <input
                                        type="checkbox"
                                        checked
                                        onChange={(e) => addItemFurnitures(e, item, true)}
                                      />
                                      <label className='ms-1'>{item?.name}</label>
                                      <InputNumber
                                        className="input-quantity"
                                        value={getQuantityFurniture(item?.furnitureId)}
                                        min={0}
                                       
                                        step={1}
                                        onChange={(value) => handleQuantityChangeFurniture(item, value)}
                                        />
                                    </div>
                                  ))
                                )}

                                {listFurnitureRoom && listFurnitureRoom?.length > 0 && (
                                  listFurnitureRoom
                                   ?.filter(item => !quantityFurniture.some(s => s.furnitureId === item.furniture.id))
                                    ?.map((item) => (
                                      <div key={item.furniture.id} className="quantity-item-custorm">
                                        <input
                                          type="checkbox"
                                          onChange={(e) => addItemFurnitures(e, item)}
                                        />
                                        <label className='ms-1'>{item?.furniture?.name}</label>
                                        <InputNumber
                                          className="input-quantity"
                                          value={getQuantityFurniture(item?.furniture?.id)}
                                          min={0}
                                      
                                          step={1}
                                          onChange={(value) => handleQuantityChangeFurniture(item, value, true)}
                                        />
                                      </div>
                                    ))
                                )}

                                <Form.Control.Feedback type="invalid">
                                  {formik.errors.furniture}
                                </Form.Control.Feedback>
                              </div>
                            </>
                          )}
                      </Form.Group>
                      {console.log(dataDeatil?.customer)}
                      <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-2 mt-2'>
                        <Form.Label className='font-weight'> {t('lableView.contract.serivce')} : </Form.Label>
                        {checked === false ?

                          (

                            <div className=' row mt-4'>
                              {dataDeatil?.service?.length > 0 && dataDeatil?.service?.map((item, index) => {
                                return (
                                  <div key={index} className='col-xl-4 col-lg-6 col-md-12 col-sm-12 d-flex align-items-stretch'>
                                    <div className='item-user pt-3 pb-3 ps-4 pe-4 m-2 w-100'>
                                      <Link>
                                        {t('lableView.service.price') + " : " + item?.service?.name}
                                      </Link>
                                      <p>
                                        {t('lableView.service.price') + " : " + formatPrice(item?.service?.price) + " / " + t("lableView.service.unitValue." + item.service.unit)} <br />
                                        {t('quantity') + " : " + item?.quantity}
                                      </p>
                                    
                                    </div>
                                  </div>
                                )
                              })}
                            </div>

                          )
                          :
                          (
                            <>
                              <div className="d-flex flex-wrap gap-3">
                              {quantityService !== null && quantityService.map((item, index) => (
                                    <div key={item.id} className="quantity-item-custorm">
                                    <input
                                      type="checkbox"
                                      onChange={(e) => addItemServices(e, item, true)}
                                      checked
                                    />
                                    <label className='ms-1'>{item.name}</label>
                                    <InputNumber
                                      className={`input-quantity ms-2`}
                                      value={getQuantityService(item.serviceId)}
                                      min={0}
                                      step={1}
                                      onChange={(value) => handleQuantityChangeService(item, value)}
                                    />
                                  </div>
                                ))}

                                {listServiceRoom && listServiceRoom.length > 0 && (
                                  listServiceRoom
                                    .filter(item => !quantityService.some(s => s.serviceId === item.service.id))
                                    .map((item, index) => (
                                      <div key={item.id} className="quantity-item-custorm col-xl-3 col-lg-4 col-md-6 col-sm-12 w-100">
                                        <input
                                          type="checkbox"
                                          onChange={(e) => addItemServices(e, item)}
                                        />
                                        <label className='ms-1'>{item.service.name}</label>
                                        <InputNumber
                                          className={`input-quantity ms-2`}
                                          value={getQuantityService(item.id)}
                                          min={0}
                                          step={1}
                                          onChange={(value) => handleQuantityChangeService(item, value)}
                                        />
                                      </div>
                                    ))
                                )}
                                <Form.Control.Feedback type="invalid">
                                  {formik.errors.furniture}
                                </Form.Control.Feedback>
                              </div>
                            </>
                          )}
                      </Form.Group>
                      <Form.Group as={Col} xl="12" sm="12" className='mb-3 mt-3'>
                        {
                          checked === false ? (
                            <p>
                              <span className='label-form'>{t('lableView.contract.note')}</span> :
                              {dataDeatil.note !== null ? stripHtmlTags(dataDeatil.note) : t('noData')}
                            </p>
                          ) : (
                            <>
                              <Form.Label className='font-weight'>{t('lableView.contract.note')}</Form.Label>
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
                                  toolbar: [
                                    'heading', '|', 'bold', 'italic', 'link',
                                    'bulletedList', 'numberedList', 'blockQuote'
                                  ],
                                  ckfinder: {
                                    uploadUrl: '/path/to/your/upload/url',
                                  },
                                }}
                              />
                            </>
                          )
                        }

                      </Form.Group>
                    </Form.Group>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
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
                </Modal.Footer>
              </Form>)
            }

          </Modal.Body>

        </Modal>
      </CTable>
    </div>
  );
}

export default List;

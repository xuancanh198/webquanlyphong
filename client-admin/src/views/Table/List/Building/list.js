import React, { useEffect, useState, useRef } from 'react';
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
import { updateBuilding, deleteBuilding } from '../../../../service/baseService/cruds';
import { getListProvince, getListDistrict, getListward } from '../../../../service/baseService/APIOutsideSystem';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { setModalUpdate } from "../../../../redux/accction/listTable";
import { chaneFtiler } from "../../../../service/baseService/funService";
import CIcon from '@coreui/icons-react';
import { cilArrowTop, cilArrowBottom } from '@coreui/icons';
const containerStyle = {
  width: '100%',
  height: '400px'
};
const initialCenter = { lat: -3.745, lng: -38.523 };
function List({ data }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isMarkerVisible, setIsMarkerVisible] = useState(false);
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const mapRef = useRef(null);
  let show = useSelector((state) => state.listTable.modalUpdate);
  const [dataDeatil, setDataDeatil] = useState(null);
  const [editorData, setEditorData] = useState('');
  const [note, setNote] = useState('')
  const [images, setImages] = useState([]);
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState(0);
  const [initialValues, setInitialValues] = useState({
    code: '',
    name: '',
    numberFloor: '',
    numbeRoomsRent: 1,
    address: '',
    long: '',
    lat: '',
    note: '',
    image: null
  });
  // const province = useSelector((state) => state.listTable.province);
  // const district = useSelector((state) => state.listTable.district);
  // const ward = useSelector((state) => state.listTable.ward);
  const page = useSelector((state) => state.listTable.page);
  const limit = useSelector((state) => state.listTable.limit);
  let filters = useSelector((state) => state.listTable.filters);

  const maxNumber = 1;
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await dispatch(getListProvince());
  //   };
  //   if (show === true) {
  //     fetchData();
  //   }

  // }, [dispatch, page, limit, show]);

  // useEffect(() => {
  //       dispatch(getAllRole(page, limit));
  //   }, [page, limit, show]);

  const handleClose = () => {
    dispatch(setModalUpdate(false));
  }
  useEffect(() => {
    if (dataDeatil && dataDeatil !== null) {
      setInitialValues({
        code: dataDeatil.code || '',
        name: dataDeatil.name || '',
        numberFloor: dataDeatil.numberFloor || '',
        numbeRoomsRent: dataDeatil.numbeRoomsRent || 1,
        address: dataDeatil.address || '',
        long: dataDeatil.long || '',
        lat: dataDeatil.lat || '',
        note: dataDeatil.note || '',
        image: dataDeatil.image || null
      });
      setId(dataDeatil.id);
    }
  }, [dataDeatil]);
  const handleShow = (item) => {
    dispatch(setModalUpdate(true));
    if (show === false) {
      setDataDeatil(item);
      setId(item.id);
      formik.setValues(
        {
          code: item.code,
          name: item.name,
          numberFloor: item.numberFloor,
          numbeRoomsRent: item.numbeRoomsRent || 1,
          address: item.address,
          long: item.long,
          lat: item.lat,
          note: item.note,
          image: item.image || null
        });
    }
  };
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };

  const deleteBuildingId = (id) => {
    confirmAlert({
      title: t('action.authentication.delete', { attribute: t('attribute.building') }),
      message: t('action.message.delete', { attribute: t('attribute.building') }),
      buttons: [
        {
          label: t('actionView.delete'),
          onClick: () => dispatch(deleteBuilding(id))
        },
        {
          label: t('actionView.close'),
          onClick: () => { }
        }
      ]
    });
  };
  const updateBuildingFun = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key === 'image' && values[key]) {
        formData.append('image', values[key]);
      } else {
        formData.append(key, values[key]);
      }
    });
    try {
      await dispatch(updateBuilding(id, formData, handleClose()));
      formik.resetForm();
    } catch (error) {
      toast.error('có lỗi xảy ra');
    }

  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      code: Yup.string()
        .min(5, t('validation.attribute.min', { attribute: t('lableView.building.code'), min: 5 }))
        .max(255, t('validation.attribute.min', { attribute: t('lableView.building.code'), max: 255 }))
        .matches(/^[a-zA-Z0-9]*$/, t('validation.attribute.matches', { attribute: t('lableView.building.code') }))
        .required(t('validation.attribute.required', { attribute: t('lableView.building.code') })),
      name: Yup.string()
        .min(5, t('validation.attribute.min', { attribute: t('lableView.building.name'), min: 2 }))
        .max(255, t('validation.attribute.min', { attribute: t('lableView..building.name'), max: 50 }))
        .matches(/^[\p{L}\s.']+$/u, t('validation.attribute.matches', { attribute: t('lableView.building.name') }))
        .required(t('validation.attribute.required', { attribute: t('lableView.building.name') })),
      address: Yup.string()
        .min(5, t('validation.attribute.min', { attribute: t('lableView.building.address'), min: 2 }))
        .max(255, t('validation.attribute.min', { attribute: t('lableView..building.address'), max: 500 }))
        .matches(/^[\p{L}\s.']+$/u, t('validation.attribute.matches', { attribute: t('lableView.building.address') }))
        .required(t('validation.attribute.required', { attribute: t('lableView.building.address') })),
      numbeRoomsRent: Yup.number()
        .typeError(t('validation.attribute.integer', { attribute: t('lableView.building.numbeRoomsRent') }))
        .min(1, t('validation.attribute.minValue', { attribute: t('lableView.building.numbeRoomsRent'), min: 1 }))
        .required(t('validation.attribute.required', { attribute: t('lableView.building.numbeRoomsRent') })),
    }),
    onSubmit: (values,{ resetForm }) => {
      console.log(values)
      if (images.length === 0) {
        dispatch(updateBuilding(id, values, handleClose()));
      } else {
        updateBuildingFun(values);
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

  // const provinceFun = (e) => {
  //   dispatch(getListDistrict(e.target.value));
  //   setProvinceValue(e.target.options[e.target.selectedIndex].text)
  // }
  // const districtFun = (e) => {
  //   dispatch(getListward(e.target.value));
  //   setDistrictValue(e.target.options[e.target.selectedIndex].text)
  // }
  // const wardFun = (e) => {
  //   setWardValue(e.target.options[e.target.selectedIndex].text)
  // }


  useEffect(() => {
    if (show) {
      mapRef.current && google.maps.event.trigger(mapRef.current, 'resize');
    }
  }, [show]);
  useEffect(() => {
    if (show === true) {
      const simulateAPICall = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ lat: dataDeatil !== null ? parseFloat(dataDeatil.lat) : 37.7749, lng: dataDeatil !== null ? parseFloat(dataDeatil.long) : -122.4194 });
          }, 1000);
        });
      };

      simulateAPICall()
        .then(response => {
          const { lat, lng } = response;
          setMarkerPosition({
            lat: lat,
            lng: lng
          });
          setIsMarkerVisible(true);
        })
        .catch(error => {
          console.error('Error fetching location:', error);
        });
    }
  }, [show]);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setIsMarkerVisible(false);
    setTimeout(() => {
      setMarkerPosition({ lat, lng });
      setIsMarkerVisible(true);
      if (map) {
        map.panTo({ lat, lng });
      }
    }, 100);
  };

  const onLoad = mapInstance => {
    setMap(mapInstance);
    mapRef.current = mapInstance;
  };
  return (
    <div className='p-3'>

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col'>STT</CTableHeaderCell>
            <CTableHeaderCell scope='col' >
              <div className='flex_start'>
                {t('lableView.building.name')}
                <div>
                  <CIcon icon={cilArrowTop} className='icon-acction actice' size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "name",
                        order_by: "asc"
                      }, filters
                    ))}
                  />
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
            <CTableHeaderCell scope='col'>
              <div className='flex_start'>
                {t('lableView.building.code')}
                <div>
                  <CIcon icon={cilArrowTop} className='icon-acction actice' size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "code",
                        order_by: "asc"
                      }, filters
                    ))}
                  />
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
                {t('lableView.building.numbeRoomsRent')}
                <div>
                  <CIcon icon={cilArrowTop} className='icon-acction actice' size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "numbeRoomsRent",
                        order_by: "asc"
                      }, filters
                    ))}
                  />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "numbeRoomsRent",
                        order_by: "desc"
                      }, filters
                    ))}
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flex_start'>
                {t('lableView.building.numberFloor')}
                <div>
                  <CIcon icon={cilArrowTop} className='icon-acction actice' size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "numberFloor",
                        order_by: "asc"
                      }, filters
                    ))}
                  />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "numberFloor",
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
              <CTableDataCell>{item.numbeRoomsRent}</CTableDataCell>
              <CTableDataCell>{item.numberFloor}</CTableDataCell>
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
              <div className='flex_center icon-delete' onClick={() => deleteBuildingId(dataDeatil.id)}>
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} xl="3" md="12" className='mb-3 mt-3'>
                  {checked === false ? (
                    <div className='img-form-div'>
                      <img src={dataDeatil && dataDeatil !== null && dataDeatil.image ? dataDeatil.image : ""} className='img-form' />
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
                            onImageRemove,
                            isDragging
                          }) => {
                            triggerImageUpload = { onImageUpload, isDragging };
                            return (
                              <div className="upload__image-wrapper">
                                {imageList.length === 0 ? (
                                  <div className='img-form-div'>
                                    <img src={dataDeatil && dataDeatil !== null && dataDeatil.image ? dataDeatil.image : ""} className='img-form' />
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
                        <p> <span className='lable-form'>{t('lableView.building.code')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.code ? dataDeatil.code : t('noData')} </p>
                      ) : (
                        <>
                          <Form.Label> {t('lableView.building.code')}</Form.Label>

                          <Form.Control
                            type="text"
                            name="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.code && formik.errors.code}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.code}
                          </Form.Control.Feedback>
                        </>
                      )}
                  </Form.Group>
                  <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                    {checked === false ?
                      (
                        <p> <span className='lable-form'>{t('lableView.building.name')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.username ? dataDeatil.username : t('noData')} </p>
                      ) : (
                        <>
                          <Form.Label> {t('lableView.building.name')}</Form.Label>

                          <Form.Control
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.name && formik.errors.name}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                          </Form.Control.Feedback>
                        </>
                      )}
                  </Form.Group>
                  <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                    {checked === false ?
                      (
                        <p> <span className='lable-form'>{t('lableView.building.numberFloor')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.numberFloor ? dataDeatil.numberFloor : t('noData')} </p>
                      ) : (
                        <>
                          <Form.Label> {t('lableView.building.numberFloor')}</Form.Label>
                          <Form.Control
                            type="text"
                            value={formik.values.numberFloor}
                            name='numberFloor'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.numberFloor && formik.errors.numberFloor}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.numberFloor}
                          </Form.Control.Feedback>
                        </>
                      )}
                  </Form.Group>

                  <Form.Group as={Col} xl="3" lg="4" md="6" sm="12" className='mb-3 mt-3'>
                    {checked === false ?
                      (
                        <p> <span className='lable-form'>{t('lableView.building.numbeRoomsRent')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.numbeRoomsRent ? dataDeatil.numbeRoomsRent : t('noData')} </p>
                      ) : (
                        <>
                          <Form.Label> {t('lableView.building.numbeRoomsRent')}</Form.Label>
                          <Form.Control
                            type="text"
                            name="numbeRoomsRent"
                            value={formik.values.numbeRoomsRent}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.numbeRoomsRent && formik.errors.numbeRoomsRent}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.numbeRoomsRent}
                          </Form.Control.Feedback>
                        </>
                      )
                    }
                  </Form.Group>
                  {checked === false ?
                    (
                      <p> <span className='lable-form'> {t('lableView.building.address')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.address ? dataDeatil.address : t('noData')} </p>
                    ) : (
                      <>
                        {/* <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                          <Form.Label>{t('lableView.building.province')}</Form.Label>
                          <Form.Select aria-label="Default select example" name='province' onChange={(e) => provinceFun(e)}>
                            {province && province.map((item) => (
                              <option key={item.province_id} value={item.province_id}>{item.province_name}</option>
                            ))}
                          </Form.Select>

                        </Form.Group>

                        <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                          <Form.Label> {t('lableView.building.district')}</Form.Label>
                          <Form.Select aria-label="Default select example" name='district' onChange={(e) => districtFun(e)}>
                            {district && district.map((item) => (
                              <option key={item.district_id} value={item.district_id}>{item.district_name}</option>
                            ))}
                          </Form.Select>

                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                          <Form.Label> {t('lableView.building.ward')}</Form.Label>
                          <Form.Select aria-label="Default select example" name='ward' onChange={(e) => wardFun(e)}>
                            {ward && ward.map((item) => (
                              <option key={item.ward_id} value={item.ward_id}>{item.ward_name}</option>
                            ))}
                          </Form.Select>

                        </Form.Group> */}
                        <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3'>
                          <Form.Label> {t('lableView.building.address')}</Form.Label>
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
                      </>
                    )
                  }
                  {/* <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3'>
                    <p>Nếu không chỉnh sửa địa chỉ, sẽ giữ nguyên địa chỉ cũ là :  {dataDeatil && dataDeatil !== null && dataDeatil.address ? dataDeatil.address : ""}   </p>
                  </Form.Group> */}
                  {checked === false ?
                    "" : (
                      <>
                        <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3'>
                          <div
                            className='btn_upload_img'
                            style={triggerImageUpload?.isDragging ? { color: 'red' } : undefined}
                            onClick={() => triggerImageUpload && triggerImageUpload.onImageUpload()}
                          >
                            {t('lableView.building.img')}
                          </div>
                        </Form.Group>
                      </>
                    )
                  }
                  {
                    show === false
                      ?
                      null : (
                        <Form.Group as={Col} xl="12" sm="12" className='mb-3 mt-3'>
                          <LoadScript googleMapsApiKey="AIzaSyDry1Ai1pdztwV0KM44RS3mopWgzwWDiuI">
                            <GoogleMap
                              mapContainerStyle={containerStyle}
                              center={markerPosition || initialCenter}
                              zoom={10}
                              onClick={handleMapClick}
                              onLoad={onLoad}
                            >
                              {isMarkerVisible && markerPosition && <Marker position={markerPosition} />}
                            </GoogleMap>
                          </LoadScript>
                        </Form.Group>
                      )
                  }


                  <Form.Group as={Col} xl="12" sm="12" className='mb-3 mt-3'>
                    {checked === false ?
                      (
                        <p> <span className='lable-form'> {t('lableView.building.note')}</span>  : {dataDeatil && dataDeatil !== null && dataDeatil.note ? stripHtmlTags(dataDeatil.note) : t('noData')} </p>
                      ) : (
                        <>
                          <Form.Label> {t('lableView.building.note')}</Form.Label>
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


import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { addBuilding } from "../../../../service/baseService/cruds";
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { getListProvince, getListDistrict, getListward } from '../../../../service/baseService/APIOutsideSystem';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImageUploading from 'react-images-uploading';
import { getAllRole } from "../../../../service/baseService/cruds";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { setModalAdd } from "../../../../redux/accction/listTable";

const containerStyle = {
    width: '100%',
    height: '400px'
};

const initialCenter = {
    lat: 43.078206591282346,
    lng: 106.63754052549814
};
function Example({ title }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const show = useSelector((state) => state.listTable.modalAdd);
    const [note, setNote] = useState('')
    const [images, setImages] = useState([]);
    // const [address, setAddress] = useState('');
    const [provinceValue, setProvinceValue] = useState('');
    const [districtValue, setDistrictValue] = useState('');
    const [wardValue, setWardValue] = useState('');
    // const [addressDetail, setAddressDetail] = useState('');
    // const province = useSelector((state) => state.listTable.province);
    // const district = useSelector((state) => state.listTable.district);
    // const ward = useSelector((state) => state.listTable.ward);
    const page = useSelector((state) => state.listTable.page);
    const limit = useSelector((state) => state.listTable.limit);
    const [markerPosition, setMarkerPosition] = useState(null);

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setMarkerPosition({ lat, lng });
    };

    const maxNumber = 1;

    const handleClose = () => dispatch(setModalAdd(false));
    const handleShow = () => dispatch(setModalAdd(true));

    // useEffect(() => {
    //     // const fetchData = async () => {
    //     //     await dispatch(getListProvince());
          
    //     // };
    //     // if (show === true) {
    //     //     fetchData();
    //     // }
    //     dispatch(getAllRole(page, limit));
    // }, [dispatch, page, limit, show]);

    // useEffect(() => {
    //     if (province.length > 0) {
    //         setProvinceValue(province[0].province_name);
    //     }
    // }, [province]);

    // useEffect(() => {
    //     if (district.length > 0) {
    //         setDistrictValue(district[0].district_name);
    //     }
    // }, [district]);
    // useEffect(() => {
    //     formik.setValues({
    //         ...formik.values,
    //         addressDetail: addressDetail,
    //     });
    // }, [addressDetail]);
    // useEffect(() => {
    //     if (ward.length > 0) {
    //         setWardValue(ward[0].ward_name);
    //     }
    // }, [ward]);

    // useEffect(() => {
    //     setAddress(provinceValue + " ," + districtValue + " ," + wardValue + " ," + addressDetail);
    // }, [provinceValue, districtValue, wardValue, addressDetail]);

    // useEffect(() => {
    //     formik.setValues({
    //         ...formik.values,
    //         address: address,
    //     });
    // }, [address]);
    useEffect(() => {
        if (show === true) {
            if (markerPosition !== null && markerPosition.lat !== null && markerPosition.lng !== null) {
                formik.setValues({
                    ...formik.values,
                    lat: markerPosition.lat,
                    long: markerPosition.lng
                });
            }
        }
    }, [markerPosition, show]);
    const addBuildingFun = async (values, resetForm) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (key === 'image' && values[key]) {
                formData.append('image', values[key]);
            } else {
                formData.append(key, values[key]);
            }
        });
        try {
            await dispatch(addBuilding(formData, resetForm));
            formik.resetForm();
        } catch (error) {
            toast.error('có lỗi xảy ra');
        }
    };

    const formik = useFormik({
        initialValues: {
            address: "",
            note: note,
            image: null,
            long: "",
            lat: "",
            name: "",
            code: "",
            numberFloor: "",
            numbeRoomsRent: ""
        },
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
            // addressDetail: Yup.string()
            //     .required(t('validation.attribute.required', { attribute: t('lableView.building.addressDetail') })),
            numberFloor: Yup.number()
                .typeError(t('validation.attribute.integer', { attribute: t('lableView.building.numberFloor') }))
                .min(1, t('validation.attribute.minValue', { attribute: t('lableView.building.numberFloor'), min: 1 }))
                .required(t('validation.attribute.required', { attribute: t('lableView.building.numberFloor') })),
            numbeRoomsRent: Yup.number()
                .typeError(t('validation.attribute.integer', { attribute: t('lableView.building.numbeRoomsRent') }))
                .min(1, t('validation.attribute.minValue', { attribute: t('lableView.building.numbeRoomsRent'), min: 1 }))
                .required(t('validation.attribute.required', { attribute: t('lableView.building.numbeRoomsRent') })),

        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(addBuildingFun(values, resetForm));
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
    //     dispatch(getListDistrict(e.target.value));
    //     setProvinceValue(e.target.options[e.target.selectedIndex].text)
    // }
    // const districtFun = (e) => {
    //     dispatch(getListward(e.target.value));
    //     setDistrictValue(e.target.options[e.target.selectedIndex].text)
    // }
    // const wardFun = (e) => {
    //     setWardValue(e.target.options[e.target.selectedIndex].text)
    // }

    return (
        <>
            <div className='modal-button flex_center' onClick={handleShow}>
                <i className="fa-solid fa-plus"></i>
            </div>

            <Modal show={show} onHide={handleClose} className='actice-1200 flex_center'>
                <Modal.Header closeButton>
                    <Modal.Title>{t('actionView.create')} {title}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={formik.handleSubmit}>
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
                                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmC3sLJeXtH4IeRNpKytSZxoIFGWEmsLmP9Q&s" className='img-form' />
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
                                <Form.Group as={Col} xl="3" lg="4" md="6" sm="12" className='mb-3 mt-3 '>
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
                                </Form.Group>
                                <Form.Group as={Col} xl="3" lg="4" md="6" sm="12" className='mb-3 mt-3 '>
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
                                </Form.Group>
                                <Form.Group as={Col} xl="3" lg="4" md="6" sm="12" className='mb-3 mt-3 '>
                                    <Form.Label> {t('lableView.building.numberFloor')}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="numberFloor"
                                        value={formik.values.numberFloor}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.numberFloor && formik.errors.numberFloor}
                                        required
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.numberFloor}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} xl="3" lg="4" md="6" sm="12" className='mb-3 mt-3 '>
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
                                </Form.Group>
                                <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3'>
                                    <Form.Label>{t('lableView.building.address')}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.address && formik.errors.address}
                                    />
                                </Form.Group>

                                {/* <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
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
                                        name="addressDetail"
                                        value={formik.values.addressDetail}
                                        onChange={(e) => setAddressDetail(e.target.value)}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.addressDetail && formik.errors.addressDetail}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.addressDetail}
                                    </Form.Control.Feedback>
                                </Form.Group> */}
                                <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3'>
                                    <div
                                        className='btn_upload_img'
                                        style={triggerImageUpload?.isDragging ? { color: 'red' } : undefined}
                                        onClick={() => triggerImageUpload && triggerImageUpload.onImageUpload()}
                                    >
                                        {t('lableView.staff.img')}
                                    </div>
                                </Form.Group>

                                {
                                    show === false
                                        ?
                                        null : (
                                            <Form.Group as={Col} xl="12" sm="12" className='mb-3 mt-3'>
                                                <LoadScript googleMapsApiKey="AIzaSyDry1Ai1pdztwV0KM44RS3mopWgzwWDiuI">
                                                    <GoogleMap
                                                        mapContainerStyle={containerStyle}
                                                        center={initialCenter}
                                                        zoom={10}
                                                        onClick={handleMapClick}
                                                    >
                                                        {markerPosition && (
                                                            <Marker position={markerPosition} />
                                                        )}
                                                    </GoogleMap>
                                                </LoadScript>
                                            </Form.Group>
                                        )
                                }
                                <Form.Group as={Col} xl="12" sm="12" className='mb-3 mt-3'>
                                    <Form.Label> {t('lableView.staff.note')}</Form.Label>
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
                                </Form.Group>
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            {t('actionView.close')}
                        </Button>
                        <Button variant="primary" type="submit">
                            {t('actionView.create')}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default Example;

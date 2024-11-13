import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { addRoom, getAllTypeRoom, getAllFloor, getAllBuilding, getAllService, getAllFurniture } from "../../../../service/baseService/cruds";
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ImageUploading from 'react-images-uploading';
import { useTranslation } from 'react-i18next';
import { setModalAdd } from "../../../../redux/accction/listTable";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
function Example({ title }) {
    const { t } = useTranslation();
    const [note, setNote] = useState('')
    const dispatch = useDispatch();
    const show = useSelector((state) => state.listTable.modalAdd);
    const [validated, setValidated] = useState(false);
    const [images, setImages] = useState([]);
    const [floor, setFloor] = useState(null);
    const [typeRoom, setTypeRoom] = useState(null);
    const [building, setBuilding] = useState(null);
    const [service, setService] = useState([]);
    const [furniture, setFurnitures] = useState([]);
    const listFurnituresAll = useSelector((state) => state.listTable.listFurnituresAll);
    const listServiceAll = useSelector((state) => state.listTable.listServiceAll);
    const listTypeRoomAll = useSelector((state) => state.listTable.listTypeRoomAll);
    const listBuildingAll = useSelector((state) => state.listTable.listBuildingAll);
    const listFloor = useSelector((state) => state.listTable.listFloorAll);

    const handleClose = () => dispatch(setModalAdd(false));
    const handleShow = () => dispatch(setModalAdd(true));
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
        formik.setValues({
            ...formik.values,
            typeRoomId: typeRoom,
        });
    }, [typeRoom]);
    useEffect(() => {
        formik.setValues({
            ...formik.values,
            floorId: floor,
        });
    }, [floor]);
    useEffect(() => {
        formik.setValues({
            ...formik.values,
            buildingId: building,
        });
    }, [building]);

    useEffect(() => {
        formik.setValues({
            ...formik.values,
            service: [...service],
        });
    }, [service]);

    useEffect(() => {
        formik.setValues({
            ...formik.values,
            images: [...images],
        });
    }, [images]);
    useEffect(() => {
        formik.setValues({
            ...formik.values,
            furniture: furniture,
        });
    }, [furniture]);

    const formik = useFormik({
        initialValues: {
            name: "",
            code: "",
            length: 1,
            height: 1,
            width: 1,
            note: "",
            acreage: 1,
            typeRoomId: typeRoom,
            floorId: floor,
            images: [],
            buildingId: building,
            service: [],
            furniture: [],
            price : 0
        },
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
            addRoomFun(values, resetForm)

        }
    });

    const addRoomFun = async (values, resetForm) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (key === 'images' && Array.isArray(values[key])) {
                values[key].forEach((file) => {
                    formData.append('images[]', file.file);
                });
            } else if (key === 'service' && Array.isArray(values[key])) {
                values[key].forEach((item) => {
                    formData.append('service[]', item);
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
            await dispatch(addRoom(formData, resetForm));
            /// formik.resetForm();
        } catch (error) {
            toast.error('có lỗi xảy ra');
        }
    };

    const addItemServices = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setService((prev) => {
                if (prev.includes(value)) {
                    return prev;
                } else {
                    return [...prev, value];
                }
            });
        } else {
            setService((prev) => prev.filter((item) => item !== value));
        }
    };

    const addItemFurnitures = (e) => {
        const furnitureId = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setFurnitures((prevFurnitures) => [
                ...prevFurnitures,
                { furnitureId, quantity: 1 }
            ]);
        } else {
            setFurnitures((prevFurnitures) =>
                prevFurnitures.filter(item => item.furnitureId !== furnitureId)
            );
        }
    };

    const handleQuantityChange = (id, value) => {
        setFurnitures((prevFurnitures) => {
            const updatedFurnitures = prevFurnitures.map((item) => {
                if (Number(item.furnitureId) === Number(id)) {
                    return { ...item, quantity: value };
                }
                return item;
            });

            return updatedFurnitures;
        });
    };


    const getQuantity = (id) => {
        const item = furniture.length > 0 && furniture.find(item => Number(item.furnitureId) === id);
        return item ? item.quantity : 1;
    };

    return (
        <>
            <div className='modal-button flex_center' onClick={handleShow}>
                <i className="fa-solid fa-plus"></i>
            </div>

            <Modal show={show} onHide={handleClose} className='actice-1200 flex_center'>
                <Modal.Header closeButton>
                    <Modal.Title>{t('actionView.create')} {title}</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>
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
                                                        <div className='img-form-div'>
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmC3sLJeXtH4IeRNpKytSZxoIFGWEmsLmP9Q&s" className='img-form' />
                                                        </div>
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
                                    </Form.Group>
                                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
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
                                    </Form.Group>
                                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
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
                                    </Form.Group>

                                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
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
                                    </Form.Group>
                                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
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
                                    </Form.Group>
                                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
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
                                    </Form.Group>
                                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
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
                                    </Form.Group>
                                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
                                        <Form.Label> {t('lableView.room.floor')}</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={(e) => setFloor(e.target.value)}>
                                            {listFloor && listFloor.map((item) => (
                                                <option value={item.id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
                                        <Form.Label> {t('lableView.room.typeRoom')}</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={(e) => setTypeRoom(e.target.value)}>
                                            {listTypeRoomAll && listTypeRoomAll.map((item) => (
                                                <option value={item.id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
                                        <Form.Label> {t('lableView.room.building')}</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={(e) => setBuilding(e.target.value)}>
                                            {listBuildingAll && listBuildingAll.map((item) => (
                                                <option value={item.id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-2 mt-2'>
                                        <Form.Label>{t('lableView.room.image')}</Form.Label>
                                        <div
                                            className='btn_upload_img'
                                            style={triggerImageUpload?.isDragging ? { color: 'red' } : undefined}
                                            onClick={() => triggerImageUpload && triggerImageUpload.onImageUpload()}
                                        >
                                            {t('actionView.upload')}
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-2 mt-2'>
                                        <Form.Label> {t('lableView.room.furniture')} : </Form.Label>
                                        <div class="d-flex flex-wrap gap-3">
                                            {listFurnituresAll && listFurnituresAll.map((item, index) => (
                                                <div key={item.id} className={`${index === 0 ? "" : "ms-3"}`}>
                                                    <input type="checkbox" value={item.id} onChange={(e) => addItemFurnitures(e)} />
                                                    <label className='ms-1'>{item.name}</label>
                                                    <InputNumber
                                                        className={`input-quantity ms-2`}
                                                        value={getQuantity(item.id)}
                                                        min={0}
                                                        step={1}
                                                        onChange={(value) => handleQuantityChange(item.id, value)}
                                                    />
                                                </div>
                                            ))}
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.furniture}
                                            </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-2 mt-2'>
                                        <Form.Label> {t('lableView.room.service')} : </Form.Label>
                                        <div class="d-flex flex-wrap gap-3">
                                            {listServiceAll && listServiceAll.map((item) => (
                                                <div>
                                                    <input type="checkbox" value={item.id} onChange={(e) => addItemServices(e)} /> <label className='ms-1'>{item.name}</label>
                                                </div>
                                            ))}
                                        </div>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.service}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} xl="12" sm="12" className='mb-3 mt-3'>
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
                            {t('actionView.create')}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default Example;

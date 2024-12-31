import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImageUploading from 'react-images-uploading';
import CIcon from '@coreui/icons-react';
import { cilUser, cilX } from '@coreui/icons';
import { setModalAdd } from "../../../../redux/accction/listTable";
import { convertDateTimeFull } from "../../../../service/FunService/funweb"
import { getAllRoom, getAllUser, addContract, getListServiceRoom, getListFurnitureRoom } from "../../../../service/baseService/cruds";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
function Example({ title }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const maxNumber = 1;
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [roomId, setRoomId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [changeUserId, setChangeUserId] = useState(null);
    const show = useSelector((state) => state.listTable.modalAdd);
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
    const handleClose = () => dispatch(setModalAdd(false));
    const handleShow = () => dispatch(setModalAdd(true));
    const removeCustomrers = (valueToRemove) => {
        setCustormers(custormers =>
            custormers.filter(custormer => Number(custormer.value) !== Number(valueToRemove))
        );
        setChangeUserId(null);
    }

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

        const addContractFun = async (values, resetForm) => {
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                if (key === 'image' && values[key]) {
                    formData.append('image', values[key]);
                }
                else if (key === 'customers' && values[key]) {
                    custormers.forEach((customer) => {
                        formData.append('customers[]', Number(customer.value));
                    });
                }
                else if (key === 'service' && values[key]) {
                    quantityService.forEach((service) => {
                        formData.append('service[]', JSON.stringify(service));
                    });
                }
                else if (key === 'furniture' && values[key]) {

                    quantityFurniture.forEach((furniture) => {
                        formData.append('furniture[]', JSON.stringify(furniture));
                    });
                }
                else {
                    formData.append(key, values[key]);
                }
            });
        try {
            await dispatch(addContract(formData, resetForm));
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
        initialValues: {
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
        },
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
            addContractFun(values, resetForm);
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

    const addItemFurnitures = (e, id) => {
        const isChecked = e.target.checked;
        const newObject = {
            quantity: 1,
            furnitureId: id,
        };
        if (isChecked) {
            setQuantityFurniture((prev) => {
                const updatedPrev = prev || [];
                const exists = updatedPrev.some(item => item.furnitureId === id);
                if (exists) {
                    return updatedPrev;
                } else {
                    return [...updatedPrev, newObject];
                }
            });
        } else {
            setQuantityFurniture((prev) => {
                const updatedPrev = prev || [];
                return updatedPrev.filter(item => item.furnitureId !== id);
            });
        }


    };

    const getQuantityFurniture = (furnitureId) => {
        const item = Array.isArray(quantityFurniture) && quantityFurniture.find(f => f.furnitureId === furnitureId);
        return item ? item.quantity : 1;
    };
    const handleQuantityChangeFurniture = (item, value) => {
        const numericValue = Number(value);
        const maxQuantity = Number(item.quantity);
        if (numericValue > maxQuantity) {
            toast.error(t('messageText.changeQuantityFail', { attribute: t('lableView.contract.furniture') }));
            setQuantityFurniture((prevFurnitures) => {
                if (Array.isArray(prevFurnitures)) {
                    return prevFurnitures.map(furniture =>
                        furniture.furnitureId === item.furniture.id
                            ? { ...furniture, quantity: 1 }
                            : furniture
                    );
                }
                return prevFurnitures;
            });
        } else {
            setQuantityFurniture((prevFurnitures) => {
                if (Array.isArray(prevFurnitures)) {
                    const furnitureExists = prevFurnitures.some(furniture => Number(furniture.furnitureId) === Number(item.furniture.id));
                    if (furnitureExists) {
                        return prevFurnitures.map(furniture =>
                            Number(furniture.furnitureId) === Number(item.furniture.id)
                                ? { ...furniture, quantity: numericValue }
                                : furniture
                        );
                    } else {
                        return [...prevFurnitures, { furnitureId: item.furniture.id, quantity: numericValue }];
                    }
                }
                return prevFurnitures;
            });
        }
    };

    const addItemServices = (e, id) => {
        const isChecked = e.target.checked;
        const newObject = {
            quantity: 1,
            serviceId: id,
        };

        if (isChecked) {
            setQuantityService((prev) => {
                const updatedPrev = prev || [];
                const exists = updatedPrev.some(item => item.serviceId === id);
                if (exists) {
                    return updatedPrev;
                } else {
                    return [...updatedPrev, newObject];
                }
            });
        } else {
            setQuantityService((prev) => {
                const updatedPrev = prev || [];
                return updatedPrev.filter(item => item.serviceId !== id);
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
                                        onImageRemove,
                                        isDragging,
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
                                <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
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
                                </Form.Group>
                                <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                                    <Select
                                        value={userId}
                                        onChange={(e) => setUserId(e)}
                                        options={listUser}
                                        placeholder={t('messageText.searchTitel', { attribute: t('lableView.contract.user') })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.userId}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                                    <Select
                                        value={roomId}
                                        onChange={(e) => setRoomId(e)}
                                        options={listRoom}
                                        placeholder={t('messageText.searchTitel', { attribute: t('page.room') })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.roomId}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
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
                                </Form.Group>
                                <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
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
                                </Form.Group>
                                <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3'>
                                    <div
                                        className='btn_upload_img'
                                        style={triggerImageUpload?.isDragging ? { color: 'red' } : undefined}
                                        onClick={() => triggerImageUpload && triggerImageUpload.onImageUpload()}
                                    >
                                        {t('lableView.contract.img')}
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3'>
                                    <label className='mb-2 font-weight'> {t('lableView.contract.startTime')} : </label>
                                    <DatePicker selected={startTime} onChange={(date) => setStartTime(date)} />
                                </Form.Group>
                                <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3'>
                                    <label className='mb-2 font-weight'> {t('lableView.contract.endTime')} : </label>
                                    <DatePicker selected={endTime} onChange={(date) => setEndTime(date)} />
                                </Form.Group>
                                <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3 '>
                                    <Select
                                        value={changeUserId}
                                        onChange={(e) => addCustormers(e)}
                                        options={listUser}
                                        placeholder={t('messageText.searchTitel', { attribute: t('lableView.contract.custorm') })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.custorm}
                                    </Form.Control.Feedback>
                                    <div className='list-user d-flex flex-wrap mt-4 gap-3'>
                                        {custormers.length > 0 && custormers.map((item, index) => {
                                            return (
                                                <div key={index} className='item-user pt-3 pb-3 ps-4 pe-4'>
                                                    <Link>
                                                        {item.label}
                                                    </Link>
                                                    <CIcon icon={cilX} className="close-icon" onClick={() => removeCustomrers(item.value)} />
                                                </div>
                                            )
                                        })}

                                    </div>
                                </Form.Group>
                                <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-2 mt-2'>
                                    <Form.Label className='font-weight'> {t('lableView.contract.furniture')} : </Form.Label>
                                    <div className="d-flex flex-wrap gap-3">
                                        {listFurnitureRoom !== null ? listFurnitureRoom.map((item) => (
                                            <div key={item.id} className="quantity-item-custorm">
                                                <input type="checkbox" onChange={(e) => addItemFurnitures(e, item.furniture.id)} />
                                                <label className='ms-1'>{item.furniture.name}</label>
                                                <InputNumber
                                                    className="input-quantity"
                                                    value={getQuantityFurniture(item.furniture.id)}
                                                    min={0}
                                                    max={item.furniture.quantity}
                                                    step={1}
                                                    onChange={(value) => handleQuantityChangeFurniture(item, value)}
                                                />
                                            </div>
                                        )) : t('messageText.requiredChange', { attribute: t('page.room') })}
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.furniture}
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-2 mt-2'>
                                    <Form.Label className='font-weight'> {t('lableView.contract.serivce')} : </Form.Label>
                                    <div class="d-flex flex-wrap gap-3">
                                        {listServiceRoom !== null ? listServiceRoom.map((item, index) => (
                                            <div key={item.id} className="quantity-item-custorm">
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) => addItemServices(e, item.service.id)}
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
                                        )) : t('messageText.requiredChange', { attribute: t('page.room') })}

                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.furniture}
                                        </Form.Control.Feedback>
                                    </div>
                                </Form.Group>
                                <Form.Group as={Col} xl="12" sm="12" className='mb-3 mt-3'>
                                    <Form.Label className='font-weight'> {t('lableView.contract.note')}</Form.Label>
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

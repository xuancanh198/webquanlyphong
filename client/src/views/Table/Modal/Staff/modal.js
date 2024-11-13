import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { addStaff } from "../../../../service/baseService/cruds";
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { getListProvince, getListDistrict, getListward } from '../../../../service/baseService/APIOutsideSystem';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImageUploading from 'react-images-uploading';
import CIcon from '@coreui/icons-react';
import { cilUser, cilLockLocked, cilEnvelopeClosed, cilPhone } from '@coreui/icons';
import { setModalAdd } from "../../../../redux/accction/listTable";
import { getAllRole } from "../../../../service/baseService/cruds";
function Example({ title }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [addressDetail, setAddressDetail] = useState("");
    const show = useSelector((state) => state.listTable.modalAdd);
    const [note, setNote] = useState('')
    const [togglePassword, settogglePassword] = useState(false);
    const [images, setImages] = useState([]);
    const [address, setAddress] = useState('');
    const [roleId, setRoleId] = useState(1);
    const [provinceValue, setProvinceValue] = useState('');
    const [districtValue, setDistrictValue] = useState('');
    const [wardValue, setWardValue] = useState('');

    const province = useSelector((state) => state.listTable.province);
    const district = useSelector((state) => state.listTable.district);
    const ward = useSelector((state) => state.listTable.ward);
    const listRole = useSelector((state) => state.listTable.listRoleAll);

    const maxNumber = 1;

    const handleClose = () => dispatch(setModalAdd(false));
    const handleShow = () => dispatch(setModalAdd(true));
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getListProvince());
            dispatch(getAllRole(true));
        };
        if (show === true) {
            fetchData();
        }

    }, [dispatch, show]);

    useEffect(() => {
        if (province.length > 0) {
            setProvinceValue(province[0].province_name);
        }
    }, [province]);

    useEffect(() => {
        if (district.length > 0) {
            setDistrictValue(district[0].district_name);
        }
    }, [district]);

    useEffect(() => {
        if (ward.length > 0) {
            setWardValue(ward[0].ward_name);
        }
    }, [ward]);

    useEffect(() => {
        setAddress(`${provinceValue}, ${districtValue}, ${wardValue}, ${addressDetail}`);
    }, [provinceValue, districtValue, wardValue, addressDetail]);


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

    const addStaffFun = async (values, resetForm) => {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (key === 'image' && values[key]) {
                formData.append('image', values[key]);
            } else {
                formData.append(key, values[key]);
            }
        });
        try {
            await dispatch(addStaff(formData, resetForm));
            formik.resetForm();
        } catch (error) {
            toast.error('có lỗi xảy ra');
        }
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: "",
            fullname: "",
            address: address,
            roleId: roleId,
            email: "",
            phoneNumber: "",
            note: note,
            image: null,
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(5, t('validation.attribute.min', { attribute: t('lableView.staff.username'), min: 5 }))
                .max(255, t('validation.attribute.min', { attribute: t('lableView.staff.username'), max: 255 }))
                .matches(/^[a-zA-Z0-9]*$/, t('validation.attribute.matches', { attribute: t('lableView.staff.username') }))
                .required(t('validation.attribute.required', { attribute: t('lableView.staff.username') })),
            password: Yup.string()
                .min(5, t('validation.attribute.min', { attribute: t('lableView.staff.password'), min: 2 }))
                .max(255, t('validation.attribute.min', { attribute: t('lableView.staff.password'), max: 50 }))
                .matches(/^[a-zA-Z0-9]*$/, t('validation.attribute.matches', { attribute: t('lableView.staff.password'), excludeEmptyString: true, }))
                .required(t('validation.attribute.required', { attribute: t('lableView.staff.password') })),
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

            // addressDetail: Yup.string()
            //     .required(t('validation.attribute.required', { attribute: t('lableView.staff.addressDetail') })),
            roleId: Yup.string()
                .matches(/^[0-9]*$/, t('validation.attribute.matches', { attribute: t('lableView.staff.roleId') }))
                .min(1, t('validation.attribute.min', { attribute: t('lableView.staff.roleId'), min: 1 }))
                .required(t('validation.attribute.required', { attribute: t('lableView.staff.roleId') }))
        }),
        onSubmit: (values, { resetForm }) => {
            addStaffFun(values, resetForm);
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
                            <Form.Group as={Col} xl="9" md="12" className='mb-3 mt-3 row'>
                                <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                                    <div className=' css-animation'>
                                        <div className='font-icon flex_center'>
                                            <CIcon className='' icon={cilUser} size="l" />
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
                                <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
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
                                <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                                    <div className='css-animation'>
                                        <div className='font-icon flex_center'>
                                            <CIcon icon={cilLockLocked} size="l" />
                                        </div>
                                        <Form.Control
                                            type={togglePassword === false ? "password" : "text"}
                                            name="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={formik.touched.password && formik.errors.password}
                                            required
                                        />
                                        <Form.Label> {t('lableView.staff.password')}</Form.Label>
                                        <i className={`fa-solid icon-password-acction ${togglePassword === false ? 'fa-eye' : "fa-eye-slash"}`} onClick={updateTogglePassword}></i>
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.password}
                                        </Form.Control.Feedback>
                                    </div>

                                </Form.Group>
                                <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
                                    <Form.Select aria-label="Default select example" name="roleId" onChange={(e) => setRoleId(e.target.value)}                                        >
                                        <option value="0" disabled selected>Chọn chức vụ</option>
                                        {listRole && listRole.map((item) => (
                                            <option value={item.id}>{item.name}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.roleId}
                                    </Form.Control.Feedback>

                                </Form.Group>

                                <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3'>
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
                                <Form.Group as={Col} xl="4" lg="6" md="6" sm="12" className='mb-3 mt-3 '>
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
                                    <Form.Label>{t('lableView.staff.addressDetail')}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="addressDetail"
                                        value={addressDetail}
                                        onChange={(e) => setAddressDetail(e.target.value)}
                                        onBlur={formik.handleBlur}
                                    />
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

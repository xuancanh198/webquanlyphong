import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { addFurniture } from "../../../../service/baseService/cruds";
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { setModalAdd } from "../../../../redux/accction/listTable";

function Example({ title }) {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const show = useSelector((state) => state.listTable.modalAdd);
    const [validated, setValidated] = useState(false);

    const handleClose = () => dispatch(setModalAdd(false));
    const handleShow = () => dispatch(setModalAdd(true));

    const formik = useFormik({
        initialValues: {
            name: '',
            code: '',
            price: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, t('validation.attribute.min', { attribute: t('attribute.furniture.name'), min: 2 }))
                .max(255, t('validation.attribute.min', { attribute: t('attribute.furniture.name'), max: 50 }))
                .matches(/^[\p{L}0-9 ]*$/u, t('validation.attribute.matches', { attribute: t('attribute.furniture.name') }))
                .required(t('validation.attribute.required', { attribute: t('attribute.furniture.name') })),
                code: Yup.string()
                .min(2, t('validation.attribute.min', { attribute: t('attribute.furniture.code'), min: 2 }))
                .max(255, t('validation.attribute.max', { attribute: t('attribute.furniture.code'), max: 255 })) // Sửa lỗi thông báo max
                .matches(/^[a-zA-Z]*$/, t('validation.attribute.matches', { attribute: t('attribute.furniture.code') })) // Cho phép cả chữ hoa và chữ thường
                .required(t('validation.attribute.required', { attribute: t('attribute.furniture.code') })),            
            price: Yup.number()
                .typeError(t('validation.attribute.integer', { attribute: t('lableView.furniture.price') }))
                .min(0, t('validation.attribute.positive', { attribute: t('lableView.furniture.price'), min: 0 }))
                .required(t('validation.attribute.required', { attribute: t('lableView.furniture.price') }))
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(addFurniture(values), resetForm())
        }
    });


    return (
        <>
            <div className='modal-button flex_center' onClick={handleShow}>
                <i className="fa-solid fa-plus"></i>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('actionView.create')} {title}</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Row className="mb-3 mt-3">
                            <Form.Group as={Col} md="12" className='mb-2 mt-2'>
                                <Form.Label> {t('lableView.furniture.name')}</Form.Label>
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
                            <Form.Group as={Col} md="12" className='mb-2 mt-2'>
                                <Form.Label> {t('lableView.furniture.code')}</Form.Label>
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
                            <Form.Group as={Col} md="12" className='mb-2 mt-2'>
                                <Form.Label> {t('lableView.furniture.price')}</Form.Label>
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

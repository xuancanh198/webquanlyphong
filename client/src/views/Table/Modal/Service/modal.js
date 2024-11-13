import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { addService } from "../../../../service/baseService/cruds";
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { setModalAdd } from "../../../../redux/accction/listTable";

function Example({ title }) {
    const { t } = useTranslation();
    const allUnits = [
        { key: 'people', label: t('lableView.service.unitValue.people') },
        { key: 'room', label: t('lableView.service.unitValue.room') },
        { key: 'number', label: t('lableView.service.unitValue.number') },
        { key: 'block', label: t('lableView.service.unitValue.block') },
    ];

    const options = allUnits;

    const dispatch = useDispatch();
    const [unit, setUnit] = useState("people");
    const show = useSelector((state) => state.listTable.modalAdd);
    const [validated, setValidated] = useState(false);


    const handleClose = () => dispatch(setModalAdd(false));
    const handleShow = () => dispatch(setModalAdd(true));

    const formik = useFormik({
        initialValues: {
            name: '',
            code: '',
            price: 1,
            unit: '',
            quantity: 1
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, t('validation.attribute.min', { attribute: t('lableView.service.name'), min: 2 }))
                .max(50, t('validation.attribute.max', { attribute: t('lableView.service.name'), max: 50 }))
                .matches(/^[\p{L}\d ]+$/u, t('validation.attribute.matches', { attribute: t('lableView.service.name') }))
                .required(t('validation.attribute.required', { attribute: t('lableView.service.name') })),

            code: Yup.string()
                .min(2, t('validation.attribute.min', { attribute: t('lableView.service.code'), min: 2 }))
                .max(50, t('validation.attribute.max', { attribute: t('lableView.service.code'), max: 50 }))
                .matches(/^[\p{L}\d ]+$/u, t('validation.attribute.matches', { attribute: t('lableView.service.code') }))
                .required(t('validation.attribute.required', { attribute: t('lableView.service.code') })),

            price: Yup.number()
                .positive(t('validation.attribute.positive', { attribute: t('lableView.service.price') }))
                .required(t('validation.attribute.required', { attribute: t('lableView.service.price') })),

            quantity: Yup.number()
                .positive(t('validation.attribute.positive', { attribute: t('lableView.service.quantity') }))
                .required(t('validation.attribute.required', { attribute: t('lableView.service.quantity') }))
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(addService(values, resetForm))
        }
    });
    useEffect(() => {
        formik.setValues({
            ...formik.values,
            unit: unit,
        });
    }, [unit]);
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
                                <Form.Label> {t('lableView.service.name')}</Form.Label>
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
                                <Form.Label> {t('lableView.service.code')}</Form.Label>
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
                                <Form.Label> {t('lableView.service.price')}</Form.Label>
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
                            <Form.Group as={Col} md="12" className='mb-2 mt-2' >
                                <Form.Label> {t('lableView.service.unit')}</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                >
                                    {options.map(unit => (
                                        <option key={unit.key} value={unit.key}>
                                            {unit.label}
                                        </option>
                                    ))}
                                </Form.Select>

                            </Form.Group>

                            <Form.Group as={Col} md="12" className='mb-2 mt-2'>
                                <Form.Label> {t('lableView.service.quantity')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="quantity"
                                    value={formik.values.quantity}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.quantity && formik.errors.quantity}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.quantity}
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

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { addSetting } from "../../../../service/baseService/cruds";
import {useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import {setModalAdd} from "../../../../redux/accction/listTable";

function Example({ title }) {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const show = useSelector((state) => state.listTable.modalAdd) ;
    const [validated, setValidated] = useState(false);

    const handleClose = () => dispatch(setModalAdd(false));
    const handleShow = () => dispatch(setModalAdd(true));
    const formik = useFormik({
        initialValues: {
            key: '',
            value: '',
            note:"",
        },
        validationSchema: Yup.object({
            key: Yup.string()
            .min(2, t('validation.attribute.min', { attribute: t('lableView.setting.key'), min: 2 }))
            .max(50, t('validation.attribute.max', { attribute: t('lableView.setting.key'), max: 50 }))
            .matches(/^[\p{L} ]+$/u, t('validation.attribute.matches', { attribute: t('lableView.setting.key')}))
            .required(t('validation.attribute.required', { attribute: t('lableView.setting.key')})),
        
            value: Yup.string()
            .min(2, t('validation.attribute.min', { attribute: t('lableView.setting.value'), min: 2 }))
            .max(50, t('validation.attribute.max', { attribute: t('lableView.setting.value'), max: 50 }))
            // .matches(/^[\p{L} ]+$/u, t('validation.attribute.matches', { attribute: t('lableView.setting.value')}))
            .required(t('validation.attribute.required', { attribute: t('lableView.setting.value')})),
        
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(addSetting(values, resetForm))
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
                                <Form.Label> {t('lableView.setting.key')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="key"
                                    value={formik.values.key}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.name && formik.errors.key}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.key}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" className='mb-2 mt-2'>
                                <Form.Label> {t('lableView.setting.value')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="value"
                                    value={formik.values.value}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.value && formik.errors.value}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.value}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" className='mb-2 mt-2'>
                                <Form.Label> {t('lableView.setting.note')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="note"
                                    value={formik.values.note}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.note && formik.errors.note}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.note}
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

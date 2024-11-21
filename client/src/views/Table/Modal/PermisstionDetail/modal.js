import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { addPermisstionDetail  } from "../../../../service/baseService/cruds";
import {useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import {setModalAdd} from "../../../../redux/accction/listTable";
import Select from 'react-select';
function Example({ title }) {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const show = useSelector((state) => state.listTable.modalAdd) ;
    const [validated, setValidated] = useState(false);
    const listPermisstionAll = useSelector((state) => state.listTable.listPermisstionAll);
    const listAcctionAll = useSelector((state) => state.listTable.listAcctionAll);

    const [permisstionId, setPermisstionId] = useState(null);  
    const [listPermisstion, setListPermisstion] = useState([]);
    const [acctionId, setAcctionId] = useState(null);  
    const [listAcction, setListAcction] = useState([]);
    const handleClose = () => dispatch(setModalAdd(false));
    const handleShow = () => dispatch(setModalAdd(true));
    useEffect(() => {
        if (permisstionId && acctionId) {
            formik.setFieldValue('code', `${acctionId.code}.${permisstionId.code}`);
        } else {
            formik.setFieldValue('code', '');
        }
    }, [permisstionId, acctionId])
    useEffect(() => {
        if (permisstionId ) {
            formik.setFieldValue('permisstionId', `${permisstionId.value}`);
        } 
    }, [permisstionId])
    useEffect(() => {
        if (acctionId ) {
            formik.setFieldValue('acctionId', `${acctionId.value}`);
        } 
    }, [acctionId])
    console.log(acctionId)
    const formik = useFormik({
        initialValues: {
            name: '',
            code: '',
            url : ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
            .min(2, t('validation.attribute.min', { attribute: t('lableView.permisstionDetail.name'), min: 2 }))
            .max(50, t('validation.attribute.max', { attribute: t('lableView.permisstionDetail.name'), max: 50 }))
            .matches(/^[\p{L} ]+$/u, t('validation.attribute.matches', { attribute: t('lableView.permisstionDetail.name')}))
            .required(t('validation.attribute.required', { attribute: t('lableView.permisstion.name')})),
            url: Yup.string()
            .min(2, t('validation.attribute.min', { attribute: t('lableView.permisstionDetail.url'), min: 2 }))
            .max(50, t('validation.attribute.max', { attribute: t('lableView.permisstionDetail.url'), max: 50 }))
            .matches(/^[\p{L} ]+$/u, t('validation.attribute.matches', { attribute: t('lableView.permisstionDetail.url')}))
            .required(t('validation.attribute.required', { attribute: t('lableView.permisstionDetail.url')})),
        code: Yup.string()
            .min(2, t('validation.attribute.min', { attribute: t('lableView.permisstionDetail.code'), min: 2 }))
            .max(50, t('validation.attribute.max', { attribute: t('lableView.permisstionDetail.code'), max: 50 }))
            // .matches(/^[\p{L}]+$/u, t('validation.attribute.matches', { attribute: t('lableView.permisstion.code')}))
            .required(t('validation.attribute.required', { attribute: t('lableView.permisstionDetail.code')})),
        
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(addPermisstionDetail(values, resetForm))
        }
    });
    useEffect(() => {
        if (listPermisstionAll !== null) {
            setListPermisstion(
                listPermisstionAll.length > 0 && listPermisstionAll.map(item => ({
                    value: item.id,
                    label: item.name,
                    code: item.code
                }))
            );
        }
    }, [listPermisstionAll])

    useEffect(() => {
        if (listAcctionAll !== null) {
            setListAcction(
                listAcctionAll.length > 0 && listAcctionAll.map(item => ({
                    value: item.id,
                    label: item.name,
                    code: item.code
                }))
            );
        }
    }, [listAcctionAll])
   
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
                                <Form.Label> {t('lableView.permisstionDetail.name')}</Form.Label>
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
                                <Form.Label> {t('lableView.permisstionDetail.code')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="code"
                                    value={formik.values.code}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.code && formik.errors.code}
                                    disabled
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.code}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12" className='mb-2 mt-2'>
                                <Form.Label> {t('lableView.permisstionDetail.url')}</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="url"
                                    value={formik.values.url}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.url && formik.errors.url}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.url}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="12"  className='mb-3 mt-3 '>
                                    <Select
                                        value={permisstionId}
                                        onChange={(e) => setPermisstionId(e)}
                                        options={listPermisstion}
                                        placeholder={t('messageText.searchTitel', { attribute: t('page.permisstion') })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.roomId}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="12"  className='mb-3 mt-3 '>
                                    <Select
                                        value={acctionId}
                                        onChange={(e) => setAcctionId(e)}
                                        options={listAcction}
                                        placeholder={t('messageText.searchTitel', { attribute: t('page.acction') })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.roomId}
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

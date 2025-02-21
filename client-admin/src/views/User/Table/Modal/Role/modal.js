import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { addRole } from "../../../../service/baseService/cruds";
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {setModalAdd} from "../../../../redux/accction/listTable";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
function Example({ title }) {
    const { t } = useTranslation();
    
    const dispatch = useDispatch();
    const show = useSelector((state) => state.listTable.modalAdd) ;
    const listAcctionAll = useSelector((state) => state.listTable.listAcctionAll);
    const listPermisstionDetailAll = useSelector((state) => state.listTable.listPermisstionDetailAll);
    const listPermisstionAll = useSelector((state) => state.listTable.listPermisstionAll);
    const [validated, setValidated] = useState(false);
    const [arrPemisstionDetail, setArrPemisstionDetail] = useState([])
    const handleClose = () => dispatch(setModalAdd(false));
    const handleShow = () => dispatch(setModalAdd(true));
    useEffect(() => {
        formik.setFieldValue('arrPemisstionDetail', arrPemisstionDetail);
    }, [arrPemisstionDetail])
    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
            .min(2, t('validation.attribute.min', { attribute: t('attribute.roleName'), min: 2 }))
            .max(50, t('validation.attribute.min', { attribute: t('attribute.roleName'), max: 50 }))
            .matches(/^[\p{L}0-9 ]*$/u, t('validation.attribute.matches', { attribute: t('attribute.roleName')}))
            .required(t('validation.attribute.required', { attribute: t('attribute.roleName')}))
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(addRole(values),resetForm())
        }
    });
    const isValueInArray = (value) => {
        return arrPemisstionDetail.includes(value);
    };

    const changePermisstionDetail = (isCheck, value) =>{
        const result = listPermisstionDetailAll.filter((item) =>
            item.code.includes(value) 
        );
        setArrPemisstionDetail((prev) => {
            if (isCheck) {
                const newItems = result.filter((item) => !prev.includes(item.code));
                return [...prev, ...newItems.map((item) => item.code)];
            } else {
                return prev.filter((item) => !result.map((r) => r.code).includes(item));
            }
        })
    }
    const returnResultCount = (code) => {
        const arrPermisstionCount = arrPemisstionDetail?.filter((item) =>
            item.includes(code)
        ).length;
        const listPermisstionCount = listPermisstionDetailAll?.filter((item) =>
            item.code.includes(code)
        ).length;
        if (arrPermisstionCount === listPermisstionCount) {
            return "full"
        }
        else if ((arrPermisstionCount > 0) && (arrPermisstionCount < listPermisstionCount)) {
            return "insufficient"
        }
        return false;
    };
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
                                <Form.Label> {t('table.colum.role.name')}</Form.Label>
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
                        </Row>
                        <Form.Group as={Col} md="12" className='mb-2 mt-2'>
                            <Tabs
                                defaultActiveKey="permisstion"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                            >  <Tab eventKey="permisstion" title={t('page.permisstion')}>
                                    <div>
                                        {listPermisstionAll?.map((item, index) => {
                                            return (
                                                <div className='d-flex' key={index}>
                                                    <input
                                                        checked={
                                                            returnResultCount(item?.code) === false
                                                                ? false : true
                                                        }
                                                        type='checkbox' onChange={(e) => changePermisstionDetail(e.target.checked, item?.code)} value={item?.code} />
                                                    <label className={`ms-2 ${returnResultCount(item?.code) !== false && (returnResultCount(item?.code) === "full" ? "color-violet" : "color-dark-accent")}`}>
                                                        {item?.name}
                                                    </label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Tab>
                                <Tab eventKey="acction" title={t('page.acction')}>
                                    <div>
                                        {listAcctionAll?.map((item, index) => {
                                            return (
                                                <div className='d-flex' key={index}>
                                                    <input
                                                        checked={
                                                            returnResultCount(item?.code) === false
                                                                ? false : true
                                                        }
                                                        type='checkbox' onChange={(e) => changePermisstionDetail(e.target.checked, item?.code)} value={item?.code} />
                                                    <label className={`ms-2 ${returnResultCount(item?.code) !== false && (returnResultCount(item?.code) === "full" ? "color-violet" : "color-dark-accent")}`}>
                                                        {item?.name}
                                                    </label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Tab>
                                <Tab eventKey="permisstionDetail" title={t('page.permisstionDetail')}>
                                    <div>
                                        {listPermisstionDetailAll?.map((item, index) => {
                                            return (
                                                <div className='d-flex' key={index}>
                                                    <input type='checkbox' 
                                                        checked={isValueInArray(item?.code)}
                                                    onChange={(e) => changePermisstionDetail(e.target.checked, item?.code)} value={item?.code} />
                                                    <label className='ms-2'>
                                                        {item?.name}
                                                    </label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Tab>
                            </Tabs>

                        </Form.Group>
                   
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

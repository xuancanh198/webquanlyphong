import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { convertDateTime } from '../../../../service/FunService/funweb';
import { updateRole, deleteRole, getAllPermisstion, getAllAcction, getAllPermisstionDetail } from '../../../../service/baseService/cruds';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CIcon from '@coreui/icons-react';
import { cilArrowTop, cilArrowBottom } from '@coreui/icons';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { setModalUpdate } from "../../../../redux/accction/listTable";
import { useTranslation } from 'react-i18next';
import { chaneFtiler } from "../../../../service/baseService/funService";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
function List({ data }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [dataDeatil, setDataDeatil] = useState(null);
  let filters = useSelector((state) => state.listTable.filters);
  const show = useSelector((state) => state.listTable.modalUpdate);
  const [arrPemisstionDetail, setArrPemisstionDetail] = useState([])
  const listAcctionAll = useSelector((state) => state.listTable.listAcctionAll);
  const listPermisstionDetailAll = useSelector((state) => state.listTable.listPermisstionDetailAll);
  const listPermisstionAll = useSelector((state) => state.listTable.listPermisstionAll);
  const [validated, setValidated] = useState(false);
  const [checked, setChecked] = useState(false);
  const [id, setId] = useState(0);
  const handleClose = () => {
    dispatch(setModalUpdate(false));
    if (show === true) {
      setDataDeatil("");
      formik.setValues({ name: "" });
      setArrPemisstionDetail([])
    }
  }
  const handleShow = (item) => {
    dispatch(setModalUpdate(true));
    if (show === false) {
      setDataDeatil(item);
      setId(item.id);
      formik.setValues({ name: item.name });
      const codes = item.permission_detail?.map((detail) => detail.code) || [];
      setArrPemisstionDetail(codes);
    }
  };
  const handleChange = (checked) => {
    setChecked(checked);
  };
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, t('validation.attribute.min', { attribute: t('attribute.roleName'), min: 2 }))
        .max(50, t('validation.attribute.min', { attribute: t('attribute.roleName'), max: 50 }))
        .matches(/^[\p{L}0-9 ]*$/u, t('validation.attribute.matches', { attribute: t('attribute.roleName') }))
        .required(t('validation.attribute.required', { attribute: t('attribute.roleName') }))
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(updateRole(values, id, resetForm));
    }
  });

  useEffect(() => {
    formik.setFieldValue('arrPemisstionDetail', arrPemisstionDetail);
  }, [arrPemisstionDetail]);
  const changePermisstionDetail = (isCheck, value) => {
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
  const isValueInArray = (value) => {
    return arrPemisstionDetail.includes(value);
  };

  const deleteRoleId = (id) => {
    confirmAlert({
      title: t('action.authentication.delete', { attribute: t('attribute.role') }),
      message: t('action.message.delete', { attribute: t('attribute.role') }),
      buttons: [
        {
          label: t('actionView.delete'),
          onClick: () => dispatch(deleteRole(id))
        },
        {
          label: t('actionView.close'),
          onClick: () => { }
        }
      ]
    });
  };
  useEffect(() => {
    dispatch(getAllPermisstion(true, true));
    dispatch(getAllAcction(true, true));
    dispatch(getAllPermisstionDetail(true, true));
  }, [])
  const returnResultCount = (code) => {
    const arrPermisstionCount = arrPemisstionDetail.filter((item) =>
      item.includes(code)
    ).length;
    const listPermisstionCount = listPermisstionDetailAll.filter((item) =>
      item.code.includes(code)
    ).length;
    if (arrPermisstionCount === listPermisstionCount) {
      return "full"
    }
    else if ((arrPermisstionCount > 0) &&(arrPermisstionCount < listPermisstionCount)){
      return "insufficient"
    }
    return false;
  };
  return (
    <div className='p-3'>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col'>STT</CTableHeaderCell>
            <CTableHeaderCell scope='col' >
              <div className='flex_start'>
                {t('table.colum.role.name')}
                <div>
                  <CIcon icon={cilArrowTop} size='sx'
                    onClick={() => dispatch(
                      chaneFtiler(
                        {
                          colum: "name",
                          order_by: "asc"
                        }, filters
                      )
                    )} />
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
                {t('table.colum.role.created_at')}
                <div>
                  <CIcon icon={cilArrowTop} size='sx'
                    onClick={() => dispatch(
                      chaneFtiler(
                        {
                          colum: "code",
                          order_by: "asc"
                        },
                        filters
                      )
                    )} />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "created_at",
                        order_by: "desc"
                      }, filters
                    ))}
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flex_start'>
                {t('table.colum.role.updated_at')}
                <div>
                  <CIcon icon={cilArrowTop} className='icon-acction actice' size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "updated_at",
                        order_by: "asc"
                      },
                      filters
                    ))}
                  />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "updated_at",
                        order_by: "desc"
                      },
                      filters
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
              <CTableDataCell>{item.created_at ? convertDateTime(item.created_at) : ''}</CTableDataCell>
              <CTableDataCell>{item.updated_at ? convertDateTime(item.updated_at) : ''}</CTableDataCell>
              <CTableDataCell>
                <Button variant='primary' onClick={() => handleShow(item)}>
                  {t('table.colum.viewDetail')}
                </Button>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>

        <Modal show={show} onHide={handleClose}>
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
              <div className='flex_center icon-delete' onClick={() => deleteRoleId(dataDeatil.id)}>
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} md="12">
                  {checked === false ?
                    <>
                      <p><Form.Label className='font-weight'>  {t('table.colum.role.name')}</Form.Label> : {dataDeatil && dataDeatil.name !== "" ? dataDeatil.name : "Không có dữ liệu"}</p>
                    </>
                    :
                    <>
                      <Form.Label>  {t('table.colum.role.name')}</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.name && formik.errors.name}
                      />

                    </>
                  }
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
             
                {
                checked === false
                &&
                (
                  <>
                      <Form.Group as={Col} className='mt-1' md="12" >
                        <p><Form.Label className='font-weight'>{t('lableView.staff.totalActive') + " / " + t('lableView.staff.total')} :</Form.Label> {dataDeatil?.staffs_active_count + " /" + dataDeatil?.staffs_count}</p>
                      </Form.Group>
                      <Form.Group as={Col} className='mt-1' md="12" >
                        <p><Form.Label className='font-weight'>{t('table.colum.role.created_at')} :</Form.Label> {dataDeatil && dataDeatil.created_at !== null ? convertDateTime(dataDeatil.created_at) : "Không có dữ liệu"}</p>
                      </Form.Group>

                      <Form.Group as={Col} className='mt-1' md="12">
                        <p><Form.Label className='font-weight'>{t('table.colum.role.updated_at')} :</Form.Label> {dataDeatil && dataDeatil.updated_at !== null ? convertDateTime(dataDeatil.updated_at) : "Không có dữ liệu"}</p>
                      </Form.Group>
                  </>
                )
                }
                <Form.Group as={Col} md="12 mt-4">
                  {checked === false ?
                    <div>
                      <Form.Label className='font-weight'>  {t('page.permisstionDetail')} :</Form.Label>
                      <div>
                        {dataDeatil?.permission_detail?.map((item, index) => {
                          return (
                            <div className='my-3' key={index}>
                              <p>
                                {item?.name}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    :
                    <>
                      <>
                        <Tabs
                          defaultActiveKey="permisstion"
                          id="uncontrolled-tab-example"
                          className="mb-3"
                        >
                          <Tab eventKey="permisstion" title={t('page.permisstion')}>
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
                      </>
                    </>
                  }
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
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
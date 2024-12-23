import React, { useState } from 'react';
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
import { updateFurniture, deleteFurniture } from '../../../../service/baseService/cruds';
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

function List({ data }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [dataDeatil, setDataDeatil] = useState(null);
  let filters = useSelector((state) => state.listTable.filters);
  const show = useSelector((state) => state.listTable.modalUpdate);
  const [validated, setValidated] = useState(false);
  const [checked, setChecked] = useState(false);
  const [id, setId] = useState(0);
  const handleClose = () => {
    dispatch(setModalUpdate(false));
    if (show === true) {
      setDataDeatil("");
      formik.setValues({ name: "" });
    }
  }

  const handleShow = (item) => {
    dispatch(setModalUpdate(true));
    if (show === false) {
      setDataDeatil(item);
      setId(item.id);
      formik.setValues(
        { 
          name: item.name,
          code: item.code,
          price: item.price
         }
      );
    }
  };
  const handleChange = (checked) => {
    setChecked(checked);
  };
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
        .max(255, t('validation.attribute.min', { attribute: t('attribute.furniture.code'), max: 50 }))
        .matches(/^[\w]*$/, t('validation.attribute.matches', { attribute: t('attribute.furniture.code') }))
        .required(t('validation.attribute.required', { attribute: t('attribute.furniture.code') })),
      price: Yup.number()
        .typeError(t('validation.attribute.integer', { attribute: t('attribute.price') }))
        .min(0, t('validation.attribute.positive', { attribute: t('attribute.price'), min: 0 }))
        .required(t('validation.attribute.required', { attribute: t('attribute.price') }))
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(updateFurniture(id, values, resetForm));
    }
  });
  const deleteFurnitureId = (id) => {
    confirmAlert({
      title: t('action.authentication.delete', { attribute: t('page.furniture') }),
      message: t('action.message.delete', { attribute: t('page.furniture') }),
      buttons: [
        {
          label: t('actionView.delete'),
          onClick: () => dispatch(deleteFurniture(id))
        },
        {
          label: t('actionView.close'),
          onClick: () => { }
        }
      ]
    });
  };
  return (
    <div className='p-3'>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col'>STT</CTableHeaderCell>
            <CTableHeaderCell scope='col' >
              <div className='flex_start'>
                {t('lableView.furniture.name')}
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
                {t('lableView.furniture.created_at')}
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
                {t('lableView.furniture.updated_at')}
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
              <div className='flex_center icon-delete' onClick={() => deleteFurnitureId(dataDeatil.id)}>
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} md="12">
                  {checked === false ?
                    <>
                      <p><Form.Label>  {t('lableView.furniture.name')}</Form.Label> : {dataDeatil && dataDeatil.name !== "" ? dataDeatil.name : "Không có dữ liệu"}</p>
                    </>
                    :
                    <>
                      <Form.Label>  {t('lableView.furniture.name')}</Form.Label>
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
                <Form.Group as={Col} md="12">
                  {checked === false ?
                    <>
                      <p><Form.Label>  {t('lableView.furniture.code')}</Form.Label> : {dataDeatil && dataDeatil.code !== "" ? dataDeatil.code : "Không có dữ liệu"}</p>
                    </>
                    :
                    <>
                      <Form.Label>  {t('lableView.furniture.code')}</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="code"
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.code && formik.errors.code}
                      />

                    </>
                  }
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.code}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12">
                  {checked === false ?
                    <>
                      <p><Form.Label>  {t('lableView.furniture.price')}</Form.Label> : {dataDeatil && dataDeatil.price !== "" ? dataDeatil.price : "Không có dữ liệu"}</p>
                    </>
                    :
                    <>
                      <Form.Label>  {t('lableView.furniture.price')}</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.price && formik.errors.price}
                      />

                    </>
                  }
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.price}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} className='mt-3' md="12" >
                  <p><Form.Label>{t('lableView.furniture.created_at')} :</Form.Label> {dataDeatil && dataDeatil.created_at !== null ? convertDateTime(dataDeatil.created_at) : "Không có dữ liệu"}</p>
                </Form.Group>
                <Form.Group as={Col} className='mt-3' md="12">
                  <p><Form.Label>{t('lableView.furniture.updated_at')} :</Form.Label> {dataDeatil && dataDeatil.updated_at !== null ? convertDateTime(dataDeatil.updated_at) : "Không có dữ liệu"}</p>
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
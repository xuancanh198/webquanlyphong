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
import { updateService, deleteService } from '../../../../service/baseService/cruds';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CIcon from '@coreui/icons-react';
import { cilArrowTop, cilArrowBottom } from '@coreui/icons';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
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
  const allUnits = [
    { key: 'people', label: t('lableView.service.unitValue.people') },
    { key: 'room', label: t('lableView.service.unitValue.room') },
    { key: 'number', label: t('lableView.service.unitValue.number') },
    { key: 'block', label: t('lableView.service.unitValue.block') },
  ];
  const dispatch = useDispatch();
  const [unit, setUnit] = useState(allUnits[0].key);
  const [dataDeatil, setDataDeatil] = useState(null);
  const [checked, setChecked] = useState(false);
  let filters = useSelector((state) => state.listTable.filters);
  let show = useSelector((state) => state.listTable.modalUpdate);
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState(0);
  const handleClose = () => {
    dispatch(setModalUpdate(false));
  }

  const handleShow = (item) => {
    dispatch(setModalUpdate(true));
    if (show === false) {
      setDataDeatil(item);
      setId(item.id);
      formik.setValues({
        name: item.name,
        code: item.code,
        price: item.price,
        quantity: item.quantity
      });
      setUnit(item.unit)
    }

  };
  const handleChange = (checked) => {
    setChecked(checked);
  };
  useEffect(() => {
    formik.setValues({
      ...formik.values,
      unit: unit,
    });
  }, [unit]);

  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
      price: 1 ?? dataDeatil?.price,
      unit: unit ?? dataDeatil?.unit,
      quantity: 1 ?? dataDeatil?.quantity,
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
      dispatch(updateService(id, values, resetForm));
    }
  });
  const deleteServiceId = (id) => {
    confirmAlert({
      title: t('action.authentication.delete', { attribute: t('page.service') }),
      message: t('action.message.delete', { attribute: t('page.service') }),
      buttons: [
        {
          label: t('actionView.delete'),
          onClick: () => dispatch(deleteService(id))
        },
        {
          label: t('actionView.close'),
          onClick: () => { }
        }
      ]
    });
  };


  const selectedUnit = dataDeatil && dataDeatil.unit ? dataDeatil.unit : null;
  const options = allUnits.filter(unit => unit.key !== selectedUnit);
  return (
    <div className='p-3'>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col'>STT</CTableHeaderCell>
            <CTableHeaderCell scope='col' >
              <div className='flex_start'>
                {t('lableView.service.name')}
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
            <CTableHeaderCell scope='col' >
              <div className='flex_start'>
                {t('lableView.service.code')}
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
                        colum: "code",
                        order_by: "desc"
                      }, filters
                    ))}
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flex_start'>
                {t('lableView.service.created_at')}
                <div>
                  <CIcon icon={cilArrowTop} className='icon-acction actice' size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "created_at",
                        order_by: "asc"
                      },
                      filters
                    ))}
                  />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "created_at",
                        order_by: "desc"
                      },
                      filters
                    ))}
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flex_start'>
                {t('lableView.service.updated_at')}
                <div>

                  <CIcon icon={cilArrowTop} size='sx'
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
                      }, filters
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
              <CTableDataCell>{item.code}</CTableDataCell>
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
              <div className='flex_center icon-delete' onClick={() => deleteServiceId(dataDeatil.id)}>
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} md="12" className={checked === false ? null : 'mt-2 mb-2'}>
                  {checked === false ?
                    <>
                      <p> <Form.Label> {t('lableView.service.name')}</Form.Label> : {dataDeatil && dataDeatil.name !== "" ? dataDeatil.name : "Không có dữ liệu"}</p>
                    </>
                    :
                    <>
                      <Form.Label> {t('lableView.service.name')}</Form.Label>
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
                <Form.Group as={Col} md="12" className={checked === false ? null : 'mt-2 mb-2'} >
                  {checked === false ?
                    <>
                      <p> <Form.Label> {t('lableView.service.code')}</Form.Label> : {dataDeatil && dataDeatil.code !== "" ? dataDeatil.code : "Không có dữ liệu"}</p>
                    </>
                    :
                    <>
                      <Form.Label> {t('lableView.service.code')}</Form.Label>
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


                {checked === false ?
                  <>
                    <p> <Form.Label> {t('lableView.service.price')}</Form.Label> : {dataDeatil && dataDeatil.price !== "" && dataDeatil.unit !== "" && dataDeatil.quantity !== "" ? dataDeatil.price + " /" + dataDeatil.quantity + " " + t("lableView.service.unitValue." + dataDeatil.unit) : "Không có dữ liệu"}</p>
                  </>
                  :
                  <>   <Form.Group as={Col} md="12" className={checked === false ? null : 'mt-2 mb-2'} >
                    <Form.Label> {t('lableView.service.price')}</Form.Label>
                    <Form.Control
                      required
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
                    <Form.Group as={Col} md="12" className={checked === false ? null : 'mt-2 mb-2'}>
                      <Form.Label> {t('lableView.service.quantity')}</Form.Label>
                      <Form.Control
                        required
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
                    <Form.Group as={Col} md="12" className='mb-2 mt-2'>
                      <Form.Label> {t('lableView.service.unit')}</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          value={selectedUnit || ""}
                          onChange={(e) => setUnit(e.target.value)}
                        >
                          {selectedUnit && (
                            <option value={selectedUnit}>
                              {t(`lableView.service.unitValue.${selectedUnit}`)}
                            </option>
                          )}
                          {options.map(unit => (
                            <option key={unit.key} value={unit.key}>
                              {unit.label}
                            </option>
                          ))}
                        </Form.Select>
                    </Form.Group>
                  </>
                }


                <Form.Group as={Col} md="12" className={checked === false ? null : 'mt-2 '}>
                  <p><Form.Label>{t('table.colum.role.created_at')} :</Form.Label> {dataDeatil && dataDeatil.created_at !== null ? convertDateTime(dataDeatil.created_at) : "Không có dữ liệu"}</p>
                </Form.Group>
                <Form.Group as={Col} md="12">
                  <p><Form.Label>{t('table.colum.role.updated_at')} :</Form.Label> {dataDeatil && dataDeatil.updated_at !== null ? convertDateTime(dataDeatil.updated_at) : "Không có dữ liệu"}</p>
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
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
import { updateSetting  ,deleteSetting} from '../../../../service/baseService/cruds';
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
import {setModalUpdate} from "../../../../redux/accction/listTable";
import { useTranslation } from 'react-i18next';
import { chaneFtiler } from "../../../../service/baseService/funService";

function List({ data }) { 
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [dataDeatil, setDataDeatil] = useState(null);
  const [checked, setChecked] = useState(false);
  let filters = useSelector((state) => state.listTable.filters) ;
  let show = useSelector((state) => state.listTable.modalUpdate) ;
  const [validated, setValidated] = useState(false);
  const [id , setId] = useState(0);
    const handleClose = () => {
      dispatch(setModalUpdate(false));
    if (show === true) {
      setDataDeatil("");
      formik.setValues({ key: "" });
      formik.setValues({ note: "" });
      formik.setValues({ value: "" });
    }
  }

  const handleShow = (item) => {
    dispatch(setModalUpdate(true));
    if (show === false) {
      setDataDeatil(item);
      setId(item.id);
      formik.setValues({ key: item.key, value: item.value, note : item.note });

    }
  };

  
  const handleChange = (checked) => {
    setChecked(checked);
  };
  const formik = useFormik({
    initialValues: {
      key: '',
      value: '',
       note: ''
    },
    validationSchema: Yup.object({
        key: Yup.string()
        .min(2, t('validation.attribute.min', { attribute: t('lableView.setting.key'), min: 2 }))
        .max(50, t('validation.attribute.max', { attribute: t('lableView.setting.key'), max: 50 }))
        // .matches(/^[\p{L} ]+$/u, t('validation.attribute.matches', { attribute: t('lableView.setting.key')}))
        .required(t('validation.attribute.required', { attribute: t('lableView.setting.key')})),
    
    value: Yup.string()
        .min(2, t('validation.attribute.min', { attribute: t('lableView.setting.value'), min: 2 }))
        .max(50, t('validation.attribute.max', { attribute: t('lableView.setting.value'), max: 50 }))
        // .matches(/^[\p{L}]+$/u, t('validation.attribute.matches', { attribute: t('lableView.setting.code')}))
        .required(t('validation.attribute.required', { attribute: t('lableView.setting.value')})),
    
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(updateSetting(values, id,resetForm));
    }
  });
 const deleteSettingId = (id) => {
    confirmAlert({
      title:t('action.authentication.delete', { attribute: t('page.setting')}),
      message: t('action.message.delete', { attribute: t('page.setting')}),
      buttons: [
        {
          label: t('actionView.delete'),
          onClick: () => dispatch(deleteSetting(id))
        },
        {
          label: t('actionView.close'),
          onClick: () => {}
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
                {t('lableView.setting.key')}
                <div>
                  <CIcon icon={cilArrowTop} size='sx'
                    onClick={() => dispatch(
                      chaneFtiler(
                        {
                          colum: "key",
                          order_by: "asc"
                        }, filters
                      )
                    )} />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "key",
                        order_by: "desc"
                      }, filters
                    ))}
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col' >
              <div className='flex_start'>
                {t('lableView.setting.value')}
                <div>
                  <CIcon icon={cilArrowTop} size='sx'
                    onClick={() => dispatch(
                      chaneFtiler(
                        {
                          colum: "value",
                          order_by: "asc"
                        },
                        filters
                      )
                    )} />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => dispatch(chaneFtiler(
                      {
                        colum: "value",
                        order_by: "desc"
                      }, filters
                    ))}
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flex_start'>
               {t('lableView.setting.created_at')}
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
               {t('lableView.setting.updated_at')}
                <div>
                  <CIcon icon={cilArrowTop} size='sx'
                   onClick={()=>chaneFtiler(
                    {
                    colum: "updated_at" ,
                    order_by :"asc"
                    }
                    )} />
                  <CIcon icon={cilArrowBottom} size='sx' 
                     onClick={()=>chaneFtiler(
                      {
                      colum: "updated_at" ,
                      order_by :"desc"
                      }
                      )} 
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>{t('table.colum.viewDetail')}</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data && data.map((item, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope='row'>{index + 1}</CTableHeaderCell>
              <CTableDataCell>{item.key}</CTableDataCell>
              <CTableDataCell>{item.value}</CTableDataCell>
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
              <div className='flex_center icon-delete' onClick={()=>deleteSettingId(dataDeatil.id)}>
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} md="12" className= {checked === false ?null : 'mt-2 mb-2' }>
                  {checked === false ?
                    <>
                     <p> <Form.Label> {t('lableView.setting.key')}</Form.Label> : {dataDeatil?.key ?? t('noteDate')}</p>
                    </>
                    :
                    <>
                      <Form.Label> {t('lableView.setting.key')}</Form.Label>
                      <Form.Control
                          required
                          type="text"
                          name="key"
                          value={formik.values.key}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={formik.touched.key && formik.errors.key}
                        />

                    </>
                  }
                 <Form.Control.Feedback type="invalid">
                    {formik.errors.key}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" className= {checked === false ?null : 'mt-2 mb-2' } >
                  {checked === false ?
                    <>
                     <p> <Form.Label> {t('lableView.setting.value')}</Form.Label> : {dataDeatil?.value ?? t('noteDate')}</p>
                    </>
                    :
                    <>
                      <Form.Label> {t('lableView.setting.value')}</Form.Label>
                      <Form.Control
                          required
                          type="text"
                          name="value"
                          value={formik.values.value}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={formik.touched.value && formik.errors.value}
                        />

                    </>
                  }
                 <Form.Control.Feedback type="invalid">
                    {formik.errors.value}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" className= {checked === false ?null : 'mt-2 mb-2' } >
                  {checked === false ?
                    <>
                     <p> <Form.Label> {t('lableView.setting.note')}</Form.Label> : {dataDeatil?.note ?? t('noteDate')}</p>
                    </>
                    :
                    <>
                      <Form.Label> {t('lableView.setting.note')}</Form.Label>
                      <Form.Control
                          required
                          type="text"
                          name="note"
                          value={formik.values.note}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          isInvalid={formik.touched.note && formik.errors.note}
                        />

                    </>
                  }
                 <Form.Control.Feedback type="invalid">
                    {formik.errors.note}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" className= {checked === false ?null : 'mt-2 ' }>
                  <p><Form.Label>{t('table.colum.role.created_at')} :</Form.Label> {dataDeatil && dataDeatil.created_at !== null ? convertDateTime(dataDeatil.created_at) : "Không có dữ liệu"}</p>
                </Form.Group>
                <Form.Group as={Col}   md="12">
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
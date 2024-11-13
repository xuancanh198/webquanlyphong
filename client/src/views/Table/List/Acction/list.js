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
import { updateAcction  ,deleteAcction} from '../../../../service/baseService/cruds';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CIcon from '@coreui/icons-react'; 
import { cilArrowTop, cilArrowBottom } from '@coreui/icons';
import {
  CCardBody,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { DocsExample } from 'src/components'
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
      formik.setValues({ name: "" });
      formik.setValues({ code: "" });
    }
  }
  const handleShow = (item) => {
    
    dispatch(setModalUpdate(true));
    if (show === false) {
      setDataDeatil(item);
      setId(item.id);
      formik.setValues({ name: item.name, code: item.code });

    }
  };

  
  const handleChange = (checked) => {
    setChecked(checked);
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      code: ''
    },
    validationSchema: Yup.object({
        name: Yup.string()
        .min(2, t('validation.attribute.min', { attribute: t('lableView.acction.name'), min: 2 }))
        .max(50, t('validation.attribute.max', { attribute: t('lableView.acction.name'), max: 50 }))
        .matches(/^[\p{L} ]+$/u, t('validation.attribute.matches', { attribute: t('lableView.acction.name')}))
        .required(t('validation.attribute.required', { attribute: t('lableView.acction.name')})),
    
    code: Yup.string()
        .min(2, t('validation.attribute.min', { attribute: t('lableView.acction.code'), min: 2 }))
        .max(50, t('validation.attribute.max', { attribute: t('lableView.acction.code'), max: 50 }))
        .matches(/^[\p{L}]+$/u, t('validation.attribute.matches', { attribute: t('lableView.acction.code')}))
        .required(t('validation.attribute.required', { attribute: t('lableView.acction.code')})),
    
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(updateAcction(id,values,resetForm));
    }
  });
 const deleteAcctionId = (id) => {
    confirmAlert({
      title:t('action.authentication.delete', { attribute: t('page.acction')}),
      message: t('action.message.delete', { attribute: t('page.acction')}),
      buttons: [
        {
          label: t('actionView.delete'),
          onClick: () => dispatch(deleteAcction(id))
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
                {t('lableView.acction.name')}
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
                {t('lableView.acction.code')}
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
               {t('lableView.acction.created_at')}
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
               {t('lableView.acction.updated_at')}
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
              <div className='flex_center icon-delete' onClick={()=>deleteAcctionId(dataDeatil.id)}>
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} md="12" className= {checked === false ?null : 'mt-2 mb-2' }>
                  {checked === false ?
                    <>
                     <p> <Form.Label> {t('lableView.acction.name')}</Form.Label> : {dataDeatil && dataDeatil.name !== "" ? dataDeatil.name : "Không có dữ liệu"}</p>
                    </>
                    :
                    <>
                      <Form.Label> {t('lableView.acction.name')}</Form.Label>
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
                <Form.Group as={Col} md="12" className= {checked === false ?null : 'mt-2 mb-2' } >
                  {checked === false ?
                    <>
                     <p> <Form.Label> {t('lableView.acction.code')}</Form.Label> : {dataDeatil && dataDeatil.code !== "" ? dataDeatil.code : "Không có dữ liệu"}</p>
                    </>
                    :
                    <>
                      <Form.Label> {t('lableView.acction.code')}</Form.Label>
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
                <Form.Group as={Col} md="12" className= {checked === false ?null : 'mt-2 ' }>
                  <p><Form.Label>{t('lableView.acction.created_at')} :</Form.Label> {dataDeatil && dataDeatil.created_at !== null ? convertDateTime(dataDeatil.created_at) : "Không có dữ liệu"}</p>
                </Form.Group>
                <Form.Group as={Col}   md="12">
                  <p><Form.Label>{t('lableView.acction.updated_at')} :</Form.Label> {dataDeatil && dataDeatil.updated_at !== null ? convertDateTime(dataDeatil.updated_at) : "Không có dữ liệu"}</p>
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
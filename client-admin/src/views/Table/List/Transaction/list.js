import React, { useEffect, useState } from 'react';
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
import { updateTransaction, deleteTransaction } from '../../../../service/baseService/cruds';
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
import { setModalUpdate } from "../../../../redux/accction/listTable";
import { useTranslation } from 'react-i18next';
import { chaneFtiler } from "../../../../service/baseService/funService";
import { formatPrice } from '../../../../service/FunService/funweb'
function List({ data }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [dataDeatil, setDataDeatil] = useState(null);
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState(false)
  let filters = useSelector((state) => state.listTable.filters);
  let show = useSelector((state) => state.listTable.modalUpdate);
  const [validated, setValidated] = useState(false);

  const [id, setId] = useState(0);
  const handleClose = () => {
    dispatch(setModalUpdate(false));
    if (show === true) {
      setDataDeatil("");
      formik.setValues({ status: 0 });
    }
  }
  useEffect(()=>{
    formik.setValues({ status: status === true ? 2 : 1 });
  },[status])
  const handleShow = (item) => {

    dispatch(setModalUpdate(true));
    if (show === false) {
      setDataDeatil(item);
      setId(item.id);
      formik.setValues({ status: 1 });
    }
  };


  const handleChange = (checked) => {
    setChecked(checked);
  };
  const formik = useFormik({
    initialValues: {
      status: 1,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(updateTransaction(values, id, resetForm))
    }
  });
  const deleteTransactionId = (id) => {
    confirmAlert({
      title: t('action.authentication.delete', { attribute: t('page.transaction') }),
      message: t('action.message.delete', { attribute: t('page.transaction') }),
      buttons: [
        {
          label: t('actionView.delete'),
          onClick: () => dispatch(deleteTransaction(id))
        },
        {
          label: t('actionView.close'),
          onClick: () => { }
        }
      ]
    });
  };
  const updateStatus = (statusTransaction) => {
    setStatus(statusTransaction);
  }
  return (
    <div className='p-3'>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col'>STT</CTableHeaderCell>
            <CTableHeaderCell scope='col' >
              <div className='flex_start'>
                {t('lableView.room.name')}
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
                {t('lableView.bill.code')}
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
                {t('lableView.transaction.status')}
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
                {t('lableView.bill.totalMoney')}
                <div>
                  <CIcon icon={cilArrowTop} size='sx'
                    onClick={() => chaneFtiler(
                      {
                        colum: "updated_at",
                        order_by: "asc"
                      }
                    )} />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => chaneFtiler(
                      {
                        colum: "updated_at",
                        order_by: "desc"
                      }
                    )}
                  />
                </div>
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flex_start'>
                {t('lableView.transaction.totalMoney')}
                <div>
                  <CIcon icon={cilArrowTop} size='sx'
                    onClick={() => chaneFtiler(
                      {
                        colum: "updated_at",
                        order_by: "asc"
                      }
                    )} />
                  <CIcon icon={cilArrowBottom} size='sx'
                    onClick={() => chaneFtiler(
                      {
                        colum: "updated_at",
                        order_by: "desc"
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
              <CTableDataCell>{item?.bill?.room?.name}</CTableDataCell>
              <CTableDataCell>{item?.bill?.code}</CTableDataCell>
              <CTableDataCell>{item.status === 0
                ? t('lableView.transaction.checkIsNowStatus.notPayed')
                : item.status === 1
                  ? t('lableView.transaction.checkIsNowStatus.payed')
                  : t('lableView.transaction.checkIsNowStatus.canceled')}
              </CTableDataCell>
              <CTableDataCell>{item?.totalMoney && formatPrice(item?.totalMoney)}</CTableDataCell>
              <CTableDataCell>{item?.bill?.totalMoney && formatPrice(item?.bill?.totalMoney)}</CTableDataCell>
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
              <div className='flex_center icon-delete' onClick={() => deleteTransactionId(dataDeatil.id)}>
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <Form noValidate validated={validated} onSubmit={formik.handleSubmit}>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} md="12" className={checked === false ? null : 'mt-4 mb-2'}>
                  {checked === true
                    && 
                    (
                      <>
                      {dataDeatil?.status === 0
                        ?
                       (
                          <div className='flex_center'>
                            <label> {t('lableView.transaction.action.pay')} </label>
                            <Switch className='toggle-modal-deatil' onChange={() => updateStatus(!status)} checked={status} />
                            <label> {t('lableView.transaction.action.cancel')}</label>
                          </div>

                       ) : (
                          // <Form.Select aria-label="Default select example">
                          //   <option>
                              
                          //       { 
                          //       dataDeatil?.status === 0
                          //         ? t('lableView.transaction.checkIsNowStatus.notPayed')
                          //         : dataDeatil?.status === 1
                          //           ? t('lableView.transaction.checkIsNowStatus.payed')
                          //           : t('lableView.transaction.checkIsNowStatus.canceled')
                          //           }
                              
                          //   </option>
                          //   <option value="1">One</option>
                          //   <option value="2">Two</option>
                          //   <option value="3">Three</option>
                          // </Form.Select>
                          <></>
                       )
                      }
                      </>
                    )
                    }
                </Form.Group>
                
                {
                  checked === false &&
                  (
                    <>
                      <Form.Group as={Col} md="12" className={checked === false ? null : 'mt-2 '}>
                        <p><Form.Label>{t('lableView.room.name')} :</Form.Label> {dataDeatil?.bill?.room?.name ?? t('noData')}</p>
                      </Form.Group>
                      <Form.Group as={Col} md="12">
                        <p><Form.Label>{t('lableView.bill.code')} :</Form.Label> {dataDeatil?.bill?.code ?? t('noData')}</p>
                      </Form.Group>
                      <Form.Group as={Col} md="12" className={checked === false ? null : 'mt-2 '}>
                        <p><Form.Label>{t('lableView.transaction.status')} :</Form.Label> {dataDeatil?.status === 0
                          ? t('lableView.transaction.checkIsNowStatus.notPayed')
                          : dataDeatil?.status === 1
                            ? t('lableView.transaction.checkIsNowStatus.payed')
                            : t('lableView.transaction.checkIsNowStatus.canceled')}
                        </p>
                      </Form.Group>
                     
                      <Form.Group as={Col} md="12">
                        <p><Form.Label>{t('lableView.bill.totalMoney')} :</Form.Label> {dataDeatil?.totalMoney ? formatPrice(dataDeatil?.bill?.totalMoney) : t('noData')}</p>
                      </Form.Group>
                      <Form.Group as={Col} md="12">
                        <p><Form.Label>{t('lableView.transaction.totalMoney')} :</Form.Label> {dataDeatil?.totalMoney ? formatPrice(dataDeatil?.totalMoney) : t('noData')}</p>
                      </Form.Group>
                      <Form.Group as={Col} md="12" className={checked === false ? null : 'mt-2 '}>
                        <p><Form.Label>{t('lableView.transaction.created_at')} :</Form.Label> {dataDeatil && dataDeatil.created_at !== null ? convertDateTime(dataDeatil.created_at) : t('noData')}</p>
                      </Form.Group>
                      <Form.Group as={Col} md="12">
                        <p><Form.Label>{t('lableView.transaction.updated_at')} :</Form.Label> {dataDeatil && dataDeatil.updated_at !== null ? convertDateTime(dataDeatil.updated_at) : t('noData')}</p>
                      </Form.Group>
                    </>
                  ) 
                }
              
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
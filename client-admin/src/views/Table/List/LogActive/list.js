import React, { useState } from 'react';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { convertDateTime } from '../../../../service/FunService/funweb';
import { deleteActiveLog } from '../../../../service/baseService/cruds';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CIcon from '@coreui/icons-react'; 
import { cilArrowTop, cilArrowBottom } from '@coreui/icons';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import {setModalUpdate} from "../../../../redux/accction/listTable";
import { useTranslation } from 'react-i18next';
import { chaneFtiler } from "../../../../service/baseService/funService";

function List({ data }) { 
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [dataDeatil, setDataDeatil] = useState(null);
  let filters = useSelector((state) => state.listTable.filters) ;
  let show = useSelector((state) => state.listTable.modalUpdate) ;
  const [id , setId] = useState(0);
    const handleClose = () => {
      dispatch(setModalUpdate(false));
    if (show === true) {
      setDataDeatil("");
    }
  }
  const handleShow = (item) => {
    dispatch(setModalUpdate(true));
    if (show === false) {
      setDataDeatil(item);
      setId(item.id);
    }
  };
 const deleteAcctionId = (id) => {
    confirmAlert({
      title: t('action.authentication.delete', { attribute: t('page.activeLog')}),
      message: t('action.message.delete', { attribute: t('page.activeLog')}),
      buttons: [
        {
          label: t('actionView.delete'),
          onClick: () => dispatch(deleteActiveLog(id))
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
                {t('lableView.activeLog.log_name')}
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
                {t('lableView.activeLog.event')}
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
            <CTableHeaderCell scope='col' >
              <div className='flex_start'>
                {t('lableView.activeLog.subject_type')}
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
            <CTableHeaderCell scope='col'>{t('table.colum.viewDetail')}</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data && data.map((item, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope='row'>{index + 1}</CTableHeaderCell>
              <CTableDataCell>{t(`lableView.activeLog.log_type.${item.log_name}`)}</CTableDataCell>
              <CTableDataCell>{t(`actionView.${item.event}`)}</CTableDataCell>
              <CTableDataCell>{t(`page.${item.subject_type}`)}</CTableDataCell>
              <CTableDataCell>{item.created_at ? convertDateTime(item.created_at) : ''}</CTableDataCell>
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
              {t('actionView.detail')}

            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='flex_between'>
              <div className='flex_center icon-delete' onClick={()=>deleteAcctionId(dataDeatil.id)}>
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
              <Row className="mb-3 mt-3">
                <Form.Group as={Col} md="12" className= {'mt-2 mb-2' }>
                <p> <Form.Label> {t('lableView.activeLog.log_name')}</Form.Label> : {dataDeatil?.log_name ? t(`lableView.activeLog.log_type.${dataDeatil.log_name}`) : t('noData')}</p>
                </Form.Group>
                <Form.Group as={Col} md="12" className= { 'mt-2 mb-2' } >
                <p> <Form.Label> {t('lableView.activeLog.event')}</Form.Label> : {dataDeatil?.event ? t(`actionView.${dataDeatil.event}`) : t('noData')}</p>
                </Form.Group>
              <Form.Group as={Col} md="12" className={'mt-2 mb-2'} >
                <p> <Form.Label> {t('lableView.activeLog.description')}</Form.Label> : {dataDeatil?.description ? t(`actionView.${dataDeatil.description}`) : t('noData')}</p>
              </Form.Group>
              <Form.Group as={Col} md="12" className={'mt-2 mb-2'} >
                <p> <Form.Label> {t('lableView.activeLog.subject_type')}</Form.Label> : {dataDeatil?.subject_type ? t(`page.${dataDeatil.subject_type }`): t('noData')}</p>
              </Form.Group>
                <Form.Group as={Col} md="12" className= {'mt-2 ' }>
                  <p><Form.Label>{t('lableView.acction.created_at')} :</Form.Label> {dataDeatil && dataDeatil.created_at !== null ? convertDateTime(dataDeatil.created_at) : "Không có dữ liệu"}</p>
                </Form.Group>
              </Row>
          </Modal.Body>

        </Modal>
      </CTable>
    </div>
  );
}

export default List;
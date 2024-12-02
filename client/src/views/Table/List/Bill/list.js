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
import { stripHtmlTags, formatPrice, convertDateTimeFull } from '../../../../service/FunService/funweb';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CIcon from '@coreui/icons-react';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { useTranslation } from 'react-i18next';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImageUploading from 'react-images-uploading';
import { cilUser, cilX, cilNotes } from '@coreui/icons';
import { setFilter, setModalUpdate } from "../../../../redux/accction/listTable";
import {updateBill, deleteContract, downloadFileContract, getListBill } from "../../../../service/baseService/cruds";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
import { Icons, toast } from 'react-toastify';
function List({ data }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const show = useSelector((state) => state.listTable.modalUpdate);
  const [dataDeatil, setDataDeatil] = useState(null);
  const [statusToggle, setStatusToggle] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [quantityService, setQuantityService] = useState([]);
  const [note, setNote] = useState('')
  const [id, setId] = useState(0);
  const [initialValues, setInitialValues] = useState({
    priceTime: '',
    deposit: "",
    code: "",
    startTime: "",
    endTime: "",
    roomId: "",
    userId: "",
    note: note,
    image: null,
    customers: [],
    service: [],
    furniture: []
  });

  let filters = useSelector((state) => state.listTable.filters);

  useEffect(() => {
    
    formik.setFieldValue('startTime', convertDateTimeFull(startTime));
  }, [startTime]);
  useEffect(() => {
    formik.setFieldValue('endTime', convertDateTimeFull(endTime));
  }, [endTime])

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({

    }),
    onSubmit: (values, { resetForm }) => {
     dispatch( updateBill(values,id, resetForm));
    }
  });

  const handleClose = () => {
    dispatch(setModalUpdate(false));
    if (show === true) {
      setDataDeatil("");

    }
  }
  useEffect(() => {
    if (dataDeatil && dataDeatil !== null) {
      setInitialValues({
        totalMoney: dataDeatil.totalMoney,
        status: dataDeatil.status,
        code: dataDeatil.code,
        startTime: dataDeatil.startTime,
        endTime: dataDeatil.endTime,
        note: dataDeatil.deposit || null,
        image: dataDeatil.img,
      });
      setId(dataDeatil.id);
      setStartTime(new Date(dataDeatil.started_at));
      setEndTime(new Date(dataDeatil.ends_at));
      setQuantityService(
        dataDeatil.detail?.map(serviceItem => ({
          serviceId: serviceItem?.service?.id,
          id: serviceItem?.id,
          quantity: serviceItem?.quantity
        }))
        
      );
    }

  }, [dataDeatil]);
  const handleShow = (item) => {
    dispatch(setModalUpdate(true));
    setDataDeatil(item);
    setId(item.id);
  };
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };
  const getValueService =(id)=>{  
    const serviceItem = quantityService?.length > 0 && quantityService.find(item => Number(item.id) === Number(id));
    return serviceItem ? serviceItem.quantity : 1;

  }
  const deleteContractId = (id) => {
    confirmAlert({
      title: t('action.authentication.delete', { attribute: t('page.contract') }),
      message: t('action.message.delete', { attribute: t('page.contract') }),
      buttons: [
        {
          label: 'Xóa',
          onClick: () => dispatch(deleteContract(id))
        },
        {
          label: 'Hủy',
          onClick: () => { }
        }
      ]
    });
  };


  const chaneFtiler = (data) => {
    if (!Array.isArray(filters)) {
      filters = [];
    }

    let found = false;
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].colum === data.colum) {
        found = true;
        if (filters[i].order_by !== data.order_by) {
          filters[i].order_by = data.order_by;
        }
        break;
      }
    }
    if (!found) {
      filters.push(data);
    }
    dispatch(setFilter(btoa(JSON.stringify(filters))));
  }
  return (
    <div className='p-3'>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col'>STT</CTableHeaderCell>
            <CTableHeaderCell scope='col' >
              <div className='flex_start'>
                {t('lableView.contract.code')}
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flexcontract_start'>
                {t('lableView.contract.userepresentative')}
              </div>
            </CTableHeaderCell>
            <CTableHeaderCell scope='col'>
              <div className='flex_start'>
                {t('lableView.contract.room')}
              </div>
            </CTableHeaderCell>

            <CTableHeaderCell scope='col'>{t('table.colum.viewDetail')}</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data && data.map((item, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope='row'>{index + 1}</CTableHeaderCell>
              <CTableDataCell>{item?.code}</CTableDataCell>
              <CTableDataCell>{item?.user?.fullname}</CTableDataCell>
              <CTableDataCell>{item?.room?.name}</CTableDataCell>
              <CTableDataCell>
                <Button variant='primary' onClick={() => handleShow(item)}>
                  {t('table.colum.viewDetail')}
                </Button>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>

        <Modal show={show} onHide={handleClose} className='actice-1200 flex_center'>
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
              <div className='d-flex'>
                <div className='flex_center icon-delete' onClick={() => deleteContractId(dataDeatil.id)}>
                  <i class="fa-solid fa-trash"></i>
                </div>
                <div className='flex_center icon-delete ms-3' onClick={() => dispatch(downloadFileContract(dataDeatil.id))}>
                  <CIcon className='' icon={cilNotes} size="l" />
                </div>
              </div>
            </div>
            {dataDeatil !== null
              &&
              (<Form noValidate onSubmit={formik.handleSubmit}>
                <Modal.Body>
                  <Row className="mb-3 mt-3">
                    <Form.Group as={Col} xl="3" lg="6" md="6" sm="12" className='mb-3 mt-3'>
                                <div className='img-form-div'>
                                  <img src={dataDeatil.img} className='img-form' />
                                </div>
                    </Form.Group>
                    <Form.Group as={Col} xl="9" lg="6" md="6" sm="12" className='mb-3 mt-3 row'>
                      <Form.Group as={Col} xl= {checked === false  ?"4" : "12" } lg={checked === false  ?"4" : "12" } md="12" sm="12" className='mb-3 mt-3 '>
                        {checked === false ?
                          (
                            <p> <span className='lable-form'>{t('lableView.bill.code')}</span>  : {dataDeatil.code !== null ? dataDeatil.code : t('noData')} </p>
                          ) : (
                            <>
                              <div className=' css-animation'>
                                <div className='font-icon flex_center'>
                                  <CIcon className='' icon={cilUser} size="l" />
                                </div>
                                <Form.Control
                                  type="text"
                                  name="code"
                                  value={formik.values.code}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  isInvalid={formik.touched.code && formik.errors.code}
                                  required
                                />
                                <Form.Label> {t('lableView.contract.code')}</Form.Label>
                                <Form.Control.Feedback type="invalid">
                                  {formik.errors.code}
                                </Form.Control.Feedback>
                              </div>
                            </>
                          )}
                      </Form.Group>
                      <Form.Group as={Col} xl= {checked === false  ?"4" : "6" } lg={checked === false  ?"4" : "6" } md="12" sm="12" className='mb-3 mt-3'>
                        {checked === false ?
                          (
                            <p> <span className='lable-form'>{t('lableView.bill.start_at')}</span>  : {dataDeatil.start_at !== null ? convertDateTimeFull(dataDeatil.start_at) : t('noData')} </p>
                          ) : (
                            <>
                              <label className='mb-2 font-weight'> {t('lableView.bill.start_at')} : </label>
                              <DatePicker selected={startTime} onChange={(date) => setStartTime(date)} />
                            </>
                          )}
                      </Form.Group>
                      <Form.Group as={Col} xl= {checked === false  ?"4" : "6" } lg={checked === false  ?"4" : "6" } md="12" sm="12" className='mb-3 mt-3'>
                        {checked === false ?
                          (
                            <p> <span className='lable-form'>{t('lableView.bill.end_at')}</span>  : {dataDeatil.end_at !== null ? convertDateTimeFull(dataDeatil.end_at) : t('noData')} </p>
                          ) : (
                            <>
                              <label className='mb-2 font-weight'> {t('lableView.bill.end_at')} : </label>
                              <DatePicker selected={endTime} onChange={(date) => setEndTime(date)} />
                            </>
                          )}
                      </Form.Group>

                      {checked === false &&
                        (
                          <>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.bill.user')}</span>  :
                                {dataDeatil?.user?.fullname ?? t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.bill.staff')}</span>  :
                                {dataDeatil?.staff?.fullname ?? t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.bill.status')}</span>  :
                                {dataDeatil?.pay_at ? t('lableView.bill.checkIsNowStatus.has') : t('lableView.bill.checkIsNowStatus.hasnot')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.bill.status')}</span>  :
                                {dataDeatil?.formPayment ? dataDeatil?.formPayment : t('noData')} </p>
                            </Form.Group>

                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.bill.totalMoney')}</span>  :
                                {(dataDeatil?.totalMoney && formatPrice(dataDeatil?.totalMoney)) ?? t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.bill.created_at')}</span>  :
                                {(dataDeatil?.created_at && convertDateTimeFull(dataDeatil?.created_at)) ?? t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.bill.updated_at')}</span>  :
                                {(dataDeatil?.updated_at && convertDateTimeFull(dataDeatil?.updated_at)) ?? t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.bill.pay_at')}</span>  :
                                {(dataDeatil?.pay_at && convertDateTimeFull(dataDeatil?.pay_at)) ?? t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.building.name')}</span>  :
                                {dataDeatil?.room?.building?.name !== null ? dataDeatil?.room?.building?.name : t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.room.name')}</span>  :
                                {dataDeatil?.room?.name ?? t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.room.code')}</span>  :
                                {dataDeatil?.room?.floor?.code ?? t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.floor.name')}</span>  :
                                {dataDeatil?.room?.floor?.name !== null ? dataDeatil?.room?.floor?.name : t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.floor.code')}</span>  :
                                {dataDeatil?.room?.floor?.code !== null ? dataDeatil?.room?.floor?.code : t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.building.name')}</span>  :
                                {dataDeatil?.room?.building.name ?? t('noData')} </p>
                            </Form.Group>
                            <Form.Group as={Col} xl="4" lg="6" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.building.code')}</span>  :
                                {dataDeatil?.room?.building.code ?? t('noData')} </p>
                            </Form.Group>

                            <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-3 mt-3 '>
                              <p> <span className='lable-form'>{t('lableView.building.address')}</span>  :
                                {dataDeatil?.room?.building?.address !== null ? dataDeatil?.room?.building.address : t('noData')} </p>
                            </Form.Group>
                          </>
                        )}

                      <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-2 mt-2'>
                        <Form.Label className='font-weight'> {t('lableView.contract.serivce')} : </Form.Label>
                        {checked === false ?

                          (

                            <div className=' row mt-4'>
                              {dataDeatil?.detail?.length > 0 && dataDeatil?.detail?.map((item, index) => {
                                return (
                                  <div key={index} className='col-xl-4 col-lg-6 col-md-12 col-sm-12 d-flex align-items-stretch'>
                                    <div className='item-user pt-3 pb-3 ps-4 pe-4 m-2 w-100'>
                                      <Link>
                                        {t('lableView.service.name') + " : " + item?.service?.name}
                                      </Link>
                                      <p>
                                       {t('lableView.bill.intoMoney') + " : " }  { item?.price && item?.quantity && formatPrice(item?.price * item?.quantity)}
                                      </p>
                                      <p>
                                        {t('lableView.service.price') + " : " + formatPrice(item?.price) + " / " + t("lableView.service.unitValue." + item.service.unit)} <br />
                                        {t('quantity') + " : " + item?.quantity}
                                      </p><br />

                                    </div>
                                  </div>
                                )
                              })}
                            </div>

                          )
                          :
                          (
                            <>
                              <div className="d-flex flex-wrap gap-3">
                              <table className="mb-3 mt-3">
                            {dataDeatil?.detail?.map((item, index) => {
                                return (
                                    <tr>
                                        <td>
                                            <Form.Label className="m-0 p-0 flex-shrink-0">{item?.service?.name} :</Form.Label>
                                        </td>
                                        <td className='py-2'>
                                            <input
                                                type="number"
                                                //  onChange={(e) => addQuantityService(e.target.value, item)}
                                                className="px-2 py-1 text-input-quantity flex-grow-1"
                                                style={{ minWidth: "80px" }}
                                                value={getValueService(item?.id)}
                                            />
                                        </td>
                                        <td className='ps-2'>
                                            <p className="m-0 p-0 flex-shrink-0">
                                                {(item?.service?.price && formatPrice(item?.service?.price)) + " / " + item?.quantity + " " + t(`lableView.service.unitValue.${item?.service?.unit}`)}
                                            </p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                              </div>
                            </>
                          )}
                      </Form.Group>
                      <Form.Group as={Col} xl="12" sm="12" className='mb-3 mt-3'>
                        {
                          checked === false ? (
                            <p>
                              <span className='label-form'>{t('lableView.contract.note')}</span> :
                              {dataDeatil.note !== null ? stripHtmlTags(dataDeatil.note) : t('noData')}
                            </p>
                          ) : (
                            <>
                              <Form.Label className='font-weight'>{t('lableView.contract.note')}</Form.Label>
                              <CKEditor
                                name="note"
                                editor={ClassicEditor}
                                data={note}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  setNote(data);
                                  formik.setFieldValue('note', data);
                                }}
                                config={{
                                  toolbar: [
                                    'heading', '|', 'bold', 'italic', 'link',
                                    'bulletedList', 'numberedList', 'blockQuote'
                                  ],
                                  ckfinder: {
                                    uploadUrl: '/path/to/your/upload/url',
                                  },
                                }}
                              />
                            </>
                          )
                        }

                      </Form.Group>
                    </Form.Group>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
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
                </Modal.Footer>
              </Form>)
            }

          </Modal.Body>

        </Modal>
      </CTable>
    </div>
  );
}

export default List;

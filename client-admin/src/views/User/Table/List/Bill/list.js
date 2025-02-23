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
import { stripHtmlTags, formatPrice, convertDateTimeFull } from '../../../../../service/FunService/funweb';
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
import { setFilter, setModalUpdate } from "../../../../../redux/accction/listTable";
import { updateBill, deleteBill, downloadFileContract, getAllUser, getAllRoom, getAllStaff, getAllBuilding } from "../../../../../service/baseService/cruds";
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
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [quantityService, setQuantityService] = useState([]);
  const [note, setNote] = useState('')
  const [id, setId] = useState(0);
  useEffect(() => {
    dispatch(getAllUser(true, true));
    dispatch(getAllRoom(true, true));
    dispatch(getAllStaff(true, true));
    dispatch(getAllBuilding(true, true));
  }, [])
  const [initialValues, setInitialValues] = useState({
    priceTime: '',
    deposit: "",
    code: "",
    startTime: "",
    endTime: "",
    roomId: "",
    userId: "",
    note: note,
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
      dispatch(updateBill(values, id, resetForm));
    }
  });

  const handleClose = () => {
    dispatch(setModalUpdate(false));
    if (show === true) {
      setDataDeatil("");

    }
  }
  useEffect(() => {
    if (quantityService) {
      formik.setFieldValue('totalMoney', quantityService.reduce((total, item) => {
        return total + (item.quantity * item.price);
      }, 0));
      formik.setFieldValue('servicesBill', quantityService);
    }
  }, [quantityService])
  useEffect(() => {
    if (dataDeatil && dataDeatil !== null) {
      setInitialValues({
        totalMoney: dataDeatil.totalMoney,
        startTime: convertDateTimeFull(dataDeatil.startTime),
        endTime: convertDateTimeFull(dataDeatil.endTime),
        note: dataDeatil.deposit || null,
        image: dataDeatil.img,
        servicesBill: dataDeatil.detail?.map(serviceItem => ({
          serviceId: serviceItem?.service?.id,
          id: serviceItem?.id,
          quantity: serviceItem?.quantity
        }))
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
  const getValueService = (id) => {
    const serviceItem = quantityService?.length > 0 && quantityService.find(item => Number(item.id) === Number(id));
    return serviceItem ? serviceItem.quantity : 1;

  }
  const deleteBillId = (id) => {
    confirmAlert({
      title: t('action.authentication.delete', { attribute: t('page.bill') }),
      message: t('action.message.delete', { attribute: t('page.bill') }),
      buttons: [
        {
          label: 'Xóa',
          onClick: () => dispatch(deleteBill(id))
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
  const addQuantityService = (value, item) => {
    const newObject = {
      serviceId: item?.service?.id,
      quantity: Number(value),
      price: item?.service?.price,
    };

    setQuantityService((prevServicesBill) => {
      const updatedPrevServices = prevServicesBill || [];
      const exists = updatedPrevServices.some(
        (service) => Number(service.serviceId) === Number(newObject.serviceId)
      );

      if (exists) {
        return updatedPrevServices.map((service) =>
          Number(service.serviceId) === Number(newObject.serviceId)
            ? { ...service, quantity: Number(value) }
            : service
        );
      }
      return [...updatedPrevServices, newObject];
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
              {t('actionView.detail')}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='flex_between'>
              <div className='d-flex'>
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


                      <Form.Group as={Col} xl="4" lg="4" md="12" sm="12" className='mb-3 mt-3 '>
                        <p> <span className='lable-form'>{t('lableView.bill.code')}</span>  : {dataDeatil.code !== null ? dataDeatil.code : t('noData')} </p>
                      </Form.Group>

                      <Form.Group as={Col} xl={checked === false ? "4" : "6"} lg={checked === false ? "4" : "6"} md="12" sm="12" className='mb-3 mt-3'>
                        <p> <span className='lable-form'>{t('lableView.bill.start_at')}</span>  : {dataDeatil.start_at !== null ? convertDateTimeFull(dataDeatil.start_at) : t('noData')} </p>

                      </Form.Group>
                      <Form.Group as={Col} xl={checked === false ? "4" : "6"} lg={checked === false ? "4" : "6"} md="12" sm="12" className='mb-3 mt-3'>

                        <p> <span className='lable-form'>{t('lableView.bill.end_at')}</span>  : {dataDeatil.end_at !== null ? convertDateTimeFull(dataDeatil.end_at) : t('noData')} </p>

                      </Form.Group>


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


                      <Form.Group as={Col} xl="12" lg="12" md="12" sm="12" className='mb-2 mt-2'>
                        <Form.Label className='font-weight'> {t('lableView.contract.serivce')} : </Form.Label>

                        <div className=' row mt-4'>
                          {dataDeatil?.detail?.length > 0 && dataDeatil?.detail?.map((item, index) => {
                            return (
                              <div key={index} className='col-xl-4 col-lg-6 col-md-12 col-sm-12 d-flex align-items-stretch'>
                                <div className='item-user pt-3 pb-3 ps-4 pe-4 m-2 w-100'>
                                  <Link>
                                    {t('lableView.service.name') + " : " + item?.service?.name}
                                  </Link>
                                  <p>
                                    {t('lableView.bill.intoMoney') + " : "}  {item?.price && item?.quantity && formatPrice(item?.price * item?.quantity)}
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



                      </Form.Group>
                      <Form.Group as={Col} xl="12" sm="12" className='mb-3 mt-3'>

                        <p>
                          <span className='label-form'>{t('lableView.contract.note')}</span> :
                          {dataDeatil.note !== null ? stripHtmlTags(dataDeatil.note) : t('noData')}
                        </p>


                      </Form.Group>
                    </Form.Group>
                  </Row>
                </Modal.Body>
              </Form>)
            }

          </Modal.Body>

        </Modal>
      </CTable>
    </div>
  );
}

export default List;

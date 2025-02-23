import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CCard,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

// import UserList from "./List/User/list";
// import ServiceList from "./List/Service/list";
import BillList from "./List/Bill/list";
// import ContractList from "./List/Contract/list";

// import RoomFilter from "./Filter/Room"
// import UserFilter from "./Filter/User"
// import BillFilter from "./Filter/Bill"
import {
  getMyBill,
} from "../../../service/baseService/authService";
import { useSelector, useDispatch } from 'react-redux';
import { setTypeFilter, setpage, setLimit, setFilterStatus, setStartFilter, setEndFilter, setSearchVluae, setSeachStatus, setEcelDowload, setFilter } from "../../../redux/accction/listTable";
import { convertDateTime } from "../../../service/FunService/funweb";
import ReactPaginate from 'react-paginate';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import debounce from 'lodash.debounce';
import { useTranslation } from 'react-i18next';
const Tables = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const [titel, SetTitel] = useState('');
  const searchParams = new URLSearchParams(location.search);
  const listTabledata = useSelector(state => state.listTable.listData);
  const page = useSelector((state) => state.listTable.page);
  const limit = useSelector((state) => state.listTable.limit);
  const total = useSelector((state) => state.listTable.total);
  const [arrayTimeFilter, setArrayTimeFilter] = useState([])
  const roleParam = searchParams.get('query');
  const filterStartTime = useSelector((state) => state.listTable.filterStartTime);
  const filterEndTime = useSelector((state) => state.listTable.filterEndTime);
  const filterStatus = useSelector((state) => state.listTable.filterStatus);
  const searchStatus = useSelector((state) => state.listTable.searchStatus);
  const searchValue = useSelector((state) => state.listTable.searchValue);
  const typeFilterTime = useSelector((state) => state.listTable.typeFilterTime);
  const exportExcel = useSelector((state) => state.listTable.exportExcel);
  const filtersbase64 = useSelector((state) => state.listTable.filters);
  const filterBaseDecode = useSelector((state) => state.listTable.filterBaseDecode);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleFilterTime, setToggleFilterTime] = useState(false);
  const [filter, setFilterTime] = useState(null);
  let searchOb = {
    value: searchValue,
    statusToggle: searchStatus
  }
  useEffect(() => {
    if (filterStatus === true) {
      setFilterTime({
        statusToggle: filterStatus,
        start: convertDateTime(filterStartTime),
        end: convertDateTime(filterEndTime),
        typeTime: typeFilterTime
      })
    }
  }, [filterStatus, filterStartTime, filterEndTime, typeFilterTime]);

  useEffect(() => {
    getQueryUrl();
    if (filterStartTime !== null && filterEndTime !== null && filterStartTime < filterEndTime) {
      dispatch(setFilterStatus(true));
    }
  }, [roleParam, page, limit, filterStatus, filterEndTime, filterStartTime, filter, searchValue, exportExcel, filtersbase64, filterBaseDecode])
  const created_at_time = {
    type_time: "created_at",
    text: t('timeType.created_at')
  }
  const updated_at_time = {
    type_time: "updated_at",
    text: t('timeType.updated_at')
  }
  const start_at_time = {
    type_time: "start_at",
    text: t('timeType.start_at')
  }
  const end_at_time = {
    type_time: "end_at",
    text: t('timeType.end_at')
  }
  const start_at_timeContract = {
    type_time: "startTime",
    text: t('timeType.start_at')
  }
  const end_at_timeContract = {
    type_time: "endTime",
    text: t('timeType.end_at')
  }
  const pay_at_time = {
    type_time: "pay_at",
    text: t('timeType.pay_at')
  }
  const ban_at_time = {
    type_time: "ban_at",
    text: t('timeType.ban_at')
  }
  const ban_expiration_at_time = {
    type_time: "ban_expiration_at",
    text: t('timeType.ban_expiration_at')
  }
  const verify_email_at_time = {
    type_time: "verify_email_at",
    text: t('timeType.verify_email_at')
  }

  const dateOfBirth_time = {
    type_time: "dateOfBirth",
    text: t('timeType.dateOfBirth')
  }
  const dateIssuanceCard_time = {
    type_time: "dateIssuanceCard",
    text: t('timeType.dateIssuanceCard')
  }
  const getQueryUrl = () => {
    if (roleParam) {
      switch (roleParam) {    
        // case 'service':
        //   setArrayTimeFilter([
        //     created_at_time, updated_at_time
        //   ])
        //   SetTitel(t('page.service'));
        //   dispatch(getListService(t('page.service'), page, limit, searchOb, filter, exportExcel, filtersbase64, filterBaseDecode));
        //   break;
        // case 'furniture':
        //   setArrayTimeFilter([
        //     created_at_time, updated_at_time
        //   ])
        //   SetTitel(t('page.furniture'));
        //   dispatch(getListFurniture(t('page.furniture'), page, limit, searchOb, filter, exportExcel, filtersbase64, filterBaseDecode));
        //   break;
        // case 'room':
        //   setArrayTimeFilter([
        //     created_at_time, updated_at_time
        //   ])
        //   SetTitel(t('page.room'));
        //   dispatch(getListRoom(t('page.room'), page, limit, searchOb, filter, exportExcel, filtersbase64, filterBaseDecode));
        //   break;
        // case 'user':
        //   setArrayTimeFilter([
        //     created_at_time, updated_at_time, dateOfBirth_time, dateIssuanceCard_time
        //   ])
        //   SetTitel(t('page.user'));
        //   dispatch(getListUser(t('page.user'), page, limit, searchOb, filter, exportExcel, filtersbase64, filterBaseDecode));
        //   break;
        // case 'contract':
        //   setArrayTimeFilter([
        //     created_at_time, updated_at_time, start_at_timeContract, end_at_timeContract
        //   ])
        //   SetTitel(t('page.contract'));
        //   dispatch(getListContract(t('page.contract'), page, limit, searchOb, filter, exportExcel, filtersbase64, filterBaseDecode));
        //   break;
        case 'bill':
          setArrayTimeFilter([
            created_at_time, updated_at_time, start_at_time, end_at_time, pay_at_time
          ])
          SetTitel(t('page.bill'));
          dispatch(getMyBill(t('page.bill'), page, limit, searchOb, filter, exportExcel, filtersbase64, filterBaseDecode));
          break;
        default:
          SetTitel('Tiêu đề mặc định');
          break;
      }
    }
  }
  const debouncedSearch = debounce((query) => {
    dispatch(setSearchVluae(query))
    if (searchStatus === false) {
      dispatch(setSeachStatus(true));
    }
  }, 1000);

  const handleInputChange = (event) => {
    const { value } = event.target;
    debouncedSearch(value);
  };
  const returnData = () => {
    dispatch(setpage(1));
    dispatch(setLimit(10));
    dispatch(setFilterStatus(false));
    dispatch(setStartFilter(new Date()));
    dispatch(setEndFilter(new Date()));
    dispatch(setSearchVluae(null));
    dispatch(setSeachStatus(false));
    dispatch(setFilter(null))
  }
  const exproctExcelData = () => {
    if (exportExcel === false) {
      dispatch(setEcelDowload(true))
    }
  }
  const typeFilterFun = (e) => {
    dispatch(setTypeFilter(e.target.value));
    setfilterStatusTrueFun();
  }
  const endFilterFun = (date) => {
    dispatch(setStartFilter(date))
    setfilterStatusTrueFun();
  }
  const startFilterFun = (date) => {
    dispatch(setEndFilter(date))
    setfilterStatusTrueFun();
  }
  const setfilterStatusTrueFun = () => {
    if (filterStatus === false) {
      dispatch(setFilterStatus(true));
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 row">
          <CCardHeader>
            <small>{t('messageView.manage')}</small>  <strong>{titel}</strong>
          </CCardHeader>
          <div className='row'>
            <div className='p-3 col-xl-6 col-lg-6 col-md-12 col-sm-12 flex_start'>
              <div className='modal-button flex_center' onClick={() => setToggleSearch(!toggleSearch)}>
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <div className='modal-button flex_center' onClick={() => setToggleFilterTime(!toggleFilterTime)}>
                <i class="fa-solid fa-filter"></i>
              </div>
              <div className='modal-button flex_center' onClick={returnData}>
                <i class="fa-solid fa-rotate-left"></i>
              </div>
              <div className='modal-button flex_center' onClick={exproctExcelData} >
                <i class="fa-solid fa-file-excel"></i>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 pt-3 pb-3 flex_end'>
              <CFormSelect aria-label="Default select example" className='with-div-180' onChange={(e) => dispatch(setLimit(e.target.value))}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </CFormSelect>
            </div>
          </div>
          <div className='row'>
            {
              toggleSearch === true
              &&
              (
                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 p-2'>
                  <CInputGroup className="mb-3">
                    <CInputGroupText id="basic-addon1"><i class="fa-solid fa-magnifying-glass"></i></CInputGroupText>
                    <CFormInput
                      placeholder={t('messageView.search')}
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                </div>
              )
            }
            {toggleFilterTime
              &&
              (
                <div className='col-12 row'>
                  <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 p-2'>
                    <label className='mb-2'> {t('messageView.selectTypeFilter')} : </label>
                    <CFormSelect
                      aria-label="Default select example"
                      onChange={(e) => typeFilterFun(e)}
                      className="onChange-time-filter"
                    >
                      {arrayTimeFilter?.map((item, index) => (
                        <option key={index} value={item?.type_time}>
                          {item?.text}
                        </option>
                      ))}
                    </CFormSelect>

                  </div>
                  <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 p-2'>
                    <label className='mb-2'> {t('messageView.startTimeFilter')} : </label>
                    <DatePicker selected={filterStartTime} onChange={(date) => endFilterFun(date)} />
                  </div>
                  <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 p-2'>
                    <label className='mb-2'> {t('messageView.endTimeFilter')} : </label>
                    <DatePicker selected={filterEndTime} onChange={(date) => startFilterFun(date)} />
                  </div>
                  {/* {(() => {
                    switch (roleParam) {
                      case 'room':
                        return <RoomFilter />;
                      case 'user':
                        return <UserFilter />;
                      case  "contract" : 
                        return <ContractFilter/>
                      case "bill":
                        return <BillFilter />
                      default:
                        return null;
                    }
                  })()} */}
                </div>
              )
            }
          </div>


          {(() => {
            switch (roleParam) {
           
              // case 'service':
              //   return <ServiceList data={listTabledata} />;
              // case 'furniture':
              //   return <FurnitureList data={listTabledata} />;
              // case 'room':
              //   return <RoomList data={listTabledata} />;
              // case 'user':
              //   return <UserList data={listTabledata} />;
              // case 'contract':
              //   return <ContractList data={listTabledata} />;
              case 'bill':
                return <BillList data={listTabledata} />;
              default:
                return null;
            }
          })()}
          <div className='flex_center w-100'>
            {Math.ceil(total / limit) > 1 ?
              <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={(event) => dispatch(setpage(event.selected + 1))}
                pageRangeDisplayed={2}
                pageCount={Math.ceil(total / limit)}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                containerClassName="paginate-container flex_center"
                pageClassName="paginate-page mx-2 my-2  flex_center"
                pageLinkClassName="paginate-page-link"
                previousClassName="paginate-previous flex_center"
                previousLinkClassName="paginate-previous-link "
                nextClassName="paginate-next flex_center"
                nextLinkClassName="paginate-next-link"
                breakClassName="paginate-break"
                breakLinkClassName="paginate-break-link"
                activeClassName="paginate-active"
              />
              : ""
            }

          </div>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables

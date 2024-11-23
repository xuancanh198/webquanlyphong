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
import RoleList from "./List/Role/list";
import TypeRoomList from "./List/TypeRoom/list";
import FurnitureList from "./List/Furniture/list";
import BuildingList from "./List/Building/list";
import StaffList from "./List/Staff/list";
import UserList from "./List/User/list";
import PermisstionList from "./List/Permisstion/list";
import PermisstionDetailList from "./List/PermisstionDetail/list";
import ServiceList from "./List/Service/list";
import AcctionList from "./List/Acction/list";
import BillList from "./List/Bill/list";
import FloorList from "./List/Floor/list";
import SettingList from "./List/Setting/list";
import RoomList from "./List/Room/list";
import ContractList from "./List/Contract/list";
import FloorModal from "./Modal/Floor/modal";
import RoleModal from "./Modal/Role/modal";
import TypeRoomModal from "./Modal/TypeRoom/modal";
import BillModal from "./Modal/Bill/modal";
import BuildingModal from "./Modal/Building/modal";
import StaffModal from "./Modal/Staff/modal";
import FurnitureModal from "./Modal/Furniture/modal";
import ServiceModal from "./Modal/Service/modal";
import RoomModal from "./Modal/Room/modal";
import SettingModal from "./Modal/Setting/modal";
import UserModal from "./Modal/User/modal";
import AcctionModal from "./Modal/Acction/modal";
import PermisstionModal from "./Modal/Permisstion/modal";
import PermisstionDetailModal from "./Modal/PermisstionDetail/modal";
import ContractModal from "./Modal/Contract/modal";
import {
  getListRole,
  getListAcction,
  getListStaff,
  getListTypeRoom,
  getListFloor,
  getListBuilding,
  getListService,
  getListFurniture,
  getListRoom,
  getListUser,
  getListContract,
  getListPermisstion,
  getListSetting,
  getListPermisstionDetail,
  getListBill
} from "../../service/baseService/cruds";
import { useSelector, useDispatch } from 'react-redux';
import { setTypeFilter, setpage, setLimit, setFilterStatus, setStartFilter, setEndFilter, setSearchVluae, setSeachStatus, setEcelDowload, setFilter } from "../../redux/accction/listTable";
import { convertDateTime } from "../../service/FunService/funweb";
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
  const roleParam = searchParams.get('query');
  const filterStartTime = useSelector((state) => state.listTable.filterStartTime);
  const filterEndTime = useSelector((state) => state.listTable.filterEndTime);
  const filterStatus = useSelector((state) => state.listTable.filterStatus);
  const searchStatus = useSelector((state) => state.listTable.searchStatus);
  const searchValue = useSelector((state) => state.listTable.searchValue);
  const typeFilterTime = useSelector((state) => state.listTable.typeFilterTime);
  const exportExcel = useSelector((state) => state.listTable.exportExcel);
  const filtersbase64 = useSelector((state) => state.listTable.filters);
  const prevQuery = useSelector((state) => state.listTable.prevQuery);
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
  }, [roleParam, page, limit, filterStatus, filterEndTime, filterStartTime, filter, searchValue, exportExcel, filtersbase64])
  const getQueryUrl = () => {
    if (roleParam) {
      switch (roleParam) {
        case 'role':
          SetTitel(t('page.role'));
          dispatch(getListRole(t('page.role'), page, limit, searchOb, filter, exportExcel, filtersbase64));
          break;
        case 'staff':
          SetTitel(t('page.staff'));
          dispatch(getListStaff(t('page.staff'), page, limit, searchOb, filter, exportExcel, filtersbase64));
          break;
        case 'typeRoom':
          SetTitel(t('page.typeRoom'));
          dispatch(getListTypeRoom(t('page.typeRoom'), page, limit, searchOb, filter, exportExcel, filtersbase64));
          break;
        case 'floor':
          SetTitel(t('page.floor'));
          dispatch(getListFloor(t('page.floor'), page, limit, searchOb, filter, exportExcel, filtersbase64));
          break;
        case 'building':
          SetTitel(t('page.building'));
          dispatch(getListBuilding(t('page.building'), page, limit, searchOb, filter, exportExcel, filtersbase64));
          break;
        case 'service':
          SetTitel(t('page.service'));
          dispatch(getListService(t('page.service'), page, limit, searchOb, filter, exportExcel, filtersbase64));
          break;
        case 'furniture':
          SetTitel(t('page.furniture'));
          dispatch(getListFurniture(t('page.furniture'), page, limit, searchOb, filter, exportExcel, filtersbase64));
          break;
        case 'room':
          SetTitel(t('page.room'));
          dispatch(getListRoom(t('page.room'), page, limit, searchOb, filter, exportExcel, filtersbase64));
          break;
        case 'user':
          SetTitel(t('page.user'));
          dispatch(getListUser(t('page.user'), page, limit, searchOb, filter, exportExcel, filtersbase64));
          break;
        case 'contract':
          SetTitel(t('page.contract'));
          dispatch(getListContract(t('page.contract'), page, limit, searchOb, filter, exportExcel, filtersbase64));
          break;
        case 'bill':
          SetTitel(t('page.bill'));
          dispatch(getListBill(t('page.bill'), page, limit, searchOb, filter, exportExcel, filtersbase64));
          break;
        case 'permisstion':
          SetTitel(t('page.permisstion'));
          dispatch(getListPermisstion(t('page.permisstion'), page, limit, searchOb, filter, exportExcel, filtersbase64));
          break;
        case 'acction':
          SetTitel(t('page.acction'));
          dispatch(getListAcction(t('page.acction'), page, limit, searchOb, filter, exportExcel, filtersbase64));
          break;
        case 'permisstionDetail':
          SetTitel(t('page.permisstionDetail'));
          dispatch(getListPermisstionDetail(t('page.permisstionDetail'), page, limit, searchOb, filter, exportExcel, filtersbase64));
          break;
        case 'setting':
          SetTitel(t('page.setting'));
          dispatch(getListSetting(t('page.setting'), page, limit, searchOb, filter, exportExcel, filtersbase64));
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
            <small>Danh sách</small>  <strong>{titel}</strong>
          </CCardHeader>
          <div className='row'>
            <div className='p-3 col-xl-6 col-lg-6 col-md-12 col-sm-12 flex_start'>

              {(() => {
                switch (roleParam) {
                  case 'role':
                    return <RoleModal titel={titel} />;
                  case 'staff':
                    return <StaffModal titel={titel} />;
                  case 'typeRoom':
                    return <TypeRoomModal titel={titel} />;
                  case 'floor':
                    return <FloorModal titel={titel} />;
                  case 'building':
                    return <BuildingModal titel={titel} />;
                  case 'service':
                    return <ServiceModal titel={titel} />;
                  case 'furniture':
                    return <FurnitureModal titel={titel} />;
                  case 'room':
                    return <RoomModal titel={titel} />;
                  case 'user':
                    return <UserModal titel={titel} />;
                  case 'contract':
                    return <ContractModal titel={titel} />;
                  case 'bill':
                    return <BillModal titel={titel} />;
                  case 'permisstion':
                    return <PermisstionModal titel={titel} />;
                  case 'permisstionDetail':
                    return <PermisstionDetailModal titel={titel} />;
                  case 'acction':
                    return <AcctionModal titel={titel} />;
                  case 'setting':
                    return <SettingModal titel={titel} />;
                  default:
                    return null;
                }
              })()}

              <div className='modal-button flex_center' >
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <div className='modal-button flex_center' >
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
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 p-2'>
              <CInputGroup className="mb-3">
                <CInputGroupText id="basic-addon1"><i class="fa-solid fa-magnifying-glass"></i></CInputGroupText>
                <CFormInput
                  placeholder={t('messageView.search')}
                  onChange={handleInputChange}
                />
              </CInputGroup>
            </div>
            <div className='col-12 row'>
              <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 p-2'>
                <label className='mb-2'> {t('messageView.selectTypeFilter')} : </label>
                <CFormSelect aria-label="Default select example" onChange={(e) => typeFilterFun(e)} className='onChange-time-filter'>
                  <option value="created_at"> {t('table.colum.role.created_at')}</option>
                  <option value="updated_at"> {t('table.colum.role.updated_at')}</option>
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
            </div>
          </div>
          {(() => {
            switch (roleParam) {
              case 'role':
                return <RoleList data={listTabledata} />;
              case 'staff':
                return <StaffList data={listTabledata} />;
              case 'typeRoom':
                return <TypeRoomList data={listTabledata} />;
              case 'floor':
                return <FloorList data={listTabledata} />;
              case 'building':
                return <BuildingList data={listTabledata} />;
              case 'service':
                return <ServiceList data={listTabledata} />;
              case 'furniture':
                return <FurnitureList data={listTabledata} />;
              case 'room':
                return <RoomList data={listTabledata} />;
              case 'user':
                return <UserList data={listTabledata} />;
              case 'contract':
                return <ContractList data={listTabledata} />;
              case 'bill':
                return <BillList data={listTabledata} />;
              case 'permisstion':
                return <PermisstionList data={listTabledata} />;
              case 'permisstionDetail':
                return <PermisstionDetailList data={listTabledata} />;
              case 'acction':
                return <AcctionList data={listTabledata} />;
              case 'setting':
                return <SettingList data={listTabledata} />;
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

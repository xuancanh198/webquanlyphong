const initialState = {
  listData: null,
  listRoleAll: null,
  listFurnituresAll: null,
  listServiceAll: null,
  listTypeRoomAll: null,
  listBuildingAll: null,
  listFloorAll: null,
  listRoomAll: null,
  listUserAll: null,
  listServiceRoom: null,
  listStaffAll: null,
  listTransactionAll: null,
  listActiveLog : null,
  listFurnitureRoom: null,
  listPermisstionAll: null,
  listAcctionAll: null,
  listPermisstionDetailAll: null,
  filterBaseDecode: null,
  page: 1,
  limit: 10,
  searchValue: null,
  filterStatusValue: null,
  searchStatus: false,
  filterStatus: false,
  exportExcel: false,
  filterStartTime: new Date(),
  filterEndTime: new Date(),
  typeFilterTime: "created_at",
  total: 1,
  filters: null,
  province: [],
  district: [],
  ward: [],
  provinceFirst: null,
  districtFirst: null,
  modalAdd: false,
  modalUpdate: false,
  filterTime: null,
  prevQuery: null
};
const listTable = (state = initialState, action) => {
  switch (action.type) {
    case 'GETLISTDATA':
      return {
        ...state,
        listData: action.payload,
      };
    case 'SETACTIVELOG':
      return {
        ...state,
        listActiveLog: action.payload,
      };
    case 'SETPAGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'SETLIMIT':
      return {
        ...state,
        limit: action.payload,
      };
    case 'SETSEARCHVALUE':
      return {
        ...state,
        searchValue: action.payload,
      };
    case 'SETFILTERVALUE':
      return {
        ...state,
        filterStatusValue: action.payload,
      };
    case 'SETSEARCHSTATUS':
      return {
        ...state,
        searchStatus: action.payload,
      };
    case 'SETFILTERSTATUS':
      return {
        ...state,
        filterStatus: action.payload,
      };
    case 'SETSTATUSEXCEL':
      return {
        ...state,
        exportExcel: action.payload,
      };
    case 'SETTOTAL':
      return {
        ...state,
        total: action.payload,
      };
    case 'SETSTARTFILTER':
      return {
        ...state,
        filterStartTime: action.payload,
      };
    case 'SETENDFILTER':
      return {
        ...state,
        filterEndTime: action.payload,
      };
    case 'SETTYPEFILTER':
      return {
        ...state,
        typeFilterTime: action.payload,
      };
    case 'SETFILTERS':
      return {
        ...state,
        filters: action.payload,
      };
    case 'SETPROVINCE':
      return {
        ...state,
        province: action.payload,
      };
    case 'SETDISTRICT':
      return {
        ...state,
        district: action.payload,
      };
    case 'SETWARD':
      return {
        ...state,
        ward: action.payload,
      };
    case 'SETPROVINCEFIRST':
      return {
        ...state,
        provinceFirst: action.payload,
      };
    case 'SETDISTRICTFIRST':
      return {
        ...state,
        districtFirst: action.payload,
      };
    case 'SETMODALADD':
      return {
        ...state,
        modalAdd: action.payload,
      };
    case 'SETMODALUPDATE':
      return {
        ...state,
        modalUpdate: action.payload,
      };
    case 'SETROLEALL':
      return {
        ...state,
        listRoleAll: action.payload,
      };
    case 'SETFURNITUREALL':
      return {
        ...state,
        listFurnituresAll: action.payload,
      };
    case 'SETUSERALL':
      return {
        ...state,
        listUserAll: action.payload,
      };
    case 'SETSTAFFALL':
      return {
        ...state,
        listStaffAll: action.payload,
      };
      
    case 'SETSERVICEALL':
      return {
        ...state,
        listServiceAll: action.payload,
      };
    case 'SETROOMALL':
      return {
        ...state,
        listRoomAll: action.payload,
      };
    case 'SETTTRANSACTIONALL':
      return {
        ...state,
        listTransactionAll: action.payload,
      };
      
    case 'SETPERMISSTIONALL':
      return {
        ...state,
        listPermisstionAll: action.payload,
      };
    case 'SETACCTIONALL':
      return {
        ...state,
        listAcctionAll: action.payload,
      };
    case 'SETPERMISSTIONDETAILALL':
      return {
        ...state,
        listPermisstionDetailAll: action.payload,
      };
    case 'SETTYPEROOMALL':
      return {
        ...state,
        listTypeRoomAll: action.payload,
      };
    case 'SETBUILDINGALL':
      return {
        ...state,
        listBuildingAll: action.payload,
      };
    case 'SETFLOORALL':
      return {
        ...state,
        listFloorAll: action.payload,
      };
    case 'SETFILTERTIME':
      return {
        ...state,
        listRoleAll: action.payload,
      };
    case 'SETFUNRNITUREROOM':
      return {
        ...state,
        listFurnitureRoom: action.payload,
      };
    case 'SETSERVICEROOM':
      return {
        ...state,
        listServiceRoom: action.payload,
      };
    case 'SETVALEPREQUERY':
      return {
        ...state,
        prevQuery: action.payload,
      };
    case "SETFILTERBASEDECODE":
      return {
        ...state,
        filterBaseDecode: action.payload,
      };
    default:
      return state;
  }
};
export default listTable;
